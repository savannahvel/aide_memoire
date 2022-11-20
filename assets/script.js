// save reference to important DOM elements
var currentDateElement = $('#currentDay');
var timeBlockElements = $('.time-block');
var saveButtonElements = $('.saveBtn');

$(function () {
  var currentTime = Number(dayjs().format('H'));
  var timeBlockInt;
  var todayLocalStorage = dayjs().format('M/D/YYYY');
  localStorage.setItem('date', todayLocalStorage); 
  // localStorage.setItem('date', "11/18 / 2022"); // uncomment to test that agenda clears when its not the current date
  
  // update time blocks to CSS styling of past, present, and future
  for (let i = 0; i < timeBlockElements.length; i++) {
    // converting timeBlockElements[i].id to number for a strict comparison to current time
    timeBlockInt = Number(timeBlockElements[i].id);
    if (currentTime < timeBlockInt) {
      timeBlockElements[i].classList.add('future');
    } else if (currentTime > timeBlockInt) {
      timeBlockElements[i].classList.add('past');
    } else {
      timeBlockElements[i].classList.add('present');
    }
  }

  // save inputted events to local storage
  saveButtonElements.click(function () {
    var item = $(this)
    var id = item.parent().attr('id');
    var eventInput = item.siblings('.description').val();
    localStorage.setItem(id, eventInput);
  })
  
  // check if localStorage is populated, if so, add it to agenda
  if (localStorage) {
    var savedEventTimeBlockId;
    var savedEventText;
    var textArea = $('.description')
    
    
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      console.log(localStorage.key(i))
      savedEventTimeBlockId = localStorage.key(i);
      savedEventText = localStorage.getItem(savedEventTimeBlockId);

      if (localStorage.key(i) === "date") {
        if (localStorage.getItem(savedEventTimeBlockId) != todayLocalStorage) { // rename variable
          localStorage.clear();
        } 
      }

      for (let i = 0; i < timeBlockElements.length; i++) {
        // setting saved events to appropriate time blocks
        if (savedEventTimeBlockId === timeBlockElements[i].id) {
          textArea[i].value = savedEventText;
        }
      }
    }
  }

  var todayDisplay = dayjs().format('M/D/YYYY h:mm A');
  currentDateElement.text(todayDisplay);
});
