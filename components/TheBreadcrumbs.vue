<template lang="pug">
    .l-container
        ul.breadcrumbs(v-if="$route.path !== '/'")
            li.breadcrumbs__item
                nuxt-link(to='/')
                    | Главная
            li.breadcrumbs__item(v-for='route in routes' :key='route.name')
                nuxt-link(:to='route.path')
                    | {{route.meta.ruName}}
</template>

<script>
    export default {
        name: 'TheBreadcrumbs',

        computed: {
            routes() {
                return this.$route.matched;
            }
        },
    }
</script>

<style lang="scss">
    .breadcrumbs-container {
        padding-top: 30px;
        padding-bottom: 30px;
    }
    
    .breadcrumbs {
        display: flex;
        align-items: center;
        
        &__item {
            position: relative;
            padding-right: 30px;
            
            &:after {
                display: block;
                content: '>';
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-47%);
            }
            
            &:last-child:after {
                display: none;
            }
        }
        
        a.nuxt-link-exact-active {
            &:link {
                color: #272727;
            }
            
            &:visited {
                color: #272727;
            }
            
            &:hover {
                color: #272727;
            }
            
            &:active {
                color: #272727;
            }
            
            cursor: default;
        }
    }
</style>

