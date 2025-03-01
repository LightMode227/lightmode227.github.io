
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
    selectedDiv.addEventListener("click", function(e) { /* when the custom select is clicked open it and close others - don't fully understand this function*/
      e.stopPropagation();
      closeCalendars()
      closeAllSelect(this);
      this.nextSibling.classList.toggle("selectHide");
    });
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

  var customDateTime, numCustomDateTime, calendar, calendarIcon, calendarDates, date, month, number, today, dd, mm, wd, yyyy, offset, prevmm, dayStart;
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
  offset = wd-(dd%7);
  prevmm = daysInMonth(mm-2,yyyy);

  for (i = 0; i < numCustomDateTime; i++){
    calendar = document.createElement("DIV");
    calendar.setAttribute("class","calendar");
    customDateTime[i].appendChild(calendar);
    month = document.createElement("DIV");
    month.setAttribute("class","month")
    month.innerHTML = today.toLocaleString('default', { month: 'long' });
    calendar.appendChild(month);
    calendarDates = document.createElement("DIV");
    calendarDates.setAttribute("class","calendarDates")
    calendar.appendChild(calendarDates);
    dayStart = daysInMonth(mm-2, yyyy)-offset;
    
    for (j = 1; j <= 42; j++){
      date = document.createElement("DIV");
      date.setAttribute("class","day");
      if (offset-j >= 0){
        date.setAttribute("class","nMonth")
        number = "<p style=\"margin-top: 3px;\">" + String(dayStart+j) + "</p>";
      } else if(j-offset > daysInMonth(mm-1,yyyy)) {
        date.setAttribute("class","nMonth")
        number = "<p style=\"margin-top: 3px;\">" + String((j-offset)%(daysInMonth(mm-1,yyyy))) + "</p>";
      } else {
        number = "<p style=\"margin-top: 3px;\">" + String((j-offset)%(daysInMonth(mm-1,yyyy)+1)) + "</p>";
      }
      date.innerHTML = number;
      calendarDates.appendChild(date);
    }
  }

function closeCalendars(){ /* closes all calendars  in a document */
          if (calendar){
            calendar.classList.add("calendarHide");
          }
        }

 calendarIcon[0].addEventListener("click", function(e) { //event listener for click on the date time element
      e.stopPropagation();   
      closeAllSelect(selectedDiv);   
      calendar.classList.toggle("calendarHide");//toggle whether calendarHide is part of the class list
    });
 calendarIcon[0].click();

document.addEventListener("click", closeAllSelect);
document.addEventListener("click", closeCalendars);
