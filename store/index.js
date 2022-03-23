import storePlugin from '~/plugins/store-plugin.js';

export default {
    plugins: [
        storePlugin
    ],

    state() {
        return {
            currencyList: [],
            currencyPairs: []
        }
    },

    getters: {
        isGeneratedDataReady(state) {
            return !!(state.currencyList.length && state.currencyPairs.length);
        }
    },

    mutations: {
        setCurrencyList(state, payload) {
            state.currencyList = payload;
        },

        setCurrencyPairs(state, payload) {
            state.currencyPairs = payload;
        }
    },

    actions: {

        setCurrencyList(context, payload) {
            context.commit('setCurrencyList', payload);
            localStorage.setItem('currencyList', JSON.stringify(payload));

            // remove old generated pairs
            context.commit('setCurrencyPairs', []);
            localStorage.removeItem('currencyPairs');
        },

        setCurrencyPairs(context, payload) {
            context.commit('setCurrencyPairs', payload);
            localStorage.setItem('currencyPairs', JSON.stringify(payload));
        },

        setCurrencyListsFromLS(context) {
            const listData = localStorage.getItem('currencyList');
            const pairsData = localStorage.getItem('currencyPairs');

            if(!listData) return;
            context.commit('setCurrencyList', JSON.parse(listData) );

            if(!pairsData) return;
            context.commit('setCurrencyPairs', JSON.parse(pairsData) );

        },

    },
}
