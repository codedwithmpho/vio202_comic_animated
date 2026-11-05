/* =====================================================
   ADD YOUR GIFS + SOUNDS HERE

   That's it — that's the whole job. One block per gif.
   No HTML or CSS editing needed for new ones.

   Fields:
   panel  -> the id of the <section> it belongs in (e.g. "part2")
   gif    -> path to the gif file
   audio  -> path to the sound file
   top    -> % down the image (0-100)
   left   -> % across the image (0-100)
   width  -> % width of the gif relative to the image (try 15-25)

   Tip: use coordinate-picker.html to find top/left fast.
===================================================== */

const SOUND_GIFS = [

    {
        panel: "part1",
        gif: "gifs/typing_sounds.gif",
        audio: "audio/typing_sounds.m4a",
        top: 96,
        left: 60,
        width: 20
    },

    // Copy the block above, paste it below, edit the values.
    // Example for part2:
    // {
    //     panel: "part2",
    //     gif: "gifs/example.gif",
    //     audio: "audio/example.m4a",
    //     top: 50,
    //     left: 50,
    //     width: 20
    // },
    {
        panel: "part1",
        gif: "gifs/intro_typewriter.gif",
        audio: "audio/typing_sounds.m4a",
        top: 26.71,
        left: 49,
        width: 80
    },

    {
        panel: "part1",
        gif: "gifs/hmmm_sound.gif",
        audio: "audio/hum_sound_effect.mp3",
        top: 37,
        left: 70,
        width: 50
    },

    {
        panel: "part1",
        gif: "gifs/phone_flash.gif",
        audio: "audio/drong_sound.m4a",
        top: 48.60,
        left: 49.59,
        width: 97
    },

    {
        panel: "part1",
        gif: "gifs/walking_animation.gif",
        audio: "audio/walking sounds (doop).m4a",
        top: 65.52,
        left: 60,
        width: 79
    },
    //________________________
    {
        panel: "part2",
        gif: "gifs/laying_down.gif",
        audio: "audio/poof_sound.m4a",
        top: 11.45,
        left: 47.50,
        width: 97
    },

    {
       panel: "part2",
       gif: "gifs/what_a_long_day.gif",
       audio: "audio/what a long day, just school on top of school .m4a",
       top: 3.74,
       left: 47.19,
       width: 22
    },

    {
       panel: "part2",
       gif: "gifs/poof_sound.gif",
       top: 12.07,
       left: 74.44,
       width: 20
    },

    {
       panel: "part2",
       gif: "gifs/drong.gif",
       audio: "audio/drong_sound.m4a",
       top: 29,
       left: 80,
       width: 15
    },

    {
       panel: "part2",
       gif: "gifs/drong.gif",
       audio: "audio/drong_sound.m4a",
       top: 34,
       left: 82,
       width: 15
    },

    //________________________
    {
        panel: "part3",
        gif: "gifs/coffee.gif",
        audio: "audio/shoof sound.m4a",
        top: 16.80,
        left: 46.30,
        width: 19
    },

    {
        panel: "part3",
        gif: "gifs/hloop_sound.gif",
        audio: "audio/hloop.m4a",
        top: 49,
        left: 41,
        width: 10
    },

    {
        panel: "part3",
        audio: "audio/ummm, where are your parents, what happened to u.m4a",
        top: 77.50,
        left: 65,
    },
    //________________________
    {
        panel: "part4",
        audio: "audio/kraaaa sound.m4a",
        top: 29.80,
        left: 76.26,
    },

    {
        panel: "part4",
        audio: "audio/sniff sounds .m4a",
        top: 79.30,
        left: 91.43,
    },
    //________________________
    {
        panel: "part6",
        audio: "audio/gulp.m4a",
        top: 84.34,
        left: 90.03,
    },
    //________________________
   {
        panel: "part7",
        audio: "audio/I am so sorry Clementine... .m4a",
        top: 6.16,
        left: 79.07,
    },
];


/* =====================================================
   EVERYTHING BELOW THIS LINE IS THE ENGINE.
   You shouldn't need to touch it.
===================================================== */

/* Figures out the correct audio MIME type from the file's
   extension, so files of different formats (.m4a, .mp3, .wav, .ogg)
   all get properly recognized by the browser. */
function getAudioMimeType(path) {
    if (!path) return "";
    const ext = path.split(".").pop().toLowerCase();
    const mimeMap = {
        m4a: "audio/mp4",
        mp3: "audio/mpeg",
        wav: "audio/wav",
        ogg: "audio/ogg"
    };
    return mimeMap[ext] || "";
}


function buildSoundGif(config, index) {

    const panel = document.getElementById(config.panel);

    if (!panel) {
        console.error(`No panel found with id "${config.panel}"`);
        return;
    }

    const audioId = `sound-audio-${index}`;
    let triggerEl;

    if (config.gif) {

        /* --- gif + sound --- */
        triggerEl = document.createElement("img");
        triggerEl.src = config.gif;
        triggerEl.className = "typing-effect sound-trigger";
        triggerEl.alt = "Click to play sound";
        triggerEl.style.width = config.width + "%";

    } else {

        /* --- sound only, no animation: small speaker icon --- */
        triggerEl = document.createElement("button");
        triggerEl.type = "button";
        triggerEl.className = "sound-icon sound-trigger";

        const iconImg = document.createElement("img");
        iconImg.src = "images/sound_toggle.svg";
        iconImg.alt = "";
        triggerEl.appendChild(iconImg);

    }

    triggerEl.setAttribute("data-audio-target", audioId);
    triggerEl.setAttribute("aria-label", "Play sound");
    triggerEl.setAttribute("title", "Play sound");
    triggerEl.style.top = config.top + "%";
    triggerEl.style.left = config.left + "%";

    // --- the hidden audio element ---
    const audioEl = document.createElement("audio");
    audioEl.id = audioId;
    audioEl.preload = "auto";

    if (!config.audio) {
        console.warn(`No "audio" set for the trigger on panel "${config.panel}" — this trigger won't play any sound.`);
    }

    const sourceEl = document.createElement("source");
    sourceEl.src = config.audio || "";
    sourceEl.type = getAudioMimeType(config.audio);
    audioEl.appendChild(sourceEl);

    panel.appendChild(triggerEl);
    panel.appendChild(audioEl);

    setupSoundTrigger(triggerEl, audioEl);

}


function setupSoundTrigger(triggerEl, audioEl) {

    triggerEl.addEventListener("click", async function () {

        if (audioEl.paused) {

            try {
                await audioEl.play();
                triggerEl.classList.add("playing");
            } catch (error) {
                console.error("Could not play audio:", error);
                alert(
                    "This sound could not be played. " +
                    "Check that the audio file path is correct."
                );
            }

        } else {

            audioEl.pause();
            triggerEl.classList.remove("playing");

        }

    });

    audioEl.addEventListener("ended", function () {
        triggerEl.classList.remove("playing");
    });

    audioEl.addEventListener("error", function () {
        console.error("Audio failed to load:", audioEl.querySelector("source").src);
    });

}


/* Build every gif in the list once the page is ready */
document.addEventListener("DOMContentLoaded", function () {
    SOUND_GIFS.forEach(buildSoundGif);
});