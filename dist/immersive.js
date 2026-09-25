'use strict';
const stage=document.querySelector('.room'),musicCard=document.querySelector('.player');
stage.append(musicCard);musicCard.hidden=true;musicCard.setAttribute('aria-label','Selected character music player');
const closeCard=document.createElement('button');closeCard.className='close-card';closeCard.type='button';closeCard.setAttribute('aria-label','Close music card');closeCard.textContent='×';musicCard.append(closeCard);
const library=musicCard.querySelector('.library'),audioOptions=document.createElement('details');audioOptions.className='audio-options';audioOptions.innerHTML='<summary>Audio options</summary>';library.before(audioOptions);audioOptions.append(library);
const positions=[{x:7,y:37},{x:27,y:60},{x:47,y:23},{x:65,y:56},{x:82,y:33}];
document.querySelectorAll('.character').forEach((button,i)=>{button.style.left=positions[i].x+'%';button.style.top=positions[i].y+'%';button.style.setProperty('--flight-delay',(-i*1.7)+'s');button.style.setProperty('--flight-duration',(8+i*.9)+'s');const edges=[0,419,899,1293,1703,2172];const ns='http://www.w3.org/2000/svg';const sprite=document.createElementNS(ns,'svg');sprite.setAttribute('class','character-sprite');sprite.setAttribute('aria-hidden','true');sprite.setAttribute('viewBox',`${edges[i]} 180 ${edges[i+1]-edges[i]} 390`);const picture=document.createElementNS(ns,'image');picture.setAttribute('href','characters.png');picture.setAttribute('width','2172');picture.setAttribute('height','724');const clip=document.createElementNS(ns,"clipPath");clip.id="sprite-crop-"+i;const rect=document.createElementNS(ns,"rect");rect.setAttribute("x",edges[i]);rect.setAttribute("y","180");rect.setAttribute("width",edges[i+1]-edges[i]);rect.setAttribute("height","390");clip.append(rect);sprite.append(clip);picture.setAttribute("clip-path","url(#sprite-crop-"+i+")");sprite.append(picture);button.prepend(sprite);});
function placeMusicCard(){if(musicCard.hidden)return;const button=document.querySelectorAll('.character')[current];const r=stage.getBoundingClientRect(),b=button.getBoundingClientRect(),w=musicCard.offsetWidth,h=musicCard.offsetHeight;let x=b.right-r.left+10;if(x+w>r.width-12)x=b.left-r.left-w-10;let y=b.top-r.top+b.height/2-h/2;if(b.right-r.left+10+w>r.width-12 && b.left-r.left-w-10<12){y=b.bottom-r.top+8;if(y+h>r.height-12)y=b.top-r.top-h-8;}x=Math.max(12,Math.min(x,r.width-w-12));y=Math.max(12,Math.min(y,r.height-h-12));musicCard.style.left=x+'px';musicCard.style.top=y+'px';}
window.placeMusicCard=placeMusicCard;
function showMusicCard(){musicCard.hidden=false;document.querySelectorAll('.character').forEach((b,i)=>b.classList.toggle('card-anchor',i===current));requestAnimationFrame(placeMusicCard);}
document.addEventListener('room-track-selected',showMusicCard);
closeCard.onclick=()=>{musicCard.hidden=true;document.querySelectorAll('.character').forEach(b=>b.classList.remove('card-anchor'));document.querySelectorAll('.character')[current].focus();};
musicCard.addEventListener('keydown',e=>{if(e.key==='Escape')closeCard.click()});
new ResizeObserver(placeMusicCard).observe(musicCard);new ResizeObserver(placeMusicCard).observe(stage);
audioOptions.addEventListener('toggle',placeMusicCard);window.addEventListener('resize',placeMusicCard);
document.getElementById('surprise-enter').addEventListener('click',()=>{if(!document.getElementById('audio').paused)showMusicCard()});


