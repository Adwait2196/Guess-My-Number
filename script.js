'use strict';

const gameValues = {
    secretNumber: Math.trunc(Math.random() * 20) + 1,
    playersScore: 20,
    highScore: 0,
    messageSelector: document.querySelector('.message'),
    scoreSelector: document.querySelector('.score'),
    numberSelector: document.querySelector('.number'),
    bodySelector: document.querySelector('body'),
    highScoreSelector: document.querySelector('.highscore'),
    guessSelector: document.querySelector('.guess'),
    checkSelector: document.querySelector('.check'),
    againSelector: document.querySelector('.again'),
};

const editTheMessage = function (message) {
    gameValues.messageSelector.textContent = message;
};

const editTheScore = function (score) {
    gameValues.scoreSelector.textContent = `${score}`;
};

const editTheNumber = function (number) {
    gameValues.numberSelector.textContent = number;
};

const editTheNumberAndBodyStyle = function (
    bodyProp,
    bodyVal,
    numberProp,
    numberVal
) {
    gameValues.bodySelector.style[bodyProp] = `${bodyVal}`;
    gameValues.numberSelector.style[numberProp] = `${numberVal}`;
};

const numberValidChecker = function (numberEntered) {
    if (!numberEntered) {
        editTheMessage(`Please enter some number!`);
        return false;
    } else if (numberEntered && (numberEntered > 20 || numberEntered < 1)) {
        editTheMessage(`Only 1 to 20 allowed!`);
        return false;
    } else if (numberEntered && numberEntered <= 20 && numberEntered >= 1) {
        return true;
    }
};

const calculateHighScore = function (currentScore) {
    if (currentScore > gameValues.highScore) {
        gameValues.highScore = currentScore;
        gameValues.highScoreSelector.textContent = currentScore;
    }
};

const checkTheAnswer = function () {
    const guessedNumber = Number(gameValues.guessSelector.value);
    if (numberValidChecker(guessedNumber)) {
        if (gameValues.playersScore > 1) {
            if (guessedNumber !== gameValues.secretNumber) {
                editTheMessage(
                    guessedNumber > gameValues.secretNumber
                        ? `Guessed number too high!`
                        : `Guessed number too low!`
                );
                gameValues.playersScore--;
                editTheScore(gameValues.playersScore);
            } else if (guessedNumber === gameValues.secretNumber) {
                editTheMessage(`You guessed the correct number!`);
                editTheNumber(gameValues.secretNumber);
                editTheNumberAndBodyStyle(
                    `backgroundColor`,
                    `#60b347`,
                    `width`,
                    `30rem`
                );
                calculateHighScore(gameValues.playersScore);
            }
        } else {
            editTheScore(0);
            editTheMessage(`Game over!`);
        }
    }
};

const resetTheGame = function () {
    gameValues.secretNumber = Math.trunc(Math.random() * 20) + 1;
    gameValues.playersScore = 20;
    editTheMessage(`Start guessing...`);
    editTheScore(gameValues.playersScore);
    editTheNumber(`?`);
    editTheNumberAndBodyStyle(`backgroundColor`, `#222`, `width`, `15rem`);
    gameValues.guessSelector.value = ``;
};

gameValues.checkSelector.addEventListener('click', checkTheAnswer);
gameValues.againSelector.addEventListener('click', resetTheGame);
