canvas.height = "780";
canvas.width = "700";

let score = 0;
let miss = 0;

let notes_array = [];
let effect_text_array = [];
let player_focus = false;

function music_Notes_Generator() {
	setInterval(() => {
		// if note X position is out of canvas
		let x = Math.floor(Math.random() * canvas.width);
		if (x > canvas.width - 50) {
			x = canvas.width - 50;
		}

		let music_notes_symbol = "♩♪♫♬♩♪♫♬♭♮♮♩♪♪";

		//make the speed is follow the getBeat(dataArray)
		let notes_limit = 10;
		if (
			music.paused ||
			music.muted ||
			music_randomize_Play == "kegabutan developernya (maya putri nelpon)" ||
			notes_array.length >= notes_limit
		) {
			return;
		}

		let speed

		if (player_focus) {
			speed = 5;
			//detect getBeat(dataArray) of music and generate notes
			if (getBeat(dataArray)) {
				let notes_symbol =
					music_notes_symbol[
						Math.floor(Math.random() * music_notes_symbol.length)
					];
				notes_array.push(
					new music_Notes({
						x: x,
						y: 0,
						width: 20,
						height: 20,
						color: `#7BFCE6`,
						notes: notes_symbol,
						speed: speed,
					})
				);
			} else {
				return;
			}
			canvas.style.filter = "blur(0px)";
			canvas.style.transition = "filter 1s";

			TITLE.style.color = "#222"
			TITLE.style.transition = "color 1s"
		} else {
			TITLE.style.color = "red"
			TITLE.style.transition = "color 1s"

			canvas.style.transition = "filter 1s";
			canvas.style.filter = "blur(15px)";

			return;
		}
		/* end of notes */
	}, 500);
}

let effect_circle_array = [];
let effect_circle_array_limit = 5;

function effect_circle_Generator() {
	setInterval(() => {
		if (music.paused || music.muted || !player_focus) {
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

	setTimeout(() => {

		canvas.addEventListener("click", (e) => {
			music.play();
			music.muted = false;
			music.controls = true;
			music.autoplay = true;
			audioCtx.resume();
			music_changes_button_playPause.innerText = "||";
		});
	}, 1000)

	addEventListener("keypress", (e) => {
		// if we click spacebar
		if (e.keyCode == 32 && !music.paused) {
			music.paused = true
		} else if (e.keyCode == 32 && music.paused) {
			music.paused = false
		}
	})

	music.addEventListener("ended", () => {
		music.muted = true;
		music.pause();
		music_randomize_Play =
			music_list[Math.floor(Math.random() * music_list.length)];
		music.src = `music/${music_randomize_Play}.mp3`;
		effect_circle_array = [];
		notes_array = [];
		miss = 0;
		score = 0;
		if (player_focus) {
			setTimeout(function () {

				alert("Music is over")
			}, 5500)
		} else {
			music.muted = false;
		}
	});

	music_changes_button_playPause.addEventListener("click", () => {
		if (music.paused) {
			music.play();
			music.muted = false;
			music.controls = true;
			music.autoplay = true;
			audioCtx.resume();
			music_changes_button_playPause.innerText = "||";
			music_changes_button_playPause.title = "Play"
		} else {
			music.pause();
			music.muted = true;
			music.controls = false;
			music.autoplay = false;
			audioCtx.resume();
			effect_circle_array = [];
			effect_text_array = [];
			notes_array = [];
			music_changes_button_playPause.innerText = "▶";
			music_changes_button_playPause.title = "Pause"
			visualizer_div.style.animation = "visualizer-canvas-out 1s forwards";
		}
	});
	let music_order = 0;

	music_changes_button_skip.addEventListener("click", () => {
		music_order++;
		if (music_order >= music_list.length || music_randomize_Play == "kegabutan developernya (maya putri nelpon)") {
			music_order = 1;
		}

		effect_circle_array = [];
		effect_text_array = [];
		notes_array = [];

		music_randomize_Play = music_list[music_order];
		music.src = `music/${music_randomize_Play}.mp3`;
		miss = 0;
		score = 0;
	})

	music_changes_button_previous.addEventListener("click", () => {
		music_order--;
		if (music_order <= 0 || music_randomize_Play == "kegabutan developernya (maya putri nelpon)") {
			music_order = music_list.length - 1;
		}

		effect_circle_array = [];
		effect_text_array = [];
		notes_array = [];

		music_randomize_Play = music_list[music_order];
		music.src = `music/${music_randomize_Play}.mp3`;
		miss = 0;
		score = 0;
	})
}

let light_Color = "178,34,34";
let light_opacity = {
	layer1: 0,
	layer2: 0,
};

function game() {
	try {
		if (document.hasFocus()) {
			player_focus = true;
		} else {
			player_focus = false;
		}

		if (!music.paused) {
			music_title.innerText = music_randomize_Play;
			music_changes_button_container.style = `
				transform: translateY(0px);
				`
			
			visualizer_change.style.transform = `translateY(230px)`;
			visualizer_change_h1.innerText = "VISUALIZER MENU"
			visualizer_menu_button_next.style.display = "block"
			visualizer_menu_button_next.style.animation = "slide-in 3s ease-in-out forward"
			visualizer_menu_button_back.style.display = "block"
			visualizer_menu_button_back.style.animation = "slide-in 3s ease-in-out forward"

			bot_button_div.style.transform = `translateY(130px)`;
			
		} else {
			bot_button_div.style.transform = `translateY(-35%)`;
			visualizer_menu_button_next.style.display = "none"
			visualizer_menu_button_back.style.display = "none"
			visualizer_change.style.transform = `translateY(100px)`;
			visualizer_change_h1.innerText = "PLAY MUSIC FIRST"
			music_changes_button_container.style = `
			transform: translateY(30px);
			`
			music_title.innerText = "music is muted";
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

			setTimeout(() => {
				if (index === 0) {
					if (circle.opacity < -0.5) {
						effect_circle_array.splice(index, 1)
					}
				}
			}, 0);
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
			setTimeout(() => {
				if (index === 0) {
					if (text.opacity < 0) {
						effect_text_array.splice(index, 1)
					}
				}
			}, 0);
		});
		/* end of effect text */

		/* notes */
		notes_array.forEach((note, index) => {
			note.draw_notes();
			note.move();

			if (player_focus) {
				setTimeout(() => {
					if (note.y >= canvas.height) {
						notes_array.splice(index, 1);

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
					}

					if (
						note.x + note.width > player.x &&
						note.x < player.x + player.width &&
						note.y + note.height > player.y &&
						note.y < player.y + player.height
					) {
						notes_array.shift();
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
					}
				}, 0)
			}
		});
		/* end of notes */

		/* player */
		ctx.fillStyle = "black";
		ctx.fillRect(player.x, player.y, player.width, player.height);

		if (!bot) {
			if (player.move.left && player.x > 0) {
				player.x -= player.speed;
			}

			if (player.move.right && player.x < canvas.width - player.width) {
				player.x += player.speed;
			}
		} else {
			notes_array.forEach((note, index) => {
				// follow the firs note in the array
				if (index == 0) {
					if (player.x < note.x) {
						player.x += player.speed;
					} else if (player.x > note.x) {
						player.x -= player.speed;
					}
				}

				if (player.x < 0) {
					player.x = 0;
				}

				if (player.x > canvas.width - player.width) {
					player.x = canvas.width - player.width;
				}
			})
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
				duration_time_seconds < 10 ?
				"0" + duration_time_seconds :
				duration_time_seconds;
			duration_time_minutes =
				duration_time_minutes < 10 ?
				"0" + duration_time_minutes :
				duration_time_minutes;

			if (!music.paused) {
				music_duration_show.innerText = `${duration_time_minutes}:${duration_time_seconds}`;
				music_duration_adjust = `${duration_time_minutes}:${duration_time_seconds}`;
			}

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
		if (!music.paused) {
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
	} catch (e) {
		console.log(e);
	}
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

bot_button_main.addEventListener("click", () => {
	if (!bot) {
		bot = true;
		bot_button_main.style.backgroundColor = "#ff0000";
		bot_button_main.style.color = "#fff";
		bot_button_main.style.borderColor = "#fff";
	} else {
		bot = false;
		bot_button_main.style.backgroundColor = "#fff";
		bot_button_main.style.color = "#000";
		bot_button_main.style.borderColor = "#000";
	}
});

class effect_circle {
	constructor({
		x,
		y,
		opacitySpeed,
		radiusSpeed,
		color
	}) {
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
	constructor({
		x,
		y,
		width,
		height,
		color,
		speed,
		notes = "??"
	}) {
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