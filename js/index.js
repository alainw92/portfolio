import functions from "./functions.js";

let scrollPosition = null;
let windowHeight = window.innerHeight;

$(function () {
	scrollPosition = window.scrollY;
	functions.calcDynamicElements(scrollPosition, windowHeight);

	// on scroll
	$(window).scroll(
		functions.debounce(() => {
			scrollPosition = window.scrollY;

			functions.calcDynamicElements(scrollPosition, windowHeight);
		})
	);

	//on resize
	$(window).resize(
		functions.debounce(() => {
			windowHeight = window.innerHeight;

			functions.calcDynamicElements(scrollPosition, windowHeight);
		})
	);

	// close menu on click
	$(document).click((e) => {
		functions.closeMenuOnClick(e);
	});

	// move single letters at the end of line to next line
	functions.notBreakSingleChars();
});
