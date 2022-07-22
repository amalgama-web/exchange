<template lang="pug">
    .l-container
        h2 Вторая страница
        nuxt-link(to="/") main page

</template>

<script>

export default {
    meta: {
        ruName: 'Главная'
    },

    computed: {
    },

    created() {
        this.$axios.$get('http://localhost:2368/ghost/api/content/posts/?key=8527e622811a90d032c2c4c8fe', {
            params: {
                include: 'tags,authors',
                fields: 'title,published_at,feature_image,primary_tag,slug',
                filter: 'tag:-publications'
            },
        });

    }
}
</script>

<style lang="scss">
.info-section {
    margin-bottom: 40px;
}

</style>
