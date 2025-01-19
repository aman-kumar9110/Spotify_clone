

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg" },
]
songItems.forEach((element, i) => {

    element.getElementsByTagName("img")[0].src = songs[i].coverPath;

    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    

})
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');

    }
})


audioElement.addEventListener('timeupdate', () => {

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})




Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);

    });
});


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('fa-circle-play')).forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');


    })
}



Array.from(document.getElementsByClassName('fa-circle-play')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log("Clicked:", e.target);
        const songId = e.target.id; // Get the id of the clicked element
        if (!songId) {
            console.error("Invalid ID for the clicked element.");
            return;
        }

        songIndex = parseInt(songId); // Parse the id to get the song index
        if (isNaN(songIndex)) {
            console.error("Invalid songIndex:", songIndex);
            return;
        }

        makeAllPlays(); // Ensure all play buttons reset to play state
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        // Set the new song source and reset the audio element
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;

        // Play the new song
        audioElement.play();

        // Update the master play button state
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});


// Ensure songIndex is defined globally and tracks the current song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
     audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1; // Loop back to the last song
    } else {
        songIndex -= 1; // Move to the previous song
    }

    // Validate songIndex
    if (songs[songIndex]) {
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();

        // Update UI
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        console.log(`Playing previous song: ${songs[songIndex].songName}`);
    } else {
        console.error(`Invalid songIndex: ${songIndex}`);
    }
});

