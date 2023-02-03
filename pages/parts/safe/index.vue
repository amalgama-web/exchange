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
                poster="/preloader/safe.png"
            )
                source(
                    :src="'https://cdn.coinloan.io/landing/safe.webm'"
                    type="video/webm"
                )
        div.section__item
            h4 mov hevc
            video(
                ref="video"
                autoplay
                muted
                loop
                playsinline
                width="100"
                height="100"
                poster="/preloader/safe.png"
            )
                source(
                    :src="'https://cdn.coinloan.io/landing/safe.mov'"
                    type="video/quicktime"
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
                poster="/preloader/safe.png"
            )
                source(
                    :src="'https://cdn.coinloan.io/landing/safe.mov'"
                    type="video/quicktime"
                )
                source(
                    :src="'https://cdn.coinloan.io/landing/safe.webm'"
                    type="video/webm"
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