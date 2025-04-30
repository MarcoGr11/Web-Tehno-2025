const board = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const rowsSelect = document.getElementById('rows');
const colsSelect = document.getElementById('cols');
const difficultySelect = document.getElementById('difficulty');
const playersSelect = document.getElementById('players');
const roundsSelect = document.getElementById('rounds');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const roundInfo = document.getElementById('roundInfo');

let icons = [];
let openedCards = [];
let moves = 0;
let countdown;
let clickLocked = false;
let currentPlayer = 1;
let players = 1;
let playerScores = { 1: 0, 2: 0 };
let totalRounds = 1;
let currentRound = 1;
let roundWins = { 1: 0, 2: 0 };

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function generateIcons(count) {
    const baseIcons = ['🍎','🚗','🐶','🎈','⚽','🎵','🐱','🌟','🍕','🎮','🍔','🌈'];
    const selected = shuffle([...baseIcons]).slice(0, count / 2);
    return shuffle([...selected, ...selected]);
}

function createBoard() {
    board.innerHTML = '';
    openedCards = [];
    moves = 0;
    playerScores = { 1: 0, 2: 0 };
    movesDisplay.textContent = 'Ходи: 0';
    clearInterval(countdown);
    timerDisplay.textContent = '⏱️ 00:00';
    clickLocked = false;
    currentPlayer = 1;
    currentPlayerDisplay.textContent = 'Гравець 1';
    roundInfo.textContent = `Раунд ${currentRound}`;

    const rows = parseInt(rowsSelect.value);
    const cols = parseInt(colsSelect.value);
    const totalCards = rows * cols;

    icons = generateIcons(totalCards);
    board.style.gridTemplateColumns = `repeat(${cols}, 100px)`;

    icons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        const inner = document.createElement('div');
        inner.classList.add('card-inner');
        const front = document.createElement('div');
        front.classList.add('card-front');
        front.textContent = icon;
        const back = document.createElement('div');
        back.classList.add('card-back');
        back.textContent = '🎴';

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        card.dataset.icon = icon;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (clickLocked || this.classList.contains('open') || this.classList.contains('matched')) return;

    this.classList.add('open');
    openedCards.push(this);

    if (openedCards.length === 2) {
        clickLocked = true;
        moves++;
        movesDisplay.textContent = `Ходи: ${moves}`;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = openedCards;
    const icon1 = card1.dataset.icon;
    const icon2 = card2.dataset.icon;

    if (icon1 === icon2) {
        card1.classList.add('matched', 'success');
        card2.classList.add('matched', 'success');
        playerScores[currentPlayer]++;
        openedCards = [];
        clickLocked = false;
        checkGameOver();
    } else {
        card1.classList.add('fail');
        card2.classList.add('fail');
        setTimeout(() => {
            card1.classList.remove('open', 'fail');
            card2.classList.remove('open', 'fail');
            openedCards = [];
            clickLocked = false;
            if (players === 2) {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                currentPlayerDisplay.textContent = `Гравець ${currentPlayer}`;
            }
        }, 800);
    }
}

function checkGameOver() {
    const allMatched = [...document.querySelectorAll('.card')].every(card => card.classList.contains('matched'));
    if (allMatched) {
        clearInterval(countdown);
        setTimeout(() => {
            let winner = 0;
            if (players === 2) {
                if (playerScores[1] > playerScores[2]) winner = 1;
                else if (playerScores[2] > playerScores[1]) winner = 2;
            }
            if (winner) {
                roundWins[winner]++;
                alert(`Раунд ${currentRound}: Переміг Гравець ${winner}!`);
            } else if (players === 2) {
                alert(`Раунд ${currentRound}: Нічия!`);
            } else {
                alert(`Гру завершено за ${moves} ходів!`);
            }
            currentRound++;
            if (currentRound <= totalRounds) {
                createBoard();
                startTimer(difficultySelect.value);
            } else {
                finishGame();
            }
        }, 500);
    }
}

function finishGame() {
    if (players === 2) {
        if (roundWins[1] > roundWins[2]) {
            alert(`Переміг Гравець 1! Виграно раундів: ${roundWins[1]}`);
        } else if (roundWins[2] > roundWins[1]) {
            alert(`Переміг Гравець 2! Виграно раундів: ${roundWins[2]}`);
        } else {
            alert('Гра завершилася внічию!');
        }
    } else {
        alert('Гра завершена!');
    }
}

function startTimer(difficulty) {
    let time = { easy: 180, normal: 120, hard: 60 }[difficulty];
    countdown = setInterval(() => {
        const min = String(Math.floor(time / 60)).padStart(2, '0');
        const sec = String(time % 60).padStart(2, '0');
        timerDisplay.textContent = `⏱️ ${min}:${sec}`;
        time--;
        if (time < 0) {
            clearInterval(countdown);
            alert('Час вийшов! Спробуйте ще раз.');
            createBoard();
        }
    }, 1000);
}

startBtn.addEventListener('click', () => {
    players = parseInt(playersSelect.value);
    totalRounds = parseInt(roundsSelect.value);
    currentRound = 1;
    roundWins = { 1: 0, 2: 0 };
    createBoard();
    startTimer(difficultySelect.value);
});

resetBtn.addEventListener('click', () => {
    rowsSelect.value = '4';
    colsSelect.value = '4';
    difficultySelect.value = 'easy';
    playersSelect.value = '1';
    roundsSelect.value = '1';
});

restartBtn.addEventListener('click', createBoard);

createBoard();