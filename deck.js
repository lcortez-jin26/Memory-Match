// deck.js — owner: DECK
// You decide what the cards look like. You do not decide the rules.

// A shared deep-sea illustration appears on every face-down card.
const CARD_BACK = "deep-sea";

const FACE_ART = {
  clownfish: "clownfish",
  blueTang: "blue-tang",
  pufferfish: "pufferfish",
  shark: "shark",
  octopus: "octopus",
  crab: "crab",
  lobster: "lobster",
  shrimp: "shrimp",
  squid: "squid",
  dolphin: "dolphin",
  whale: "whale",
  turtle: "turtle"
};

function getFaces(pairs) {
  // Each name maps to its own full-card illustrated reef scene.
  const faces = [
    "clownfish", "blueTang", "pufferfish", "shark",
    "octopus", "crab", "lobster", "shrimp",
    "squid", "dolphin", "whale", "turtle"
  ];

  return faces.slice(0, pairs);
}

function getFaceArt(face) {
  return FACE_ART[face];
}
