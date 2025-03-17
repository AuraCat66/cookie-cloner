"use strict";
let counters = {
  cookies: 100,
  autocloners: 0,
};

let defaultPrices = {
  autocloner: 100,
};
let currentPrices = { ...defaultPrices };

let unlocked = {
  shop: false,
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

  const shopButtons = {
    autocloner: document.getElementById("autoclonerBuyButton"),
  };

  cloneButton?.addEventListener("click", (_ev) => {
    console.log("Button clicked!");
    counters.cookies += 1;
    counterUpdate.cookies();

    checkUnlockables();
  });

  shopButtons.autocloner?.addEventListener("click", (_ev) => {
    // If not enough cookies, return
    if (counters.cookies < currentPrices.autocloner) {
      return;
    }
    // Otherwise, add one autocloner
    counters.autocloners += 1;
    // Substract the price from the cookies
    counters.cookies -= currentPrices.autocloner;
    // And update the price of autocloners
    currentPrices.autocloner = Math.floor(
      currentPrices.autocloner * 1.1,
    );

    // Update the UI
    counterUpdate.cookies();
    counterUpdate.autocloners();
    updateShopPrices();
  });
}

const counterUpdate = {
  cookies: () => {
    const cookieCounter = document.getElementById("cookieCounter");

    cookieCounter.innerHTML = counters.cookies;
  },
  autocloners: () => {
    const autoclonerCounter = document.getElementById("autoclonerCounter");

    autoclonerCounter.innerHTML = counters.autocloners;
  },
};

function checkUnlockables() {
  let unlockedSomething = false;
  if (
    counters.cookies >= unlockThresholds.autocloner && !unlocked.autocloners
  ) {
    unlockedSomething = unlockAutocloners();
  }

  if (unlockedSomething) {
    unlockShop();
  }
}

function unlockAutocloners() {
  if (unlocked.autocloners) return false;

  unlocked.autocloners = true;
  document.getElementById("autoclonerShopItem").hidden = false;

  return true;
}

function unlockShop() {
  if (unlocked.shop) return;

  unlocked.shop = true;
  document.getElementById("shop").hidden = false;
}

function updateShopPrices() {
  document.getElementById("autoclonerCost").innerText =
    currentPrices.autocloner;
}
