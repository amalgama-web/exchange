import Vue from 'vue';

Vue.filter('currency', value => {
    console.log('filter', value);
    return value ?
        +value.toFixed(2) :
        0;
});
