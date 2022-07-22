<template lang="pug">
    .l-container.test-section
        h1 Главная
        p
            nuxt-link(:to="{ path: 'second', hash: 'id-02'}") Anchor to second page #2
        p
            nuxt-link(:to="{ path: 'second', hash: 'id-04'}") Anchor to second page #4
        - var k = 0
            while k++ < 5
                div
                    h1(id="id-0" + k) Заголовок #{k}
                    - var n = 0;
                    while n++ < 20
                        | Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid blanditiis consectetur culpa delectus earum id illo incidunt nam nesciunt nobis quaerat qui quia quis quo rerum saepe unde, voluptate.

</template>

<script>

    export default {
        meta: {
            ruName: 'Главная'
        },

        computed: {
        }


    }
</script>

<style lang="scss">
.test-section {
    h1 {
        margin-top: 30px;
    }
}
</style>
