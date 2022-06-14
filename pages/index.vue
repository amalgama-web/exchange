<template lang="pug">
    .l-container

        .modal(v-if="modalIsOpen1")
            .modal__inner
                .modal__body
                    button(@click="toggleModal") close
                    br
                    | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore ex, excepturi exercitationem fuga hic ipsam iste libero magni molestias nam natus quisquam ratione reiciendis, reprehenderit, saepe sint totam voluptatem?
                    | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore ex, excepturi exercitationem fuga hic ipsam iste libero magni molestias nam natus quisquam ratione reiciendis, reprehenderit, saepe sint totam voluptatem?
                    | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore ex, excepturi exercitationem fuga hic ipsam iste libero magni molestias nam natus quisquam ratione reiciendis, reprehenderit, saepe sint totam voluptatem?
                    input(type="text" v-model="text")
                    | enter text: {{text}}

        .modal2(v-if="modalIsOpen2")
            .modal2__body
                button(@click="toggleModal") close
                br
                | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore ex, excepturi exercitationem fuga hic ipsam iste libero magni molestias nam natus quisquam ratione reiciendis, reprehenderit, saepe sint totam voluptatem?
                | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore ex, excepturi exercitationem fuga hic ipsam iste libero magni molestias nam natus quisquam ratione reiciendis, reprehenderit, saepe sint totam voluptatem?
                | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore ex, excepturi exercitationem fuga hic ipsam iste libero magni molestias nam natus quisquam ratione reiciendis, reprehenderit, saepe sint totam voluptatem?
                | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore ex, excepturi exercitationem fuga hic ipsam
                input(type="text" v-model="text")
                | enter text: {{text}}

        p(@click="toggleModal")
            | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eaque eligendi excepturi exercitationem expedita impedit maiores modi molestiae nisi odit, placeat provident repudiandae saepe sit temporibus? Molestias necessitatibus odio veniam!
            | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eaque eligendi excepturi exercitationem expedita impedit maiores modi molestiae nisi odit, placeat provident repudiandae saepe sit temporibus? Molestias necessitatibus odio veniam!
            | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eaque eligendi excepturi exercitationem expedita impedit maiores modi molestiae nisi odit, placeat provident repudiandae saepe sit temporibus? Molestias necessitatibus odio veniam!
            | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eaque eligendi excepturi exercitationem expedita impedit maiores modi molestiae nisi odit, placeat provident repudiandae saepe sit temporibus? Molestias necessitatibus odio veniam!


</template>

<script>

    export default {
        meta: {
            ruName: 'Главная'
        },

        data() {
            return {
                modalIsOpen1: false,
                modalIsOpen2: false,
                text: ''
            }
        },

        computed: {
            isGeneratedDataReady() {
                return this.$store.getters.isGeneratedDataReady;
            },
            
            isEndpointsCreated() {
                return this.$store.getters.isEndpointsCreated;
            },
            
            apiPairsEndpoint() {
                return this.$store.state.apiPairsEndpoint;
            },

            apiRatesEndpoint() {
                return this.$store.state.apiRatesEndpoint;
            },
        },

        methods: {
            toggleModal() {
                this.modalIsOpen2 = !this.modalIsOpen2;
            },
        }


    }
</script>

<style lang="scss">
    .info-section {
        margin-bottom: 40px;
    }

    .modal {
        position: fixed;
        width: 100%;
        height: 100%;

        left: 0;
        top: 0;

        overflow: auto;

        &__inner {
            width: 100%;
            min-height: 100%;
            padding: 15px;
            background-color: rgba(0,0,0,.4);

            display: flex;
            justify-content: center;
            align-items: center;
        }
        &__body {
            padding: 30px;
            background-color: #fff;
            border-radius: 10px;
            max-width: 450px;
            input {
                display: block;
                width: 100%;
                height: 40px;
                padding: 0 10px;
            }
        }
    }

    .modal2 {
        position: fixed;
        width: 100%;
        height: 100%;

        left: 0;
        top: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(0,0,0,.4);
        }


        &__body {
            position: relative;
            padding: 30px;
            background-color: #fff;
            border-radius: 10px;
            width: 450px;
            max-width: calc(100% - 30px);


            max-height: 100%;

            overflow: auto;
            input {
                display: block;
                width: 100%;
                height: 40px;
                padding: 0 10px;
            }
        }
    }


</style>
