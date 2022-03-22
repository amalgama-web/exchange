<template>
    <div>
        
        <h3>Генерируем пары из списка валют</h3>
        <ul class="currency-list">
            <li class="currency-badge"
                v-for="currency in currencyList"
            >{{ currency }}
            </li>
        </ul>
    
        <button class="button"
                @click="generatePairs"
        >Сгенерировать пары
        </button>
    
        <div v-if="currencyPairs.length">
            <ul class="currency-column-list">
                <li v-for="pair in currencyPairs">
                    <div class="currency-badge">{{pair.base_currency}}</div><div class="currency-badge">{{pair.quote_currency}}</div>
                    {{ pair.comission }}%
                </li>
            </ul>
    
            <nuxt-link class="button"
                       to="/generator/rates-generator"
            >Далее к генератору курсов
            </nuxt-link>
        </div>
        
        
    </div>
</template>

<script>
    import currencyService from "~/services/currencyService";
    export default {
        
        data() {
            return {
            }
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
                this.$store.dispatch('setCurrencyPairs', currencyService.getCurrencyPairs(this.currencyList) );
            }
        },
    }
</script>

<style lang="scss">
</style>
