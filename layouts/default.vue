<template lang="pug">
    .wrapper
        the-header
        the-breadcrumbs
        nuxt
</template>

<script>

    export default {
        mounted() {
            this.$store.dispatch('initStoreFromLS');
        }
    }
</script>
