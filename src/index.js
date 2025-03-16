"use strict";
let cookies = 0;

document.addEventListener("DOMContentLoaded", function () {
    let cookieCounter = document.getElementById("cookieCounter");
    let cloneButton = document.getElementById("cloneButton");

    cloneButton.addEventListener("click", function (ev) {
        console.log("Button clicked!");
        cookies += 1;
        cookieCounter.innerHTML = cookies;
    });
});
