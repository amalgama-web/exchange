import storePlugin from '~/plugins/store-plugin.js';

export default {
    plugins: [
        storePlugin
    ],

    state() {
        return {
            currencyList: [],
            currencyPairs: [],

            isDataStoredInAPI: false
        }
    },

    getters: {
        isDataGenerated(state) {
            return !!(state.currencyList.length && state.currencyPairs.length);
        },
        isDataStoredInAPI(state) {
            return state.isDataStoredInAPI;
        }
    },

    mutations: {
        setCurrencyList(state, payload) {
            state.currencyList = payload;
        },

        setCurrencyPairsList(state, payload) {
            state.currencyPairs = payload;
        },

        setApiStoredState(state, payload) {
            state.isDataStoredInAPI = payload;
        }
    },

    actions: {

        // todo transfer all manipulations with LS into store plugin
        setCurrencyList(context, payload) {
            context.commit('setCurrencyList', payload);
            localStorage.setItem('currencyList', JSON.stringify(payload));

            // remove old generated pairs
            context.commit('setCurrencyPairsList', []);
            localStorage.removeItem('currencyPairs');
        },

        setCurrencyPairsList(context, payload) {
            context.commit('setCurrencyPairsList', payload);
            localStorage.setItem('currencyPairs', JSON.stringify(payload));
        },

        setApiStoredState(context, payload) {
            context.commit('setApiStoredState', payload);
            localStorage.setItem('isDataStored', JSON.stringify(payload));
        },

        initStoreFromLS(context) {
            const currencyListData = localStorage.getItem('currencyList');
            const pairsListData = localStorage.getItem('currencyPairs');
            const isDataStored = localStorage.getItem('isDataStored');

            context.commit('setApiStoredState', JSON.parse(isDataStored) );

            if(!currencyListData) return;
            context.commit('setCurrencyList', JSON.parse(currencyListData) );

            if(!pairsListData) return;
            context.commit('setCurrencyPairsList', JSON.parse(pairsListData) );
        }
    },
}
