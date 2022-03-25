<template lang="pug">
    .l-container
        h3 Вы успешно совершили обмен
        p
            | Вы обменяли {{baseAmount | toFixed }} {{baseCur}} на {{quoteAmount | toFixed }} {{quoteCur}}
        nuxt-link.button._green(to='/exchange/')
            | Перейти к обмену
</template>

<script>
    export default {
        name: 'success',
        
        meta: {
            ruName: 'Обмен совершен успешно'
        },
        
        computed: {
            baseAmount() {
                return this.$store.state.exchange.baseCurAmount;
            },
            baseCur() {
                return this.$store.state.exchange.baseCur;
            },
            quoteAmount() {
                return this.$store.state.exchange.quoteCurAmount;
            },
            quoteCur() {
                return this.$store.state.exchange.quoteCur;
            },
        }
    }
</script>
