<template lang="pug">
    div
        .test-data
            p(v-for="message in messages" :class="message.status") {{message.text || message}}
        .l-container
            h2 navigator.clipboard/ClipboardJS
            p Скопированное значение {{oldRand}}
            p Новое значение для копирования {{newRand}}
            button.button.copy-button(@click="onClick" ref="button") Copy
            p Проверить результат:
            p
                input.test-input(ref="testInput")
</template>

<script>

import ClipboardJS from 'clipboard';

export default {
    meta: {
        ruName: 'Главная'
    },

    data() {
        return {
            messages: [],

            oldRand: null,
            newRand: Math.random(),

            clipboardInstance: null

        }
    },

    computed: {},

    methods: {
        onClick() {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(this.newRand)
                    .then(() => {
                        this.messages.push({text: 'navigator.clipboard success', status: 'ok'});
                        this.onSuccess();
                    }).catch(err => {
                        this.messages.push({text: 'navigator.clipboard fail', status: 'err'});
                    });
            }
        },

        initClipboardInstance() {
            this.clipboardInstance = new ClipboardJS(this.$refs.button, {
                text: () => String(this.newRand)
            });

            this.clipboardInstance.on('success', () => {
                this.onSuccess();
                this.messages.push({text: 'ClipboardJS copy success', status: 'ok'});
            });
        },

        onSuccess() {
            this.oldRand = this.newRand;
            this.newRand = Math.random();
            this.$refs.testInput.value = '';
        }
    },

    mounted() {
        this.messages.push('Welcome!');
        if (!navigator.clipboard) this.initClipboardInstance();

        (function() {
            let newElem = document.createElement("div");
            newElem.innerHTML = "test content";
            newElem.style.border = '1px solid red';
            newElem.style.background = 'orangered';
            newElem.style.zIndex = 2147483000;
            newElem.style.position = 'fixed';
            newElem.style.right = '0px';
            newElem.style.bottom = '0px';
            newElem.style.width = '200px';
            newElem.style.height = '200px';

            document.body.appendChild(newElem);
        })();
    },

    beforeDestroy() {
        console.log('destroy');
        if (this.clipboardInstance) this.clipboardInstance.destroy();
    }
}
</script>

<style lang="scss" scoped>
p {
    margin-bottom: 20px;
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
    padding: 0 10px;
}

.test-data {
    position: fixed;
    right: 0;
    top: 0;
    width: 200px;
    padding: 10px;

    font-size: 14px;
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
