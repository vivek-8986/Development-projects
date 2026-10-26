console.log('lets write javaSCRIPT');



function formatTime(seconds){
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return String(minutes).padStart(2,'0')+ ":"+
            String(remainingSeconds).padStart(2,'0')
        
}


async function getSongs() {

    
    let a = await fetch("http://127.0.0.1:5500/spotifyproject/songs/");

     
    let response = await a.text();

    
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for(let index = 0; index < as.length; index++){
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}
let audio = new Audio();
const playMusic = (track,pause=false)=>{
    // let audio = new Audio("/spotifyproject/songs/" + track);
    currentSong.src = "/spotifyproject/songs/" + track
    if(!pause){
        currentSong.play()
        play.src = "pause.svg"
    }
    
    document.querySelector(".songinfo").textContent =
    decodeURIComponent(track).replace(/\.mp3$/i, "");
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}


let currentSong = new Audio();
async function main() {
    

    console.log("Main function started");

    let songs = await getSongs();
    playMusic(songs[0],true)

    console.log("Songs found:", songs);

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
        songUL.innerHTML = "";
    for(const song of songs){
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div>${decodeURIComponent(song).replace(/\.mp3$/i, "")}</div>
                  <div>Arijit Singh</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="play.svg" alt="">
                </div>
       
        
        </li>`;
        
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e, index) => {
    e.addEventListener("click", () => {
    console.log("Selected song:", songs[index]);
    playMusic(songs[index]);
});
  
    
});
// Attach an event listner to play , next and previous
play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src = "pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "play.svg"
    }
})
    currentSong.addEventListener("timeupdate", ()=>{
        console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.
        currentTime)}:${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100+"%";
        })

    // Add an event listner to seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left = percent+"%"
        currentSong.currentTime = ((currentSong.duration)*percent)/100
    })

}
    
main();

















