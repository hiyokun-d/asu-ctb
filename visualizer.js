const visualizer_canvas = document.querySelector(".visualizer-canvas");
const visualizer_ctx = visualizer_canvas.getContext("2d");

/* NOTES:
total visualizer: 5 
*/
let visualizer_limit = 5;
let visualizer_list_count = Math.floor(Math.random() * visualizer_limit) + 1;
console.log(visualizer_list_count);

visualizer_menu_button_next.addEventListener("click", () => {
	visualizer_list_count++;
	if (visualizer_list_count >= visualizer_limit + 1) {
		visualizer_list_count = 1;
	}
});

visualizer_menu_button_back.addEventListener("click", () => {
	visualizer_list_count--;
	if (visualizer_list_count <= 0) {
		visualizer_list_count = visualizer_limit;
	}
});

function visualizer() {
	if (document.hasFocus()) {
		if (visualizer_list_count == 1) {
			//line wave visualizer
			analyser.getByteTimeDomainData(dataArray);
			visualizer_ctx.fillStyle = "rgb(200, 200, 200)";
			visualizer_ctx.fillRect(
				0,
				0,
				visualizer_canvas.width,
				visualizer_canvas.height
			);
			visualizer_ctx.lineWidth = 2;
			visualizer_ctx.strokeStyle = "rgb(0, 0, 0)";
			visualizer_ctx.beginPath();
			let sliceWidth = (visualizer_canvas.width * 1.0) / bufferLength;
			let x = 0;
			for (let i = 0; i < bufferLength; i++) {
				let v = dataArray[i] / 128.0;
				let y = (v * visualizer_canvas.height) / 2;
				if (i === 0) {
					visualizer_ctx.moveTo(x, y);
				} else {
					visualizer_ctx.lineTo(x, y);
				}
				x += sliceWidth;
			}
			visualizer_ctx.lineTo(visualizer_canvas.width, visualizer_canvas.height / 2);
			visualizer_ctx.stroke();
		} else if (visualizer_list_count == 2) {
			//line top to bottom
			analyser.getByteFrequencyData(dataArray);
			visualizer_ctx.fillStyle = "rgb(0, 0, 0)";
			visualizer_ctx.fillRect(0, 0, visualizer_canvas.width, visualizer_canvas.height);
			visualizer_ctx.lineWidth = 2;
			visualizer_ctx.strokeStyle = "rgb(255, 255, 255)";
			visualizer_ctx.beginPath();
			let sliceWidth = visualizer_canvas.width * 1.0 / bufferLength;
			let x = 0;
			for (let i = 0; i < bufferLength; i++) {
				let v = dataArray[i] / 128.0;
				let y = v * visualizer_canvas.height / 2;
				if (i === 0) {
					visualizer_ctx.moveTo(x, y);
				} else {
					visualizer_ctx.lineTo(x, y);
				}
				x += sliceWidth;
			}
			visualizer_ctx.lineTo(visualizer_canvas.width, visualizer_canvas.height / 2);
			visualizer_ctx.stroke();
		} else if (visualizer_list_count == 3) {
			//block visualizer
			analyser.getByteFrequencyData(dataArray);
			visualizer_ctx.fillStyle = "rgb(0, 0, 0)";
			visualizer_ctx.fillRect(0, 0, visualizer_canvas.width, visualizer_canvas.height);
			visualizer_ctx.fillStyle = "rgb(255, 255, 255)";
			let barWidth = (visualizer_canvas.width / bufferLength) * 2.5;
			let barHeight;
			let x = 0;
			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i];
				visualizer_ctx.fillRect(x, visualizer_canvas.height - barHeight / 2, barWidth, barHeight / 2);
				x += barWidth + 1;
			}
		} else if (visualizer_list_count == 4) {
			//line wave visualizer
			analyser.getByteTimeDomainData(dataArray);
			visualizer_ctx.fillStyle = "rgb(0, 0, 0)";
			visualizer_ctx.fillRect(0, 0, visualizer_canvas.width, visualizer_canvas.height);
			visualizer_ctx.fillStyle = "rgb(255, 255, 255)";
			let barWidth = (visualizer_canvas.width / bufferLength) * 2.5;
			let barHeight;
			let x = 0;
			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i];
				visualizer_ctx.fillRect(x, visualizer_canvas.height - barHeight / 2, barWidth, barHeight / 2);
				x += barWidth + 1;
			}
		} else if (visualizer_list_count == 5) {
			//circle wave visualizer
			analyser.getByteFrequencyData(dataArray);
			visualizer_ctx.fillStyle = "rgb(0, 0, 0)";
			visualizer_ctx.fillRect(0, 0, visualizer_canvas.width, visualizer_canvas.height);
			visualizer_ctx.fillStyle = "rgb(255, 255, 255)";
			let barWidth = (visualizer_canvas.width / bufferLength) * 2.5;
			let barHeight;
			let x = 0;
			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i];
				visualizer_ctx.beginPath();
				visualizer_ctx.arc(x, visualizer_canvas.height - barHeight / 2, barWidth, 0, 2 * Math.PI);
				visualizer_ctx.fill();
				x += barWidth + 1;
			}
		}
	} else {
		visualizer_ctx.fillStyle = "rgb(0, 0, 0)";
		visualizer_ctx.fillRect(0, 0, visualizer_canvas.width, visualizer_canvas.height);
	}
	
	requestAnimationFrame(visualizer)
}