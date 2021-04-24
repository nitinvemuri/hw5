var todayDateTime = moment().format('MMMM Do YYYY');
$("#currentDay").html(todayDateTime)


var idS = ["#9", "#10", "#11", "#12", "#13", "#14", "#15", "#16",  "#17"];
var timeSlots = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00"];
var shiftedTimeSlot = ["10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00",  "18:00:00"];

var itenaray = [];
var getLocalStorageData = JSON.parse(localStorage.getItem("planner-items"));

if (getLocalStorageData !== null) {
 itenaray = getLocalStorageData;
}

if (getLocalStorageData === "") {
    itenaray = getLocalStorageData
}



for (var i=0;i<idS.length; i++) {
  var descrEl = $(idS[i]);
  var btnEl = descrEl.parent().parent().find("button");

  if ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + timeSlots[i])) { 
    descrEl.attr("class", "future");
    itenaray.forEach(function(item) {
      if (idS[i] === ("#" + (item["input-id"]))) {
        descrEl.val(item["input-value"]);
      }
    });
  }
  else if (((moment().format('MMMM Do YYYY, HH:mm:ss')) >= (moment().format('MMMM Do YYYY') +  ", " + timeSlots[i])) &&  
          ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + shiftedTimeSlot[i])))
  {
    descrEl.attr("class", "present");
    $(".present").attr("disabled", "disabled");
    btnEl.attr("disabled", true);
    itenaray.forEach(function(item) {
      if (idS[i] === ("#" + item["input-id"])) {
        descrEl.val(item["input-value"]);
      }
    });
  }
  else if ((moment().format('MMMM Do YYYY, HH:mm:ss')) > (moment().format('MMMM Do YYYY') +  ", " + timeSlots[i])) {
    descrEl.attr("class", "past");
    $(".past").attr("disabled", "disabled");
    btnEl.attr("disabled", true);
  }
}

$("button").on("click", function() {
  event.preventDefault();
  var container = $(this).parent().parent();  
  var inputValue = container.find("input").val();
  var inputId = container.find("input").attr("id");
  var text = {
    "input-id": inputId,
    "input-value": inputValue };
  
  if (text["input-value"]) {
    itenaray.push(text);
    localStorage.setItem("planner-items", JSON.stringify(itenaray));
  }
});

let btnClear = document.querySelector('button');
let inputs = document.querySelectorAll('input');
btnClear.addEventListener('click', () => {
    inputs.forEach(input => input.value = '');
    return;
}); 



