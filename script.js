const cardsArray = [
    { name: 'CR7', img:'cr7.webp'  },
    { name: 'Messi', img: 'messi.jpeg' },
    { name: 'Neymar', img: 'neymar.jpg' },
    { name: 'Iniesta', img: 'iniesta.webp' },
    { name: 'Modric', img: 'modric.jpeg' },
    { name: 'Xavi', img: 'xavi.webp' },
    { name: 'Kroos', img: 'kroos.jpeg' },
    { name: 'KDB', img: 'kdb.webp' }
];

const gameBoard = document.getElementById('game-board');
const movesCounter = document.getElementById('moves');
const timeCounter = document.getElementById('time');
const restartButton = document.getElementById('restart');

let moves = 0;
let timer;
let time = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    const cards = shuffle([...cardsArray, ...cardsArray]);
    gameBoard.innerHTML = '';
    moves = 0;
    time = 0;
    clearInterval(timer);
    timeCounter.textContent = time;
    movesCounter.textContent = moves;

    cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.innerHTML = `<img src="${card.img}" alt="${card.name}">`;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    timer = setInterval(() => {
        time++;
        timeCounter.textContent = time;
    }, 1000);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesCounter.textContent = moves;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartButton.addEventListener('click', startGame);

startGame();
