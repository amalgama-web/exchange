<template lang="pug">
    .l-container
        nuxt-link(to='/') Главная
        nuxt-child
</template>

<script>
    export default {
        meta: {
            ruName: 'Генератор'
        }
    }
</script>
