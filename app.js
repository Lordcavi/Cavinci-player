const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const streamBtn = document.getElementById('streamBtn');
const streamUrl = document.getElementById('streamUrl');
const progress = document.getElementById('progress');
const trackTitle = document.getElementById('trackTitle');
const playIcon = document.getElementById('playIcon');
const volumeControl = document.getElementById('volumeControl');
const playlistElement = document.getElementById('playlist');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let isPlaying = false;
let currentTrackIndex = 0;
let playlist = [];


function loadTrack(track) {
  audioPlayer.src = track.src;
  trackTitle.textContent = track.name;
  playIcon.src = './images/play.svg';
  isPlaying = false;
}

function updatePlaylist() {
  playlistElement.innerHTML = '';
  playlist.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.name;
    if (index === currentTrackIndex) {
      li.classList.add('active');
    }
    li.addEventListener('click', () => {
      currentTrackIndex = index;
      loadTrack(track);
      playPauseAudio();
    });
    playlistElement.appendChild(li);
  });
}

function playPauseAudio() {
  if (audioPlayer.src) {
    if (isPlaying) {
      audioPlayer.pause();
      playIcon.src = './images/play.svg';
    } else {
      audioPlayer.play();
      playIcon.src = './images/pause.svg';
    }
    isPlaying = !isPlaying;
  }
}

playPauseBtn.addEventListener('click', playPauseAudio);



uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const track = {
        name: file.name,
        src: URL.createObjectURL(file)
      };
      playlist.push(track);
    }
    currentTrackIndex = playlist.length - 1;
    loadTrack(playlist[currentTrackIndex]);
    updatePlaylist();
  }
});

streamBtn.addEventListener('click', () => {
  streamUrl.style.display = streamUrl.style.display === 'none' ? 'block' : 'none';
});

streamUrl.addEventListener('change', () => {
  if (streamUrl.value) {
    const track = {
      name: 'Streaming: ' + streamUrl.value,
      src: streamUrl.value
    };
    playlist.append(track);
    currentTrackIndex = playlist.length - 1;
    loadTrack(track);
    updatePlaylist();
  }
});



audioPlayer.addEventListener('timeupdate', () => {
  const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progress.value = progressPercentage;
});

progress.addEventListener('input', () => {
  const seekTime = (progress.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

volumeControl.addEventListener('input', () => {
  audioPlayer.volume = volumeControl.value / 100;
});

prevBtn.addEventListener('click', () => {
  if (currentTrackIndex > 0) {
    currentTrackIndex--;
    loadTrack(playlist[currentTrackIndex]);
    playPauseAudio();
    updatePlaylist();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentTrackIndex < playlist.length - 1) {
    currentTrackIndex++;
    loadTrack(playlist[currentTrackIndex]);
    playPauseAudio();
    updatePlaylist();
  }
});


