// 3 сделать вызов функции createPromise amount раз с интервалом delay
// 4 первый промис появляется через firstDelay секунд
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  firstDelayInput: document.querySelector('[name=delay]'),
  delayStepInput: document.querySelector('[name=step]'),
  amountInput: document.querySelector('[name=amount]'),
  submitBtn: document.querySelector('[type=submit]'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let firstDelay = Number(refs.firstDelayInput.value);
  let delayStep = Number(refs.delayStepInput.value);
  let amount = Number(refs.amountInput.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, firstDelay)
      .then(success => {
        Notify.success(success);
      })
      .catch(error => {
        Notify.failure(error);
      });
    firstDelay += delayStep;
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
