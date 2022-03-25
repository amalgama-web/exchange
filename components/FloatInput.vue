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
        name: 'FloatInput',
        
        model: {
            prop: 'value',
            event: 'change'
        },

        props: {
            'value': Number,
            'disabled': Boolean,
        },

        methods: {
            onInput(e) {
                let newValue = e.target.value.replace(/[^\d.]|^\./g, '');
                let matchDot = newValue.match(/\./g);
                if(matchDot && matchDot.length > 1) {
                    const dotPos = newValue.indexOf('.');
                    newValue = newValue.replace(/\./g, '');
                    newValue = `${newValue.slice(0, dotPos)}.${newValue.slice(dotPos)}`;
                }
                e.target.value = newValue;
            },
        },
    }
</script>

<style lang="scss">

</style>
