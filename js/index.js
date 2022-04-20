function debounce(func, timeout = 50) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

function toggleScrollBtn(scrollPos) {
	if (scrollPos > 0 || windowHeight < 660) {
		$("#scroll-down-btn").fadeOut();
	}
	if (scrollPos === 0 && windowHeight >= 660) {
		$("#scroll-down-btn").fadeIn();
	}
}

function matchLinkActive(scrollPos) {
	// console.log(scrollPos);
	// console.log(window.innerHeight);
	// console.log($("#about")[0].offsetTop);
	$(".main-menu-list .menu-link").each((i, el) => {
		let target = $(el).attr("href");
		if (target === "#") {
			target = "body";
		}
		let scrollOffset = $(target)[0].offsetTop;

		if (scrollPos >= scrollOffset - 300) {
			$(".main-menu-list .menu-link").removeClass("link--active");
			$(el).addClass("link--active");
		}
	});
}

let scrollPosition = null;
let windowHeight = window.innerHeight;

$(function () {
	// get defaults
	const SCROLL_BEHAVIOR = $("html").css("scroll-behavior");

	scrollPosition = window.scrollY;
	toggleScrollBtn(scrollPosition);
	matchLinkActive(scrollPosition);

	// on scroll
	$(window).scroll(
		debounce(() => {
			scrollPosition = window.scrollY;

			toggleScrollBtn(scrollPosition);
			matchLinkActive(scrollPosition);
		})
	);

	//on resize
	$(window).resize(
		debounce(() => {
			windowHeight = window.innerHeight;

			toggleScrollBtn(scrollPosition);
		})
	);

	// close menu on click
	$(document).click((e) => {
		if (e.target.id !== "menu-trigger") {
			if ($("#menu-trigger").prop("checked")) {
				$("#menu-trigger").prop("checked", false);
			}
		} else {
			if ($(".menu-btn.menu-open").css("opacity") === "0") {
				$("#menu-trigger").prop("checked", false);
			}
		}
	});
	// on clicked link change class immidiately
	$(".main-menu-list .menu-link").click((e) => {
		$(".main-menu-list .menu-link").removeClass("link--active");
		$(e.target).addClass("link--active");
	});

	// privacy dialog
	// open
	$("#privacy-dialog-trigger").click(() => {
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollPosition}px`;
		//
		// $("#privacy.dialog").fadeIn();
		$("#privacy.dialog").removeClass("dialog--inactive");
		$("#privacy.dialog").addClass("dialog--active");
	});
	// close
	$("#privacy-btn-close").click(() => {
		const scrollY = document.body.style.top;
		document.body.style.position = "";
		document.body.style.top = "";
		$("html").css("scroll-behavior", "unset");
		window.scrollTo(0, parseInt(scrollY || "0") * -1);
		$("html").css("scroll-behavior", SCROLL_BEHAVIOR);
		//
		// $("#privacy.dialog").fadeOut();
		$("#privacy.dialog").removeClass("dialog--active");
		$("#privacy.dialog").addClass("dialog--inactive");
	});

	// move single letters at the end of line to next line
	$(".plain-text").each((i, el) => {
		let text = $(el).text();
		text = text.replace(/ ([a-zA-Z]) /g, " $1" + "\u00A0");
		$(el).text(text);
	});
});
