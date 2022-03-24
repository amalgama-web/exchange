const DB_URL = `https://exchangedb-44c34-default-rtdb.europe-west1.firebasedatabase.app`;

export default {
    currencyPairs(id = '') {
        return DB_URL + (id ? `/pairs/${id}.json` : `/pairs.json`);
    },

    currencyRates(id = '') {
        return DB_URL + (id ? `/rates/${id}.json` : `/rates.json`);
    },
}
