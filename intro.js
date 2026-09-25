'use strict';
const intro=document.getElementById('intro'),introVideo=document.getElementById('intro-video'),roomMain=document.querySelector('main'),introStart=document.getElementById('intro-start'),introMessage=document.getElementById('intro-message');
function enterRoom(){introVideo.pause();intro.hidden=true;roomMain.inert=false;document.querySelector('.character').focus();}
document.getElementById('start-intro').onclick=async()=>{try{await introVideo.play();introStart.hidden=true;introVideo.controls=true;document.querySelector(".intro-top").hidden=false;}catch{document.querySelector(".intro-top").hidden=false;introMessage.textContent='Unable to play. Try again or skip the intro.';}};
document.getElementById('skip-intro').onclick=enterRoom;
introVideo.addEventListener('ended',enterRoom);
introVideo.addEventListener('error',()=>{introMessage.textContent='The intro could not load. Skip to enter the room.';introStart.hidden=false;});
document.getElementById('replay-intro').onclick=()=>{document.getElementById('audio').pause();introVideo.currentTime=0;introVideo.controls=false;document.querySelector(".intro-top").hidden=true;introMessage.textContent="";introStart.hidden=false;intro.hidden=false;roomMain.inert=true;document.getElementById('start-intro').focus();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!intro.hidden)enterRoom()});
document.getElementById('start-intro').focus();
