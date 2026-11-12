// ui.js — owner: TABLE
// You decide what players see and click. You never change the rules.

const tableEl = document.getElementById("table");
const statusEl = document.getElementById("status");

function render() {
  tableEl.innerHTML = "";

  state.cards.forEach(function (card, index) {
    const button = document.createElement("button");
    button.className = "card";
    button.type = "button";
    if (card.flipped || card.matched) {
      button.textContent = card.face;
      button.classList.add("is-face-up");
      if (card.matched) {
        button.classList.add("is-matched");
      }
      button.setAttribute("aria-label", "Card " + (index + 1) + ": " + card.face);
    } else {
      button.textContent = CARD_BACK;
      button.setAttribute("aria-label", "Card " + (index + 1) + ": face down");
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

newGame(PAIRS);
render();
