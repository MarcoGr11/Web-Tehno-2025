document.addEventListener("DOMContentLoaded", function () {
    const studentElement = document.getElementById("Name");
    studentElement.onclick = function () {
        console.log("Бабин Богдан");
    };
    const button = document.getElementById("showMessage");
    button.onclick = function () {
        alert("Hello world!");
    };
});
