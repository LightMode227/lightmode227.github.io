
  /* Drop down list */
  var customSelect, i, j, numSelects, numOptions, selectElement, selectedDiv, optionsDiv, optionDiv;
  customSelect = document.getElementsByClassName("customSelect"); /* find custom selects */
  numSelects = customSelect.length;
  
  for (i = 0; i < numSelects; i++) { /* loop through each custom select to create a DIV for it */
    selectElement = customSelect[i].getElementsByTagName("select")[0];
    numOptions = selectElement.length;
    selectedDiv = document.createElement("DIV");
    selectedDiv.setAttribute("class", "selectSelected"); /* create a DIV for the selected option at top */
    selectedDiv.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML; /* put the selected option in the div */
    customSelect[i].appendChild(selectedDiv); /* put the custom select in the DIV */ 
    optionsDiv = document.createElement("DIV"); /* create a DIV for the option list */
    optionsDiv.setAttribute("class", "selectItems selectHide");
    
    for (j = 1; j < numOptions; j++){
      optionDiv = document.createElement("DIV"); /* create a DIV for each option */
      optionDiv.innerHTML = selectElement.options[j].innerHTML;
      
      optionDiv.addEventListener("click", function(e){ /* When item is clicked update selected option at top  - don't fully understand this function*/
        var y, i, k, custom, selectedItem, numSels, yLength;
        custom = this.parentNode.parentNode.getElementsByTagName("select")[0];
        numSels = custom.length;
        selectedItem = this.parentNode.previousSibling;
        
        for (i = 0; i < numSels; i++){
          if (custom.options[i].innerHTML == this.innerHTML){
            custom.selectedIndex = i;
            selectedItem.innerHTML = this.innerHTML; /* maybe h is the selected option displayed at top*/
            y = this.parentNode.getElementsByClassName("sameAsSelected");
            yLength = y.length;
            
            for (k = 0; k < yLength; k++){
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "sameAsSelected");
            break;
          }
        }
        selectedItem.click();
      });
      optionsDiv.appendChild(optionDiv); /* add the option to the option list */
    }
    customSelect[i].appendChild(optionsDiv); /* add the option list to the custom select */
    selectedDiv.addEventListener("click", function(e) { // when the custom select is clicked open it and close others
      e.stopPropagation();
      closeCalendars()
      closeAllSelect(this);
      this.nextSibling.classList.toggle("selectHide");
    });
  }

   function closeCalendars(){ /* closes all calendars  in a document */
          if (calendar){
            calendar.classList.add("calendarHide");
          }
        }
  
    function closeAllSelect(element){ /* closes all select boxes in a document */
      var options, selectedOption , i, numOptions, selectedOptionLength, arrNo = [];
      options = document.getElementsByClassName("selectItems");
      selectedOption = document.getElementsByClassName("selectSelected");
      numOptions = options.length;
      selectedOptionLength = selectedOption.length;
      
      for (i = 0; i < selectedOptionLength; i++) {
        if (element == selectedOption[i]) {
          arrNo.push(i);
        } else {
        }
      }
      for (i = 0; i < numOptions; i++) {
        if (!arrNo.includes(i)) {
          options[i].classList.add("selectHide");
        }
      }
    }



  /* Custom dateTime select */
// THERE IS NOT FULL SUPPORT FOR MULTIPLE CALENDARS MOSTLY TO DO WITH CLICKING FUNCTIONS

  var customDateTime, numCustomDateTime, calendar, calendarIcon, calendarDates, date, month, number, today, dd, mm, wd, yyyy, offset, prevmm, dayStart, selectedDay;
  customDateTime = document.getElementsByClassName("CustomDateTime");
  numCustomDateTime = customDateTime.length;
  calendarIcon = document.getElementsByClassName("calendarIcon");
  
  function daysInMonth (month, year) {
    return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
  }
  
  today = new Date();
  dd = String(today.getDate()).padStart(2, '0');
  mm = String(today.getMonth() + 1).padStart(2, '0');
  yyyy = today.getFullYear();
  wd = today.getDay();
  if (wd === 0){
    wd = 7;
  }
  offset = Math.abs(wd-(dd%7))-1;
  prevmm = daysInMonth(mm-2,yyyy);

  //setup calendar div for each custom date time
  for (i = 0; i < numCustomDateTime; i++){

    //create a calendar DIV
    calendar = document.createElement("DIV");
    calendar.setAttribute("class","calendar");
    customDateTime[i].appendChild(calendar);

    //add the month name to the top of the calendar
    month = document.createElement("DIV");
    month.setAttribute("class","month")
    month.innerHTML = today.toLocaleString('default', { month: 'long' });
    calendar.appendChild(month);

    //add grid container for the dates
    calendarDates = document.createElement("DIV");
    calendarDates.setAttribute("class","calendarDates")
    calendar.appendChild(calendarDates);

    //add time slots DIV to calendar
    timeSelector = document.createElement("DIV");
    timeSelector.setAttribute("class", "timeSelector");
    calendar.appendChild(timeSelector);

    //get the first day that should be on the calendar
    dayStart = daysInMonth(mm-2, yyyy)-offset;
    
    //append all the days in the month
    for (j = 1; j <= 42; j++){

      //create day DIV
      date = document.createElement("DIV");
      date.setAttribute("class","day");

      //if it is in the previous month mark it with the nMonth class to make it unclickable
      if (offset-j >= 0){
        date.setAttribute("class","nMonth")
        number = "<p style=\"margin-top: 3px;\">" + String(dayStart+j) + "</p>";
      } 
      
      // if it is in the next month mark it with the nMonth class to make it unclickable
      else if(j-offset > daysInMonth(mm-1,yyyy)) {
        date.setAttribute("class","nMonth")
        number = "<p style=\"margin-top: 3px;\">" + String((j-offset)%(daysInMonth(mm-1,yyyy))) + "</p>";
      } 
      
      //if it's in the correct month make it clickable
      else {
        number = "<p style=\"margin-top: 3px;\">" + String((j-offset)%(daysInMonth(mm-1,yyyy)+1)) + "</p>";

        //add click event to each day
        date.addEventListener("click", function(e){
          e.stopPropagation();
          timeSelector.classList.remove("timeSelectorHide") //show the time select
          selectedDay = new Date(yyyy,mm-1,this.innerText); //create a date with that day and assign it to selected day
          dateDisplay = document.getElementById("dateDisplay"); 
          dateDisplay.innerHTML = selectedDay.toLocaleDateString(); //display the selected date as text
        });
      }

      date.innerHTML = number; //assign the number to the day DIV
      calendarDates.appendChild(date); //add the day to the calendar
    }

    for (j = 0; j < 96; j++){ //create timeslots
      timeSlot = document.createElement("DIV");
      timeSlot.setAttribute("class", "timeSlot"); //create time slot
      let hour = String(Math.floor(j/4));
      let minutes = String((j%4)*15);
      timeSlot.innerHTML = hour.padStart(2, '0')  +":"+ minutes.padEnd(2, '0'); //pad times with 0
      timeSlot.addEventListener("click", function(){ //add click event listener to times
        var selectedTime = new Date(yyyy, mm-1,selectedDay.getDay()); //get the date that is selected
        selectedTime.setHours(String(this.innerText).substring(0,2)); //add the hours to it
        selectedTime.setMinutes(String(this.innerText).substring(3)); //add the minutes to it
        timeSelector.classList.toggle("timeSelectorHide");
        timeDisplay = document.getElementById("timeDisplay"); 
        timeDisplay.innerHTML = selectedTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}); //display time
      timeSelector.appendChild(timeSlot);
    }
    timeSelector.classList.add("timeSelectorHide"); //hide time select
  }

//event listener for click on the calendar icon (only works with 1)
 calendarIcon[0].addEventListener("click", function(e) {
      e.stopPropagation();   
      closeAllSelect(null);   
      calendar.classList.toggle("calendarHide"); //toggle whether calendarHide is part of the class list
    });
 calendarIcon[0].click();

document.addEventListener("click", closeAllSelect);
document.addEventListener("click", closeCalendars);
