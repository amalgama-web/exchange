<template lang="pug">
    .l-container
        test
        token
        coins

</template>

<script>
import {mapGetters} from 'vuex';
import test from '@/pages/parts/test';
import token from '@/pages/parts/token';
import coins from '@/pages/parts/coins';


export default {
    meta: {
        ruName: 'Главная'
    },

    computed: {
        ...mapGetters(['isDataGenerated', 'isDataStoredInAPI']),
    },

    components: {
        test,
        token,
        coins,
    }
}
</script>

<style lang="scss">
.section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    margin-bottom: 40px;

    text-align: center;

    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }

    &__item {
        background: #5881ea;
        padding: 15px;
        &:last-child {
            background-color: dodgerblue;
        }
    }

    video {
        display: block;
        width: 100%;
        height: auto;
        max-width: 400px;
        margin: 0 auto;
    }
}
</style>
