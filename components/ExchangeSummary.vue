<template lang="pug">
    .exchange-summary
        .exchange-summary__row
            .exchange-summary__cell Вы платите
            .exchange-summary__cell {{ baseCurAmount | toFixed }} {{ baseCur }}
        .exchange-summary__row
            .exchange-summary__cell Вы получаете
            .exchange-summary__cell {{ quoteCurAmountFinal | toFixed }} {{ quoteCur }}
        .exchange-summary__row
            .exchange-summary__cell Комиссия
            .exchange-summary__cell  {{ commissionAmount | toFixed }} {{ quoteCur }}
        .exchange-summary__row
            .exchange-summary__cell Комиссия %
            .exchange-summary__cell {{ commissionText }}
        .exchange-summary__row
            .exchange-summary__cell Курс
            .exchange-summary__cell 1 {{ baseCur }} = {{ rate | toFixed(8)  }} {{ quoteCur }}
</template>

<script>
    export default {
        name: 'ExchangeSummary',

        // todo transfer array with paris title-description
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
