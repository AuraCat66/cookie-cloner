"use strict";

// Compiled from TypeScript
// Source code = https://github.com/AuraCat66/cookie-cloner

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
  autosaving: 3000,
};

interface SetIntervalIds {
  autocloner: number | null;
  autosaving: number | null;
}
let setIntervalIds: SetIntervalIds = {
  autocloner: null,
  autosaving: null,
};

function bodyOnLoad() {
  loadSavedGame();
  saveGame();

  updateGlobalUI();

  // We set the loop/interval for the autocloners
  setIntervals();
}

function resetGameOnClick() {
  if (confirm("You're about to reset your game. Are you sure?")) {
    clearInterval(setIntervalIds.autosaving ?? undefined);

    localStorage.clear();
    setTimeout(() => {
      location.reload();
    }, 500);
  }
}

function cloneOnClick() {
  console.log("Cookie cloned!");
  counters.cookies += 1;

  counterUpdate.cookies();
  checkUnlockables();
}

function shopAutoclonerBuyOnClick() {
  // If not enough cookies, return
  if (counters.cookies < currentPrices.autocloner) {
    return;
  }
  // Otherwise, add one autocloner
  counters.autocloners += 1;
  // Substract the price from the cookies
  counters.cookies -= currentPrices.autocloner;
  // Update the price
  currentPrices.autocloner = Math.floor(
    currentPrices.autocloner * 1.1,
  );

  // Update the UI
  updateGlobalUI();
}

function shopAutoclonerBuyAllOnClick() {
  // If not enough cookies, return
  if (counters.cookies < currentPrices.autocloner) {
    return;
  }

  // Otherwise calculate how many autocloners can be bought
  let remainingCookies = counters.cookies;
  let newAutocloners = 0;
  let newAutoclonerPrice = currentPrices.autocloner;
  while (remainingCookies >= newAutoclonerPrice) {
    // Add one autocloner
    newAutocloners += 1;
    // Substract the price from the remaining cookies
    remainingCookies -= newAutoclonerPrice;
    // Update the price
    newAutoclonerPrice = Math.floor(newAutoclonerPrice * 1.1);
  }

  // Update the internal state of the game
  counters.autocloners += newAutocloners;
  counters.cookies = remainingCookies;
  currentPrices.autocloner = newAutoclonerPrice;

  // Update the UI
  updateGlobalUI();
}

function setIntervals() {
  if (setIntervalIds.autocloner) {
    clearInterval(setIntervalIds.autocloner);
  }
  setIntervalIds.autocloner = setInterval(() => {
    counters.cookies += counters.autocloners;
    counterUpdate.cookies();
    checkUnlockables();
  }, intervals.autocloner);

  if (setIntervalIds.autosaving) {
    clearInterval(setIntervalIds.autosaving);
  }
  setIntervalIds.autosaving = setInterval(() => {
    saveGame();
  }, intervals.autosaving);
}

const counterUpdate = {
  cookies: () => {
    assertElementById("cookieCounter").innerHTML = counters.cookies.toString();
  },
  autocloners: () => {
    assertElementById("autoclonerCounter").innerHTML = counters.autocloners
      .toString();
  },
};

function checkUnlockables() {
  let unlockedSomething = false;
  if (
    !unlocked.autocloners &&
    ((counters.cookies >= unlockThresholds.autocloner) ||
      counters.autocloners > 0)
  ) {
    unlockedSomething = unlockAutocloners();
  }

  if (unlockedSomething && !unlocked.shop) {
    unlockShop();
  }
}

function unlockAutocloners() {
  unlocked.autocloners = true;
  assertElementById("autocloner").hidden = false;

  return true;
}

function unlockShop() {
  unlocked.shop = true;
  assertElementById("shop").hidden = false;
}

function updateShopPrices() {
  assertElementById("autoclonerCost").innerText = currentPrices.autocloner
    .toString();
}

function assertElementById(key: string): HTMLElement {
  const element = document.getElementById(key);
  if (element === null) {
    throw new Error(`Element "${key}" not found`);
  }

  return element;
}

function loadSavedGame() {
  const storage = localStorage;

  const cookieCounterItem = storage.getItem("cookieCounter");
  const autoclonerCounterItem = storage.getItem("autoclonerCounter");
  const currentPricesJSONItem = storage.getItem("currentPrices");

  if (cookieCounterItem !== null) {
    counters.cookies = parseInt(cookieCounterItem);
  }
  if (autoclonerCounterItem !== null) {
    counters.autocloners = parseInt(autoclonerCounterItem);
  }
  if (currentPricesJSONItem !== null) {
    let parsedJSON = JSON.parse(currentPricesJSONItem);
    if (typeof parsedJSON !== "object" || !("autocloner" in parsedJSON)) {
      throw new Error(
        `Found invalid JSON while trying to load currentPrices from localStorage:\n${currentPricesJSONItem}`,
      );
    }
    currentPrices = parsedJSON;
  }
}

function saveGame() {
  const storage = localStorage;

  storage.setItem("cookieCounter", counters.cookies.toString());
  storage.setItem("autoclonerCounter", counters.autocloners.toString());
  storage.setItem("currentPrices", JSON.stringify(currentPrices));

  console.log("Game saved!");
}

function updateGlobalUI() {
  counterUpdate.cookies();
  counterUpdate.autocloners();
  updateShopPrices();
  checkUnlockables();
}
