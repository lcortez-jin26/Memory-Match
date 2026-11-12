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

  // TODO R2: Return "ignored" if the table is locked, or if this card is
  // already flipped or matched.

  card.flipped = true;

  // TODO R2: If this is the first pick of the turn, remember it and
  // return "first". If it's the second pick, compare the two cards:
  //   - same face: mark both matched, add 1 to state.matches, return "match"
  //   - different: lock the table and return "miss"
  // TODO R3: Add 1 to state.moves on every second pick.

  return "first";
}

function hideMiss() {
  // TODO R2: Turn the two picked cards face down, clear both picks,
  // and unlock the table.
  state.locked = false;
}

function isWon() {
  // TODO R3: Return true when every card on the table is matched.
  return false;
}
