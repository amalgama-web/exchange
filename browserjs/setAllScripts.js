(function() {

    setTimeout(() => {
        let elems = document.querySelectorAll('script');
        elems = Object.values(elems);
        let scripts = elems.map(item => item.src);
        console.log(scripts);
        scripts.map(item => console.log(item));
    }, 1000);

})();