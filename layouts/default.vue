<template>
    <div class="wrapper">
        <the-header></the-header>
    
        <base-breadcrumbs></base-breadcrumbs>
    
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
