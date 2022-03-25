<template>
    <div class="wrapper">
        <the-header></the-header>
        <TheBreadcrumbs></TheBreadcrumbs>
        <Nuxt />
    </div>
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
