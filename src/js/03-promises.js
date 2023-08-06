import Notiflix from "notiflix";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  submit: document.querySelector(".form"),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
}
refs.submit.addEventListener("click", allcreatePromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function allcreatePromise(e) {
  e.preventDefault();
  let valueDelay = Number(refs.delay.value);
  let valueStep = Number(refs.step.value);
  let valueAmount = Number(refs.amount.value);

  for (let i = 1; i <= valueAmount; i += 1) {
    let promDel = valueDelay + valueStep * i;

    createPromise(i, promDel)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

