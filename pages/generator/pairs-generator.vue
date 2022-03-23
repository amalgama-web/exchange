<template>
    <div>
        
        <h2>Генерируем пары из списка валют</h2>
        
        <div class="row-buttons">
            <button class="button"
                    @click="generatePairs"
            >Сгенерировать пары
            </button>
            
            <nuxt-link v-if="currencyPairs.length"
                       class="button _green"
                       to="/generator/rates-generator"
            >Далее к генератору курсов
            </nuxt-link>
        </div>
        
        <h3>Список валют</h3>
        
        <ul class="currency-list">
            <li class="currency-badge"
                v-for="currency in currencyList"
            >{{ currency }}
            </li>
        </ul>
    
        <h3>Список пар и комиссий</h3>

        <ul v-if="currencyPairs.length"
            class="currency-column-list"
        >
            <li v-for="pair in currencyPairs">
                <div class="currency-badge">{{pair.base_currency}}</div>
                <div class="currency-badge">{{pair.quote_currency}}</div>
                {{ pair.commission }}%
            </li>
        </ul>
    
    
    </div>
</template>

<script>
    import currencyService from "~/services/currencyService";

    export default {
        meta: {
            ruName: 'Генератор пар и комиссии'
        },

        data() {
            return {}
        },

        computed: {
            currencyList() {
                return this.$store.state.currencyList;
            },
            currencyPairs() {
                return this.$store.state.currencyPairs;
            },
        },

        methods: {
            generatePairs() {
                this.$store.dispatch('setCurrencyPairs', currencyService.getCurrencyPairs(this.currencyList));
            }
        },
    }
</script>

<style lang="scss">
</style>
