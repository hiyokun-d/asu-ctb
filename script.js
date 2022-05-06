canvas.height = "780";
canvas.width = "700"

let score = 0;
let miss = 0;

let notes = [];

function music_Notes_Generator() {
    setInterval(() => {
        let notes_limit = 10

        if (!music.paused) {
            let x = Math.floor(Math.random() * canvas.width - 50);
            let y = 0;
            let width = 20;
            let height = 20;
            let color = `rgb(
             ${Math.floor(Math.random() * 255) + 1},
             ${Math.floor(Math.random() * 255) + 1}, 
             ${Math.floor(Math.random() * 255) + 1})`;
            let music_notes_symbol =
                "♩♪♫♬♩♪♫♬♭♮♮♩♪♪";

            //make the speed is follow the beat
            let speed = 5;

            //detect beat of music and generate notes
            if (detectBeat()) {
                if (notes.length < notes_limit) {
                    let notes_symbol = music_notes_symbol[Math.floor(Math.random() * music_notes_symbol.length)];
                    notes.push(new music_Notes({
                        x,
                        y,
                        width,
                        height,
                        color,
                        speed,
                        notes: notes_symbol
                    }));
                }
            }

        } else {
            notes.forEach((note) => {
                note.y -= note.speed * 2;
            })
        }
    }, 500);
}

let effect_circle_array = [];
let effect_circle_array_limit = 5;

function effect_circle_Generator() {
    setInterval(() => {
        if (!music.paused && detectBeat()) {
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
    }, 100);
}

let player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 20,
    height: 20,
    color: "#00FF00",
    speed: 10,
    move: {
        left: false,
        right: false,
    },
};

let health = 100;
let background_opacity = 40

let music_list = [
    "Atmosfera  Tak Tau Malu",
    "Gen Hoshino comedy",
    "Goose House  Hikaru Nara",
    "Let Me Down Slowly  Alec Benjamin  Alex Goot Jada Facer",
    "Ohara yui-ko no `sutoreto' myujikkubideo",
    "Original SongCukup  Mythia Batford",
    "Rokudenashi",
    "Stand Still  Yuka Iguichi",
    "Sukidakara Yuika Cover by Alia Adelia x Kururu",
    "YOASOBI  Ano Yume wo Nazotte",
    "Windah Basudara Nyanyi Lagu Kimi No Nawa Kalo Rekamnya Di Studio",
    "Windah Basudara  Napos 80s Synthwave ver",
    "Cheriimoya  Living Life In The Night feat Sierra Kidd Official Audio",
    "Dont Wanna KnowWe Dont Talk Anymore MASHUP",
    "Koe no Katachi A Silent Voice OST",
    "Lagu Bocil Kematian Kalo Dicover Sama Nirvana",
    "ORIGINAL SONG Mantra Hujan  Kobo Kanaeru hololive Indonesia 3rd Gen",
    "sparkle kimi no na wa",
    "Virtual Medley Lagu Daerah  hololive ID Cover",
    "SMVLL  Happy Ajalah Official Music VIdeo",
    "Lagu Untuk Ibu Ft Diaz Official",
    "Lagu Tentang Cicak di dinding Parody Cover",
    "JJD  Vertigo Feat Cecilia Gault",
    "Heat Waves Glass animals x HighCloud Cover",
    "enau Negara Lucu Official Video Lyric",
    "Elley Duhe MIDDLE OF THE NIGHT",
    "Alan Walker vs Coldplay Hymn For The Weekend Remix",
    "7 Orange Shigatsu wa Kimi no Uso",
];



let music_randomize_Play = music_list[Math.floor(Math.random() * music_list.length)];

function music_config() {
    music.src = `music/${music_randomize_Play}.mp3`;

    music_title.innerText = `${music_randomize_Play}`;

    console.log(music);
    console.log(music.error)

    addEventListener("mousemove", (e) => {
        music.play();
        music.muted = false;
        music.controls = true
        music.autoplay = true
        audioCtx.resume();
    })

    music.addEventListener("ended", () => {
        music.muted = true;
        music.pause()
        music_randomize_Play = music_list[Math.floor(Math.random() * music_list.length)];
        music.src = `music/${music_randomize_Play}.mp3`;
        music_title.innerText = `${music_randomize_Play}`;
        notes = [];
        effect_circle_array = [];
        alert("Music is over")
    })
}


   let light_Color = "178,34,34";
		let light_opacity = {
			layer1: 0,
			layer2: 0,
		};
        
function game() {
    score_number.innerText = score;
    miss_number.innerText = miss;
    if (window.innerWidth < 700) {
        canvas.width = innerWidth;

        if (player.x > canvas.width - player.width) {
            player.x = canvas.width - player.width;
        }
    } else {
        canvas.width = 700;
    }

    if (window.innerHeight < 780) {
        canvas.height = innerHeight;
    } else {
        canvas.height = 780;
    }

    player.y = canvas.height - 50;

    requestAnimationFrame(game);
    ctx.beginPath();
    ctx.fillStyle = `#BEBEBE${background_opacity}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    effect_circle_array.forEach((circle, index) => {
        circle.draw();

        if (circle.opacity < -0.05) {
            setTimeout(() => {
                effect_circle_array.splice(index, 1);
            })
        }
    })

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

    /* text */
    let text_mouse_size = 30;
    let text_mouse_opacity = 1;
    if (music.paused) {
        ctx.beginPath();
        ctx.font = `${text_mouse_size}px arial-new`;
        ctx.fillStyle = `RGBA(50,70,55,${text_mouse_opacity})`;
        ctx.fillText(
            "move&click your mouse to play the music",
            canvas.width / 2 - 250,
            canvas.height / 2
        );
        ctx.closePath();
    }
    /* end of text */

    notes.forEach((note) => {
        note.draw_notes();
        note.move();

        // coliide with player
        if (
            player.x < note.x + note.width &&
            player.x + player.width > note.x &&
            player.y < note.y + note.height &&
            player.y + player.height > note.y
        ) {
            setTimeout(() => {
                notes.splice(notes.indexOf(note), 1);
                if (health < 100) {
                    health += 10;
                }

                score += 1;
            }, 0);
            note.color = "red";
        }

        if (note.y > canvas.height) {
            setTimeout(() => {
                notes.splice(notes.indexOf(note), 1);
                if (health > -0) {
                    health -= 10;
                }

                miss += 1;
            }, 0);
        }
    });
    /* end of notes */

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
            duration_time_seconds < 10 ?
            "0" + duration_time_seconds :
            duration_time_seconds;
        duration_time_minutes =
            duration_time_minutes < 10 ?
            "0" + duration_time_minutes :
            duration_time_minutes;

        music_duration_show.innerText = `${duration_time_minutes}:${duration_time_seconds}`;

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
        visualizer_div.style.animation = "none"
    } else {
        visualizer_div.style.animation = "visualizer-canvas-in 1s forwards";
    }
    /* end of visualizer animation in */

    /* visualizer animation out */
    music.addEventListener("ended", () => {
        visualizer_div.style.animation = "visualizer-canvas-out 1s forwards";
    })
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
        
        ctx.beginPath()
        ctx.fillStyle = `rgba(${light_Color}, ${light_opacity.layer2})`;
        ctx.globalCompositeOperation = "lighter";
        ctx.fillRect(0, canvas.height - 30, canvas.width, 10);
        ctx.closePath();
        /* end of light */
    }
}

addEventListener('keydown', (e) => {
    if (e.keyCode == 65 || e.keyCode == 37) {
        player.move.left = true;
    }
    if (e.keyCode == 68 || e.keyCode == 39) {
        player.move.right = true;
    }
});

addEventListener('keyup', (e) => {
    if (e.keyCode == 65 || e.keyCode == 37) {
        player.move.left = false;
    }
    if (e.keyCode == 68 || e.keyCode == 39) {
        player.move.right = false;
    }
});

let mouseIsClick = false
canvas.addEventListener('mousedown', (e) => {
    mouseIsClick = true
})

canvas.addEventListener('mouseup', (e) => {
    mouseIsClick = false
})

canvas.addEventListener('mousemove', (e) => {
    if (mouseIsClick) {
        player.x = e.clientX - player.width / 2 - canvas.offsetLeft;
    }
});

music_config();
music_Notes_Generator();
game();
effect_circle_Generator();

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
    constructor({
        x,
        width,
        height,
        opacitySpeed,
        color,
        speed
    }) {
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