import storePlugin from '~/plugins/store-plugin.js';

export default {
    plugins: [
        storePlugin
    ],

    state() {
        return {
            currencyList: [],
            currencyPairs: [],

            apiPairsEndpoint: null,
            apiRatesEndpoint: null
        }
    },

    getters: {
        isGeneratedDataReady(state) {
            return !!(state.currencyList.length && state.currencyPairs.length);
        },

        isEndpointsCreated(state) {
            return !!(state.apiPairsEndpoint && state.apiRatesEndpoint);
        }
    },

    mutations: {
        setCurrencyList(state, payload) {
            state.currencyList = payload;
        },

        setCurrencyPairsList(state, payload) {
            state.currencyPairs = payload;
        },

        setPairsEndpoint(state, payload) {
            state.apiPairsEndpoint = payload;
        },

        setRatesEndpoint(state, payload) {
            state.apiRatesEndpoint = payload;
        }
    },

    actions: {

        setCurrencyList(context, payload) {
            context.commit('setCurrencyList', payload);
            localStorage.setItem('currencyList', JSON.stringify(payload));

            // remove old generated pairs and endpoints
            context.commit('setCurrencyPairsList', []);
            context.commit('setPairsEndpoint', null);
            context.commit('setRatesEndpoint', null);
            localStorage.removeItem('currencyPairs');
            localStorage.removeItem('apiPairsEndpoint');
            localStorage.removeItem('apiRatesEndpoint');
        },

        setCurrencyPairsList(context, payload) {
            context.commit('setCurrencyPairsList', payload);
            localStorage.setItem('currencyPairs', JSON.stringify(payload));
        },

        initStoreFromLS(context) {
            const currencyListData = localStorage.getItem('currencyList');
            const pairsListData = localStorage.getItem('currencyPairs');

            const apiPairsEndpoint = localStorage.getItem('apiPairsEndpoint');
            const apiRatesEndpoint = localStorage.getItem('apiRatesEndpoint');

            if(apiPairsEndpoint && apiRatesEndpoint) {
                context.commit('setPairsEndpoint', JSON.parse(apiPairsEndpoint));
                context.commit('setRatesEndpoint', JSON.parse(apiRatesEndpoint));
            }

            if(!currencyListData) return;
            context.commit('setCurrencyList', JSON.parse(currencyListData) );

            if(!pairsListData) return;
            context.commit('setCurrencyPairsList', JSON.parse(pairsListData) );
        },

        setPairsEndpoint(context, payload) {
            context.commit('setPairsEndpoint', payload);
            localStorage.setItem('apiPairsEndpoint', JSON.stringify(payload));
        },

        setRatesEndpoint(context, payload) {
            context.commit('setRatesEndpoint', payload);
            localStorage.setItem('apiRatesEndpoint', JSON.stringify(payload));
        },

    },
}
