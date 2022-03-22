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
                                 @change="baseAmountChange"
                                 :disabled="!currenciesSelected"
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
                                 @change="quoteAmountChange"
                                 :disabled="!currenciesSelected"
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
                <div class="exchange-cell__subhead">Вы платите {{baseCurAmount}}</div>
                <div class="exchange-cell__subhead">Вы получаете {{quoteCurAmount}}</div>
                <div class="exchange-cell__subhead">Комиссия {{comissionText}}</div>
                <div class="exchange-cell__subhead">Курс {{rate}}</div>
            </div>
        </div>
    
    
    </div>
</template>


<script>
    import currencySelect from '~/components/currency-select.vue';
    import floatInput from '~/components/float-input.vue';

    export default {
        components: {
            currencySelect,
            floatInput
        },

        data() {
            return {
                baseCur: null,
                quoteCur: null,

                baseCurAmount: null,
                quoteCurAmount: null,

                comission: null,
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

            comissionText() {
                return this.comission ? `${this.comission}%` : '';
            },
            
            currenciesSelected() {
                return this.baseCur && this.quoteCur;
            }
        },

        methods: {
            selectBaseCur(currency) {
                this.baseCur = currency;
                this.updateRates();
            },

            selectQuoteCur(currency) {
                this.quoteCur = currency;
                this.updateRates();
            },

            updateRates() {
                if (!this.currenciesSelected) return;

                const pairItem = this.currencyPairs.find(item => item.base_currency === this.baseCur && item.quote_currency === this.quoteCur);
                this.comission = pairItem.comission;

                console.log(this.currencyRates);
                const rateItem = this.currencyRates.find(item => item.pair === `${this.baseCur}/${this.quoteCur}`);
                this.rate = rateItem.rate;
            },

            baseAmountChange() {
                console.log('baseAmountChange');
                console.log(this.baseCurAmount);
            },

            quoteAmountChange() {
                console.log('quoteAmountChange');
                console.log(this.quoteCurAmount);
            }
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
            border: 1px solid #ccc;
            outline: none !important;
            display: block;
            width: 100%;
            padding: 0 10px;
            border-radius: 5px 0 0 5px;
            
            font: inherit;
            
            
            transition: all linear 150ms;
            @include placeholder-color(#aaa);
            
            &:focus {
                border-color: darken(#ccc, 10%);
            }
        }
    }
</style>
