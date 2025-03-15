//add time slot
var newSlot
function addSlot(day, event){
    let startPosition = event.offsetY;
    slot = document.createElement("div");
    slot.setAttribute("class", "slot");
    slot.style.top = startPosition;
    day.appendChild(slot);
    newSlot = true; //update global variable to show a new slot has been created
}

//set size of time slot
function endSlot(day, event){
    if (newSlot){ //only run this if there is a new slot

        //get position of mouse and slot
        let newRelativePosition = event.offsetY;
        let daySlots = day.children;
        let slot = daySlots[daySlots.length-1]
        
        //make sure it's not too small
        if (newRelativePosition-parseInt(slot.style.top) > 20){ 
            slot.style.height = newRelativePosition-parseInt(slot.style.top); //set the height to top to new mouse position

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
        newSlot = false; //make sure to flag that there are no new slots (prevents creation while over existing one)
    }
}