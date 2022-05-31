let in_game_menu_style = in_game_menu.style

function screen_adjusment() {
    requestAnimationFrame(screen_adjusment)

    let music_config_adjust = document.querySelector('#music_config_adjust')
    let music_title_adjust = document.querySelector('#music_title_adjust #music_title_adjust')

    let miss_adjust = document.querySelector('#score-and-miss > #miss_adjust')
    let score_adjust = document.querySelector('#score-and-miss > #score_adjust')

    let style_music_canvas = music_canvas.style
    let style_music_canvasP = music_canvasP.style

    if (music.paused) {
        setTimeout(() => {
            music_canvas.addEventListener("click", (e) => {
                if (music.paused) {
                    music_order = Math.floor(Math.random() * music_list.length);
                    music_randomize_Play = music_list[music_order];
                    music.src = `music/${music_randomize_Play}.mp3`;
                    music.play();
                    health = 100;
                    music.muted = false;
                    music.controls = true;
                    music.autoplay = true;
                    audioCtx.resume();
                    music_changes_button_playPause.innerText = "||";
                }
            });
        }, 1000)
    }

    if (window.innerWidth < 1440) {
        music_title_menu.style.display = "none"
        canvas.width = 700
        in_game_menu_style.animation = "width_change 1s forwards"

        miss_adjust.innerText = miss
        score_adjust.innerText = score
        DURATION.innerText = `${music_duration_adjust}`
        TITLE.innerText = `${music_randomize_Play}`


        if (!music.paused) {
            style_music_canvasP.animation = "fade_out 1s forwards"

            setTimeout(() => {
                style_music_canvas.animation = "close_up 0.5s forwards"

                setTimeout(() => {
                    if (music_randomize_Play !== "kegabutan developernya (maya putri nelpon)") {
                        music_config_adjust.style.display = "flex";
                        TITLE.style.fontSize = "30px"
                        music_config_adjust.style.animation = "fade-in-music-config-adjust 0.5s forwards";
                    }

                    style_music_canvas.display = "none"
                }, 700)
            }, 1500);
            setTimeout(() => {
                TITLE.style.animation = "fade-out 0.5s linear forwards"
            }, 60000);
        } else {
            music_config_adjust.style.display = "none";
            style_music_canvas.display = "flex";
            style_music_canvas.animation = "open_up 1s forwards";
            setTimeout(() => {
                style_music_canvasP.display = "block";
                style_music_canvasP.animation = "fade_in 1s forwards";
            }, 2000)
        }
    } else {
        music_title_menu.style.display = "block"
        canvas.width = 700
        canvas.height = 800


        music_config_adjust.style.display = "none"
        in_game_menu_style.animation = "width_change_back 1s forwards"

        if (!music.paused) {
            style_music_canvasP.animation = "fade_out 1s forwards";

            setTimeout(() => {
                style_music_canvas.animation = "close_up 0.5s forwards";

                setTimeout(() => {
                    style_music_canvas.display = "none";
                }, 700);
            }, 1500);
        } else {
            style_music_canvas.display = "flex";
            style_music_canvas.animation = "open_up 1s forwards";
            setTimeout(() => {
                style_music_canvasP.display = "block";
                style_music_canvasP.animation = "fade_in 3s infinite ease-in-out";
            }, 1500)
        }
    }
}


window.addEventListener("load", () => {
    visualizer()
    screen_adjusment();
    music_config();
    music_Notes_Generator();
    game();
    effect_circle_Generator();
})