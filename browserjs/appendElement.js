(function() {
    let newElem = document.createElement("div");
    newElem.innerHTML = "test content";
    newElem.style.border = '1px solid red';
    newElem.style.background = 'orangered';
    newElem.style.zIndex = 2147483000;
    newElem.style.position = 'fixed';
    newElem.style.right = '0px';
    newElem.style.bottom = '0px';
    newElem.style.width = '200px';
    newElem.style.height = '200px';

    document.body.appendChild(newElem);
})();