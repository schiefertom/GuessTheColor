"use strict";
const RED = "red";
const GREEN = "green";
const BLUE = "blue";
const RESET_BUTTON = document.querySelector("#color-reset-button");
const COLOR_BUTTONS = document.querySelectorAll('.color-button');
let buttonToGuess;
let answerField =  document.querySelector('#color-answer');

RESET_BUTTON.addEventListener("click", (event) => {
    createRandomColors(COLOR_BUTTONS);
    printQuestion();
    COLOR_BUTTONS.forEach((button) => {
        button.addEventListener("click", () => {
            if (button === buttonToGuess) {
                answerField.innerHTML = "Nice. Right answer. You are a RGB Pro!";
            }
            else {
                answerField.innerHTML = "Try again.";
            }
        });
    });
    event.target.innerHTML = "Reset game";
    answerField.innerHTML = "";
});


function printQuestion() {
    let colorValueText = document.querySelector('#color-value');
    buttonToGuess = COLOR_BUTTONS.item(Math.floor(Math.random()*COLOR_BUTTONS.length));
    let styleAttribute = buttonToGuess.getAttribute("style");
    colorValueText.innerHTML = `Click the circle which has the following style:<br> ${styleAttribute}`;
}

function setButtonColor(button, red, green, blue) {
    button.setAttribute('style', `background-color: rgb(${red}, ${green}, ${blue});`);
}

function createRandomColors(colorButtons) {
    let colors = {
      [RED]: 0,
      [GREEN]: 0,
      [BLUE]: 0
    };

    colorButtons.forEach((button) => {
        for(const color in colors) {
            colors[color] = makeColorValue();
        }
        setButtonColor(button, colors[RED], colors[GREEN], colors[BLUE]);
    });
}

function makeColorValue() {
    return Math.round(Math.random()*255);
}