const generateButton = document.getElementById("generateButton");
const generatedNumber = document.getElementById("generatedNumber");
const smallNumbers = document.getElementsByClassName("smallButton");
const number5 = document.getElementById("number5");
const number6 = document.getElementById("number6");
const yourSolution = document.getElementById("yourSolution");

function restart() {
  yourSolution.innerHTML = "";
  yourSolution.style.backgroundColor = "rgb(232, 232, 180)";
  yourSolution.style.color = "grey";
  numberClicked = false;
  textSolution = "";

  for (let btn of allSmallButtons) {
    btn.style.filter = "none";
    btn.disabled = false;
  }
  for (let btn of allBigButtons) {
    btn.style.filter = "none";
    btn.disabled = false;
  }
}

generateButton.addEventListener("click", function () {
  restart();
  restartTimer();
  generatedNumber.innerHTML = Math.round(Math.random() * 1000).toString();
  for (const number of smallNumbers) {
    number.innerHTML = Math.round(1 + Math.random() * 8).toString();
  }
  number5.innerHTML = ((2 + Math.round(Math.random() * 2)) * 5).toString();
  number6.innerHTML = (1 + Math.round(Math.random() * 3)) * 25;
  generateButton.style.filter = "blur(2px)";
  this.disabled = true;
});

const allSmallButtons = document.querySelectorAll(".smallButton");
const allBigButtons = document.querySelectorAll(".bigButton");
const allOperationButtons = document.querySelectorAll(".operation");
let numberClicked = false;
let textSolution = "";

for (let btn of allSmallButtons) {
  btn.addEventListener("click", function () {
    if (!numberClicked) {
      let clicked = this.textContent;
      textSolution = textSolution + clicked;
      yourSolution.innerHTML = textSolution.toString();
      btn.disabled = true;
      this.style.filter = "blur(2px)";
      numberClicked = true;
    }
  });
}
for (let btn of allBigButtons) {
  btn.addEventListener("click", function () {
    if (!numberClicked) {
      let clicked = this.textContent;
      textSolution = textSolution + clicked;
      yourSolution.innerHTML = textSolution.toString();
      btn.disabled = true;
      this.style.filter = "blur(2px)";
      numberClicked = true;
    }
  });
}

for (let btn of allOperationButtons) {
  btn.addEventListener("click", function () {
    let clicked = this.textContent;
    textSolution = textSolution + clicked;
    yourSolution.innerHTML = textSolution.toString();
    numberClicked = false;
  });
}

const check = document.getElementById("checkButton");
check.addEventListener("click", function () {
  let yourExpression = yourSolution.textContent;
  let result = eval(yourExpression);
  if (result === parseInt(generatedNumber.textContent)) {
    yourSolution.innerHTML = `WELL DONE!!! You won ${100+timeLeft} points`;
    yourSolution.style.backgroundColor = "rgb(90, 200, 90)";
    yourSolution.style.color = "white";
  } else {
    yourSolution.innerHTML = "WRONG! TRY NEW GAME.";
    yourSolution.style.backgroundColor = "rgb(213, 90, 90)";
    yourSolution.style.color = "white";
  }

  stopTimer();
  generateButton.innerHTML = "NEW GAME";
  generateButton.style.filter = "none";
  generateButton.disabled = false;
});

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", function () {
  restart();
});

let timeLeft = 60;
const numberTimer = document.getElementById("numberTimer");
const fillGraphicTimer = document.getElementById("fillGraphicTimer");
var counter;
var timeout;

function restartTimer() {
  timeLeft = 60;
  numberTimer.innerHTML = timeLeft.toString();
  fillGraphicTimer.style.width = 100 + "%";
  fillGraphicTimer.style.backgroundColor = "rgb(215, 164, 70)";
  numberTimer.style.color = "blanchedalmond";

  counter = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 10) {
      fillGraphicTimer.style.backgroundColor = "red";
      numberTimer.style.color = "red";
    }
    fillGraphicTimer.style.width = (timeLeft / 60) * 100 + "%";
    numberTimer.innerHTML = timeLeft.toString();
  }, 1000);

  timeout = setTimeout(() => {
    clearInterval(counter);
    yourSolution.innerHTML = "TIME IS UP";
    yourSolution.style.backgroundColor = "rgb(213, 90, 90)";
    yourSolution.style.color = "white";
    generateButton.style.filter = "none";
    generateButton.disabled = false;
  }, 60500);
}

function stopTimer() {
  clearInterval(counter);
  clearTimeout(timeout);
}
