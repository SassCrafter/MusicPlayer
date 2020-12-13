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

	let currentSong;
	let nextSong;

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

	initPlayer();


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
}