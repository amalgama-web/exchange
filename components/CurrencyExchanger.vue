<template lang="pug">
    .currency-exchanger
        float-input.currency-exchanger__input(:value='value' @change="$emit('change', $event)" :disabled='disabled')
        currency-select(:list='list' :selected='selected' @select="$emit('select', $event)")
</template>

<script>
    export default {
        name: 'CurrencyExchanger',
        
        model: {
            prop: 'value',
            event: 'change'
        },
        props: [
            'value',
            'list',
            'selected',
            'disabled',
        ]
    }

</script>

<style lang="scss">
    .currency-exchanger {
        position: relative;
        padding-right: 100px;
        margin-bottom: 40px;
        
        &:last-child {
            margin-bottom: 0;
        }
        
        .currency-select {
            position: absolute;
            right: 0;
            top: 0;
        }
        
        &__input {
            height: 50px;
            border: 1px solid #bbb;
            outline: none !important;
            display: block;
            width: 100%;
            padding: 0 10px;
            border-radius: 5px 0 0 5px;
            
            font: inherit;
            transition: all linear 150ms;
            
            &:focus {
                border-color: darken(#bbb, 10%);
            }
            
            &[disabled] {
                background-color: #eee;
                cursor: not-allowed;
            }
        }
    }
</style>
