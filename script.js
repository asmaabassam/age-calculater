"use strict";

// VARIABLES
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const dayAlert = document.querySelector("#dayAlert");
const monthAlert = document.querySelector("#monthAlert");
const yearAlert = document.querySelector("#yearAlert");
const dayResult = document.querySelector("#dayResult");
const monthResult = document.querySelector("#monthResult");
const yearResult = document.querySelector("#yearResult");
const validBtn = document.querySelector("#validation");
let dayValid = true;
let monthValid = true;
let yearValid = true;
const exceptionMonth = [4, 6, 8, 11];

// FUNCTIONS
const checkedEMptyInput = function (input, alert) {
  if (input.value === "") {
    alert.textContent = "This field is required";
    input.style.border = "1px solid red";
    dayValid = false;
    monthValid = false;
    yearValid = false;
  } else {
    alert.textContent = "";
  }
};

const validRangeNumber = function (input, alert) {
  if (input === dayInput) {

    // VERIFICATION INITIAL
    if (input.value !== "" && input.value !== 0 && input.value > 31) {
      alert.textContent = "Must be a valid day";
      dayValid = false;
    } else {
      checkedEMptyInput(input, alert);
    }

    // EXCEPTION MOIS DE 30 JOURS
    if (
      input.value !== "" &&
      input.value > 30 &&
      monthInput.value !== "" &&
      (monthInput.value == 4 ||
      monthInput.value == 6 ||
      monthInput.value == 8 ||
      monthInput.value == 11)
    ) {
      alert.textContent = "Must be a valid day";
      dayValid = false;
    }

    // EXCEPTION MOIS DE FEVRIER
    if (
      input.value !== "" &&
      input.value > 29 &&
      monthInput.value !== "" &&
      monthInput.value == 2 &&
      yearInput.value == ""
    ) {
      alert.textContent = "Must be a valid day";
      dayValid = false;
    }

    if (
      input.value !== "" &&
      monthInput.value !== "" &&
      yearInput.value !== "" &&
      monthInput.value == 2 &&
      1 !==
        new Date(
          `${yearInput.value}-${monthInput.value}-${input.value}`
        ).getMonth()
    ) {
      alert.textContent = "Must be a valid day";
      dayValid = false;
    }
  } else if (input === monthInput) {
    if (input.value !== "" && input.value !== 0 && input.value > 12) {
      alert.textContent = "Must be a valid month";
      monthValid = false;
    } else {
      checkedEMptyInput(input, alert);
    }
  } else {
    if (
      input.value !== "" &&
      input.value !== 0 &&
      input.value > new Date().getFullYear()
    ) {
      alert.textContent = "Must be in the past";
      yearValid = false;
    } else checkedEMptyInput(input, alert);
  }
};

const calcTime = function () {
  const userInput = `${yearInput.value}-${monthInput.value}-${dayInput.value}`;
  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const userDate = new Date(userInput);
  const timeDifference = currentDate - userDate;

  let year = currentYear - yearInput.value;
  let month = currentDate.getMonth() - userDate.getMonth();
  let day = currentDate.getDate() - userDate.getDate();
  
  if(month < 0){
    year -= 1;
    month += 12;
  }

  // NOT SURE ABOUT IT
  if(day < 0){
    month -= 1;
    day += 31;
  } 

  return [year , month , year];
};

const reset = function(){
  yearResult.textContent =  '- -';
  monthResult.textContent = '- -';
  dayResult.textContent = '- -';
}

// BUTTON ACTION
validBtn.addEventListener("click", function () {

  // CHECKING PARAMATERS
  checkedEMptyInput(dayInput, dayAlert);
  checkedEMptyInput(monthInput, monthAlert);
  checkedEMptyInput(yearInput, yearAlert);
  validRangeNumber(dayInput, dayAlert);
  validRangeNumber(monthInput, monthAlert);
  validRangeNumber(yearInput, yearAlert);

  // CALCUL AFTER VALIDATION
  if (dayValid && yearValid && yearValid) {
   const date = calcTime();

  //  COUNT UP ANIMATION
   for(let i=0 ; i<= date[0]; i++){
    setTimeout(()=>{
     yearResult.textContent = String(i).padStart(2, 0);
    }, i*50)
   }
   for(let i=0 ; i<= date[1]; i++){
    setTimeout(()=>{
     monthResult.textContent = String(i).padStart(2, 0);
    }, i*50)
   }
   for(let i=0 ; i<= date[2]; i++){
    setTimeout(()=>{
    dayResult.textContent = String(i).padStart(2, 0);
    }, i*50)
   }
  } else{
    reset()
  }

  // RESET
  dayValid = true;
  monthValid = true;
  yearValid = true;
});

