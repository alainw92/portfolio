let ticking = false;
let moveOrnamentPos = 0;
function updateOrnamentPosition() {
	ticking = false;
	$(".aside__ornament").css("top", moveOrnamentPos);
}

export default {
	debounce(func, timeout = 50) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	},

	calcDynamicElements(scrollPos, windowHeight) {
		this.toggleScrollBtn(scrollPos, windowHeight);
		this.matchLinkActive(scrollPos, windowHeight);
		// privacy dialog management
		this.dialog("#privacy.dialog", "#privacy-dialog-trigger", "#privacy-btn-close", scrollPos);
	},

	toggleScrollBtn(scrollPos, windowHeight) {
		if (scrollPos > 0 || windowHeight < 660) {
			$("#scroll-down-btn").fadeOut();
		}
		if (scrollPos === 0 && windowHeight >= 660) {
			$("#scroll-down-btn").fadeIn();
		}
	},

	matchLinkActive(scrollPos, windowHeight) {
		$(".main-menu-list .menu-link").each((i, el) => {
			let target = $(el).attr("href");
			if (target === "#") {
				target = "body";
			}
			let scrollOffset = $(target)[0].offsetTop;
			let changeOffset = scrollOffset - windowHeight / 2;
			let documentHeight = $("body")[0].clientHeight;
			let countItems = $(".main-menu-list .menu-link").length;

			if (scrollPos >= changeOffset) {
				$(".main-menu-list .menu-link").removeClass("link--active");
				$(el).addClass("link--active");
			}
			if (scrollPos >= documentHeight - windowHeight - 50 && countItems === i + 1) {
				$(".main-menu-list .menu-link").removeClass("link--active");
				$(el).addClass("link--active");
			}
		});

		// on clicked link change class immidiately
		$(".main-menu-list .menu-link").click((e) => {
			$(".main-menu-list .menu-link").removeClass("link--active");
			$(e.target).addClass("link--active");
		});

		this.moveOrnament();
	},

	moveOrnament() {
		let docWidth = $(document).width();
		if (docWidth < 984) {
			return;
		}

		let menuItemHeight = $(".menu-link").height();
		let menuItemActive = $(".main-menu-list .menu-link.link--active");
		let menuItemActivePos = menuItemActive.position().top + menuItemHeight / 2;

		moveOrnamentPos = menuItemActivePos;

		if (!ticking) {
			requestAnimationFrame(updateOrnamentPosition);
		}
		ticking = true;
	},

	closeMenuOnClick(e) {
		if (e.target.id !== "menu-trigger") {
			if ($("#menu-trigger").prop("checked")) {
				$("#menu-trigger").prop("checked", false);
			}
		} else {
			if ($(".menu-btn.menu-open").css("opacity") === "0") {
				$("#menu-trigger").prop("checked", false);
			}
		}
	},

	notBreakSingleChars() {
		$(".plain-text").each((i, el) => {
			let text = $(el).text();
			text = text.replace(/ ([a-zA-Z]) /g, " $1" + "\u00A0");
			$(el).text(text);
		});
	},

	// DIALOG
	dialog(dialogSelector, openSelector, closeSelector, scrollPosition) {
		const SCROLL_BEHAVIOR = $("html").css("scroll-behavior");

		let docTop = document.body.style.top;

		// open
		$(document).on("click", openSelector, scrollPosition, () => {
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollPosition}px`;
			//
			// $(dialogSelector).fadeIn();
			$(dialogSelector).removeClass("dialog--inactive");
			$(dialogSelector).addClass("dialog--active");
		});
		// close
		$(document).on("click", closeSelector, docTop, () => {
			const scrollY = docTop;
			document.body.style.position = "";
			document.body.style.top = "";
			$("html").css("scroll-behavior", "unset");
			window.scrollTo(0, parseInt(scrollY || "0") * -1);
			$("html").css("scroll-behavior", SCROLL_BEHAVIOR);
			//
			// $(dialogSelector).fadeOut();
			$(dialogSelector).removeClass("dialog--active");
			$(dialogSelector).addClass("dialog--inactive");
		});
	},
};

/* 
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
		let changeOffset = scrollOffset - windowHeight / 2;
		let documentHeight = $("body")[0].clientHeight;
		let countItems = $(".main-menu-list .menu-link").length;

		if (scrollPos >= changeOffset) {
			$(".main-menu-list .menu-link").removeClass("link--active");
			$(el).addClass("link--active");
		}
		if (scrollPos >= documentHeight - windowHeight - 50 && countItems === i + 1) {
			$(".main-menu-list .menu-link").removeClass("link--active");
			$(el).addClass("link--active");
		}
	});
}
 */
