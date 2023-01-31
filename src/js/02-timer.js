// 6 сделать минимальное оформление элементов
// 7 вместо алерта можно подключить notifix

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};
const alertMsg = 'Please choose a date in the future';
let deltaTime = null;

const timer = {
  intervalId: null,
  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const selectedTime = new Date(refs.input.value);

      deltaTime = selectedTime.getTime() - currentTime;
      const timeComponents = convertMs(deltaTime);

      updateTimer(timeComponents);
    }, 1000);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
      console.log(
        (deltaTime = convertMs(
          selectedDates[0].getTime() - options.defaultDate.getTime()
        ))
      );

      refs.startBtn.disabled = false;
    } else {
      alert(alertMsg);
    }
  },
};

flatpickr(refs.input, options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
  timer.start();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.mins.textContent = addLeadingZero(minutes);
  refs.secs.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
