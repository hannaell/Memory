const cards = document.querySelectorAll('.game-card')
const restartGame = document.querySelector('.restart-game');

const win =  document.querySelector('.win');
const h1header = document.querySelector('.h1-header');

let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let pairs = 0;

// Function for fliping the game cards
function flipCard() {
  if (lockBoard) {
    return;
  }

  if (this === firstCard) {
    return;
  }

  this.classList.add('flip');

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();

}

// Function for checking if cards are matching
function checkForMatch() {
  if (firstCard.dataset.unicorn === secondCard.dataset.unicorn) {
    disableCards();
    pairs++;

    if (pairs > 7) {
      setTimeout( () => {
        win.style.display = 'block';
        h1header.textContent = 'You win!!';

      }, 500)
      setTimeout( () => {
        win.style.display = 'none';

      }, 5000)
    }
    return;
  }

  unflipCards();

}

// Function for removing eventListner
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
};

cards.forEach(card => card.addEventListener('click', flipCard));

restartGame.addEventListener('click', () => {
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  setTimeout(() => {
    shuffle();
    resetBoard();
  }, 500);

});

window.onload = shuffle();
