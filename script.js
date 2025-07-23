const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
let cardValues = [...numbers, ...numbers]; // duplicate for pairs

const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');

let flippedCards = [];
let lockBoard = false;

// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create the game board
function createBoard() {
  gameBoard.innerHTML = '';
  shuffle(cardValues);

  cardValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);
    card.textContent = '?';

    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

// Flip a card
function flipCard(card) {
  if (lockBoard || flippedCards.includes(card)) return;

  card.textContent = card.getAttribute('data-value');
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

// Check if flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.getAttribute('data-value') === card2.getAttribute('data-value');

  if (isMatch) {
    flippedCards = []; // matched cards stay flipped
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.textContent = '?';
      card2.textContent = '?';
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

// Restart game
restartButton.addEventListener('click', createBoard);

// Start the game
createBoard();
