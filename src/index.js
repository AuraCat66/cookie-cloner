"use strict";
let cookies = 0;
let autocloners = 0;

let defaultPrices = {
  autocloner: 100,
};
let currentPrices = { ...defaultPrices };

let unlocked = {
  autocloners: false,
};

let unlockThresholds = {
  autocloner: 10,
};
let intervals = {
  autocloner: 1000,
};

document.addEventListener("DOMContentLoaded", (_ev) => {
  gameLogic();
}, { once: true });

function gameLogic() {
  updateShopPrices();

  const cloneButton = document.getElementById("cloneButton");

  cloneButton.addEventListener("click", (_ev) => {
    console.log("Button clicked!");
    cookies += 1;
    updateCookies();

    checkUnlockables();
    updateShopVisibility();
  });
}

function updateCookies() {
  const cookieCounter = document.getElementById("cookieCounter");

  cookieCounter.innerHTML = cookies;
}

function checkUnlockables() {
  if (cookies >= unlockThresholds.autocloner && !unlocked.autocloners) {
    unlocked.autocloners = true;
  }
}

function updateShopVisibility() {
  if (unlocked.autocloners) {
    document.getElementById("shopAutoCloner").hidden = false;
  }

  Object.values(unlocked).forEach((unlocked) => {
    if (unlocked) {
      document.getElementById("shop").hidden = false;
    }
  });
}
function updateShopPrices() {
  document.getElementById("shopAutoClonerCost").innerText =
    currentPrices.autocloner;
}
