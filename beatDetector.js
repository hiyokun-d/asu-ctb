const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let in_game_menu = document.getElementById("in-game-menu");
let in_game_title = document.getElementById("in-game-title");
let music_container = document.getElementById("music-container");
let music_text = document.getElementById("music");
let music_title = document.getElementById("music-title");
let score_container = document.getElementById("score-container");
let score_text = document.getElementById("score");
let score_number = document.getElementById("score-number");
let miss_text = document.getElementById("miss");
let miss_number = document.getElementById("miss-number");
let music_duration_show = document.getElementById("music-duration");
let visualizer_div = document.querySelector(".visualizer-canvas");
let TITLE = document.querySelector(" #music_title_adjust > #title");
let DURATION = document.querySelector("#music_title_adjust > #duration");
let visualizer_change = document.querySelector("#visualizer-menu");
let visualizer_change_h1 = document.querySelector("#visualizer-menu > h1");
let visualizer_change_button = document.querySelector("#visualizer-menu > #visualizer-menu-button");
let visualizer_menu_button_next = document.querySelector("#visualizer-menu-button > #next-visualizer");
let visualizer_menu_button_back = document.querySelector("#visualizer-menu-button > #back-visualizer");
let visualizer_menu_button_main = document.querySelector("#visualizer-menu-button > button");
let music_duration_adjust;
let music_changes_button_container = document.querySelector("#music-changes");
let music_changes_button_previous = document.querySelector("#music-changes #previous");
let music_changes_button_playPause = document.querySelector("#music-changes #play-pause");
let music_changes_button_skip = document.querySelector("#music-changes #skip");
let music_changes_button = document.querySelector("#music-changes > button");
let bot_button_div = document.querySelector("#bot-button");
let bot_button_main = document.querySelector("#bot-button > button");


let music = new Audio();
let audioCtx = new(window.AudioContext || window.webkitAudioContext);
let analyser = audioCtx.createAnalyser();
let source = audioCtx.createMediaElementSource(music);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 2048;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

let bot = false;

setTimeout(() => {
    visualizer_change.style.animation = "width-open 1s ease-in forwards";
    visualizer_change.style.display = "flex";
}, 1000);

let music_list = [
    "kegabutan developernya (maya putri nelpon)",
    "SAYKOJI - JALAN PANJANG ft GUNTUR SIMBOLON",
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
    "We Dont Talk Anymore vs Attention MASHUP  Remix",
    "One Direction  night changes Gustixa ft Alsa",
    "Hololive Song  Gawr Gura SingMaroon 5  Payphone",
    "Badut - Raavfy",
    "Paripi Koumei  Opening  Chitty Chitty Bang Bang",
    "Ikimono gakari  Netsujou no Spectrum Nanatsu no Taizai",
    "Aaron Smith  Dancin RemixCover  CG5",
    "Zenryoku ShounenSukima Switch - Indonesian Version",
    "Zenryoku ShounenEka Gustiwana  Nada Syakira Cover",
    "Yoasobi - Tabun",
    "Super Idol Bahasa Malaysia Cover feat Liliana Vampaia",
    "Sukima Switch  Zenryoku Shounen",
    "Sofia - Clairo",
    "RADWIMPS  Ai ni Dekiru Koto wa Mada Aru Kai Cover maya putri",
    "Nanairo -  Symphony",
    "Maya Putri - Nada Nada Cinta",
    "LAGU JOMBLO PENCARI AYANG",
    "Clairo - sofia Gustixa Remix",
    "Gamma1 - Jomblo Happy",
    "Happy - Skinnyfabs",
    "HAPPY Versi Bahasa Indonesia  Skinnyfabs Cover Melowmask",
    "Lagu untuk gambar 2D  Parody",
    "Momokuri opening full",
    "SAYKOJI  SUKSES FT GAMAL GANDHI",
    "SAYKOJI - TRUE COLORS",
    "LAGU UNTUK KALIAN  Animal Crossing  Bubblegum KK Parody",
    "YUME NO YOU NA DR STONE ENDING 2  YUSUKE SAEKI ROMAJII",
    "No Internet song",
    "Nico Nico Pirates  Yume ni Katachi wa Nai Keredo",
    "Florida Man Song",
    "FBI Open Up  Song"
];

let music_randomize_Play = music_list[Math.floor(Math.random() * music_list.length)];

function getRMS(array) {
    let rms = 0;
    for (let i = 0; i < array.length; i++) {
        rms += array[i] * array[i];
    }
    rms /= array.length;
    rms = Math.sqrt(rms);
    return rms;
}

function getBeat(array) {
    let rms = getRMS(array);
    let threshold = rms * 0.1;
    for (let i = 0; i < array.length; i++) {
        if (
            array[i] > threshold &&
            array[i] > array[i - 1] &&
            array[i] > array[i + 1] &&
            array[i] > array[i - 2] &&
            array[i] > array[i + 2] &&
            array[i] > array[i - 3] &&
            array[i] > array[i + 3] &&
            array[i] > array[i - 4] &&
            array[i] > array[i + 4]
        ) {
            return true;
        } else if (
            array[i] < threshold &&
            array[i] < array[i - 1] &&
            array[i] < array[i + 1] &&
            array[i] < array[i - 2] &&
            array[i] < array[i + 2] &&
            array[i] < array[i - 3] &&
            array[i] < array[i + 3] &&
            array[i] < array[i - 4] &&
            array[i] < array[i + 4]
        ) {
            return false;
        }
    }
    return false;
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

class text_effect {
    constructor({
        x,
        y,
        size,
        text,
        color,
        speed,
        opacitySpeed
    }) {
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