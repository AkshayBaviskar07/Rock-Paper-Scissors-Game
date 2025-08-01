// Constants for moves and result
const MOVES = ['rock', 'paper', 'scissors'];
const RESULTS = {
  WIN: 'You win',
  LOSE: 'You lose',
  TIE: 'Tie'
};

// load score from local storage
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

const scoreElement = document.querySelector('.js-score');
const resultElement= document.querySelector('.js-result');
const movesElement = document.querySelector('.js-moves');

// show initial score
updateScoreElement();

// play game
function playGame(playerMove) {
  const computerMove = pickComputerMove(); //pick computer move
  const result = getResult(playerMove, computerMove) // get result

  updateScore(result);  // update score object
  saveScore(); // save scores
  renderResult(result, playerMove, computerMove); // show result on screen
}

// function to calculate result
function getResult(playerMove, computerMove) {
  // if moves are same result will be tie
  if (playerMove === computerMove) {
    return RESULTS.TIE;
  }

  // win conditions
  const winConditions = {
    rock: 'scissors', // rock beats scissors
    paper: 'rock',  // paper beats rock
    scissors: 'paper' // scissors beats paper
  };

  // return 'You win' if player move beats computer move, else 'You lose'
  return winConditions[playerMove] === computerMove ? 
    RESULTS.WIN : RESULTS.LOSE;
}

// function to update the score
function updateScore(result) {
  if (result === RESULTS.WIN) score.wins++;
  else if (result === RESULTS.LOSE) score.losses++;
  else score.ties++;
}

// function to display result on screen
function renderResult(result, playerMove, computerMove) {
  resultElement.textContent = result; // result message
  
  // player and computer moves using images
  movesElement.innerHTML = playerMove && computerMove ? 
    `
    You <img src="images/${playerMove}-emoji.png" class="move-icon"> Computer <img src="images/${computerMove}-emoji.png" class="move-icon">
    ` : ``;

    updateScoreElement(); //update score
}

// function to save score to local storage
function saveScore() {
  localStorage.setItem('score', JSON.stringify(score));
}

// pick computer move
function pickComputerMove() {
  const index = Math.floor(Math.random() * MOVES.length);
  return MOVES[index];
}

// function to display result
function updateScoreElement() {
  scoreElement.textContent = `
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
  `;
}

// Reset the score
function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  localStorage.removeItem('score');
  renderResult('', '', '');
  updateScoreElement();
}