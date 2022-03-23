<template>
    <div class="wrapper">
        <the-generator-header></the-generator-header>
        <base-breadcrumbs></base-breadcrumbs>
        <Nuxt />
    </div>
</template>

<script>
    
    import TheGeneratorHeader from "~/components/TheGeneratorHeader";
    export default {
        components: {
            TheGeneratorHeader
        }
    }
</script>
