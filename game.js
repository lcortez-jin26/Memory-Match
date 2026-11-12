// game.js — owner: RULES
// You decide how the game works. You never touch the screen (no document.*).

function newGame(pairs) {
  const faces = getFaces(pairs);
  state.cards = [];
  for (const face of faces) {
    state.cards.push({ face: face, flipped: false, matched: false });
    state.cards.push({ face: face, flipped: false, matched: false });
  }

  shuffleCards(state.cards);

  state.firstPick = null;
  state.secondPick = null;
  state.moves = 0;
  state.matches = 0;
  state.locked = false;
}

function shuffleCards(cards) {
  let shuffles = 0;
  do {
    for (let i = cards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const currentCard = cards[i];
      cards[i] = cards[randomIndex];
      cards[randomIndex] = currentCard;
    }
    shuffles++;
  } while (cards.length > 2 && hasAdjacentPair(cards) && shuffles < 100);
}

function hasAdjacentPair(cards) {
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].face === cards[i + 1].face) {
      return true;
    }
  }

  return false;
}

function pickCard(index) {
  const card = state.cards[index];

  if (state.locked || card.flipped || card.matched) {
    return "ignored";
  }

  card.flipped = true;

  if (state.firstPick === null) {
    state.firstPick = index;
    return "first";
  }

  state.secondPick = index;
  state.moves++;

  const firstCard = state.cards[state.firstPick];
  if (firstCard.face === card.face) {
    firstCard.matched = true;
    card.matched = true;
    state.matches++;
    state.firstPick = null;
    state.secondPick = null;
    return "match";
  }

  state.locked = true;
  return "miss";
}

function hideMiss() {
  state.cards[state.firstPick].flipped = false;
  state.cards[state.secondPick].flipped = false;
  state.firstPick = null;
  state.secondPick = null;
  state.locked = false;
}

function isWon() {
  // TODO R3: Return true when every card on the table is matched.
  return false;
}
