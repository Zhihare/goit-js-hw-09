import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';
import anime from 'animejs/lib/anime.es.js';

const refs = {
	input: document.getElementById("datetime-picker"),
	start: document.querySelector("[data-start]"),
	day: document.querySelector("[data-days]"),
	seconds: document.querySelector("[data-seconds]"),
	minutes: document.querySelector("[data-minutes]"),
	hours: document.querySelector("[data-hours]"),
}
refs.start.disabled = 'true';

let intervalId = null;
let selectedDate = null;
let currentDate = null;

refs.start.addEventListener("click", startTimer);
function startTimer() {
	intervalId = setInterval(() => {
		refs.start.disabled = 'true';
		refs.input.disabled = 'true';
		currentDate = Date.now();
		const timerProg = selectedDate - currentDate;

	})
}


const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		console.log(selectedDates[0]);
		if (selectedDates[0].getTime() < Date.now()) {
			Notiflix.Notify.failure('Please choose a date in the future');
			Notiflix.Block.hourglass('.timer', {
				cssAnimationDuration: 1881,
				svgSize: '40px',
			});
		} else {
			selectedDate = selectedDates[0].getTime();
			refs.start.removeAttribute("disabled");
			Notiflix.Notify.success("Click on start!");
			Notiflix.Block.remove('.timer');
		}
	},
};

flatpickr(refs.input, options);


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