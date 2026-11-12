// ui.js — owner: TABLE
// You decide what players see and click. You never change the rules.

const tableEl = document.getElementById("table");
const statusEl = document.getElementById("status");
const winMessageEl = document.getElementById("win-message");
const newGameButtonEl = document.getElementById("new-game");
let missTimeoutId = null;

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

  statusEl.textContent = "Moves: " + state.moves + " · Matches: " + state.matches + "/" + PAIRS;

  const won = isWon();
  winMessageEl.textContent = won
    ? "You found all " + PAIRS + " pairs in " + state.moves + " move" + (state.moves === 1 ? "" : "s") + "!"
    : "";
  winMessageEl.hidden = !won;
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
    missTimeoutId = setTimeout(function () {
      missTimeoutId = null;
      hideMiss();
      render();
    }, 800);
  }
}

newGameButtonEl.addEventListener("click", function () {
  if (missTimeoutId !== null) {
    clearTimeout(missTimeoutId);
    missTimeoutId = null;
  }
  newGame(PAIRS);
  render();
});

newGame(PAIRS);
render();
