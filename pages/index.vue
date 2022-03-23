<template>
    <div class="l-container">
        <h3>Добрый день! <br>
            <span v-if="!isGeneratedDataReady">
                Для начала работы необходимо сгенерировать списки валют для обмена
            </span>
            <span v-else>
                Списки валют сгенерированы, но вы можете их обновить
            </span>
        </h3>
        
        <nuxt-link class="button"
                   to="/generator/"
        >Перейти к генерации
        </nuxt-link>
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
