let in_game_menu_style = in_game_menu.style

function screen_adjusment() {
    requestAnimationFrame(screen_adjusment)
    let music_canvas = document.querySelector('#music_canvas')
    let music_canvasP = document.querySelector('#music_canvas > p')

    let music_config_adjust = document.querySelector('#music_config_adjust')
    let music_title_adjust = document.querySelector('#music_title_adjust #music_title_adjust')

    let miss_adjust = document.querySelector('#score-and-miss > #miss_adjust')
    let score_adjust = document.querySelector('#score-and-miss > #score_adjust')

    let style_music_canvas = music_canvas.style
    let style_music_canvasP = music_canvasP.style

    if (window.innerWidth < 1440) {
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

            music_config_adjust.style.display = "none"
            style_music_canvas.display = "flex"
            style_music_canvas.animation = "open_up 1s forwards"
        }
    } else {
        canvas.width = 700
        canvas.height = 800
        music_config_adjust.style.display = "none"
        in_game_menu_style.animation = "width_change_back 1s forwards"

        if (!music.paused) {
            style_music_canvasP.animation = "fade_out 1s forwards";

            setTimeout(() => {
                style_music_canvas.animation = "close_up 0.5s forwards";

                setTimeout(() => {
                    if (
                        music_randomize_Play !==
                        "kegabutan developernya (maya putri nelpon)"
                    ) {
                        music_config_adjust.style.display = "flex";
                        TITLE.style.fontSize = "30px";
                        music_config_adjust.style.animation =
                            "fade-in-music-config-adjust 0.5s forwards";
                    }

                    style_music_canvas.display = "none";
                }, 700);
            }, 1500);
        } else {
            music_config_adjust.style.display = "none";
            style_music_canvas.display = "flex";
            style_music_canvas.animation = "open_up 1s forwards";
        }
    }
}



screen_adjusment();
music_config();
music_Notes_Generator();
game();
effect_circle_Generator();