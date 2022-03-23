
const DB_URL = `https://exchangedb-44c34-default-rtdb.europe-west1.firebasedatabase.app`;

export default {

    currencyPairs(id = '') {
        return DB_URL +
            `/pairs.json`;
    },

    currencyRates(id = '') {
        return DB_URL +
            `/rates.json`;
    },

}
