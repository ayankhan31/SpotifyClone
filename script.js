console.log("Welcome to Spotify");
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Back to December", filePath: "songs/1.mp3", coverPath: "covers/Speak_Now.png"},
    {songName:"Cruel Summer", filePath: "songs/2.mp3", coverPath: "covers/Cruel_Summer.jpg"},
    {songName:"Blank Space", filePath: "songs/3.mp3", coverPath: "covers/1989.png"},
    {songName:"You Belong With Me", filePath: "songs/4.mp3", coverPath: "covers/Fearless.jpeg"},
    {songName:"Maroon", filePath: "songs/5.mp3", coverPath: "covers/Midnights.png"},
    {songName:"Saware", filePath: "songs/6.mp3", coverPath: "covers/Saware.jpeg"},
    {songName:"Subhanallah", filePath: "songs/7.mp3", coverPath: "covers/Subhanallah.jpg"},
    {songName:"Midnight Rain", filePath: "songs/8.mp3", coverPath: "covers/Midnights.png"},
    {songName:"Anti-Hero", filePath: "songs/9.mp3", coverPath: "covers/Midnights.png"},
    {songName:"Kahani Suno 2.0", filePath: "songs/10.mp3", coverPath: "covers/Kahani_Suno.jpg"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
    
})

//Listen to events

audioElement.addEventListener('timeupdate', ()=>{
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
    

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();       
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })

})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10){
        songIndex = 1;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = 1;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})