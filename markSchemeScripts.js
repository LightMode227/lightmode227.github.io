// decrement value
function decrement(button){
    let inputs = document.getElementsByClassName(button.className);
    let currentValue = (inputs[1]).value;
    if (currentValue === null || currentValue <= 0){
        currentValue = 0;
    } else{
        currentValue--;
    }
    (inputs[1]).value = currentValue;
}

// increment value
function increment(button){
    let inputs = document.getElementsByClassName(button.className);
    let currentValue = (inputs[1]).value;
    if (currentValue === null){
        currentValue = 0;
    } else{
        currentValue++;
    }
    (inputs[1]).value = currentValue;
}