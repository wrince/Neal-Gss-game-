// Chess Game Setup
var chess = new Chess();
var board = Chessboard('chess-board', {
    draggable: true,
    position: 'start',
    onDrop: function(source, target) {
        var move = chess.move({ from: source, to: target, promotion: 'q' });
        if (move === null) return 'snapback';
        setTimeout(bestMove, 500);
    }
});

function bestMove() {
    var possibleMoves = chess.moves();
    if (possibleMoves.length === 0) return;
    var bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]; // Placeholder for AI
    chess.move(bestMove);
    board.position(chess.fen());
}

// Tic-Tac-Toe Game Setup
const ticTacToe = document.getElementById("tic-tac-toe");
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

// Check for winner in Tic-Tac-Toe
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameOver = true;
            setTimeout(() => alert(currentPlayer + " wins!"), 10);
            return true;
        }
    }
    if (!boardState.includes("")) {
        gameOver = true;
        setTimeout(() => alert("It's a draw!"), 10);
        return true;
    }
    return false;
}

// AI makes a random move for "O"
function randomMove() {
    let availableMoves = [];
    boardState.forEach((cell, index) => {
        if (cell === "") availableMoves.push(index);
    });

    // Pick a random available spot for AI to play
    const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    boardState[randomIndex] = "O";
    document.querySelectorAll(".cell")[randomIndex].textContent = "O";
    if (!checkWinner()) {
        currentPlayer = "X"; // Now it's the player's turn
    }
}

// Reset Tic-Tac-Toe board
function resetTicTacToe() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
}

// Switch to Tic-Tac-Toe game
function switchToTicTacToe() {
    document.querySelector(".game-container").classList.add("hidden");
    document.getElementById("ticTacToeContainer").classList.remove("hidden");
}

// Switch to Chess game
function switchToChess() {
    document.getElementById("ticTacToeContainer").classList.add("hidden");
    document.querySelector(".game-container").classList.remove("hidden");
}

// Handle player move in Tic-Tac-Toe
function playerMove(cell, index) {
    if (!gameOver && currentPlayer === "X" && !boardState[index]) {
        cell.textContent = "X";
        boardState[index] = "X";
        if (!checkWinner()) {
            currentPlayer = "O";
            setTimeout(randomMove, 500); // AI makes its random move
        }
    }
}

// Create Tic-Tac-Toe cells and add event listeners
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => playerMove(cell, i));
    ticTacToe.appendChild(cell);
            }
