const board = document.getElementById('board');
const result = document.getElementById('result');
const newGameButton = document.getElementById('newGameButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameWon = false;

function handleMove(index) {
    if (gameBoard[index] === '' && !gameWon) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();
    }
}

function renderBoard() {
    gameBoard.forEach((mark, index) => {
        const block = document.querySelector(`[data-index="${index}"]`);
        block.textContent = mark;
    });
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombination) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameWon = true;
            board.children[a].classList.add('winner');
            board.children[b].classList.add('winner');
            board.children[c].classList.add('winner');
            result.textContent = `${gameBoard[a]} wins!`;
        }
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameWon = false;
    board.querySelectorAll('.block').forEach(block => block.classList.remove('winner'));
    result.textContent = '';
    renderBoard();
}

board.addEventListener('click', (event) => {
    const index = event.target.dataset.index;
    if (index) {
        handleMove(index);
    }
});

newGameButton.addEventListener('click', restartGame);

renderBoard();
