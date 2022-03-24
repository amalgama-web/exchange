export default (store) => {
    if(process.client) {
        setTimeout(() => {
            store.dispatch('setDataFromLS');
            console.log('store plugin dispatch');
        });
    }
}
