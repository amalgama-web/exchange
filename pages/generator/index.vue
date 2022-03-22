<template>
    <div>
        <h3>Генерируем список рандомных валют для обмена</h3>
        
        <button class="button"
                @click="generateList"
        >Сгенерировать коды валют
        </button>
        
        <div v-if="currencyList.length">
            <ul class="currency-list">
                <li class="currency-badge"
                    v-for="currency in currencyList"
                >{{ currency }}
                </li>
            </ul>
            
            <nuxt-link class="button"
                    to="/generator/pairs-generator"
            >Далее к генерации пар
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
            }
        },
        
        methods: {
            generateList() {
                this.$store.dispatch('setCurrencyList', currencyService.getRandomCurrencies(10) );
            },
        }
    }
</script>

<style lang="scss">

</style>
