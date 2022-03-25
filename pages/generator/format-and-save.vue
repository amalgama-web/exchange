<template lang="pug">
    div
        h2 Форматируем данные и сохраняем их для API двумя списками в формате
        .format-demonstration
            .format-demonstration__col
                h4 Список пар и комиссий
                pre.code-example
                    |{
                    br
                    |    "base_currency": "USD",
                    br
                    |    "quote_currency": "EUR",
                    br
                    |    "commission": 3
                    br
                    |}
            .format-demonstration__col
                h4 Список пара-курс
                pre.code-example
                    |{
                    br
                    |    "pair": "USD/EUR",
                    br
                    |    "rate": 1.5
                    br
                    |}
        .row-buttons
            button.button(:class="{'_preloading': isDataLoading}" @click='formatingData')
                | Форматировать и сохранить
            nuxt-link.button._green(v-if='isEndpointsCreated' to='/exchange/')
                | Перейти к обмену
        template(v-if='isEndpointsCreated')
            h2 Сформированы два endpoint'а для получения данных при обмене
            h4 Список пар и комиссий
            p
                a(:href='apiPairsEndpoint' target='_blank') {{apiPairsEndpoint}}
            h4 Список пара-курс
            p
                a(:href='apiRatesEndpoint' target='_blank') {{apiRatesEndpoint}}
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
