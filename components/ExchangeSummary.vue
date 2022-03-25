<template>
    <div class="exchange-summary">
        <div class="exchange-summary__row">
            <div class="exchange-summary__cell">Вы платите</div>
            <div class="exchange-summary__cell">{{ baseCurAmount | toFixed }} {{ baseCur }}</div>
        </div>
        <div class="exchange-summary__row">
            <div class="exchange-summary__cell">Вы получаете</div>
            <div class="exchange-summary__cell">{{ quoteCurAmountFinal | toFixed }} {{ quoteCur }}</div>
        </div>
        <div class="exchange-summary__row">
            <div class="exchange-summary__cell">Комиссия</div>
            <div class="exchange-summary__cell"> {{ commissionAmount | toFixed }} {{ quoteCur }}</div>
        </div>
        <div class="exchange-summary__row">
            <div class="exchange-summary__cell">Комиссия %</div>
            <div class="exchange-summary__cell">{{ commissionText }}</div>
        </div>
        <div class="exchange-summary__row">
            <div class="exchange-summary__cell">Курс</div>
            <div class="exchange-summary__cell">1 {{ baseCur }} = {{ rate | toFixed(8)  }} {{ quoteCur }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ExchangeSummary',

        props: [
            'baseCur',
            'quoteCur',
            'baseCurAmount',
            'quoteCurAmountFinal',
            'commissionAmount',
            'commissionText',
            'rate'
        ]
        
    }

</script>

<style lang="scss">
    .exchange-summary {
        position: relative;
        &__row {
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            margin-bottom: 10px;
            border-bottom: 1px dotted #aaaaaa;
            
            &._sm {
                font-size: 14px;
                color: #aaaaaa;
                margin-bottom: 5px;
            }
        }
        &__cell {
            background-color: #fff;
            position: relative;
            top: 9px;
            
            &:first-child {
                padding-right: 5px;
            }
            &:last-child {
                padding-left: 5px;
            }
        }
    }
</style>
