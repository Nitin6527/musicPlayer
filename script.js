
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//music
const songs=[{
	name: '01 akiya udeeke diya',
	displayName:'Akiya udeeke diya',
	img:'jacinto-1',
	artist:'unknown'
},
{
	name: '03 AMRIT BELE RAM JAPNA',
	displayName:'Amrit Bele ram japna',
	img:'jacinto-2',
	artist:'unknown'
},
{
	name: '03 Kanha Re Kanha',
	displayName:'kanha re kanha',
	img:'jacinto-3',
	artist:'Manish Tiwari'
},
{
	name: '03 SHYAM CHUDI BECHNE AAYA',
	displayName:'Shyam Chudi Bechne aaya',
	img:'metric-1',
	artist:'unknown'
}]

let isPlaying = false;

function playSong(){
	isPlaying= true;
	playBtn.classList.replace('fa-play','fa-pause');
	playBtn.setAttribute('title', 'pause');
	music.play();
}

function pauseSong(){
	isPlaying = false;
	playBtn.classList.replace('fa-pause','fa-play');
	playBtn.setAttribute('title', 'play');
	music.pause();
}

playBtn.addEventListener('click',()=>(isPlaying ? pauseSong() : playSong()));

//update DOM
function loadSong(song){
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.img}.jpg`;
}

//current song
let songIndex = 0;

// next song
function nextSong(){
	songIndex++;
	if(songIndex>songs.length-1){
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}
function prevSong(){
	songIndex--;
	if(songIndex<0){
		songIndex = songs.length-1;
	}
	loadSong(songs[songIndex]);
	playSong();
}
//on load select first song
loadSong(songs[songIndex]);

// update Progress bar
function updateProgressBar(e){
   if(isPlaying){
   	const {duration, currentTime} = e.srcElement;
   	//update progress bar
   	const progressPercent = (currentTime/duration)*100;
   	progress.style.width = `${progressPercent}%`;
   	// diplay for duration
   	const durationMinutes = Math.floor(duration/60);
   	let durationSeconds = Math.floor(duration%60);
   	if(durationSeconds < 10){
   		durationSeconds = `0${durationSeconds}`;
   	}
   
   	//delay switching duration element
   	if(durationSeconds){
   		durationEl.textContent =`${durationMinutes}:${durationSeconds}`;
   	}
   	const currentMinutes = Math.floor(currentTime/60);
   	let currentSeconds = Math.floor(currentTime%60);
   	if(currentSeconds < 10){
   		currentSeconds = `0${currentSeconds}`;
   	}
   	currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
   }
};

function setProgressBar(e){
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const {duration} = music;
	music.currentTime = (clickX/width)*duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);