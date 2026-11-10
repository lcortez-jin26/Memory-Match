// Initialize a standard 52-card deck representation
function createDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

// In-place Fisher-Yates Shuffle
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap deck[i] and deck[j]
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Usage Example
const deck = createDeck();
console.log("Original Deck Top 3:", deck.slice(0, 3));

shuffleDeck(deck);
console.log("Shuffled Deck Top 3:", deck.slice(0, 3));