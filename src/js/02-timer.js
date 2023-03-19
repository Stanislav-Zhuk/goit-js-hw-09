import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');
import { Report } from 'notiflix/build/notiflix-report-aio';

// 
const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

// get access to elements
const calendar = document.querySelector('#datetime-picker');
const timerValues = document.querySelectorAll('.value');
const startBtn = document.querySelector('[data-start]');

startBtn.disabled = true; // initial state of the button

// flatpicker options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateCheck(selectedDates);
  },
};

flatpickr(calendar, options);

Report.info(
  'Please, choose a date and click on start'
);

// function to check date 
function onDateCheck(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();

  if (selectedDate > currentDate) {
    startBtn.disabled = false;
    Report.success(
      'Congratulation! Click on start!'
    );
    return;
  }
    Report.failure(
    'Please choose a date in the future'
  );
}