// 3 подключить библиотеку flatpickr и настроить ее (алерт, опции)
// 4 поставить проверку текущей даты к выбранной и активацию кнопки
// 5 добавить функцию на отрображение времени из 0 в 00
// 6 сделать минимальное оформление элементов
// 7 вместо алерта можно подключить notifix

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
};
const alertMsg = 'Please choose a date in the future';

const timer = {
  start() {
    const startTime = Date.now();
    console.log(`🚀 ~ start ~ startTime`, startTime);

    setInterval(() => {
      const currentTime = Date.now();
      console.log(`🚀 ~ setInterval ~ currentTime`, currentTime);

      deltaTime = currentTime - startTime;
      const timeComponents = convertMs(deltaTime);
      //   console.log(`🚀 ~ setInterval ~ timeComponents`, timeComponents);
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
      //   console.log(
      //     options.onClose(selectedDates[0]).getTime() -
      //       options.defaultDate.getTime()
      //   );
      refs.startBtn.disabled = false;
    } else {
      alert(alertMsg);
    }
  },
};

timer.start();

flatpickr(refs.input, options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtn);

function onStartBtn(e) {
  //   console.log(options.onClose().getTime() - options.defaultDate.getTime());
  console.log(e);
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
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
