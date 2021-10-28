'use strict';

// Player 1
document.getElementById('name--0').textContent = prompt(
  'Choose name for player 1'
);
document.getElementById('score--0').textContent = 0;

// Player 2
document.getElementById('name--1').textContent = prompt(
  'Choose name for player 2'
);
document.getElementById('score--1').textContent = 0;

// Dice
let dice = document.querySelector('.dice');

// Buttons
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdPlay = document.querySelector('.btn--hold');

// let currentScore, activePlayer, scores, isPlaying;
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let isPlaying = true;

const initialize = function () {
  isPlaying = true;
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  dice.classList.add('hidden');
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
};

initialize();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

rollDice.addEventListener('click', function () {
  if (isPlaying) {
    dice.classList.remove('hidden');
    const secretNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${secretNumber}.png`;

    if (secretNumber !== 1) {
      currentScore += secretNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdPlay.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 50) {
    dice.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    isPlaying = false;
  } else {
    switchPlayer();
  }
});

newGame.addEventListener('click', initialize);
