// ui.js — owner: TABLE
// You decide what players see and click. You never change the rules.

const tableEl = document.getElementById("table");
const statusEl = document.getElementById("status");
let audioContext = null;

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

  if (isWon()) {
    statusEl.textContent = "You won in " + state.moves + " moves!";
  } else {
    statusEl.textContent = "Moves: " + state.moves + " · Matches: " + state.matches + "/" + PAIRS;
  }
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
  if (result === "match") {
    playHappySound();
  }
  if (result === "miss") {
    playSadSound();
    setTimeout(function () {
      hideMiss();
      render();
    }, 800);
  }
}

function playHappySound() {
  playTone(523.25, 0.12, 0);
  playTone(659.25, 0.12, 0.1);
  playTone(783.99, 0.18, 0.2);
}

function playSadSound() {
  playTone(220, 0.18, 0);
  playTone(164.81, 0.22, 0.15);
}

function playTone(frequency, duration, delay) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    return;
  }

  if (audioContext === null) {
    audioContext = new AudioContext();
  }

  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  const startTime = audioContext.currentTime + delay;
  const endTime = startTime + duration;

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  volume.gain.setValueAtTime(0.1, startTime);
  volume.gain.exponentialRampToValueAtTime(0.001, endTime);
  oscillator.connect(volume);
  volume.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(endTime);
}

// TODO T3: Add a "New game" button to index.html. When it's clicked,
// call newGame(PAIRS) and then render().

addOceanLife();
newGame(PAIRS);
render();
