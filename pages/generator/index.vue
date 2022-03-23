<template>
    <div>
        <h2>Генерируем список рандомных валют для обмена</h2>
        
        <div class="row-buttons">
            <button class="button"
                    @click="generateList"
            >Сгенерировать коды валют
            </button>
            
            <nuxt-link v-if="currencyList.length"
                       class="button _green"
                       to="/generator/pairs-generator"
            >Далее к генерации пар
            </nuxt-link>
        </div>
        
        <ul v-if="currencyList.length"
            class="currency-list"
        >
            <li class="currency-badge"
                v-for="currency in currencyList"
            >{{ currency }}
            </li>
        </ul>
    </div>
</template>

<script>
    import currencyService from "~/services/currencyService";

    export default {
        meta: {
            ruName: 'Генератор списка валют'
        },

        data() {
            return {}
        },

        computed: {
            currencyList() {
                return this.$store.state.currencyList;
            }
        },

        methods: {
            generateList() {
                this.$store.dispatch('setCurrencyList', currencyService.getRandomCurrencies(10));
            },
        }
    }
</script>

<style lang="scss">

</style>
