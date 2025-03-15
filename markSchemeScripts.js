// increment value
function textValue(inputClass, amount){
    let inputs = document.getElementsByClassName(inputClass);
    let currentValue = parseInt((inputs[1]).value);
    if (currentValue === null){
        currentValue = 0;
    } else if (currentValue == 0 && amount < 0) {
        currentValue = 0;
    } else{
        currentValue +=  parseInt(amount);
    }
    (inputs[1]).value = currentValue;
}

//change value of tick box
function changeValue(tickBox, sectionClass){
    if (tickBox.value != "1"){
        tickBox.value = 1;
    } else{
        tickBox.value = -1;
    }
    textValue(sectionClass, tickBox.value)
}