"use strict";
let cookies = 0;

document.addEventListener("DOMContentLoaded", function () {
  const cookieCounter = document.getElementById("cookieCounter");
  const cloneButton = document.getElementById("cloneButton");

  cloneButton.addEventListener("click", function (ev) {
    console.log("Button clicked!");
    cookies += 1;
    cookieCounter.innerHTML = cookies;
  });
});
