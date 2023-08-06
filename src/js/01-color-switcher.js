function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
let timerId = null;

const refs = {
	start: document.querySelector("[data-start]"),
	stop: document.querySelector("[data-stop]"),
}
refs.stop.disabled = 'true';

refs.start.addEventListener("click", color)
function color() {
	timerId = setInterval(() => {
		document.body.style.backgroundColor = `${getRandomHexColor()}`;
		// console.log(getRandomHexColor());
		refs.start.disabled = 'true';
		refs.stop.removeAttribute("disabled");
	}, 1000);
}


refs.stop.addEventListener("click", stopColor);
function stopColor() {
	clearInterval(timerId);
	refs.start.removeAttribute("disabled");
	refs.stop.disabled = 'true'
}