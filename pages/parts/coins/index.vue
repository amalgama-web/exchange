<template lang="pug">
    .section
        div.section__item
            h4 webm
            video(
                ref="video"
                autoplay
                muted
                loop
                playsinline
                width="100"
                height="100"
                poster="/preloader/coins.jpg"
            )
                source(
                    :src="'https://cdn.coinloan.io/landing/coins.webm'"
                    type="video/webm"
                )
        div.section__item
            h4 mp4
            video(
                ref="video"
                autoplay
                muted
                loop
                playsinline
                width="100"
                height="100"
                poster="/preloader/coins.jpg"
            )
                source(
                    :src="'https://cdn.coinloan.io/landing/coins.mp4'"
                    type="video/mp4"
                )
        div.section__item
            h4 both
            video(
                ref="video"
                autoplay
                muted
                loop
                playsinline
                width="100"
                height="100"
                poster="/preloader/coins.jpg"
            )
                source(
                    :src="'https://cdn.coinloan.io/landing/coins.webm'"
                    type="video/webm"
                )
                source(
                    :src="'https://cdn.coinloan.io/landing/coins.mp4'"
                    type="video/mp4"
                )



</template>

<script>
export default {
    data() {
        return {}
    },

    computed: {},

    methods: {},

    components: {},
}
</script>