import Vue from 'vue';

Vue.filter('toFixed', (value, digitNumber = 2) => {
    return value ?
        +value.toFixed(digitNumber) :
        0;
});
