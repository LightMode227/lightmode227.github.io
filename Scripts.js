document.addEventListener('DOMContentLoaded', function() { /* wait until page loads */
  
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
          if (arrNo.indexOf(i)) {
            options[i].classList.add("selectHide");
          }
        }
      }
    document.addEventListener("click", closeAllSelect);
  
  
  
    /* Custom dateTime select */
    var customDateTime, numCustomDateTime, calendar, i, j, calendarDates, date, month, number, today, dd, mm, wd, yyyy, offset, prevmm;
    customDateTime = document.getElementsByClassName("CustomDateTime");
    numCustomDateTime = customDateTime.length;
    
    function daysInMonth (month, year) {
      return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
    }
    
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    today = new Date();
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0');
    yyyy = today.getFullYear();
    wd = days.indexOf(String(today).substr(0,3));
    offset = wd+1-(dd%7);
    prevmm = daysInMonth(mm-2,yyyy);
  
    alert(dd,mm,yyyy,wd,offset,prevmm);
    for (i = 0; i < numCustomDateTime; i++){
      calendar = document.createElement("DIV");
      calendar.setAttribute("class","calendar");
      customDateTime[i].appendChild(calendar);
      month = document.createElement("DIV");
      month.setAttribute("class","month")
      month.innerHTML = "November";
      calendar.appendChild(month);
      calendarDates = document.createElement("DIV");
      calendarDates.setAttribute("class","calendarDates")
      calendar.appendChild(calendarDates);
      
      for (j = 0; j < 35; j++){ /* need to adjust for days in month */
        date = document.createElement("DIV");
        date.setAttribute("class","day");
        if (Offset-j != 0){
          date.setAttribute("class","nMonth")
          number = "<p style=\"margin-top: 3px;\">" + String(prevmm-offset +j+1) + "</p>";
          offset--;
        } else if(j > daysInMonth(mm-1,yyyy)) {
          date.setAttribute("class","nMonth")
          number = "<p style=\"margin-top: 3px;\">" + String(j%(daysInMonth(mm-1,yyyy)+1)+1) + "</p>";
        } else {
          number = "<p style=\"margin-top: 3px;\">" + String(j%(daysInMonth(mm-1,yyyy)+1)) + "</p>";
        }
        date.innerHTML = number;
        calendarDates.appendChild(date);
      }
    }
  });