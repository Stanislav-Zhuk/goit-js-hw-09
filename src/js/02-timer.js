import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');
import { Report } from 'notiflix/build/notiflix-report-aio';

// constants
const TIMER_DELAY = 1000;

// initial states
let intervalId = null;
let selectedDate = null;
let currentDate = null;
let remainingTime = 0;

// get access to elements
const calendar = document.querySelector('#datetime-picker');
const timerValues = document.querySelectorAll('.value');
const startBtn = document.querySelector('[data-start]');

startBtn.disabled = true; // initial state of the button
startBtn.addEventListener('click', timerStart);

// flatpicker options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > new Date().getTime()) {
      onDateCheck(selectedDates);
    } else {
      Report.failure(
        'Please choose a date in the future'
      );
    }
  },
};

// initialize Flatpickr
flatpickr(calendar, options);

Report.info(
  'Please, choose a date and click on start'
);

// function to check date 
function onDateCheck(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();

  startBtn.disabled = false;
  Report.success(
    'Congratulation! Click on start!'
  );
}

// function to start timer 
function timerStart() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      startBtn.disabled = true;
      calendar.disabled = false;
      Report.info(
        'Congratulation! Timer stopped!'
      );
      return;
    } else {
      startBtn.disabled = true;
      calendar.disabled = true;
      currentDate += 1000;
      remainingTime = Math.floor(selectedDate - currentDate);
      const timeValues = convertMs(remainingTime);
      updateCountdownTimer(timeValues);
    }
  }, TIMER_DELAY);
}

// function to convert ms
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// function to add leading zero
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// function to update countdown timer
function updateCountdownTimer({ days, hours, minutes, seconds }) {
  timerValues[0].textContent = `${days}`;
  timerValues[1].textContent = `${hours}`;
  timerValues[2].textContent = `${minutes}`;
  timerValues[3].textContent = `${seconds}`;
}