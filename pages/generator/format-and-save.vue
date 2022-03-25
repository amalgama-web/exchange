<template>
    <div>
        <h2>Форматируем данные и сохраняем их для API двумя списками в формате</h2>
        
        <div class="format-demonstration">
            <div class="format-demonstration__col">
                <h4>Список пар и комиссий</h4>
                <div class="code-example">
                    {<br>&nbsp;&nbsp;"base_currency": "USD",<br>&nbsp;&nbsp;"quote_currency": "EUR",<br>
                    &nbsp;&nbsp;"commission": 3<br>}
                </div>
            </div>
            <div class="format-demonstration__col">
                <h4>Список пара-курс</h4>
                <div class="code-example">
                    {<br>&nbsp;&nbsp;"pair": "USD/EUR",<br>&nbsp;&nbsp;"rate": 1.5<br>}
                </div>
            </div>
        </div>
        
        <div class="row-buttons">
            <button class="button"
                    :class="{'_preloading': isDataLoading}"
                    @click="formatingData"
            >Форматировать и сохранить
            </button>
            
            <nuxt-link v-if="isEndpointsCreated"
                       class="button _green"
                       to="/exchange/"
            >Перейти к обмену
            </nuxt-link>
        </div>
    
        <template v-if="isEndpointsCreated">
            <h2>Сформированы два endpoint'а для получения данных при обмене</h2>
            <h4>Список пар и комиссий</h4>
            <p>
                <a :href="apiPairsEndpoint" target="_blank">{{apiPairsEndpoint}}</a>
            </p>
            <h4>Список пара-курс</h4>
            <p>
                <a :href="apiRatesEndpoint" target="_blank">{{apiRatesEndpoint}}</a>
            </p>
        </template>
        
    </div>
</template>

<script>
    import currencyService from "~/services/currencyService";
    import createUrlService from "~/services/createUrlService";

    export default {
        meta: {
            ruName: 'Сохранение для API'
        },

        data() {
            return {
                isDataLoading: false,
            }
        },

        computed: {
            currencyPairs() {
                return this.$store.state.currencyPairs;
            },
            
            isEndpointsCreated() {
                return this.apiPairsEndpoint && this.apiPairsEndpoint;
            },

            apiPairsEndpoint() {
                return this.$store.state.apiPairsEndpoint;
            },

            apiRatesEndpoint() {
                return this.$store.state.apiRatesEndpoint;
            },
        },

        methods: {
            formatingData() {
                const formattedPairs = currencyService.getFormattedPairs(this.currencyPairs);
                const formattedRates = currencyService.getFormattedRates(this.currencyPairs);

                this.sentDataToFirebase(formattedPairs, formattedRates);
            },
            
            sentDataToFirebase(pairsData, ratesData) {

                this.isDataLoading = true;
                
                const urlPairs = createUrlService.currencyPairs();
                const urlRates = createUrlService.currencyRates();
                
                const promisePairs = this.$axios.$post(urlPairs, pairsData);
                const promiseRates = this.$axios.$post(urlRates, ratesData);

                Promise.all([promisePairs, promiseRates])
                    .then( ([responsePairs, responseRates]) => {
                        const pairsEndpoint = createUrlService.currencyPairs(responsePairs.name);
                        const ratesEndpoint = createUrlService.currencyRates(responseRates.name);

                        this.$store.dispatch('setPairsEndpoint', pairsEndpoint);
                        this.$store.dispatch('setRatesEndpoint', ratesEndpoint);
                    })
                    .catch(e => {
                        console.log('Ошибка загрузки данных для обмена валют', e);
                    })
                    .finally(() => {
                        this.isDataLoading = false;
                    });
            }
        }

    }
</script>

<style lang="scss">
    .format-demonstration {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 40px;
        margin-bottom: 40px;
    }
    
    .code-example {
        display: inline-block;
        font-size: 13px;
        font-family: monospace;
        background-color: #eee;
        border: 1px solid #aaaaaa;
        padding: 20px 40px 20px 20px;
        border-radius: 4px;
        
    }
</style>
