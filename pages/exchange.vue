<template lang="pug">
    .l-container
        h3 Обмен
        .exchange-row(:class="{'_preloading': isInitialDataLoading}")
            .exchange-tile
                .exchange-tile__head
                    | Обмен
                    span(v-if='baseCur && quoteCur')
                        | {{baseCur}} на {{quoteCur}}
                .exchange-tile__subhead Вы платите
                currency-exchanger(v-model='baseCurAmount' :selected='baseCur' :list='baseCurrencyList' :disabled='!isCurrenciesSelected' @change='calcQuoteDirection' @select='selectBaseCur')
                .exchange-tile__subhead Вы получаете
                currency-exchanger(v-model='quoteCurAmountFinal' :selected='quoteCur' :list='quoteCurrencyList' :disabled='!isCurrenciesSelected' @change='calcBaseDirection' @select='selectQuoteCur')
            .exchange-tile
                .exchange-tile__head
                    | Итого
                .exchange-summary-empty(v-if='!isCurrenciesSelected')
                    | Выберите валюты для обмена
                exchange-summary(v-else='' :base-cur='baseCur' :quote-cur='quoteCur' :base-cur-amount='baseCurAmount' :quote-cur-amount-final='quoteCurAmountFinal' :commission-amount='commissionAmount' :commission-text="commission + '%'" :rate='rate' :class="{'_preloading': isAdditionalRatesLoading}")
        .exchange-footer
            button.button(@click='exchange' :disabled='!exchangeEnable')
                | Обменять
</template>


<script>
    export default {
        meta: {
            ruName: 'Страница обмена'
        },

        data() {
            return {
                isInitialDataLoading: true,
                isAdditionalRatesLoading: false,

                baseCurrencyObj: null,

                baseCur: null,
                quoteCur: null,

                baseCurAmount: null,
                quoteCurAmount: null,
                quoteCurAmountFinal: null,
                commissionAmount: null,
                
                updateRatesTimer: null
            }
        },

        computed: {

            apiPairsEndpoint() {
                return this.$store.state.apiPairsEndpoint;
            },

            apiRatesEndpoint() {
                return this.$store.state.apiRatesEndpoint;
            },

            baseCurrencyList() {
                return this.baseCurrencyObj ? Object.keys(this.baseCurrencyObj) : [];
            },

            quoteCurrencyList() {
                return this.baseCurrencyObj && this.baseCur ? Object.keys(this.baseCurrencyObj[this.baseCur]) : [];
            },

            commission() {
                return this.baseCurrencyObj && this.isCurrenciesSelected
                    ? this.baseCurrencyObj[this.baseCur][this.quoteCur]['commission']
                    : 0;
            },

            rate() {
                return this.baseCurrencyObj && this.isCurrenciesSelected
                    ? this.baseCurrencyObj[this.baseCur][this.quoteCur]['rate']
                    : 1;
            },

            isCurrenciesSelected() {
                return !!(this.baseCur && this.quoteCur);
            },

            exchangeEnable() {
                return this.isCurrenciesSelected && !!this.baseCurAmount;
            }
        },

        methods: {
            exchange() {
                this.$store.dispatch('exchange/confirmTransaction', {
                    baseCurAmount: this.baseCurAmount,
                    baseCur: this.baseCur,
                    quoteCurAmount: this.quoteCurAmountFinal,
                    quoteCur: this.quoteCur
                });
                this.$router.push({name: 'success'});
            },

            selectBaseCur(currency) {
                this.baseCur = currency;
                this.quoteCur = null;
            },

            selectQuoteCur(currency) {
                this.quoteCur = currency;
                this.calcQuoteDirection();
            },

            calcQuoteDirection() {
                if (!this.isCurrenciesSelected || this.baseCurAmount === null) return;

                this.quoteCurAmount = this.baseCurAmount * this.rate;
                this.commissionAmount = this.quoteCurAmount * this.commission / 100;
                this.quoteCurAmountFinal = this.quoteCurAmount - this.commissionAmount;
            },

            calcBaseDirection(param) {
                if (!this.isCurrenciesSelected) return;

                this.quoteCurAmount = this.quoteCurAmountFinal / (100 - this.commission) * 100;
                this.commissionAmount = this.quoteCurAmount - this.quoteCurAmountFinal;
                this.baseCurAmount = this.quoteCurAmount / this.rate;
            },

            createBaseListFromPairs(pairsList) {
                const baseCurObj = {};

                pairsList.forEach(pair => {
                    const baseCur = pair.base_currency;
                    const quoteCur = pair.quote_currency;

                    if (!(baseCur in baseCurObj)) {
                        baseCurObj[baseCur] = {};
                    }
                    baseCurObj[baseCur][quoteCur] = {
                        commission: pair.commission,
                        // proper rates apply in applyNewRates
                        rate: 1
                    };
                });

                this.baseCurrencyObj = baseCurObj;
            },

            applyNewRates(ratesList) {
                if (!this.baseCurrencyObj) return;

                Object.keys(this.baseCurrencyObj).forEach(baseCur => {
                    Object.keys(this.baseCurrencyObj[baseCur]).forEach(quoteCur => {
                        const exactRateItem = ratesList.find(rateItem => rateItem.pair === `${baseCur}/${quoteCur}`);
                        this.baseCurrencyObj[baseCur][quoteCur]['rate'] = exactRateItem.rate;
                    });
                });
            },
            
        },

        created() {
            if (!process.client) return;

            const startUpdateCounter = () => {
                this.updateRatesTimer = setInterval(() => {
                    
                    this.isAdditionalRatesLoading = true;
                    
                    this.$axios.$get(this.apiRatesEndpoint)
                        .then((updatedRates) => {
                            this.applyNewRates(updatedRates);
                            this.calcQuoteDirection();
                        })
                        .catch(e => {
                            console.log('Ошибка загрузки обновленных курсов валют', e);
                        })
                        .finally(() => {
                            this.isAdditionalRatesLoading = false;
                        });
                    
                }, 30000);
            };

            const promisePairs = this.$axios.$get(this.apiPairsEndpoint);
            const promiseRates = this.$axios.$get(this.apiRatesEndpoint);
            
            Promise.all([promisePairs, promiseRates])
                .then(([pairsList, ratesList]) => {
                    this.createBaseListFromPairs(pairsList);
                    this.applyNewRates(ratesList);
                    startUpdateCounter();
                })
                .catch(e => {
                    console.log('Ошибка при загрузке данных для обмена', e);
                })
                .finally(() => {
                    this.isInitialDataLoading = false;
                });
            
        },

        destroyed() {
            clearInterval(this.updateRatesTimer);
            this.updateRatesTimer = null;
        }

    }
</script>


<style lang="scss">
    .exchange-row {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 40px;
    }
    
    .exchange-tile {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 30px;
        background-color: #fff;
        box-shadow: 0 0 20px 0px rgba(0, 0, 0, .1);
        
        &__head {
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
            
            font-size: 25px;
            font-weight: bold;
        }
        
        &__subhead {
            font-size: 20px;
            margin-bottom: 10px;
        }
    }
    
    .exchange-summary-empty {
        font-size: 20px;
        text-align: center;
    }
    
    .exchange-footer {
        margin: 40px 0;
        text-align: right;
        
        .button {
            width: 300px;
        }
    }
</style>
