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
                       to="/generator/format-and-save/"
            >Далее
            </nuxt-link>
        </div>
        
        <h3>Список валют</h3>
        
        <ul class="currency-list">
            <li class="currency-badge"
                v-for="currency in currencyList"
            >{{ currency }}
            </li>
        </ul>
        
        <template v-if="currencyPairs.length">
           
            <h3>Список пар, курс и комиссия:</h3>
            
            <ul class="currency-column-list">
                <li v-for="pair in currencyPairs">
                    <div class="currency-badge">{{pair.base_currency}}</div>
                    <div class="currency-badge">{{pair.quote_currency}}</div>
                    <strong>{{ +pair.rate.toFixed(6) }}</strong>
                    {{ pair.commission }}%
                </li>
            </ul>
            
        </template>
    
    
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
