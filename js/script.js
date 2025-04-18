let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// update the score
updateScoreElement();

// start game
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  // rock
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie'
    } else if (computerMove === 'paper') {
      result = 'You lose';
    } else if (computerMove === 'scissors') {
      result = 'You win'
    }
  }

  //paper
  if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win';
    } else if (computerMove === 'paper') {
      result = 'Tie'
    } else if (computerMove === 'scissors') {
      result = 'You lose'
    }
  }

  //scissors
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
    } else if (computerMove === 'paper') {
      result = 'You win';
    } else if (computerMove === 'scissors') {
      result = 'Tie';
    }
  }


  if (result === 'You win') {
    score.wins += 1; 
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }

  // set score to local storage
  localStorage.setItem('score', JSON.stringify(score));

  // update scores
  updateScoreElement();

  // put result on page
  document.querySelector('.js-result').innerHTML = result;

  //put moves on page
  document.querySelector('.js-moves')
  .innerHTML = `You 
  <img src="images/${playerMove}-emoji.png" class="move-icon"/>
  <img src="images/${computerMove}-emoji.png" class="move-icon"/> Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

// pick computer move
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 /3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 /3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
};

