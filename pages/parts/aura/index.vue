<template lang="pug">
    .section
        div.section__item
            h4 wepm format
            video(
                ref="video"
                autoplay
                muted
                loop
                playsinline
                width="100"
                height="100"
                poster="http://f0760232.xsph.ru/video/safe.png"
            )
                source(
                    src="http://f0760232.xsph.ru/video/careers-aura.webm"
                    type="video/webm"
                )
        div.section__item
            h4 mp4 format
            video(
                ref="video"
                autoplay
                muted
                loop
                playsinline
                width="100"
                height="100"
                poster="http://f0760232.xsph.ru/video/safe.png"
            )
                source(
                    src="http://f0760232.xsph.ru/video/careers-aura.mp4"
                    type="video/mp4;codecs=hvc1'"
                )
        div
            h4 Both webm mp4
            video(
                ref="video"
                autoplay
                muted
                loop
                playsinline
                width="100"
                height="100"
                poster="http://f0760232.xsph.ru/video/safe.png"
            )
                source(
                    src="http://f0760232.xsph.ru/video/careers-aura.mp4"
                    type="video/mp4;codecs=hvc1'"
                )
                source(
                    src="http://f0760232.xsph.ru/video/careers-aura.webm"
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