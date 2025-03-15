//add days to the week
let week = document.getElementsByClassName("days");
let today = new Date();
let dayNum = today.getDate();
for (i = 0; i < 7; i++){

    //create new day
    day = document.createElement("DIV");
    day.setAttribute("class", "day");

    //add functions for creating slot
    day.addEventListener("mousedown", function(event) {
        addSlot(this, event);
    });

    day.addEventListener("mousemove", function(event) {
        sizeSlot(this, event);
    });

    day.addEventListener("mouseup", function(event) {
        endSlot(this, event);
    });

    //set day number and add to calendar
    day.innerHTML = dayNum + i;
    (week[0]).appendChild(day);
}



//add time slot
var newSlot, currentDay, lastY
function addSlot(day, event){
    let startPosition = event.offsetY;
    slot = document.createElement("div");
    slot.setAttribute("class", "slot");
    slot.style.top = startPosition-startPosition%20;
    slot.style.height = 0;
    day.appendChild(slot);
    newSlot = true; //update global variable to show a new slot has been created
    currentDay = day;
    lastY = event.offsetY; //update mouse initial position
}

//set size of time slot
function sizeSlot(day, event){
    if (newSlot && day === currentDay){ //only run this if there is a new slot and in the correct day
        
        //get position of mouse and slot
        let newRelativePosition = event.offsetY;
        let daySlots = day.children;
        let slot = daySlots[daySlots.length-1]

        if(day === event.target || slot === event.target){ //check if the mouse is over itself or the day
            if (newRelativePosition-lastY > 20){ 
                slot.style.height = parseInt(slot.style.height) + 20 + 'px'; //increment height by 10
                lastY = newRelativePosition; //update Y
            } else if (newRelativePosition-lastY < 0 && parseInt(slot.style.height) === 20){ //when it goes negative remove it
                slot.style.height = parseInt(slot.style.height) - 20 + 'px';
            } else if (newRelativePosition-lastY < -20){
                slot.style.height = parseInt(slot.style.height) - 20 + 'px'; //decrement height by 10
                lastY = newRelativePosition; //update Y
            }
        } else{ //if the mouse is over another slot end it
            console.log(newRelativePosition, lastY);
            if (newRelativePosition < 0){ //check if it is now relative to a new element
                slot.style.height = parseInt(slot.style.height) + 20 + 'px'; //size it to meet slot if it's above a slot
            } else{
                slot.style.height = parseInt(slot.style.height) - 20 + 'px'; //remove it if it's below a slot
            }
            endSlot(day,event);
        }
    } else{
        endSlot(day,event);
    }
}

function endSlot(day, event){
    if (newSlot && day === currentDay){
        //get slot
        let daySlots = day.children;
        let slot = daySlots[daySlots.length-1]

        //make sure it's not too small
        if (parseInt(slot.style.height) > 0){ 

            //prevent creation of new DIV on mouse down
            slot.addEventListener('mousedown', function(e){
                e.stopPropagation();
            });

            //prevent creation of new DIV on mouse up
            slot.addEventListener('mouseup', function(e){
                e.stopPropagation();
            });

            //open the menu on click
            slot.addEventListener('click', function(e){
                e.stopPropagation();
                slot.style.background = '#0084ff';
            });
        } else{
            slot.remove(); //remove slot if it is too small
        }
    }
    newSlot = false; //make sure to flag that there are no new slots (prevents creation while over existing one)
}
