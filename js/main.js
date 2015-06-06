$().ready(function() {
	var hamburger = $("#menu");

	hamburger.on('click', function() {
		$(".navs-container").toggleClass('open');
		$(".hamburger").toggleClass('open');
	});
});