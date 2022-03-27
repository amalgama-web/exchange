<template lang="pug">
    .l-container
        h2 Добрый день!
        .info-section(v-if='!isDataGenerated && !isDataStoredInAPI')
            p
                | Для начала работы необходимо сгенерировать списки валют и сохранить их в API
            nuxt-link.button(to='/generator')
                | Перейти к генерации
        .info-section(v-else-if='isDataGenerated && !isDataStoredInAPI')
            p
                | Списки валют сгенерированы, но еще не сохранены в API
            nuxt-link.button(to='/generator/format-and-save')
                | Перейти к сохранению
        template(v-else='')
            .info-section
                p
                    | Данные сгенерированы и сохранены, но вы можете их обновить c другими валютами
                nuxt-link.button(to='/generator/')
                    | Перейти к обновлению
            .info-section
                p
                    | Или вы можете перейти к обмену с текущими данными
                nuxt-link.button._green(to='/exchange/')
                    | Перейти к обмену

</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        meta: {
            ruName: 'Главная'
        },

        computed: {
            ...mapGetters(['isDataGenerated', 'isDataStoredInAPI']),
        }
    }
</script>

<style lang="scss">
    .info-section {
        margin-bottom: 40px;
    }
</style>
