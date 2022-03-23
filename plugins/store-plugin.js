export default (store) => {
    if(process.client) {
        setTimeout(() => {
            store.dispatch('setCurrencyListsFromLS');
        });
    }
}
