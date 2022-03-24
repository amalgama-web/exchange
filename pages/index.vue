<template>
    <div v-cloak>
        <div class="l-container">
            <h2>Добрый день!</h2>
            
            <div class="info-section" v-if="!isGeneratedDataReady && !isEndpointsCreated">
                <p>
                    Для начала работы необходимо сгенерировать списки валют и endpoints для их получения
                </p>
                <nuxt-link class="button"
                           to="/generator"
                >Перейти к генерации
                </nuxt-link>
            </div>
            
            <div class="info-section" v-else-if="isGeneratedDataReady && !isEndpointsCreated">
                <p>
                    Списки валют сгенерированы, но еще не отправлены в API
                </p>
                <nuxt-link class="button"
                           to="/generator/format-and-save"
                >Перейти к отправке
                </nuxt-link>
            </div>
            
            <template v-else>
                <div class="info-section" >
                    <p>
                        Endpoints созданы, но вы можете их обновить c другими валютами
                    </p>
                    <nuxt-link class="button"
                               to="/generator/"
                    >Перейти к обновлению
                    </nuxt-link>
                </div>
    
                <div class="info-section">
                    <p>
                        Endpoints для получения данных обмена созданы, можно перейти к обмену
                    </p>
                    <p>
                        Получение списка валютных пар и комиссий <br>
                        <a target="_blank" :href="apiPairsEndpoint">{{apiPairsEndpoint}}</a>
                    </p>
                    <p>
                        Получение списка пара-курс <br>
                        <a target="_blank" :href="apiRatesEndpoint">{{apiRatesEndpoint}}</a>
                    </p>
                    
                    <nuxt-link class="button _green"
                               to="/exchange/"
                    >Перейти к обмену
                    </nuxt-link>
                </div>
                
            </template>
            
        </div>
        
    </div>

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
