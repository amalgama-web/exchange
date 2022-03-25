<template lang="pug">
    .wrapper
        the-header
        the-breadcrumbs
        nuxt
</template>

<script>
    import TheHeader from "~/components/TheHeader";
    
    export default {
        components: {
            TheHeader
        },
        
        created() {
            if(process.client) {
                this.$store.dispatch('initStoreFromLS');
            }
        }
    }
</script>
