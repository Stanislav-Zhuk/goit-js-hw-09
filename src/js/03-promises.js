import Notiflix from 'notiflix';

// get access to elements of DOM
const form = document.querySelector('.form');

// function to create promise
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

// add event listener
form.addEventListener('submit', onSubmit);

// function to submit form
function onSubmit(event) {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            borderRadius: '10px',
            timeout: 10000,
            clickToClose: true,
            cssAnimationStyle: 'from-top',
        });
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,
          {
            borderRadius: '10px',
            timeout: 10000,
            clickToClose: true,
            cssAnimationStyle: 'from-top',
        });
      });
  }
  
  form.reset()
}
