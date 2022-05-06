<template lang="pug">
    div.page-root
        .l-container.page-content
            .test-line(v-for="line in 10" @click="open") {{line}}
        .overlay(v-if="overlayOpen")
            .overlay__inner
                .l-container
                    .test-line._sm(v-for="line in 5" @click="close") {{line}}
</template>

<script>


export default {
    layout: 'simple',

    meta: {
        ruName: 'Главная'
    },

    data() {
        return {
            overlayOpen: false,
            bodyScroll: null,
        }
    },

    computed: {},

    methods: {
        open() {
            this.overlayOpen = true;
            this.$store.commit('setClass', ['overlay-open']);
        },

        close() {
            this.overlayOpen = false;
            this.$store.commit('setClass', []);
        }
    },

    mounted() {
    },

    beforeDestroy() {
    }
}
</script>

<style lang="scss">


.test-line {
    width: 100%;
    height: 100px;
    background-color: #808080;
    margin-bottom: 100px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
    font-size: 40px;
    line-height: 1;

}
.test-line:last-child {
    margin-bottom: 0;
}
.test-line._sm {
    background-color: rgba(143, 188, 143, 0.5);
    justify-content: flex-end;
}

.overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    background-color: rgba(0,0,0,.3);

    overflow: auto;
}

html.overlay-open {
    //overflow: hidden !important;
    //height: 100% !important;

    body {
        overflow: hidden !important;
        touch-action: none !important;
        //touch-action: none;
        //height: 100% !important;
    }

}

</style>
