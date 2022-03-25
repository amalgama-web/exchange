<template lang="pug">
    div
        h2 Генерируем пары из списка валют
        .row-buttons
            button.button(@click='generatePairs')
                | Сгенерировать пары
            nuxt-link.button._green(v-if='currencyPairs.length' to='/generator/format-and-save/')
                | Далее
        h3 Список валют
        ul.currency-list
            li.currency-badge(v-for='currency in currencyList')
                | {{ currency }}
        template(v-if='currencyPairs.length')
            h3 Список пар, курс и комиссия:
            ul.currency-column-list
                li(v-for='pair in currencyPairs')
                    .currency-badge {{pair.base_currency}}
                    .currency-badge {{pair.quote_currency}}
                    strong {{ +pair.rate.toFixed(6) }}
                    | {{ pair.commission }}%

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
                this.$store.dispatch('setCurrencyPairsList', currencyService.getCurrencyPairs(this.currencyList));
            }
        },
    }
</script>

<style lang="scss">
</style>
