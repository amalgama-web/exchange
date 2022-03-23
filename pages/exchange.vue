<template>
    <div class="l-container">
        <h3>Обмен</h3>
        <div class="exchange-row">
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
                    <currency-select :currency-list="currencyList"
                                     :disabled-list="[quoteCur]"
                                     @currency-select="selectBaseCur"
                    ></currency-select>
                </div>
                
                <div class="exchange-cell__subhead">Вы получаете</div>
                <div class="currency-plate">
                    <float-input class="currency-plate__input"
                                 v-model="quoteCurAmount"
                                 @change="calcBaseDirection"
                                 :disabled="!isCurrenciesSelected"
                    ></float-input>
                    <currency-select :currency-list="currencyList"
                                     :disabled-list="[baseCur]"
                                     @currency-select="selectQuoteCur"
                    ></currency-select>
                </div>
            </div>
            
            <div class="exchange-cell">
                <div class="exchange-cell__head">
                    Итого
                </div>
                
                <div v-if="!isCurrenciesSelected" class="exchange-summary-empty">
                    Выберите валюты для обмена
                </div>
                <div v-else class="exchange-summary">
                    <div class="exchange-summary__item">Вы платите {{ baseCurAmount || 0 }} {{ baseCur }}</div>
                    <div class="exchange-summary__item _sm">Из них комиссия {{ commission || 0 }} {{ baseCur }}</div>
                    <div class="exchange-summary__item _sm">К конвертации {{ baseCurAmountToConvert || 0 }} {{ baseCur }}</div>
                    <div class="exchange-summary__item">Вы получаете {{ quoteCurAmount || 0 }} {{ quoteCur }}</div>
                    <div class="exchange-summary__item">Комиссия {{ commissionRateText }}</div>
                    <div class="exchange-summary__item">Курс 1 {{ baseCur }} = {{ rate }} {{ quoteCur }}</div>
                </div>
            </div>
        </div>
    
    
    </div>
</template>


<script>
    import currencySelect from '~/components/currency-select.vue';
    import floatInput from '~/components/float-input.vue';
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
                baseCur: null,
                quoteCur: null,

                baseCurAmount: null,
                baseCurAmountToConvert: null,
                quoteCurAmount: null,
                commission: null,
                
                commissionRate: null,
                rate: null
            }
        },

        computed: {
            currencyList() {
                return this.$store.state.currencyList;
            },

            currencyPairs() {
                return this.$store.state.currencyPairs;
            },

            currencyRates() {
                return this.$store.state.currencyRates;
            },

            commissionRateText() {
                return this.commissionRate ? `${this.commissionRate}%` : '';
            },
            
            isCurrenciesSelected() {
                return this.baseCur && this.quoteCur;
            }
        },

        methods: {
            selectBaseCur(currency) {
                this.baseCur = currency;
                this.update();
            },

            selectQuoteCur(currency) {
                this.quoteCur = currency;
                this.update();
            },

            update() {
                if (!this.isCurrenciesSelected) return;

                this.setPairs();
                this.setRates();
                this.calcQuoteDirection();
            },
            
            setPairs() {
                // todo привести списки к одному типу
                const pairItem = this.currencyPairs.find(item => item.base_currency === this.baseCur && item.quote_currency === this.quoteCur);
                this.commissionRate = pairItem.commission;
            },
            
            setRates() {
                // todo привести списки к одному типу
                const rateItem = this.currencyRates.find(item => item.pair === `${this.baseCur}/${this.quoteCur}`);
                this.rate = rateItem.rate;
            },

            calcQuoteDirection() {
                if (!this.isCurrenciesSelected) return;

                this.commission = currencyService.toFixed(this.baseCurAmount * this.commissionRate / 100);
                this.baseCurAmountToConvert = currencyService.toFixed(this.baseCurAmount - this.commission);
                this.quoteCurAmount = currencyService.toFixed(this.baseCurAmountToConvert * this.rate);
            },
            
            calcBaseDirection() {
                if (!this.isCurrenciesSelected) return;

                this.baseCurAmountToConvert = currencyService.toFixed(this.quoteCurAmount / this.rate);
                this.commission = currencyService.toFixed(this.baseCurAmountToConvert / (100 - this.commissionRate) * this.commissionRate);
                this.baseCurAmount = currencyService.toFixed(this.baseCurAmountToConvert + this.commission);
            }
        },
        
        created() {
            // todo запрос списка валют, пар и курса
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
