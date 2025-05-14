
'use strict';

let level = 1,
    timeToDuel = 1000,
    readyToDuel = false,
    time,
    fromLeft = true,
    score = 0,
    lives = 3,
    livesPanel = document.querySelector('.lives'),
    startButton = document.querySelector('.button-start-game'),
    restartButton = document.querySelector('.button-restart'),
    nextLvlBtn = document.querySelector('.button-next-level'),
    gameMenu = document.querySelector('.game-menu'),
    wrapper = document.querySelector('.wrapper'),
    panels = document.querySelector('.game-panels'),
    screen = document.querySelector('.game-screen'),
    winScreen = document.querySelector('.win-screen'),
    gunman = document.querySelector('.gunman'),
    yourTime = document.querySelector('.time-panel__you'),
    gunmanTime = document.querySelector('.time-panel__gunman'),
    showLvl = document.querySelector('.score-panel__level'),
    message = document.querySelector('.message');

let introMus = new Audio('/sfx/intro.m4a'),
    waitingMus = new Audio('/sfx/wait.m4a'),
    shotMus = new Audio('/sfx/shot.m4a'),
    winMus = new Audio('/sfx/win.m4a'),
    fireMus = new Audio('/sfx/fire.m4a'),
    deathMus = new Audio('/sfx/death.m4a');

function startGame() {
    fromLeft = Math.random() < 0.5;
    gameMenu.style.display = 'none';
    panels.style.display = 'block';
    screen.style.display = 'block';
    wrapper.style.display = 'block';
    console.log(winMus)


    livesPanel.innerHTML = ""
    for (let i = 0; i < lives; i++) {
        livesPanel.innerHTML += '<svg xmlns="" height="80px"' +
            ' viewBox="0 -960 960 960" width="45px" fill="grey">' +
            '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>' +
            '</svg>';
    }

    gunman.classList.toggle('gunman--left', fromLeft);
    gunman.classList.toggle('gunman--right', !fromLeft);

    gunmanTime.innerHTML = (timeToDuel / 1000).toFixed(2);
    yourTime.innerHTML = (0).toFixed(2);
    score = +document.querySelector('.score-panel__score_num').innerHTML;
    showLvl.innerHTML = 'level: ' + level;
    gunman.classList.add('gunman-level-' + level);

    gunman.addEventListener('transitionend', prepareForDuel);
    setTimeout(() => {
        moveGunman();
    }, 400);
}

function restartGame() {
    deathMus.pause();
    restartButton.style.display = 'none';
    message.innerHTML = '';
    screen.classList.remove("game-screen--death");
    message.classList.remove("message--dead");
    gunman.classList.remove(`gunman-level-${level}`);
    gunman.classList.remove(`gunman-level-${level}__ready`);
    gunman.classList.remove(`gunman-level-${level}__shooting`);
    gunman.classList.remove(`gunman-level-${level}__standing`);
    gunman.classList.remove('gunman--left', 'gunman--right');

    if (lives > 1) {
        lives--;
    } else {
        score = 0;
        document.querySelector('.score-panel__score_num').innerHTML = 0;
        level = 1;
        timeToDuel = 1000;
        lives = 3;
    }
    setTimeout(function () {
        startGame();
    }, 1000);

}

function nextLevel() {
    if (level < 5) {
        nextLvlBtn.style.display = 'none';
        message.innerHTML = '';
        message.classList.remove('message--win');
        gunman.classList.remove(`gunman-level-${level}`);
        gunman.classList.remove(`gunman-level-${level}__standing`);
        gunman.classList.remove(`gunman-level-${level}__death`);
        gunman.classList.remove('gunman--left', 'gunman--right');
        level++;
        switch (level) {
            case 1:
                timeToDuel = 1000;
                break;
            case 2:
                timeToDuel = 700;
                break;
            case 3:
                timeToDuel = 500;
                break;
            case 4:
                timeToDuel = 250;
                break;
            case 5:
                timeToDuel = 100;
                break;
            default:
                timeToDuel = 1000;
        }
        startGame();
    } else {
        screen.style.display = 'none';
        panels.style.display = 'none';
        message.style.display = 'none';

        let scoreNum = +document.querySelector('.score-panel__score_num').innerHTML;
        winScreen.innerHTML = `<h2 class="win-screen__title">You have won the game with score: ${scoreNum}</h2>`
        winScreen.style.display = 'block';
    }
    fromLeft = Boolean(Math.floor(Math.random() * 2));
}

function moveGunman() {
    setTimeout(() => {
        introMus.play();
        introMus.loop = true;
        gunman.classList.add("moving");
    }, 100);
}

function prepareForDuel() {
    introMus.pause();
    waitingMus.play();
    waitingMus.currentTime = 0;
    waitingMus.loop = true;
    gunman.classList.remove("moving");
    gunman.classList.add(`gunman-level-${level}__standing`);
    gunman.classList.add("standing");
    setTimeout(() => {
        waitingMus.pause();
        gunman.classList.add(`gunman-level-${level}__ready`);
        message.classList.add('message--fire');
        fireMus.play();
        gunman.addEventListener('mousedown', playerShootsGunman);
        readyToDuel = true;
        timeCounter(new Date().getTime());
        setTimeout(gunmanShootsPlayer, timeToDuel);
    }, 1000);
}

function timeCounter(t) {
    let currentTime;
    (function timeCompare() {
        currentTime = new Date().getTime();
        if (readyToDuel) {
            time = ((currentTime - t + 10) / 1000).toFixed(2);
            yourTime.innerHTML = time;
            setTimeout(timeCompare, 10);
        }
    })();
}

function gunmanShootsPlayer() {
    if (readyToDuel) {
        gunman.classList.remove('standing');
        gunman.classList.add('gunman-level-' + level + '__shooting');
        setTimeout(function () {
            shotMus.play();
            message.classList.remove('message--fire');
            screen.classList.add('game-screen--death');
            message.classList.add('message--dead');
            message.innerHTML = 'You are dead!';
        }, timeToDuel);
        gunman.removeEventListener('mousedown', playerShootsGunman);
        setTimeout(function () {
            deathMus.play();
            restartButton.style.display = 'block';
        }, 1000);
        readyToDuel = false;
    }
}

function playerShootsGunman() {
    if (readyToDuel) {
        shotMus.play();
        message.classList.remove('message--fire');
        gunman.classList.remove('standing');
        gunman.classList.remove('gunman-level-' + level + '__shooting');
        gunman.classList.add('gunman-level-' + level + '__death');
        gunman.removeEventListener('mousedown', playerShootsGunman);
        winMus.play();
        gunman.classList.remove('gunman--left', 'gunman--right');
        setTimeout(() => {
            message.classList.add('message--win');
            message.innerHTML = 'You Win!';
            scoreCount();
            nextLvlBtn.style.display = 'block';
        }, 1000);
        readyToDuel = false;
    }
}

function scoreCount() {
    let scoreDiv = document.querySelector('.score-panel__score_num');
    let temp = +((timeToDuel - parseInt(yourTime.innerHTML)) * level * level).toFixed(0);
    let count = () => {
        if (+scoreDiv.innerHTML - score < temp) {
            scoreDiv.innerHTML = +scoreDiv.innerHTML + 100;
            setTimeout(count, 10);
        }
    }
    count();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
nextLvlBtn.addEventListener('click', nextLevel)
