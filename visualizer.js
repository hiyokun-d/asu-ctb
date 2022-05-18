const visualizer_canvas = document.querySelector(".visualizer-canvas");
const visualizer_ctx = visualizer_canvas.getContext("2d");

/* NOTES:
total visualizer: 5 
*/
function visualizer() {
	visualizer_menu.forEach(function (item, index) {
		// putt all name of visualizer in button
		if (index == 0) {
			visualizer_menu_container_button1.innerHTML = item.name;
		} else if (index == 1) {
			visualizer_menu_container_button2.innerHTML = item.name;
		} else if (index == 2) {
			visualizer_menu_container_button3.innerHTML = item.name;
		} else if (index == 3) {
			visualizer_menu_container_button4.innerHTML = item.name;
		} else if (index == 4) {
			visualizer_menu_container_button5.innerHTML = item.name;
		}

		//if button is activate/click then run the visualizer
		visualizer_menu_container_button1.addEventListener("click", function () {
			item.visualizer1 = true;
			item.visualizer2 = false;
			item.visualizer3 = false;
			item.visualizer4 = false;
			item.visualizer5 = false;
		})

		visualizer_menu_container_button2.addEventListener("click", function () {
			item.visualizer1 = false;
			item.visualizer2 = true;
			item.visualizer3 = false;
			item.visualizer4 = false;
			item.visualizer5 = false;
		})

		visualizer_menu_container_button3.addEventListener("click", function () {
			item.visualizer1 = false;
			item.visualizer2 = false;
			item.visualizer3 = true;
			item.visualizer4 = false;
			item.visualizer5 = false;
		})

		visualizer_menu_container_button4.addEventListener("click", function () {
			item.visualizer1 = false;
			item.visualizer2 = false;
			item.visualizer3 = false;
			item.visualizer4 = true;
			item.visualizer5 = false;
		})

		visualizer_menu_container_button5.addEventListener("click", function () {
			item.visualizer1 = false;
			item.visualizer2 = false;
			item.visualizer3 = false;
			item.visualizer4 = true;
			item.visualizer5 = false;
		})

		//line wave visualizer
		if (item.visualizer1 == true) {

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
		}

		//line top to bottom
		if (item.visualizer2 == true) {
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
		}


		//block visualizer
		if (item.visualizer3 == true) {
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
		}

		//line wave visualizer
		if (item.visualizer4) {
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
		}

		//circle wave visualizer
		if (item.visualizer5) {
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
		} else {
			item.visualizer1 = true
		}

		if (item.visualizer1) {
			visualizer_menu_container_button1.style = `
				background-color: rgb(169, 246, 146);
				color: rgb(66, 114, 42);
				transition: none;
				`

			visualizer_menu_container_button2.style = `
			 background - color: rgb(57, 57, 57);
			 text - align: center;
			 text - decoration: dashed;
			 color: rgb(135, 135, 135);
			 font - weight: bold;
			 font - family: 'Roboto', sans - serif;
			 transition: none;
			`

			visualizer_menu_container_button3.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button4.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button5.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`
		}

		if (item.visualizer2) {
			visualizer_menu_container_button2.style = `
				background-color: rgb(169, 246, 146);
				color: rgb(66, 114, 42);
				transition: none;
				`

			visualizer_menu_container_button1.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button3.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button4.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button5.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`
		}

		if (item.visualizer3) {
			visualizer_menu_container_button3.style = `
				background-color: rgb(169, 246, 146);
				color: rgb(66, 114, 42);
				transition: none;
				`

			visualizer_menu_container_button2.style = `
			 background - color: rgb(57, 57, 57);
			 text - align: center;
			 text - decoration: dashed;
			 color: rgb(135, 135, 135);
			 font - weight: bold;
			 font - family: 'Roboto', sans - serif;
			 transition: none;
			`

			visualizer_menu_container_button1.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button4.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button5.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`
		}

		if (item.visualizer4) {
			visualizer_menu_container_button4.style = `
				background-color: rgb(169, 246, 146);
				color: rgb(66, 114, 42);
				transition: none;
				`

			visualizer_menu_container_button2.style = `
			 background - color: rgb(57, 57, 57);
			 text - align: center;
			 text - decoration: dashed;
			 color: rgb(135, 135, 135);
			 font - weight: bold;
			 font - family: 'Roboto', sans - serif;
			 transition: none;
			`

			visualizer_menu_container_button3.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button1.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button5.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`
		}

		if (item.visualizer5) {
			visualizer_menu_container_button5.style = `
				background-color: rgb(169, 246, 146);
				color: rgb(66, 114, 42);
				transition: none;
				`

			visualizer_menu_container_button2.style = `
			 background - color: rgb(57, 57, 57);
			 text - align: center;
			 text - decoration: dashed;
			 color: rgb(135, 135, 135);
			 font - weight: bold;
			 font - family: 'Roboto', sans - serif;
			 transition: none;
			`

			visualizer_menu_container_button3.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button4.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`

			visualizer_menu_container_button1.style = `
				   background - color: rgb(57, 57, 57);
				   text - align: center;
				   text - decoration: dashed;
				   color: rgb(135, 135, 135);
				   font - weight: bold;
				   font - family: 'Roboto', sans - serif;
				   transition: none;
				`
		}

/* visualizer button animate */
if (music.paused) {
	visualizer_menu_container.style.transform = "translateY(-25px)"
	visualizer_menu_container.style.borderColor = "rgb(57, 57, 57)"
	visualizer_menu_container_button1.style.display = "none"
	visualizer_menu_container_button2.style.display = "none"
	visualizer_menu_container_button3.style.display = "none"
	visualizer_menu_container_button4.style.display = "none"
	visualizer_menu_container_button5.style.display = "none"

	visualizer_menu_container_H1.innerText = "PLAY THE MUSIC FIRST!"
} else {
	visualizer_menu_container_H1.innerText = "visualizer effect select"
	visualizer_menu_container.style.borderColor = "rgb(195, 195, 195)"
	visualizer_menu_container.style.transition = "transform 1s, background-color 0.5s"
	visualizer_menu_container.style.transform = "translateY(239px)"
	visualizer_menu_container.style.backgroundColor = "#3d3d3d"
	setTimeout(() => {
		visualizer_menu_container_button1.style = "animation: slideIn 0.5s ease-in-out forwards "
	}, 1000);
	setTimeout(() => {
		visualizer_menu_container_button2.style = "animation: slideIn 0.5s ease-in-out forwards "
	}, 1500);
	setTimeout(() => {
		visualizer_menu_container_button3.style = "animation: slideIn 0.5s ease-in-out forwards "
	}, 2000);
	setTimeout(() => {
		visualizer_menu_container_button4.style = "animation: slideIn 0.5s ease-in-out forwards "
	}, 2500);
	setTimeout(() => {
		visualizer_menu_container_button5.style = "animation: slideIn 0.5s ease-in-out forwards "
	}, 3000);
}
/* end of visualizer button animate */
	})

	requestAnimationFrame(visualizer);
}

visualizer();