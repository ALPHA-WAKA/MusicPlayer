
    document.addEventListener('DOMContentLoaded', () => {
        const musicContainer=document.querySelector('.music-container')
const playBtn=document.querySelector('#play')
const prevBtn=document.querySelector('#prev')
const nextBtn=document.querySelector('#next')
const audio=document.querySelector('#audio')
const progress=document.querySelector('.progress')
const progressContainer=document.querySelector('.progress-container')
const title=document.querySelector('#title')
const cover=document.querySelector('#cover')
const audioList = document.querySelector('#audioList'); 


//SOng titles
const songs=['anotherlove','Dream']

//Keep  track of songs
let songIndex=0

//Initially load song info DOM
loadSong(songs[songIndex])


//Update song details
function loadSong(song){
    title.innerText=song
    audio.src=`/assets/media/${song}.mp3`
   cover.src=`/assets/images/${song}.jpeg`

}

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
audio.play()

}
function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

audio.pause()
    
}
function prevSong(){
    console.log('Previous song clicked');
    songIndex--
    if(songIndex<0){
        songIndex=songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();

}
function updateProgress(e){
    e.preventDefault()
    const{duration,currentTime} =e.srcElement
    const progressPercent=(currentTime/duration)*100
    progress.style.width=`${progressPercent}%`
}
function setProgress(e){
    const width =this.clientWidth
    const clickX=e.offsetX
    const duration=audio.duration
    audio.currentTime=(clickX/width)*duration
}
function loadAudioList() {
    // Populate the audio list dropdown dynamically
    const audioListItems = songs.map((song, index) => {
        return `<a class="dropdown-item" href="#" data-index="${index}">${song}</a>`;
    });
    audioList.innerHTML = audioListItems.join('');

    // Add event listeners to the audio list items
    const audioItems = document.querySelectorAll('.dropdown-item');
    audioItems.forEach((item) => {
        item.addEventListener('click', () => {
            songIndex = parseInt(item.getAttribute('data-index'));
            loadSong(songs[songIndex]);
            playSong();
        });
    });
}

// Event listener for the dropdown button to show the list
const dropdownToggle = document.querySelector('.dropdown-toggle');
dropdownToggle.addEventListener('click', () => {
    audioList.classList.toggle('show');
});

// Close the dropdown menu when clicking outside of it
window.addEventListener('click', (e) => {
    if (!dropdownToggle.contains(e.target)) {
        audioList.classList.remove('show');
    }
});
//Event listeners
playBtn.addEventListener('click',()=>{
    const isPlaying= musicContainer.classList.contains('play')
    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
      });
 
  //Change song events
  prevBtn.addEventListener('click',prevSong)
  nextBtn.addEventListener('click',nextSong)
audio.addEventListener('timeupdate',updateProgress)


progressContainer.addEventListener('click',setProgress)

audio.addEventListener('ended',nextSong)
loadAudioList();
});
