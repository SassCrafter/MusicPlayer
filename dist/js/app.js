window.onload = () => {
	const musicPlayerEl = document.getElementById('music-player');
	const songCoverEl = document.getElementById('song-cover');
	const songTitleEl = document.querySelector('.song-title');
	const songArtistEl = document.querySelector('.sont-artist');
	const nextSongEL = document.getElementById('next-song');

	const prevBtnEl = document.getElementById('prev-btn');
	const playBtnEl = document.getElementById('play-btn');
	const playBtnIcon = document.querySelector('#play-btn .play-icon')
	const nextBtnEl = document.getElementById('next-btn');
	const volumeInput = document.getElementById('volume-input');

	const songCurrentTimeEl = document.getElementById('song-current-time');
	const songEndTimeEl = document.getElementById('song-end-time');
	const songDurationRangeEl = document.getElementById('song-range')


	let currentSong;
	let nextSong;
	let songDuration;


	let songs = [
		{
			title: 'Somebody New',
			artist: 'RYYZN',
			songPath: './music/somebody-new.mp3',
			coverPath: './img/song-1.jpg'
		},
		{
	        title: 'On and on ft. Daniel Levi',
	        artist: 'Cartoon',
	        songPath: './music/on-n-on.mp3',
	        coverPath: './img/song-2.jpg'
	    }
	];

	playBtnEl.addEventListener('click', togglePlaySong);
	nextBtnEl.addEventListener('click', changeSong);
	prevBtnEl.addEventListener('click', () => {changeSong(false)});

	volumeInput.addEventListener('mousemove', changeVolume);
	volumeInput.addEventListener('input', changeVolume);

	//songDurationRangeEl.addEventListener('mousemove', updateSongDuration);
	songDurationRangeEl.addEventListener('input', updateSongDuration);

	initPlayer();

	setInterval(syncSongTime, 100);


	function initPlayer() {
		currentSong = 0;
		nextSong = currentSong +  1;
		updatePlayer();
	}

	function updatePlayer() {
		const song = songs[currentSong];
		songCoverEl.style = `background-image: url('${song.coverPath}');`
		songTitleEl.innerText = song.title;
		songArtistEl.innerText = song.artist;

		musicPlayerEl.src = song.songPath;
		nextSongEL.innerText = songs[nextSong].title + 'by' + songs[nextSong].artist;
		musicPlayerEl.onloadedmetadata = function() {
			songDuration = (musicPlayerEl.duration / 60).toFixed(2);
			updateSongDuration();
			console.log(songDuration);
		}
	}

	function updateSongDuration(e) {
		songEndTimeEl.innerText = songDuration;
		if (e !== undefined) {
			const value = e.target.value;
			const time = (songDuration / 100 * value).toFixed(2);
		}
	}

	function syncSongTime() {
		const currentTimePlaying = (musicPlayerEl.currentTime / 60).toFixed(2);
		songCurrentTimeEl.innerText = currentTimePlaying;
		songDurationRangeEl.value = currentTimePlaying * 60;
		console.log(songDurationRangeEl.value)
	}

	function togglePlaySong() {
		if (musicPlayerEl.paused) {
			musicPlayerEl.play();
			playBtnIcon.classList.remove('fa-play');
			playBtnIcon.classList.add('fa-pause');
		} else {
			musicPlayerEl.pause();
			playBtnIcon.classList.remove('fa-pause');
			playBtnIcon.classList.add('fa-play');
		}
	}

	function changeSong(next=true) {
		if (next) {
			currentSong++;
			nextSong = currentSong +  1;
			console.log(currentSong);
			if (currentSong > songs.length - 1) {
				currentSong = 0;
				nextSong = currentSong +  1;
			}
			if (nextSong > songs.length - 1) {
				nextSong = 0;
			}
		} else {
			currentSong--;
			nextSong = currentSong +  1;

			if (currentSong < 0) {
				currentSong = songs.length - 1;
				nextSong = 0;
			}
		}
		console.log(currentSong);
		updatePlayer();
		togglePlaySong();
	}

	function changeVolume() {
		const volume = this.value;
		musicPlayerEl.volume = volume;
	}
}