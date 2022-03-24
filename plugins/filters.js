import Vue from 'vue';

Vue.filter('toFixed', (value, digitNumber = 2) => {
    console.log('filter', value);
    return value ?
        +value.toFixed(digitNumber) :
        0;
});
