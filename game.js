const cards = document.querySelectorAll('.card');
const startBtn = document.getElementById('startBtn');
let flippedCards = [];
let lockBoard = false;

startBtn.addEventListener('click', startGame);
cards.forEach(card => card.addEventListener('click', flipCard));

function startGame() {
  startBtn.disabled = true;
  resetBoard();
  shuffleCards();
  enableCards();
}

function resetBoard() {
  flippedCards = [];
  lockBoard = false;
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 8);
    card.style.order = randomPosition;
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === flippedCards[0]) return;

  this.classList.add('flip');

  if (flippedCards.length === 0) {
    flippedCards.push(this);
  } else {
    checkMatch(this);
  }
}

function checkMatch(card) {
  if (card.dataset.card === flippedCards[0].dataset.card) {
    disableCards();
    setTimeout(() => {
      flippedCards[0].classList.add('matched');
      card.classList.add('matched');
      resetCards();
    }, 1000);
  } else {
    lockBoard = true;
    setTimeout(() => {
      flippedCards[0].classList.remove('flip');
      card.classList.remove('flip');
      resetCards();
    }, 1000);
  }
}

function disableCards() {
  flippedCards[0].removeEventListener('click', flipCard);
  cards.forEach(card => card.removeEventListener('click', flipCard));
}

function enableCards() {
  cards.forEach(card => card.addEventListener('click', flipCard));
}

function resetCards() {
  flippedCards = [];
  lockBoard = false;

  if (document.querySelectorAll('.card.matched').length === cards.length) {
    setTimeout(() => {
      alert('Congratulations! You won the game!');
      startBtn.disabled = false;
    }, 500);
  }
}

