<template>
    <div class="l-container">
        <h3>Вы успешно совершили обмен</h3>
        <p>
            Вы обменяли {{baseAmount | toFixed }} {{baseCur}} на {{quoteAmount | toFixed }} {{quoteCur}}
        </p>
        <nuxt-link class="button _green"
                   to="/exchange/"
        >Перейти к обмену
        </nuxt-link>
    </div>
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
