const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = "780";
canvas.width = "700"

class music_Notes {
    constructor({
        x,
        y,
        width,
        height,
        color,
        speed,
        notes = "??",
    }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.notes = notes
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

let notes = [];
let notes_value_handler = 10

function music_Notes_Generator() {
    setInterval(() => {
        let x = Math.random() * canvas.width;
        let y = -50;
        let width = 20;
        let height = 20;
        let color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        let speed = 3
        let music_notes_symbol =
            "♩♪♫♬♩♪♫♬♭♮♮♩♪♪";
        let randomize_music_notes = music_notes_symbol.charAt(Math.floor(Math.random() * music_notes_symbol.length));
        if (notes.length < notes_value_handler) {
            notes.push(new music_Notes({
                x,
                y,
                width,
                height,
                color,
                speed,
                notes: randomize_music_notes
            }));
        }
    }, 500);
}

music_Notes_Generator()
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

function game() {
    if (window.innerWidth < 700) {
        canvas.width = innerWidth

        if (player.x > canvas.width - player.width) {
            player.x = canvas.width - player.width
        }
    } else {
        canvas.width = 700
    }

    if (window.innerHeight < 780) {
        canvas.height = innerHeight
    } else {
        canvas.height = 780
    }
    console.log(canvas.width);
    player.y = canvas.height - 50;

    requestAnimationFrame(game);
    ctx.beginPath();
    ctx.fillStyle = `#BEBEBE${background_opacity}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    /* notes */

    /* health */
    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(canvas.width / 2 - health / 2, 0, health, 20);
    ctx.closePath();
    /* end of health */

    notes.forEach(note => {
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
            }, 0);
            note.color = "red";
        }

        if (note.y > canvas.height) {
            setTimeout(() => {
                notes.shift();
                health -= 5;
            }, 0);
        }
    });
    /* end of notes */

    /* player */
    ctx.fillStyle = "black";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    /* end of player */

    if (player.move.left && player.x > 0) {
        player.x -= player.speed;
    }

    if (player.move.right && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

addEventListener('keydown', (e) => {
    if (e.keyCode == 65) {
        player.move.left = true;
    }
    if (e.keyCode == 68) {
        player.move.right = true;
    }
});

addEventListener('keyup', (e) => {
    if (e.keyCode == 65) {
        player.move.left = false;
    }
    if (e.keyCode == 68) {
        player.move.right = false;
    }
});

game();