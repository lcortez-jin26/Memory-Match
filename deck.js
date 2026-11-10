// deck.js — owner: DECK
// You decide what the cards look like. You do not decide the rules.

// Ocean-creature card backs keep the deck theme visible before each flip.
const CARD_BACK = "🌊";

function getFaces(pairs) {
  // A reef-life theme with twelve distinct faces supports up to 12 pairs.
  const faces = [
    "🐠", "🐟", "🐡", "🦈", "🐙", "🦀",
    "🦞", "🦐", "🦑", "🐬", "🐳", "🐢"
  ];

  return faces.slice(0, pairs);
}
