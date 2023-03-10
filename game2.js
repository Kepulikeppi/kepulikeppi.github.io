const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");
const newGameButton = document.querySelector(".new-game");

const moveXSound = new Audio("sounds/X.mp3");
const moveOSound = new Audio("sounds/O.mp3");
const loseSound = new Audio("sounds/lose.mp3");
const drawSound = new Audio("sounds/draw.mp3");
const winSound = new Audio("sounds/youwin.mp3");
const newgameSound = new Audio("sounds/new_game.mp3");
moveXSound.load();
moveOSound.load();
loseSound.load();
drawSound.load();
winSound.load();
newgameSound.load();

let playerTurn = true;
let gameOver = false;
let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(square, index) {
  if (gameOver || board[index] !== "") {
    return;
  }

  const mark = playerTurn ? "X" : "O";
  board[index] = mark;
  square.classList.add(mark === "X" ? "x-mark" : "o-mark");

  if (checkWin()) {
    gameOver = true;
    if (mark === "X") {
      message.textContent = "You win!";
      winSound.currentTime = 0;
      winSound.play();
    } else {
      message.textContent = "You lose!";
      loseSound.currentTime = 0;
      loseSound.play();
    }
    return;
  }

  if (checkDraw()) {
    gameOver = true;
    message.textContent = "Draw!";
    drawSound.currentTime = 0;
    drawSound.play();
    return;
  }

  playerTurn = !playerTurn;
  message.textContent = `It's ${playerTurn ? "your" : "computer's"} turn`;

  if (!playerTurn) {
	  if (board[4] === ""){
		  computerMiddleMove();
	  } else {
		  computerMovePerfect();
	  }
  } else {
    moveXSound.currentTime = 0;
    moveXSound.play();
  }
}

function checkWin() {
  
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      // Add the 'winning-square' class to the squares that form the winning row
      squares[a].classList.add('winning-square');
      squares[b].classList.add('winning-square');
      squares[c].classList.add('winning-square');
      
      // Add the 'animate' class to the winning squares after 2 seconds
      setTimeout(() => {
        squares[a].classList.add('animate');
        squares[b].classList.add('animate');
        squares[c].classList.add('animate');
      }, 1000);
      
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return !board.includes("");
}

function computerMiddleMove(){
	setTimeout(() => {
		const square = squares[4];
		board[4] = "O";
		square.classList.add("o-mark");
		if (checkWin()) {
			gameOver = true;
			message.textContent = "You lose!";
			loseSound.currentTime = 0;
			loseSound.play();
		  } else if (checkDraw()) {
			gameOver = true;
			message.textContent = "Draw!";
			drawSound.currentTime = 0;
			drawSound.play();
		  } else {
			playerTurn = true;
			message.textContent = `It's your turn`;
			moveOSound.currentTime = 0;
			moveOSound.play();
		  }
		  
	}, 500);
	moveXSound.currentTime = 0;
	moveXSound.play();
}

function computerMovePerfect() {
	setTimeout(() => {
		
	
	  for (let i = 0; i < winningConditions.length; i++) {
		const [a, b, c] = winningConditions[i];
		const line = [board[a], board[b], board[c]];
		const computerCount = line.filter((mark) => mark === "O").length;
		const emptyCount = line.filter((mark) => mark === "").length;

		if (computerCount === 2 && emptyCount === 1) {
		  const emptyIndex = line.indexOf("");
		  const index = [a, b, c][emptyIndex];
		  const square = squares[index];
		  board[index] = "O";
		  square.classList.add("o-mark");

		  if (checkWin()) {
			gameOver = true;
			message.textContent = "You lose!";
			loseSound.currentTime = 0;
			loseSound.play();
		  } else if (checkDraw()) {
			gameOver = true;
			message.textContent = "Draw!";
			drawSound.currentTime = 0;
			drawSound.play();
		  } else {
			playerTurn = true;
			message.textContent = `It's your turn`;
			moveOSound.currentTime = 0;
			moveOSound.play();
		  }

		  return;
		}
	  }

	  for (let i = 0; i < winningConditions.length; i++) {
		const [a, b, c] = winningConditions[i];
		const line = [board[a], board[b], board[c]];
		const playerCount = line.filter((mark) => mark === "X").length;
		const emptyCount = line.filter((mark) => mark === "").length;

		if (playerCount === 2 && emptyCount === 1) {
		  const emptyIndex = line.indexOf("");
		  const index = [a, b, c][emptyIndex];
		  const square = squares[index];
		  board[index] = "O";
		  square.classList.add("o-mark");

		  if (checkWin()) {
			gameOver = true;
			message.textContent = "You lose!";
			loseSound.currentTime = 0;
			loseSound.play();
		  } else if (checkDraw()) {
			gameOver = true;
			message.textContent = "Draw!";
			drawSound.currentTime = 0;
			drawSound.play();
		  } else {
			playerTurn = true;
			message.textContent = `It's your turn`;
			moveOSound.currentTime = 0;
			moveOSound.play();
		  }

		  return;
		}
  }

		const emptySquares = [];

	  for (let i = 0; i < 9; i++) {
		if (board[i] === "") {
		  emptySquares.push(i);
		}
	  }

	  const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
	  const square = squares[randomIndex];
	  board[randomIndex] = "O";
	  square.classList.add("o-mark");

	  if (checkWin()) {
		gameOver = true;
		message.textContent = "You lose!";
		loseSound.currentTime = 0;
		loseSound.play();
	  } else if (checkDraw()) {
		gameOver = true;
		message.textContent = "Draw!";
		drawSound.currentTime = 0;
		drawSound.play();
	  } else {		
		playerTurn = true;
		message.textContent = `It's your turn`;
		moveOSound.currentTime = 0;
		moveOSound.play();
	  }
	}, 500);
  moveXSound.currentTime = 0;
  moveXSound.play();
}

function resetGame() {
   playerTurn = true;
  gameOver = false;
  board = ["", "", "", "", "", "", "", "", ""];
  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("x-mark", "o-mark", "winning-square", "animate"); // remove winning classes
  });
  message.textContent = `It's your turn`;
}

squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    handleClick(square, index);
  });
});

newGameButton.addEventListener("click", () => {
  resetGame();
  newgameSound.currentTime = 0;
  newgameSound.play();
});

resetGame();
