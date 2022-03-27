<template lang="pug">
    // mixin for text indent in code examples
    - var indent = 4
    mixin indentstr(level, text)
        - for (var i = 0; i < level * indent; i++)
            =' '
        =text
        br

    div
        h2 Форматируем данные и сохраняем их для API двумя списками в формате
        .format-demonstration
            .format-demonstration__col
                h4 Список пар и комиссий
                pre.code-example
                    +indentstr(0, '[')
                    +indentstr(1, '{')
                    +indentstr(2, '"base_currency": "USD",')
                    +indentstr(2, '"quote_currency": "EUR",')
                    +indentstr(2, '"commission": 3')
                    +indentstr(1, '},')
                    +indentstr(1, '...')
                    +indentstr(0, ']')
            .format-demonstration__col
                h4 Список пара-курс
                pre.code-example
                    +indentstr(0, '[')
                    +indentstr(1, '{')
                    +indentstr(2, '"pair": "USD/EUR",')
                    +indentstr(2, '"rate": 1.5')
                    +indentstr(1, '},')
                    +indentstr(1, '...')
                    +indentstr(0, ']')
        .row-buttons
            button.button(:class="{'_preloading': isLoadingInProcess}" @click='formatingData')
                | Форматировать и сохранить
            nuxt-link.button._green(v-if='isDataStoredInAPI' to='/exchange/')
                | Перейти к обмену
        template(v-if='isDataStoredInAPI')
            h2 Данные сохранены
            p Список пар с комиссией сгенерирован в файл
                =' '
                strong api/pairs.json
            p Список пара-курс сгенерирован в файл&nbsp;
                =' '
                strong api/rates.json
</template>

<script>
    import currencyService from "~/services/currencyService";

    export default {
        meta: {
            ruName: 'Сохранение для API'
        },

        data() {
            return {
                isLoadingInProcess: false,
            }
        },

        computed: {
            currencyPairs() {
                return this.$store.state.currencyPairs;
            },
            isDataStoredInAPI() {
                return this.$store.state.isDataStoredInAPI;
            }
        },

        methods: {
            formatingData() {
                const formattedPairs = currencyService.getFormattedPairs(this.currencyPairs);
                const formattedRates = currencyService.getFormattedRates(this.currencyPairs);

                this.sentDataToMockAPI(formattedPairs, formattedRates);
            },
            
            sentDataToMockAPI(pairsData, ratesData) {
                this.isLoadingInProcess = true;
                
                const promisePairs = this.$axios.post(this.$axios.defaults.baseURL + 'api/set-pairs/', pairsData);
                const promiseRates = this.$axios.post(this.$axios.defaults.baseURL + 'api/set-rates/', ratesData);

                Promise.all([promisePairs, promiseRates])
                    .then(() => {
                        this.$store.dispatch('setApiStoredState', true);
                    })
                    .catch(e => {
                        console.log('Ошибка загрузки данных в API', e);
                    })
                    .finally(() => {
                        this.isLoadingInProcess = false;
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
