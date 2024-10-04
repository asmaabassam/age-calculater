let currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1;
let currentDay = currentDate.getDate();
let currentYear = currentDate.getFullYear();

const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

let usersYear = "";
let usersDay = "";
let userMonth = "";

dayInput.addEventListener("change", function(e) {
    usersDay = e.target.value;
});

monthInput.addEventListener("change", function(e) {
    userMonth = e.target.value;
});

yearInput.addEventListener("change", function(e) {
    usersYear = e.target.value;
});

function calculateAge() {
    document.getElementById("yearNum").innerHTML = usersYear
        ? currentYear - usersYear
        : "--";
    document.getElementById("monthNum").innerHTML = userMonth
        ? currentMonth <= userMonth
            ? 12 - userMonth
            : currentMonth - userMonth
        : "--";
    document.getElementById("dayNum").innerHTML = usersDay
        ? currentDay <= usersDay
            ? 31 - usersDay
            : currentDay - usersDay
        : "--";
}
