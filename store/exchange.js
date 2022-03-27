export default {
    state() {
        return {
            baseCurAmount: null,
            baseCur: null,
            quoteCurAmount: null,
            quoteCur: null
        }
    },

    mutations: {
        confirmTransaction(state, payload) {
            state.baseCurAmount = payload.baseCurAmount;
            state.baseCur = payload.baseCur;
            state.quoteCurAmount = payload.quoteCurAmount;
            state.quoteCur = payload.quoteCur;
        }
    },

    actions: {
        confirmTransaction(context, payload) {
            context.commit('confirmTransaction', payload);
        }
    },
}
