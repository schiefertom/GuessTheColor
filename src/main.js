"use strict";
const RED = "red";
const GREEN = "green";
const BLUE = "blue";
const RESET_BUTTON = document.querySelector("#color-reset-button");
const COLOR_BUTTONS = document.querySelectorAll('.color-button');
let buttonToGuess;
let answerField =  document.querySelector('#color-answer');

/*
const OBSERVER = new MutationObserver(() => {
   console.log("Callback that runs when observer is triggered.")
    answerField.classList.add("animation-trigger");

});
OBSERVER.observe(answerField, {"childList" : true});
*/

RESET_BUTTON.addEventListener("click", (event) => {
    createRandomColors(COLOR_BUTTONS);
    printQuestion();

    COLOR_BUTTONS.forEach((button) => {
        button.addEventListener("click", (event) => {
            requestAnimationFrame(() => {
                answerField.classList.add("animation-trigger");
            });

            if (event.target === buttonToGuess) {
                answerField.textContent = "Nice. Right answer. You are a RGB Pro!";
            }
            else {
                answerField.textContent = "Try again.";
            }
            answerField.classList.remove("animation-trigger");
        });
    });
    event.target.textContent = "Reset game";
    answerField.textContent = "";
});


function printQuestion() {
    let colorValueText = document.querySelector('#color-value');
    buttonToGuess = COLOR_BUTTONS.item(Math.floor(Math.random()*COLOR_BUTTONS.length));
    colorValueText.textContent = `Click the circle which has the following style: ${buttonToGuess.style.backgroundColor}`;
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


//=========
//console.log(document.querySelector('#google-map'));
document.querySelector('#color-answer').setAttribute("myValue", "new value");