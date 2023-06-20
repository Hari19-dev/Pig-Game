'use strict';

//Select Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const win0El = document.getElementById('win--0');
const win1El = document.getElementById('win--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Start Conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  win0El.classList.add('hidden');
};

init();

//function Switch
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//function dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player's
    scores[activePlayer] += currentScore;
    // scores[1] =scores[1]+currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      // win0El.classList.remove('hidden');      >>>>>TRY THIS LATER
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.add(
      //     'player--winner'
      //   ).textContent = `Player--${activePlayer} is Won🎉🎊`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      currentScore0El.textContent = 0;
      currentScore1El.textContent = 0;
    } else {
      //3.Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
