(function() {

    setTimeout(() => {
        let inputs = document.querySelectorAll('input');
        let textareas = document.querySelectorAll('textarea');
        inputs = Object.values(inputs);
        textareas = Object.values(textareas);
        let valuesInp = inputs.map(item => item.value);
        let valuesTa = textareas.map(item => item.value);
        console.log(valuesInp);
        console.log(valuesTa);
    }, 1000);

})();