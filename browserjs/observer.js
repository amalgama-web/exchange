(function() {
    let target = document.getElementsByTagName('body')[0];

    const config = {
        childList: true,
        subtree: true
    };

    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            console.log(mutation);

        }
    };

    const observer = new MutationObserver(callback);

    observer.observe(target, config);
})();
