$().ready(function() {

	const FPS = 30;
	const BACKGROUND_COLOR = "#080808";

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

	var Trail = function(canvas_width, canvas_height) {
		var getRandomColor = function() {
			const ORANGE = "#CC6600";
			var colors = ["red", "green", "yellow", "cyan", ORANGE, "purple"]
			return colors[Math.floor(Math.random() * colors.length)];
		}

		var getRandomTrigFn = function() {
			var fns = [Math.sin, Math.cos];
			return fns[Math.floor(Math.random() * 2)];
		}

		this.color = getRandomColor();
		this.cur_pos = 0;
		this.max_length = Math.floor((Math.random() * FPS / 2) + FPS / 2);
		this.path = [];
		this.speed = Math.PI;
		this.x = Math.random() * canvas_width;
		this.fn = getRandomTrigFn();
		this.y = this.fn(this.x);
		this.start_y = Math.random() * canvas_height + canvas_height / 2;
		this.y_coefficient = Math.random() * .5 + .5;
	};

	Trail.prototype.update = function(canvas_width, canvas_height) {
		if (this.path.length < this.max_length) {
			this.path.push([this.x, this.y]);
		} else {
			this.path[this.cur_pos] = [this.x, this.y];
		}
		this.cur_pos = (this.cur_pos + 1) % this.max_length;
		this.x = (this.x + this.speed) % canvas_width;
		this.y = this.start_y + this.fn(this.x * 3/4) * canvas_height * this.y_coefficient;
	}

	Trail.prototype.render = function(ctx) {
		ctx.beginPath();
		var point;
		var last_point
		for (var i = 0; i < this.path.length; i++) {
			point = this.path[(i + this.cur_pos) % this.path.length];
			var last_point = this.path[(i + this.cur_pos - 1 + this.path.length) % this.path.length];
			if (last_point && Math.abs(last_point[0] - point[0]) < 50) {
				ctx.lineTo(Math.floor(point[0]), Math.floor(point[1]));
				last_point = point;
			} else if (last_point) {
				ctx.strokeStyle = this.color;
				ctx.stroke();
				ctx.beginPath();
				ctx.lineTo(Math.floor(point[0]), Math.floor(point[1]));
			}
		}
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}


	var generateTrails = function(canvas_width, canvas_height) {
		var trails = [];
		var num_trails = canvas_width / 5;

		for (var i =0; i < num_trails; i++) {
			trails.push(new Trail(canvas_width, canvas_height));
		}

		return trails;
	};

	var setup = function() {
		var trails_canvas = $("#trails")[0];
		var trails_ctx = trails_canvas.getContext('2d');
		trails_ctx.lineWidth = 1;
		trails_ctx.lineCap = 'round';
		trails_ctx.lineJoin = 'round';
		trails_canvas.width = window.innerWidth;

		trails_ctx.fillStyle = BACKGROUND_COLOR;

		var hamburger = $("#menu");

		hamburger.on('click', toggle_for_nav_click);

		$(window).on('resize', fix_menu_for_resize);

		$(document).on('mousemove', function(event) {
			trails_mouse_x = event.clientX - (trails_canvas.offsetLeft - window.pageXOffset);
			trails_mouse_y = event.clientY - (trails_canvas.offsetTop - window.pageYOffset);
		});

		var trails = generateTrails(trails_canvas.width, trails_canvas.height);

		trails_ctx.fillRect(0, 0, trails_canvas.width, trails_canvas.height);

		setInterval(function() {
			for (var i = 0; i < trails.length; i++) {
				trails[i].update(trails_canvas.width, trails_canvas.height);
			}
			trails_ctx.fillStyle = BACKGROUND_COLOR;
			trails_ctx.fillRect(0, 0, trails_canvas.width, trails_canvas.height);
			for (var j = 0; j < trails.length; j++) {
				trails[j].render(trails_ctx);
			}
		}, 1000 / FPS);
	};

	setup();
});