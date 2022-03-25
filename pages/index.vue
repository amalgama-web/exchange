<template lang="pug">
    .l-container
        h2 Добрый день!
        .info-section(v-if='!isGeneratedDataReady && !isEndpointsCreated')
            p
                | Для начала работы необходимо сгенерировать списки валют и endpoints для их получения
            nuxt-link.button(to='/generator')
                | Перейти к генерации
        .info-section(v-else-if='isGeneratedDataReady && !isEndpointsCreated')
            p
                | Списки валют сгенерированы, но еще не отправлены в API
            nuxt-link.button(to='/generator/format-and-save')
                | Перейти к отправке
        template(v-else='')
            .info-section
                p
                    | Endpoints созданы, но вы можете их обновить c другими валютами
                nuxt-link.button(to='/generator/')
                    | Перейти к обновлению
            .info-section
                p
                    | Endpoints для получения данных обмена созданы, можно перейти к обмену
                p
                    | Получение списка валютных пар и комиссий
                    br
                    a(target='_blank' :href='apiPairsEndpoint') {{apiPairsEndpoint}}
                p
                    | Получение списка пара-курс
                    br
                    a(target='_blank' :href='apiRatesEndpoint') {{apiRatesEndpoint}}
                nuxt-link.button._green(to='/exchange/')
                    | Перейти к обмену

</template>

<script>

    export default {
        meta: {
            ruName: 'Главная'
        },

        computed: {
            isGeneratedDataReady() {
                return this.$store.getters.isGeneratedDataReady;
            },
            
            isEndpointsCreated() {
                return this.$store.getters.isEndpointsCreated;
            },
            
            apiPairsEndpoint() {
                return this.$store.state.apiPairsEndpoint;
            },

            apiRatesEndpoint() {
                return this.$store.state.apiRatesEndpoint;
            },
        }


    }
</script>

<style lang="scss">
    .info-section {
        margin-bottom: 40px;
    }
    
</style>
