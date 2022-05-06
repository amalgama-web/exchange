<template lang="pug">
    nuxt
</template>

<script>

export default {
    head() {
        return {
            htmlAttrs: {
                class: this.$store.state.bodyClass
            }
        }
    },

    methods: {
    },

    created() {
    }
}
</script>