const container=document.querySelector(".container");
const image=document.querySelector("#music-image");
const title=document.querySelector("#music-details .title");
const singer=document.querySelector("#music-details .singer");
const prev=document.querySelector("#controls #prev");
const play=document.querySelector("#controls #play");
const next=document.querySelector("#controls #next");
const iconPlay=document.querySelector("#play i");
const duration=document.querySelector(".duration");
const currentTime=document.querySelector(".current-time");
const progressBar=document.querySelector("#progress-bar");
const volumeBar=document.querySelector("#volume-bar");
const volume=document.querySelector("#volume");
const bars=document.querySelector(".card-footer button");
const ul=document.querySelector(".list-group");


const player=new MusicPlayer(musicList);


window.addEventListener("load", () => {
    let music=player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList, player.index);
    isPlayingNow();
});

const displayMusic=(music)=>{
    title.innerText=music.getName();
    singer.innerText=music.singer;
    image.setAttribute("src",`image/${music.img}`);
    audio.src="mp3/"+ music.file;
}


play.addEventListener("click", ()=> {
    let isMusicPlay=container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();  
});

const pauseMusic=() => {
    audio.pause();
    iconPlay.classList="fa-solid fa-play";
    container.classList.remove("playing");
}

const playMusic=() => {
    audio.play();
    container.classList.add("playing");
    iconPlay.classList="fa-solid fa-pause";
}

next.addEventListener("click",()=>{nextMusic();});

prev.addEventListener("click",()=>{prevMusic();})

const prevMusic= () => {
    player.previous();
    let music=player.getMusic();
    displayMusic(music);
    iconPlay.classList="fa-solid fa-play";
    isPlayingNow();
}

const nextMusic=() => {
    player.next();
    let music=player.getMusic();
    displayMusic(music);
    iconPlay.classList="fa-solid fa-play";
    isPlayingNow();
}

const calculateTime=(toplamSaniye)=>{
    const dakika=Math.floor(toplamSaniye/60);
    const saniye=Math.floor(toplamSaniye%60);
    const guncellenenSaniye= saniye<10 ? `0${saniye}`: `${saniye}`;
    return `${dakika}:${guncellenenSaniye}`;
}

audio.addEventListener("loadedmetadata", ()=>{
    duration.textContent=calculateTime(audio.duration);
    progressBar.max=Math.floor(audio.duration);
})

audio.ontimeupdate=()=>{
    currentTime.textContent=calculateTime(audio.currentTime);
    progressBar.value=audio.currentTime;
}

progressBar.addEventListener("input", ()=> {
    currentTime.textContent=calculateTime(progressBar.value);
    audio.currentTime=progressBar.value;
})

let muteState="unmuted";
volume.addEventListener("click", ()=>{
    if( muteState==="unmuted"){
        audio.muted=true;
        muteState="muted";
        volume.classList="fa-solid fa-volume-xmark";
        volumeBar.value=0;
    }
    else{
        audio.muted=false;
        muteState="unmuted";
        volume.classList="fa-solid fa-volume-high"
        volumeBar.value=100;
    }
})

volumeBar.addEventListener("input",(e)=>{
    const value=e.target.value;
    audio.volume=value/100;
    if(value==0){
        audio.muted=true;
        volume.classList="fa-solid fa-volume-xmark";
        muteState="muted"
    } 
    else{
        audio.muted=false;
        volume.classList="fa-solid fa-volume-high";
        muteState="unmuted";
    }
})

const displayMusicList=(list, i)=>{
    ul.innerHTML="";

    for(let music of list){
        let li=`<li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex align-items-center justify-content-between">
        <span>${music.getName()}</span>
        <span  id="music-${i}" style="width: 15%;" class="bagde text-bg-primary rounded-pill text-center"></span>
        <audio class="music-${i}" src="mp3/${music.file}"></audio>
        </li>`;

        ul.insertAdjacentHTML("beforeend", li);

        let liAudioDuration=ul.querySelector(`#music-${i}`);
        let liAudioTag=ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", ()=> {
            liAudioDuration.innerText=calculateTime(liAudioTag.duration);
        })

        i++;   
    }
}

const selectedMusic=(li)=>{
    player.index=li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

const isPlayingNow=() => {
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }
        if(li.getAttribute("li-index")==player.index){
            li.classList.add("playing");
        }
    }
}

audio.addEventListener("ended",()=>{
    nextMusic();
})













