'use strict';
const intro=document.getElementById('intro'),introVideo=document.getElementById('intro-video'),roomMain=document.querySelector('main'),choices=document.getElementById('memory-choices'),surprise=document.getElementById('surprise'),songAudio=document.getElementById('audio');
let introComplete=false,lastSurprise=-1;
function finishIntro(){introComplete=true;introVideo.pause();introVideo.currentTime=8;document.getElementById('intro-progress').value=100;document.getElementById('intro-percent').textContent='100%';choices.hidden=false;document.getElementById('resume-intro').hidden=true;}
function enterRoom(){introVideo.pause();intro.hidden=true;surprise.hidden=true;roomMain.inert=false;roomMain.classList.remove('room-entering');void roomMain.offsetWidth;roomMain.classList.add('room-entering');document.querySelector('.character').focus();window.placeMusicCard?.();}
async function runIntro(){try{await introVideo.play();document.getElementById('resume-intro').hidden=true;}catch{document.getElementById('resume-intro').hidden=false;}}
introVideo.controls=false;introVideo.muted=false;introVideo.volume=1;
introVideo.addEventListener('timeupdate',()=>{if(introComplete)return;const duration=Number.isFinite(introVideo.duration)?introVideo.duration:30;const percent=Math.min(99,Math.floor(introVideo.currentTime/duration*100));document.getElementById('intro-progress').value=percent;document.getElementById('intro-percent').textContent=percent+'%';if(introVideo.currentTime>=29.8)finishIntro();});
introVideo.addEventListener('ended',finishIntro);
introVideo.addEventListener('error',()=>{document.getElementById('intro-message').textContent='The animation could not load. Choose a door to continue.';choices.hidden=false;document.getElementById('resume-intro').hidden=true;});
document.getElementById('resume-intro').onclick=runIntro;
document.getElementById('intro-sound').onclick=()=>{introVideo.muted=!introVideo.muted;document.getElementById('intro-sound').textContent=introVideo.muted?'🔇':'🔊';document.getElementById('intro-sound').setAttribute('aria-label',introVideo.muted?'Turn sound on':'Turn sound off');if(introVideo.paused&&!introComplete)runIntro();};
document.getElementById('enter-room').onclick=enterRoom;
function pickSurprise(){let index=Math.floor(Math.random()*tracks.length);if(index===lastSurprise)index=(index+1+Math.floor(Math.random()*(tracks.length-1)))%tracks.length;lastSurprise=index;document.getElementById('surprise-song').textContent=tracks[index].title;document.getElementById('surprise-number').textContent=`YOUR SECRET TRACK · 0${index+1}`;surprise.style.setProperty('--surprise-color',tracks[index].color);select(index,true);}
document.getElementById('open-surprise').onclick=()=>{introVideo.pause();intro.hidden=true;surprise.hidden=false;roomMain.inert=true;pickSurprise();document.getElementById('surprise-enter').focus();};
document.getElementById('surprise-again').onclick=pickSurprise;
document.getElementById('surprise-enter').onclick=enterRoom;
document.getElementById('surprise-play').onclick=()=>{if(songAudio.paused)start();else songAudio.pause();};
function syncSurprise(){document.getElementById('surprise-play').textContent=songAudio.paused?'▶':'Ⅱ';document.getElementById('surprise-play').setAttribute('aria-label',songAudio.paused?'Play surprise song':'Pause surprise song');if(!surprise.hidden){document.getElementById('surprise-song').textContent=tracks[current].title;document.getElementById('surprise-number').textContent=`YOUR SECRET TRACK · 0${current+1}`;surprise.style.setProperty('--surprise-color',tracks[current].color);}}
songAudio.addEventListener('play',syncSurprise);songAudio.addEventListener('pause',syncSurprise);
document.getElementById('surprise-back').onclick=()=>{songAudio.pause();surprise.hidden=true;intro.hidden=false;document.getElementById('open-surprise').focus();};
document.getElementById('replay-intro').onclick=()=>{songAudio.pause();introComplete=false;introVideo.currentTime=0;document.getElementById('intro-progress').value=0;document.getElementById('intro-percent').textContent='0%';document.getElementById('intro-message').textContent='';choices.hidden=true;intro.hidden=false;surprise.hidden=true;roomMain.inert=true;runIntro();};
runIntro();

