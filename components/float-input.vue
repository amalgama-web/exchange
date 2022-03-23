<template>
    <input type="text"
           @input="onInput"
           :value="value"
           @change="$emit('change', +$event.target.value)"
           :disabled="disabled"
    >
</template>

<script>
    export default {
        model: {
            prop: 'value',
            event: 'change'
        },

        props: {
            'value': Number,
            'disabled': Boolean,
        },

        data() {
            return {}
        },

        methods: {
            onInput(e) {
                // todo продумать лучший вариант для float
                let newValue = e.target.value.replace(/[^\d.]|^\./g, '');
                let matchDot = newValue.match(/\./g);
                if (newValue && newValue[newValue.length - 1] !== '.' || matchDot && matchDot.length > 1) {
                    newValue = parseFloat(newValue);
                }
                e.target.value = newValue;
            },
        }
    }
</script>

<style lang="scss">

</style>
