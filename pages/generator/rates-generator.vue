<template>
    <div>
        
        <h3>Генерируем курсы валют для пар:</h3>
        
        
        <button class="button"
                @click="generateRates"
        >Сгенерировать курсы
        </button>
        
        <div v-if="currencyRates.length">
            <ul class="currency-column-list">
                <li v-for="rateItem in currencyRates">
                    <div class="currency-badge">{{rateItem.pair}}</div>
                    Курс: {{rateItem.rate}}
                </li>
            </ul>
            <nuxt-link class="button"
                       to="/generator/success"
            >Далее
            </nuxt-link>
        </div>
        
        
        <ul v-else
            class="currency-column-list"
        >
            <li v-for="pair in currencyPairs">
                <div class="currency-badge">{{pair.base_currency}}</div>
                →
                <div class="currency-badge">{{pair.quote_currency}}</div>
            </li>
        </ul>
    
        
    
    </div>
</template>

<script>
    import currencyService from "~/services/currencyService";

    export default {

        data() {
            return {}
        },

        computed: {
            currencyPairs() {
                return this.$store.state.currencyPairs;
            },
            currencyRates() {
                return this.$store.state.currencyRates;
            }
        },

        methods: {
            generateRates() {
                const rates = currencyService.getCurrencyRates(this.currencyPairs);
                console.log(rates);
                this.$store.dispatch('setCurrencyRates', rates);
            }
        }

    }
</script>

<style lang="scss">
</style>
