<template lang="pug">
    .currency-select
        .currency-select__selected(@click='toggle' :class="{'_open': isOpen}")
            | {{ selected ? selected : '-' }}
        ul.currency-select__list(v-show='isOpen')
            li.currency-select__item(v-for='currency in list' @click='select(currency)')
                | {{currency}}
</template>

<script>
    export default {
        name: 'CurrencySelect',

        props: [
            'list',
            'selected'
        ],
        
        data() {
            return {
                isOpen: false
            }
        },

        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
            },
            select(currency) {
                this.isOpen = false;
                this.$emit('select', currency);
            }
        }
    }
</script>

<style lang="scss">
    .currency-select {
        position: relative;
        height: 50px;
        width: 100px;
    
        &__selected {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            height: 50px;
            padding: 0 30px 0 14px;
    
            border-radius: 0 5px 5px 0;
            background-color: #5881ea;
    
            color: #fff;
    
            cursor: pointer;
            
            &:after {
                position: absolute;
                top: 12px;
                right: 17px;
                content: "▼";
                font-size: 16px;
            }
        }
        
        &__list {
            position: absolute;
            z-index: 1;
            top: 100%;
            left: 0;
            width: 100%;
            min-height: 50px;
            background-color: #f5f5f5;
            overflow: hidden;
            
            border-radius: 0 0 5px 5px;
            
            box-shadow: 0 3px 15px 0 rgba(0, 0, 0, .1);
        }
        
        &__item {
            display: block;
            padding: 5px 5px 5px 14px;
            cursor: pointer;
            
            &:hover {
                background-color: #5881ea;
                color: #fff;
            }
        }
    }

</style>
