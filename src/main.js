"use strict";
const RED = "red";
const GREEN = "green";
const BLUE = "blue";
const RESET_BUTTON = document.querySelector("#color-reset-button");
const COLOR_BUTTONS = document.querySelectorAll('.color-button');
const COLOR_BUTTONS_DIV = document.querySelector('#color-button-wrapper');
let buttonToGuess;
let answerField = document.querySelector('#color-answer');
let tmpButton = document.querySelector('#temp');

/*
const OBSERVER = new MutationObserver(() => {
   console.log("Callback that runs when observer is triggered.")
    answerField.classList.add("animation-trigger");

});
OBSERVER.observe(answerField, {"childList" : true});
*/

function tmpFunc(event) {
    console.log("Click button target: ", event.target);
    console.log("Click button currentTarget: ", event.currentTarget);
    event.stopPropagation();
}

tmpButton.addEventListener("click", tmpFunc);

//event bubbling: event is triggered on button but catched on DIV. event.target is the button. event.currentTarget is the div
COLOR_BUTTONS_DIV.addEventListener("click", (event) => {
    requestAnimationFrame(() => {
        answerField.classList.add("animation-trigger");
    });

    if (event.target === buttonToGuess) {
        answerField.textContent = "Nice. Right answer. You are a RGB Pro!";
    } else {
        answerField.textContent = "Try again.";
    }
    console.log("Div target", event.target);
    console.log("Div currentTarget", event.currentTarget);
    answerField.classList.remove("animation-trigger");


    event.stopPropagation();    //<-- we prevent further bubbling and propagation. in this case we stop the capturing (because true, one line below) at the div and the eventlistener on the button is not triggered
}, true); //the third parameter changes the behavior from bubbling to capturing. this means the eventlistener on the DIV is fired first


RESET_BUTTON.addEventListener("click", (event) => {
    createRandomColors(COLOR_BUTTONS);
    printQuestion();
    answerField.classList.add('active');
    COLOR_BUTTONS_DIV.classList.add('active');
    event.target.textContent = "Reset game";
    answerField.textContent = "";
});


function printQuestion() {
    let colorValueText = document.querySelector('#color-value');
    buttonToGuess = COLOR_BUTTONS.item(Math.floor(Math.random() * COLOR_BUTTONS.length));
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
        for (const color in colors) {
            colors[color] = makeColorValue();
        }
        setButtonColor(button, colors[RED], colors[GREEN], colors[BLUE]);
    });
}

function makeColorValue() {
    return Math.round(Math.random() * 255);
}


//=========
//console.log(document.querySelector('#google-map'));
document.querySelector('#color-answer').setAttribute("myValue", "new value");