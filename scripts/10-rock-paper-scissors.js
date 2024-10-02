// Retrieve the score from localStorage, or initialize it if not present
let score = JSON.parse(localStorage.getItem('score'));

// If no score is found in localStorage, initialize the score object
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}

// Function to play the game based on the player's move
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  // Determine the result based on the player's and computer's moves
  if (playerMove === 'Scissors') {
    result = computerMove === 'Rock' ? 'You Lose.' :
             computerMove === 'Paper' ? 'You Win.' : 'Tie.';
  } else if (playerMove === 'Paper') {
    result = computerMove === 'Rock' ? 'You Win.' :
             computerMove === 'Paper' ? 'Tie.' : 'You Lose.';
  } else if (playerMove === 'Rock') {
    result = computerMove === 'Rock' ? 'Tie.' :
             computerMove === 'Paper' ? 'You Lose.' : 'You Win.';
  }

  // Update the score based on the result
  if (result === 'You Win.') {
    score.wins += 1;
  } else if (result === 'You Lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  // Store the updated score in localStorage
  localStorage.setItem('score', JSON.stringify(score));

  // Update the DOM to display the result with icons and the current score
  document.getElementById('result').innerHTML = `You Choose: 
    <img src="images/${playerMove.toLowerCase()}-emoji.png" alt="${playerMove}">
    Computer Choose: 
    <img src="images/${computerMove.toLowerCase()}-emoji.png" alt="${computerMove}">
    <br>${result}
  `;
  document.getElementById('score').textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Function to randomly pick the computer's move
function pickComputerMove() {
  const numberRandom = Math.random();
  if (numberRandom < 1 / 3) return 'Rock';
  if (numberRandom < 2 / 3) return 'Paper';
  return 'Scissors';
}

// Function to reset the score
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  document.getElementById('result').textContent = '';
  document.getElementById('score').textContent = `Wins: 0, Losses: 0, Ties: 0`;
}