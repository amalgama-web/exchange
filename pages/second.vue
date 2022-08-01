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

    computed: {},

    created() {
        // tags slug
        // this.$axios.$get('http://localhost:2368/ghost/api/content/tags/slug/news/', {
        //     params: {
        //         key: '8527e622811a90d032c2c4c8fe',
        //         slug: 'news'
        //     }
        // });

        // author info
        // this.$axios.$get('http://localhost:2368/ghost/api/content/authors/slug/amalgama/', {
        //     params: {
        //         key: '8527e622811a90d032c2c4c8fe',
        //         include: 'count.posts',
        //     }
        // });

        // todo если нет фильтра publications то добавить в минус его

        const params = {
            key: '8527e622811a90d032c2c4c8fe',
            include: 'tags,authors',
            fields: 'title,published_at,feature_image,primary_tag,slug',
            filter: 'tag:publications'
        };


        if (params.filter) {
            if (!params.filter.includes('tag:publications')) {
                console.log('filter exist and it not includes tag:publications');
                // add excluding filter for publications
                params.filter += '+tag:-publications'
            }
        } else {
            params.filter = 'tag:-publications';
        }

        console.log('params');
        console.log(params);

        // posts not pubclications tag
        this.$axios.$get('http://localhost:2368/ghost/api/content/posts/', {
            params
        });

        // all tags
        // todo удалять publication tag
        // this.$axios.$get('http://localhost:2368/ghost/api/content/tags/', {
        //     params: {
        //         key: '8527e622811a90d032c2c4c8fe',
        //     }
        // });


    }
}
</script>

<style lang="scss">
.info-section {
    margin-bottom: 40px;
}

</style>
