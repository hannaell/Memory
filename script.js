const cards = document.querySelectorAll('.game-card')

let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Function for fliping the game cards
function flipCard() {
  if (lockBoard) {
    return;
  }

  if (this === firstCard) {
    return;
  }
  // this.classList.toggle('flip');
  this.classList.add('flip');

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  // flippedCard = flase;

  checkForMatch();
}

// Function for checking if cards are matching
function checkForMatch() {
  if (firstCard.dataset.unicorn === secondCard.dataset.unicorn) {
    disableCards();
    return;
  }

  unflipCards();

  // Does the same as the if above
  // let isMatch = firstCard.dataset.unicorn === secondCard.dataset.unicorn;
  // isMatch ? disableCards() : unflipCards();
}

// Function for removing eventListner
function disableCards() {
  firstCard.removeEventListner('click', flipCard);
  secondCard.removeEventListner('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    // lockBoard = false;
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
