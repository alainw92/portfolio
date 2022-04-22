var isIE = window.document.documentMode ? true : false;
var ieMessage =
	"<div style='padding: 16px;'><p>Ta strona nie wspiera przeglądarki Internet Explorer.</p><p>Proszę użyj normalnej przeglądarki internetowej.</p><p>Np. <a href='https://www.google.com/intl/pl_pl/chrome/'>Chrome</a></p></div>";
if (isIE) {
	var body = document.getElementsByTagName("body");
	body[0].innerHTML = ieMessage;
}
