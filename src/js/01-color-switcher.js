const TIME_INTERVAL = 1000;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.body,
};
let timerId = null;

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
  if (!refs.startBtn.disabled) {
    refs.startBtn.disabled = true;
    timerId = setInterval(() => {
      refs.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, TIME_INTERVAL);
  }
}

function onStopBtn() {
  refs.startBtn.disabled = false;
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
}

function getRandomHexColor() {
  console.log(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
