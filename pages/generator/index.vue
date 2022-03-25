<template lang="pug">
    div
        h2 Генерируем список рандомных валют для обмена
        .row-buttons
            button.button(@click='generateList')
                | Сгенерировать коды валют
            nuxt-link.button._green(v-if='currencyList.length' to='/generator/pairs-generator')
                | Далее к генерации пар
        ul.currency-list(v-if='currencyList.length')
            li.currency-badge(v-for='currency in currencyList')
                | {{ currency }}

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
