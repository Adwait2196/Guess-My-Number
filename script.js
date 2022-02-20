'use strict';

const gameValues = {
    secretNumber: Math.trunc(Math.random() * 20) + 1,
    playersScore: 20,
    highScore: 0,
};

const editTheMessage = function (message) {
    document.querySelector('.message').textContent = message;
};

const editTheScore = function (score) {
    document.querySelector('.score').textContent = `${score}`;
};

const editTheNumber = function (number) {
    document.querySelector('.number').textContent = number;
};

const editTheNumberAndBodyStyle = function (
    bodyProp,
    bodyVal,
    numberProp,
    numberVal
) {
    document.querySelector('body').style[bodyProp] = `${bodyVal}`;
    document.querySelector('.number').style[numberProp] = `${numberVal}`;
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
        document.querySelector('.highscore').textContent = currentScore;
    }
};

const checkTheAnswer = function () {
    const guessedNumber = Number(document.querySelector('.guess').value);
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
    document.querySelector('.guess').value = ``;
};

document.querySelector('.check').addEventListener('click', checkTheAnswer);
document.querySelector('.again').addEventListener('click', resetTheGame);
