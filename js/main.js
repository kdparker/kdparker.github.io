$().ready(function() {

	const FPS = 30;
	const BACKGROUND_COLOR = "#080808";

	var trails_mouse_x = -1;
	var trails_mouse_y = -1;

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
			const ORANGE = "#CC6600"
			var colors = ["red", "green", "yellow", "cyan", ORANGE, "purple", "white"]
			return colors[Math.floor(Math.random() * colors.length)];
		}

		var getVelocityComponent = function() {
			var mag = (Math.random() * 3) + 1;
			if (Math.random() < 0.5) {
				return mag * -1;
			}
			return mag;
		}

		this.color = getRandomColor();
		this.cur_pos = 0;
		this.max_length = Math.floor((Math.random() * FPS * 3) + FPS);
		this.path = [];
		this.velocity = [getVelocityComponent(), getVelocityComponent()];
		this.x = Math.random() * canvas_width;
		this.y = Math.random() * canvas_height;
	};

	Trail.prototype.update = function() {
		if (this.path.length < this.max_length) {
			this.path.push([this.x, this.y]);
		} else {
			this.path[this.cur_pos] = [this.x, this.y];
		}
		this.cur_pos = (this.cur_pos + 1) % this.max_length;
		this.x += this.velocity[0];
		this.y += this.velocity[1];
	}

	Trail.prototype.render = function(ctx) {
		ctx.beginPath();
		var point;
		for (var i = 0; i < this.path.length; i++) {
			point = this.path[(i + this.cur_pos) % this.path.length];
			ctx.lineTo(Math.floor(point[0]), Math.floor(point[1]));
		}
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}

	var generateTrails = function(canvas_width, canvas_height) {
		var trails = [];
		var num_trails = Math.floor((Math.random() * 15) + 15);

		for (var i =0; i < num_trails; i++) {
			trails.push(new Trail(canvas_width, canvas_height));
		}

		return trails;
	};

	var setup = function() {
		var trails_canvas = $("#trails")[0];
		var trails_ctx = trails_canvas.getContext('2d')
		trails_canvas.width = window.innerWidth;
		trails_canvas.height = window.innerHeight;

		trails_ctx.fillStyle = BACKGROUND_COLOR;

		var hamburger = $("#menu");

		hamburger.on('click', toggle_for_nav_click);

		$(window).on('resize', fix_menu_for_resize);

		$(document).on('mousemove', function(event) {
			trails_mouse_x = event.clientX - (trails_canvas.offsetLeft - window.pageXOffset);
			trails_mouse_y = event.clientY - (trails_canvas.offsetTop - window.pageYOffset);
		});

		var trails = generateTrails(trails_canvas.width, trails_canvas.height);

		for (var i = 0; i < trails.length; i++) {
			console.log(i + ":");
			console.log("  color: " + trails[i].color);
			console.log("  path length: " + trails[i].path_length);
			console.log("  x: " + trails[i].x);
			console.log("  y: " + trails[i].y);
		}

		trails_ctx.fillRect(0, 0, trails_canvas.width, trails_canvas.height);

		for (var i in trails[0]) {
			console.log(i);
		}

		setInterval(function() {
			for (var i = 0; i < trails.length; i++) {
				trails[i].update();
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