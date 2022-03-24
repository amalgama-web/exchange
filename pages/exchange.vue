<template>
    <div class="l-container">
        <h3>Обмен</h3>
        <div class="exchange-row"
             :class="{'_preloading': isDataLoading}"
        >
            <div class="exchange-cell">
                <div class="exchange-cell__head">
                    Обмен
                    <span v-if="baseCur && quoteCur">
                        {{baseCur}} на {{quoteCur}}
                    </span>
                </div>
                
                <div class="exchange-cell__subhead">Вы платите</div>
                <div class="currency-plate">
                    <float-input class="currency-plate__input"
                                 v-model="baseCurAmount"
                                 @change="calcQuoteDirection"
                                 :disabled="!isCurrenciesSelected"
                    ></float-input>
                    <currency-select :currency-list="baseCurrencyList"
                                     :selected-currency="baseCur"
                                     @currency-select="selectBaseCur"
                    ></currency-select>
                </div>
                
                <div class="exchange-cell__subhead">Вы получаете</div>
                <div class="currency-plate">
                    <float-input class="currency-plate__input"
                                 v-model="quoteCurAmountFinal"
                                 @change="calcBaseDirection"
                                 :disabled="!isCurrenciesSelected"
                    ></float-input>
                    <currency-select :currency-list="quoteCurrencyList"
                                     :selected-currency="quoteCur"
                                     @currency-select="selectQuoteCur"
                    ></currency-select>
                </div>
            </div>
            
            <div class="exchange-cell">
                <div class="exchange-cell__head">
                    Итого
                </div>
                
                <div v-if="!isCurrenciesSelected"
                     class="exchange-summary-empty"
                >
                    Выберите валюты для обмена
                </div>
                <div v-else
                     class="exchange-summary"
                >
                    <div class="exchange-summary__item">Вы платите {{ baseCurAmount || 0 }} {{ baseCur }}</div>
                    <div class="exchange-summary__item">Вы получаете {{ quoteCurAmountFinal || 0 }} {{ quoteCur }}</div>
                    <div class="exchange-summary__item _sm">Комиссия {{ commissionAmount || 0}} {{ quoteCur }}</div>
                    <div class="exchange-summary__item">Комиссия {{ commissionText }}</div>
                    <div class="exchange-summary__item">Курс 1 {{ baseCur }} = {{ rate }} {{ quoteCur }}</div>
                </div>
            </div>
        </div>
    
    
    </div>
</template>


<script>
    import currencySelect from '~/components/CurrencySelect.vue';
    import floatInput from '~/components/FloatInput.vue';
    import currencyService from "~/services/currencyService";

    export default {
        meta: {
            ruName: 'Страница обмена'
        },

        components: {
            currencySelect,
            floatInput
        },

        data() {
            return {
                isDataLoading: true,
                
                baseCurrencyObj: null,

                baseCur: null,
                quoteCur: null,

                baseCurAmount: null,
                quoteCurAmount: null,
                quoteCurAmountFinal: null,
                commissionAmount: null,
            }
        },

        computed: {
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

            commissionText() {
                return `${this.commission}%`;
            },

            isCurrenciesSelected() {
                return !!(this.baseCur && this.quoteCur);
            }
        },

        methods: {
            selectBaseCur(currency) {
                this.baseCur = currency;
                this.quoteCur = null;
            },

            selectQuoteCur(currency) {
                this.quoteCur = currency;
                this.calcQuoteDirection();
            },

            calcQuoteDirection() {
                if (!this.isCurrenciesSelected) return;

                this.quoteCurAmount = currencyService.toFixed(this.baseCurAmount * this.rate);
                this.commissionAmount = currencyService.toFixed(this.quoteCurAmount * this.commission / 100);
                this.quoteCurAmountFinal = currencyService.toFixed(this.quoteCurAmount - this.commissionAmount);
            },

            calcBaseDirection() {
                if (!this.isCurrenciesSelected) return;

                this.quoteCurAmount = currencyService.toFixed(this.quoteCurAmountFinal / (100 - this.commission) * 100);
                this.commissionAmount = currencyService.toFixed(this.quoteCurAmount - this.quoteCurAmountFinal);
                this.baseCurAmount = currencyService.toFixed(this.quoteCurAmount / this.rate);
            },
            
            createBaseListFromPairs(pairsList) {
                const baseCurObj = {};
                
                pairsList.forEach(pair => {
                    const baseCur = pair.base_currency;
                    const quoteCur = pair.quote_currency;
                    
                    if( !(baseCur in baseCurObj) ) {
                        baseCurObj[baseCur] = {};
                    }
                    baseCurObj[baseCur][quoteCur] = {
                        commission: pair.commission
                    };
                });

                this.baseCurrencyObj = baseCurObj;
            },
            
            applyNewRates(ratesList) {
                if(!this.baseCurrencyObj) return;
                
                Object.keys(this.baseCurrencyObj).forEach(baseCur => {
                    Object.keys(this.baseCurrencyObj[baseCur]).forEach(quoteCur => {
                        const exactRateItem = ratesList.find(rateItem => rateItem.pair === `${baseCur}/${quoteCur}`);
                        this.baseCurrencyObj[baseCur][quoteCur]['rate'] = exactRateItem.rate;
                    });
                });
            }
        },

        mounted() {
            // todo с local storage костыль заменить
            const apiPairsEndpoint = JSON.parse(localStorage.getItem('apiPairsEndpoint'));
            const apiRatesEndpoint = JSON.parse(localStorage.getItem('apiRatesEndpoint'));
            
            Promise.all([this.$axios.$get(apiPairsEndpoint), this.$axios.$get(apiRatesEndpoint)])
                .then(([pairsList, ratesList]) => {
                    
                    this.createBaseListFromPairs(pairsList);
                    this.applyNewRates(ratesList)
                    
                })
                .catch(e => {
                    console.log('Ошибка при загрузке данных для обмена', e);
                })
                .finally(() => {
                    this.isDataLoading = false;
                });
        }

    }
</script>


<style lang="scss">
    @mixin placeholder-color($color) {
        &::-webkit-input-placeholder {
            color: $color;
        }
        &:-moz-placeholder {
            color: $color;
        }
        &::-moz-placeholder {
            color: $color;
            opacity: 1;
        }
        &:-ms-input-placeholder {
            color: $color;
        }
    }
    
    .exchange-row {
        position: relative;
        display: flex;
        justify-content: space-between;
        
    }
    
    .exchange-cell {
        
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
        
        flex-basis: 47%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 30px;
    }
    
    .exchange-summary-empty {
        font-size: 20px;
        text-align: center;
    }
    
    .exchange-summary {
        &__item {
            font-size: 20px;
            margin-bottom: 10px;
            
            &._sm {
                font-size: 14px;
                color: #aaaaaa;
                margin-bottom: 5px;
            }
        }
    }
    
    .currency-plate {
        position: relative;
        padding-right: 70px;
        margin-bottom: 40px;
        
        &:last-child {
            margin-bottom: 0;
        }
        
        .currency-select {
            position: absolute;
            right: 0;
            top: 0;
        }
        
        &__input {
            height: 50px;
            border: 1px solid #bbb;
            outline: none !important;
            display: block;
            width: 100%;
            padding: 0 10px;
            border-radius: 5px 0 0 5px;
            
            font: inherit;
            
            
            transition: all linear 150ms;
            @include placeholder-color(#aaa);
            
            &:focus {
                border-color: darken(#bbb, 10%);
            }
            
            &[disabled] {
                background-color: #eee;
                cursor: not-allowed;
            }
        }
    }
</style>
