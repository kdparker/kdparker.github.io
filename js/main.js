$().ready(function() {
	var hamburger;
	var trails_canvas;
	var trails_ctx;

	var toggle_for_nav_click = function() {
		$(".navs-container").slideToggle();
		$(".hamburger").toggleClass('open');
	};

	var fix_menu_for_resize =  function() {
		if ((!$(".navs-container").is(":visible")) && $(window).width() > 650) {
			$(".navs-container").toggle();
		}

		if ($(".navs-container").is(":visible") && $(window).width() <= 650) {
			$(".hamburger").removeClass('open');
			$(".navs-container").css('display', "none");
		}
	};


	var setup = function() {
		trails_canvas = $("#trails")[0];
		trails_ctx = trails_canvas.getContext('2d')
		trails_canvas.width = window.innerWidth;
		trails_canvas.height = window.innerHeight;

		trails_ctx.fillStyle = "#080808";

		hamburger = $("#menu");

		hamburger.on('click', toggle_for_nav_click);

		$(window).on('resize', fix_menu_for_resize);

		trails_ctx.fillRect(0, 0, trails_canvas.width, trails_canvas.height);
	};

	setup();
});