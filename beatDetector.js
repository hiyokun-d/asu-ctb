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
let visualizer_div = document.getElementById("visualizer-canvas");

let music = new Audio();
let audioCtx = new AudioContext();
let analyser = audioCtx.createAnalyser();
let source = audioCtx.createMediaElementSource(music);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 2048;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

//detect beat
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
	let beat = false;
	for (let i = 0; i < array.length; i++) {
		if (array[i] > threshold && array[i] > array[i - 1] && array[i] > array[i + 1]) {
			beat = true;
		} else if(array[i] < threshold && array[i] < array[i - 1] && array[i] < array[i + 1]) {
			beat = false;
	}
	}
	return beat;
}

function detectBeat() {
	analyser.getByteFrequencyData(dataArray);
	let beat = getBeat(dataArray);
	if (beat) {
		// console.log("beat");
		return true	
	}

	return false;
}
