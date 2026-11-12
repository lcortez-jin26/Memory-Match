// ui.js — owner: TABLE
// You decide what players see and click. You never change the rules.

const tableEl = document.getElementById("table");
const statusEl = document.getElementById("status");

function addOceanLife() {
  const oceanLife = document.createElement("div");
  oceanLife.className = "ocean-life";
  oceanLife.setAttribute("aria-hidden", "true");

  const creatures = [
    ["ocean-life__creature--fish-one", "🐠"],
    ["ocean-life__creature--fish-two", "🐟"],
    ["ocean-life__creature--school-one", "🐠"],
    ["ocean-life__creature--school-two", "🐟"],
    ["ocean-life__creature--school-three", "🐡"],
    ["ocean-life__creature--school-four", "🐠"],
    ["ocean-life__creature--school-five", "🐟"],
    ["ocean-life__creature--shark", "🦈"],
    ["ocean-life__creature--whale", "🐋"],
    ["ocean-life__creature--dolphin", "🐬"],
    ["ocean-life__creature--turtle", "🐢"],
    ["ocean-life__creature--jellyfish", "🪼"],
    ["ocean-life__creature--shell", "🐚"],
    ["ocean-life__creature--coral", "🪸"]
  ];

  creatures.forEach(function (creature) {
    const art = document.createElement("span");
    art.className = "ocean-life__creature " + creature[0];
    art.textContent = creature[1];
    oceanLife.appendChild(art);
  });

  document.body.prepend(oceanLife);
}

function render() {
  tableEl.innerHTML = "";

  state.cards.forEach(function (card, index) {
    const button = document.createElement("button");
    button.className = "card";
    if (card.flipped || card.matched) {
      button.classList.add("card--face");
      button.setAttribute("aria-label", card.face);
      button.appendChild(createArt("card-art--" + getFaceArt(card.face)));
    } else {
      button.classList.add("card--back");
      button.setAttribute("aria-label", "Face-down memory card");
      button.appendChild(createArt("card-art--" + CARD_BACK));
    }
    button.addEventListener("click", function () {
      handleClick(index);
    });
    tableEl.appendChild(button);
  });

  // TODO T2: Show the number of moves and matches in statusEl.
  statusEl.textContent = "";

  // TODO T3: When isWon() is true, show a win message with the move count.
}

function createArt(artClass) {
  const art = document.createElement("span");
  art.className = "card-art " + artClass;
  art.setAttribute("aria-hidden", "true");
  return art;
}

function handleClick(index) {
  const result = pickCard(index);
  render();
  if (result === "miss") {
    setTimeout(function () {
      hideMiss();
      render();
    }, 800);
  }
}

// TODO T3: Add a "New game" button to index.html. When it's clicked,
// call newGame(PAIRS) and then render().

addOceanLife();
newGame(PAIRS);
render();
