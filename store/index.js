import storePlugin from '~/plugins/store-plugin.js';

export default {
    plugins: [
        storePlugin
    ],

    state() {
        return {
            currencyList: [],
            currencyPairs: [],
            currencyRates: []
        }
    },



    getters: {

    },
    mutations: {
        setCurrencyList(state, payload) {
            state.currencyList = payload;
        },

        setCurrencyPairs(state, payload) {
            state.currencyPairs = payload;
        },

        setCurrencyRates(state, payload) {
            state.currencyRates = payload;
        }
    },
    actions: {

        setCurrencyList(context, payload) {
            context.commit('setCurrencyList', payload);
            localStorage.setItem('currencyList', JSON.stringify(payload));
        },

        setCurrencyPairs(context, payload) {
            context.commit('setCurrencyPairs', payload);
            localStorage.setItem('currencyPairs', JSON.stringify(payload));
        },

        setCurrencyRates(context, payload) {
            context.commit('setCurrencyRates', payload);
            localStorage.setItem('currencyRates', JSON.stringify(payload));
        },

        setStateFromStorage(context) {
            const listData = localStorage.getItem('currencyList');
            const pairsData = localStorage.getItem('currencyPairs');
            const ratesData = localStorage.getItem('currencyRates');

            if(!listData) return;
            context.commit('setCurrencyList', JSON.parse(listData) );

            if(!pairsData) return;
            context.commit('setCurrencyPairs', JSON.parse(pairsData) );

            if(!ratesData) return;
            context.commit('setCurrencyRates', JSON.parse(ratesData) );
        }
    },
}
