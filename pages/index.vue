<template>
    <div v-cloak>
        <div class="l-container">
            <h2>Добрый день!</h2>
            <p v-if="!isGeneratedDataReady">
                Для начала работы необходимо сгенерировать списки валют для обмена
            </p>
            <p v-else>
                Списки валют сгенерированы, но вы можете их обновить
            </p>
            
            <nuxt-link class="button"
                       to="/generator/"
            >Перейти к генерации
            </nuxt-link>
        </div>
        
        <div v-if="isGeneratedDataReady"
             class="l-container"
        >
            <h2>Данные сгенерированы, можно перейти к обмену</h2>
            <nuxt-link class="button _green"
                       to="/exchange/"
            >Перейти к обмену
            </nuxt-link>
        </div>
    </div>

</template>

<script>

    export default {
        meta: {
            ruName: 'Главная'
        },

        components: {},

        data() {
            return {}
        },

        computed: {
            isGeneratedDataReady() {
                return this.$store.getters.isGeneratedDataReady;
            }
        }


    }
</script>

<style></style>
