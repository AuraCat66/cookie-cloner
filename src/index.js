"use strict";
let cookies = 0;

let autocloners = 0;
let autoclonerCost = 100;
let autoclonerInterval = 1000;
let autoclonerUnlockThreshold = 10;

document.addEventListener("DOMContentLoaded", function (_ev) {
  gameLogic();
});

function gameLogic() {
  const cookieCounter = document.getElementById("cookieCounter");
  const cloneButton = document.getElementById("cloneButton");

  cloneButton.addEventListener("click", function (_ev) {
    console.log("Button clicked!");
    cookies += 1;
    cookieCounter.innerHTML = cookies;
  });
}
