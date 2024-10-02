// Retrieve the score from localStorage, or initialize it if not present
let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

// Variable to store the autoplay interval ID
let autoplayIntervalId = null;

// Arrow function to play the game based on the player's move
const playGame = (playerMove) => {
  const computerMove = pickComputerMove();

  let result = '';
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
};

// Arrow function to randomly pick the computer's move
const pickComputerMove = () => {
  const numberRandom = Math.random();
  if (numberRandom < 1 / 3) return 'Rock';
  if (numberRandom < 2 / 3) return 'Paper';
  return 'Scissors';
};

// Arrow function to reset the score with confirmation
const resetScore = () => {
  const confirmReset = confirm("Are you sure you want to reset the score?");
  if (confirmReset) {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    document.getElementById('result').textContent = '';
    document.getElementById('score').textContent = `Wins: 0, Losses: 0, Ties: 0`;
  }
};

// Arrow function to toggle autoplay
const toggleAutoplay = () => {
  if (autoplayIntervalId === null) {
    autoplayIntervalId = setInterval(() => {
      const moves = ['Rock', 'Paper', 'Scissors'];
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      playGame(randomMove);
    }, 1000); // Play every 1000 milliseconds
    document.querySelector('.autoplay-button').textContent = 'Stop Autoplay';
  } else {
    clearInterval(autoplayIntervalId);
    autoplayIntervalId = null;
    document.querySelector('.autoplay-button').textContent = 'Autoplay';
  }
};

// Adding event listeners to the buttons
document.getElementById('rockButton').addEventListener('click', () => playGame('Rock'));
document.getElementById('paperButton').addEventListener('click', () => playGame('Paper'));
document.getElementById('scissorsButton').addEventListener('click', () => playGame('Scissors'));
document.getElementById('resetButton').addEventListener('click', resetScore);
document.getElementById('autoplayButton').addEventListener('click', toggleAutoplay);

// Keydown event listener to handle 'r', 'p', 's', 'Backspace', and 'a' keys
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  } else if (event.key === 'Backspace') {
    resetScore();
  } else if (event.key === 'a') {
    toggleAutoplay();
  }
});
