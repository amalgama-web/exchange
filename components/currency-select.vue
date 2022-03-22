<template>
    <div class="currency-select">
        <div @click="toggle"
             class="currency-select__selected"
        >
            {{ selected ? selected : '-' }}
        </div>
        <ul v-show="isOpen"
            class="currency-select__list"
        >
            <li v-for="currency in currencyList"
                @click="select(currency)"
                class="currency-select__item"
            >
                <span v-if="!isDisabled(currency)"
                      class="currency-select__item-inner"
                >
                    {{currency}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['currencyList', 'disabledList'],
        data() {
            return {
                isOpen: false,
                selected: null
            }
        },

        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
            },
            select(currency) {
                this.isOpen = false;
                this.selected = currency;
                this.$emit('currency-select', currency);
            },
            isDisabled(currency) {
                return this.disabledList.includes(currency);
            }
        }
    }
</script>

<style lang="scss">
    .currency-select {
        position: relative;
        height: 50px;
        width: 70px;
        
        &__selected {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 50px;
            border-radius: 0 5px 5px 0;
            
            background-color: #5881ea;
            color: #fff;
            
            cursor: pointer;
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
            text-align: center;
            cursor: pointer;
            
            &:hover {
                background-color: #5881ea;
                color: #fff;
            }
        }
        &__item-inner {
            display: block;
            padding: 5px;
        }
    }

</style>
