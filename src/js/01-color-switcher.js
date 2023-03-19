// get access to elements
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

// function to generate a random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// function to event handler startBtn
function onStart() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopBtn.disabled = false;
  startBtn.disabled = true;
}

// function to event handler stoptBtn
function onStop() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
}

// add event listeners
startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);
