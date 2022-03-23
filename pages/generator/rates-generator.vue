<template>
    <div>
        
        <h2>Генерируем курсы валют для пар:</h2>
        
        <div class="row-buttons">
            <button class="button"
                    @click="generateRates"
            >Сгенерировать курсы для пар
            </button>
            
            <nuxt-link v-if="currencyRates.length"
                       class="button _green"
                       to="/generator/success"
            >Далее
            </nuxt-link>
        </div>
        
        <h3>Список пар</h3>
        
        <ul v-if="currencyPairs.length"
            class="currency-list"
        >
            <li class="currency-badge"
                v-for="pair in currencyPairs"
            >
                {{pair.base_currency}}/{{pair.quote_currency}}
            </li>
        </ul>
        
        <h3>Список пар c курсом</h3>
        
        <div v-if="currencyRates.length">
            <ul class="currency-column-list">
                <li v-for="rateItem in currencyRates">
                    <div class="currency-badge">{{rateItem.pair}}</div>
                    Курс: {{rateItem.rate}}
                </li>
            </ul>
        </div>
    
    </div>
</template>

<script>
    import currencyService from "~/services/currencyService";

    export default {
        meta: {
            ruName: 'Генератор курсов'
        },

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
                this.$store.dispatch('setCurrencyRates', rates);
            }
        }

    }
</script>

<style lang="scss">
</style>
