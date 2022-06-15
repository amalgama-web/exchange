<template lang="pug">
    .l-container
        nuxt-link(to='/generator') Генератор
        h2 Страница для тестов
        speedkit-picture.test-img(v-bind="imageConfig" crossorigin="anonymous")
        img.test-img(src="@/assets/img/test.jpeg")
        img.test-img(src="https://s3-eu-west-1.amazonaws.com/coinloan-blog-assets/2022/06/BLOG--1--1.png")




</template>

<script>
import SpeedkitPicture from 'nuxt-speedkit/components/SpeedkitPicture';

export default {
    components: {
        SpeedkitPicture
    },

    meta: {
        ruName: 'Главная'
    },

    computed: {
        imageConfig() {
            return {
                alt: 'test image',
                title: 'test image',
                sources: [
                    {
                        format: 'png',
                        sizes: [{
                            width: 100,
                            url: 'https://s3-eu-west-1.amazonaws.com/coinloan-blog-assets/2022/06/BLOG-LETTER--6-.png',
                        }],
                        customSizes: '(min-width: 720px) 720px',
                    },
                ],
                placeholders: [
                    {
                        format: 'svg',
                        url: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAxNS43Ij4KICAgIDxyZWN0CiAgICAgICAgd2lkdGg9IjMwIgogICAgICAgIGhlaWdodD0iMTUuNyIKICAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2Y0ZjhmZDsiCiAgICAvPgo8L3N2Zz4K'
                    },
                ],
            }
        }
    }


}
</script>

<style lang="scss" scoped>
.test-img {
    max-width: 300px;
    max-height: 200px;
}
    .info-section {
        margin-bottom: 40px;

    }
    
</style>
