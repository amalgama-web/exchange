<template lang="pug">
    div
        .test-data
            p(v-for="message in messages" :class="message.status") {{message.text || message}}
        .l-container
            h2 Добрый день!
            p Скопированное значение {{oldRand}}
            p Новое значение для копирования {{newRand}}
            .button-wrap
                .input-hidden-wrap
                    input.input-hidden(ref="input")
                button.button(@click="onClick") Copy
            p Проверить результат:
            p
                input.test-input(ref="input")
</template>

<script>
export default {
    meta: {
        ruName: 'Главная'
    },

    data() {
        return {
            messages: [],

            oldRand: null,
            newRand: Math.random(),

        }
    },

    computed: {},

    methods: {
        onClick() {
            if (navigator.clipboard) {
                this.messages.push('navigator.clipboard mode');
                navigator.clipboard.writeText(this.newRand)
                    .then(() => {
                        this.messages.push({text: 'navigator.clipboard success', status: 'ok'});
                        this.onSuccess();
                    }).catch(err => {
                    this.messages.push({text: 'navigator.clipboard dont have permission', status: 'err'});
                    this.fallbackMode();
                });
                return;
            }

            this.fallbackMode();
        },

        fallbackMode() {
            this.messages.push('fallback mode');

            let input = this.$refs.input;

            input.value = this.newRand;

            input.select();

            try {
                let isCopied = document.execCommand('copy');

                if (isCopied) this.messages.push({text: 'execCommand success', status: 'ok'});

                this.onSuccess();
            } catch (err) {
                this.messages.push({text: 'execCommand error', status: 'err'})
            }
        },

        onSuccess() {
            this.oldRand = this.newRand;
            this.newRand = Math.random();
            this.$refs.input.value = '';
        }
    },

    mounted() {
        this.messages.push('Welcome!');
    }
}
</script>

<style lang="scss" scoped>
p {
    margin-bottom: 20px;
}

.button-wrap {
    position: relative;
    width: 40px;
    height: 40px;
}

.button {
    width: 80px;
    height: 40px;
}

.input-hidden-wrap {
    position: absolute;
    overflow-x: hidden;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0px;
}

.input-hidden {
    height: 40px;
    width: 50px;
    position: absolute;
    top: 5px;
    left: 0;

    opacity: 0;
    //    display: none;
    //    visibility: hidden;
}

.test-input {
    display: block;
    width: 100%;
    height: 40px;
}

.test-data {
    position: fixed;
    right: 0;
    top: 0;
    width: 200px;
    padding: 10px;

    font-size: 12px;
    background-color: fade-out(#272727, 0.2);
    color: #fff;

    p {
        margin: 0;

        &.ok {
            color: greenyellow;
        }

        &.err {
            color: orangered;
        }
    }
}
</style>
