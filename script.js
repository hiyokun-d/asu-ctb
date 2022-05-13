canvas.height = "780";
canvas.width = "700";

let score = 0;
let miss = 0;

let notes = [];
let effect_text_array = [];

function music_Notes_Generator() {
	setInterval(() => {
		let x = Math.floor(Math.random() * canvas.width - 50);

		let music_notes_symbol = "♩♪♫♬♩♪♫♬♭♮♮♩♪♪";

		//make the speed is follow the beat
		let notes_limit = 10;
		if (
			music.paused ||
			music.muted ||
			music_randomize_Play == "kegabutan developernya (maya putri nelpon)" ||
			notes.length >= notes_limit
		) {
			return;
		}

		//detect beat of music and generate notes
		if (getBeat(dataArray)) {
			let notes_symbol =
				music_notes_symbol[
					Math.floor(Math.random() * music_notes_symbol.length)
				];
			notes.push(
				new music_Notes({
					x: x,
					y: 0,
					width: 20,
					height: 20,
					color: `#7BFCE6`,
					notes: notes_symbol,
					speed: 5,
				})
			);
		} else {
			return;
		}
	}, 500);
}

let effect_circle_array = [];
let effect_circle_array_limit = 5;

function effect_circle_Generator() {
	setInterval(() => {
		if (music.paused || music.muted) {
			return;
		}

		if (getBeat(dataArray)) {
			if (effect_circle_array.length < effect_circle_array_limit) {
				let x = Math.floor(Math.random() * canvas.width);
				let y = Math.floor(Math.random() * canvas.height);
				effect_circle_array.push(
					new effect_circle({
						x,
						y,
						opacitySpeed: 0.01,
						radiusSpeed: 0.5,
						color: `${Math.floor(Math.random() * 255)}, ${Math.floor(
							Math.random() * 255
						)}, ${Math.floor(Math.random() * 255)}`,
					})
				);
			}
		}
	}, 500);
}

let player = {
	x: canvas.width / 2,
	y: canvas.height - 50,
	width: 20,
	height: 20,
	color: "#00FF00",
	speed: 13,
	move: {
		left: false,
		right: false,
	},
};

// Nanairo Symphony

let health = 100;
let background_opacity = 40;

function music_config() {
	music.src = `music/${music_randomize_Play}.mp3`;

	console.log(music);
	console.log(music.error);

	addEventListener("mousemove", (e) => {
		music.play();
		music.muted = false;
		music.controls = true;
		music.autoplay = true;
		audioCtx.resume();
	});

	music.addEventListener("ended", () => {
		music.muted = true;
		music.pause();
		music_randomize_Play =
			music_list[Math.floor(Math.random() * music_list.length)];
		music.src = `music/${music_randomize_Play}.mp3`;
		notes = [];
		effect_circle_array = [];
		alert("Music is over");
	});
}

let light_Color = "178,34,34";
let light_opacity = {
	layer1: 0,
	layer2: 0,
};

function game() {
	if (!music.paused) {
		music_title.innerText = music_randomize_Play;
	} else {
		music_title.innerText = "music is paused";
	}

	score_number.innerText = score;
	miss_number.innerText = miss;

	player.y = canvas.height - 50;

	ctx.beginPath();
	ctx.fillStyle = `#BEBEBE${background_opacity}`;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.closePath();

	effect_circle_array.forEach((circle, index) => {
		circle.draw();

		if (circle.opacity < -0.05) {
			setTimeout(() => {
				effect_circle_array.splice(index, 1);
			}, 0);
		}
	});

	/* health */
	if (health > 50 && health < 100) {
		health_color = "green";
	} else if (health > 20 && health < 50) {
		health_color = "yellow";
	} else if (health > 0 && health < 20) {
		health_color = "red";
	}
	ctx.beginPath();
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(canvas.width / 2 - health / 2, 0, health, 20);
	ctx.closePath();
	/* end of health */

	/* effect circle */
	// effect_circle_array.forEach((circle) => {
	//     circle.update();
	// })
	/* end of effect circle */

	/* notes */
	notes.forEach((note) => {
		note.draw_notes();
		note.move();

		/*     return !(r1.x>r2.x+r2.w 
        || r1.x+r1.w<r2.x 
        || r1.y>r2.y+r2.h 
        || r1.y+r1.h<r2.y); */
		if (
			note.x + note.width > player.x &&
			note.x < player.x + player.width &&
			note.y + note.height > player.y &&
			note.y < player.y + player.height
		) {
			setTimeout(() => {
				notes.splice(notes.lastIndexOf(note), 1);
				score += 1;
				note.color = "red";
				if (health < 100) {
					health += 10;
				}

				effect_text_array.push(
					new text_effect({
						x: note.x,
						y: note.y,
						text: "GOOD",
						color: "0, 255, 0",
						size: 20,
						speed: 0.5,
						opacitySpeed: 0.05,
					})
				);
			}, 5-0);
		}

		if (note.y >= canvas.height) {
			setTimeout(() => {
				notes.splice(notes.lastIndexOf(note), 1);

				if (health > -0) {
					health -= 10;
				}

				miss += 1;

				effect_text_array.push(
					new text_effect({
						x: note.x,
						y: note.y,
						text: "miss",
						color: "100, 10, 3",
						size: 30,
						speed: 1,
						opacitySpeed: 0.05,
					})
				);
			}, -50);
		}
	});
	/* end of notes */

	/* easter egg */
	if (
		music_randomize_Play == "kegabutan developernya (maya putri nelpon)" &&
		!music.paused
	) {
		ctx.font = "bold 41px sans-serif";
		ctx.fillStyle = `RGBA(${Math.floor(Math.random() * 255)}, ${Math.floor(
			Math.random() * 255
		)}, ${Math.floor(Math.random() * 255)}, ${Math.random()})`;
		ctx.fillText(
			"ada telpon nih, wait",
			canvas.width / 2 - 200,
			canvas.height / 2
		);
	}

	/* effect text */
	effect_text_array.forEach((text, index) => {
		text.draw();
		text.move();
		text.fade_out();
		if (text.opacity < 0) {
			setTimeout(() => {
				effect_text_array.splice(index, 1);
			}, 0);
		}
	});
	/* end of effect text */

	/* player */
	ctx.fillStyle = "black";
	ctx.fillRect(player.x, player.y, player.width, player.height);

	if (player.move.left && player.x > 0) {
		player.x -= player.speed;
	}

	if (player.move.right && player.x < canvas.width - player.width) {
		player.x += player.speed;
	}
	/* end of player */

	/* duration music */
	music.addEventListener("timeupdate", () => {
		let duration = music.duration;
		let currentTime = music.currentTime;
		let duration_time = duration - currentTime;
		let duration_time_minutes = Math.floor(duration_time / 60);
		let duration_time_seconds = Math.floor(duration_time % 60);
		duration_time_seconds =
			duration_time_seconds < 10
				? "0" + duration_time_seconds
				: duration_time_seconds;
		duration_time_minutes =
			duration_time_minutes < 10
				? "0" + duration_time_minutes
				: duration_time_minutes;

		music_duration_show.innerText = `${duration_time_minutes}:${duration_time_seconds}`;
		music_duration_adjust = `${duration_time_minutes}:${duration_time_seconds}`;
		
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(
			0,
			canvas.height - 10,
			(music.currentTime / music.duration) * canvas.width,
			50
		);
		ctx.closePath();
	});
	/* end of duration music */

	/* visualizer animation in */
	if (music.paused) {
		visualizer_div.style.animation = "none";
	} else {
		visualizer_div.style.animation = "visualizer-canvas-in 1s forwards";
	}
	/* end of visualizer animation in */

	/* visualizer animation out */
	music.addEventListener("ended", () => {
		visualizer_div.style.animation = "visualizer-canvas-out 1s forwards";
	});
	/* end of visualizer animation out */

	let lightY_position = canvas.height - 30;
	/* bottom of screen light */
	if (!music.paused) {
		if (light_opacity.layer1 <= 0.5) {
			light_opacity.layer1++;
		}

		if (light_opacity.layer2 <= 0.3) {
			light_opacity.layer2++;
		}

		if (lightY_position <= canvas.height - 50) {
			lightY_position += 0.01;
		}

		/* light */
		ctx.beginPath();
		ctx.fillStyle = `rgba(${light_Color}, ${light_opacity.layer1})`;
		ctx.globalCompositeOperation = "lighter";
		ctx.fillRect(0, lightY_position, canvas.width, 50);
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = `rgba(${light_Color}, ${light_opacity.layer2})`;
		ctx.globalCompositeOperation = "lighter";
		ctx.fillRect(0, canvas.height - 30, canvas.width, 10);
		ctx.closePath();
		/* end of light */
	}
	/* end of bottom of screen light */
	requestAnimationFrame(game);
}

addEventListener("keydown", (e) => {
	if (e.keyCode == 65 || e.keyCode == 37 || e.keyCode == 70) {
		player.move.left = true;
	}
	if (e.keyCode == 68 || e.keyCode == 39 || e.keyCode == 74) {
		player.move.right = true;
	}
});

addEventListener("keyup", (e) => {
	if (e.keyCode == 65 || e.keyCode == 37 || e.keyCode == 70) {
		player.move.left = false;
	}
	if (e.keyCode == 68 || e.keyCode == 39 || e.keyCode == 74) {
		player.move.right = false;
	}
});

let mouseIsClick = false;
canvas.addEventListener("mousedown", (e) => {
	mouseIsClick = true;
});

canvas.addEventListener("mouseup", (e) => {
	mouseIsClick = false;
});

canvas.addEventListener("mouseout", (e) => {
	mouseIsClick = false;
});

canvas.addEventListener("mousemove", (e) => {
	if (mouseIsClick) {
		player.x = e.clientX - player.width / 2 - canvas.offsetLeft;
	}
});

class effect_circle {
	constructor({ x, y, opacitySpeed, radiusSpeed, color }) {
		this.x = x;
		this.y = y;
		this.radius = 0;
		this.color = color;
		this.opacity = 1;
		this.opacitySpeed = opacitySpeed;
		this.radiusSpeed = radiusSpeed;
	}

	draw() {
		ctx.beginPath();
		ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();

		this.radius += this.radiusSpeed;
		this.opacity -= this.opacitySpeed;

		if (this.radius > canvas.width) {
			this.radius = 0;
			this.opacity = 1;
		}
	}
}

class music_Notes {
	constructor({ x, y, width, height, color, speed, notes = "??" }) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.speed = speed;
		this.notes = notes;
	}

	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
	}

	draw_notes() {
		ctx.font = "30px Arial";
		ctx.fillStyle = this.color;
		ctx.fillText(this.notes, this.x, this.y + 20);
	}

	move() {
		this.y += this.speed;
	}
}

class effect_rectangle {
	constructor({ x, width, height, opacitySpeed, color, speed }) {
		this.x = x;
		this.y = canvas.height - height;
		this.width = width;
		this.height = height;
		this.opacity = 0;
		this.opacitySpeed = opacitySpeed;
		this.color = color;
		this.speed = speed;
	}

	draw() {
		ctx.beginPath();
		ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
	}

	move() {
		this.y += this.speed;
	}
}

class text_effect {
	constructor({ x, y, size, text, color, speed, opacitySpeed }) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.text = text || "undenfined";
		this.color = color;
		this.speed = speed;
		this.opacity = 0;
		this.opacitySpeed = opacitySpeed;
	}

	draw() {
		ctx.font = `${this.size}px Arial`;
		ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
		ctx.fillText(this.text, this.x, this.y);
	}

	move() {
		this.y -= this.speed;
		if (this.opacity <= 0.5) {
			this.opacity += this.opacitySpeed;
		}
	}

	fade_out() {
		setInterval(() => {
			this.opacity -= this.opacitySpeed;
		}, 500);
	}
}
