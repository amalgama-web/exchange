<template lang="pug">
    div
        .test-data
            p(v-for="message in messages" :class="message.status") {{message.text || message}}
        .l-container
            h2 Добрый день! {{rand}}
            p
                button.button(@click="onClick") Копировать адрес
            p
                textarea.test-textarea

</template>

<script>

export default {
    meta: {
        ruName: 'Главная'
    },

    data() {
        return {
            messages: [],

            rand: Math.random(),

            messaginh: 'console'
        }
    },

    computed: {},

    methods: {
        onClick() {
            // this.messages.push('click');

            // if (navigator.clipboard) {
            //     this.messages.push('navigator.clipboard way');
            //     navigator.clipboard.writeText(this.rand)
            //         .then(() => {
            //             this.messages.push({text: 'navigator.clipboard success', status: 'ok'});
            //         }).catch(err => {
            //             this.messages.push({text: 'navigator.clipboard dont have permission', status: 'err'});
            //         });
            //
            //     return;
            // }

            // this.messages.push('fallback mode');

            let textArea = document.createElement('textarea');
            textArea.setAttribute('style', 'height: 1px; width:1px; border:0; opacity: 0; position: fixed;bottom: 0;right: 0;');
            document.body.appendChild(textArea);
            textArea.value = this.rand;
            textArea.select();

            try {
                let isCopied = document.execCommand('copy');
                // this.messages.push(isCopied);

                // if (isCopied) this.messages.push({text: 'execCommand success', status: 'ok'});
            } catch (err) {
            }
            setTimeout(() => {
                document.body.removeChild(textArea);
            }, 5000);
        },

        setMutationWatcher() {
            let target = document.getElementsByTagName('body')[0];

            // Конфигурация observer (за какими изменениями наблюдать)
            const config = {
                childList: true,
                subtree: true
            };

            // Колбэк-функция при срабатывании мутации
            const callback = function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    console.log(mutation);
                    if (mutation.type === 'childList') {
                        console.log('A child node has been added or removed.');
                    }
                }
            };

            // Создаём экземпляр наблюдателя с указанной функцией колбэка
            const observer = new MutationObserver(callback);

            // Начинаем наблюдение за настроенными изменениями целевого элемента
            observer.observe(target, config);

            // Позже можно остановить наблюдение
            // observer.disconnect();
        }
    },

    mounted() {
        // this.messages.push('welcome');

        this.setMutationWatcher();

    }
}
</script>

<style lang="scss" scoped>
p {
    margin-bottom: 20px;
}

textarea {
    display: block;
    width: 100%;
    height: 300px;
}

.test-data {
    position: fixed;
    left: 0;
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
