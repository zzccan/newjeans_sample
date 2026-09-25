'use strict';
const referenceArt=document.querySelector('.room-art');
const referencePoints=[[49.4,46.8],[31.8,79.8],[40.8,30.4],[32.3,13.5],[40.5,62.8]];
function alignReferenceCharacters(){if(stage.classList.contains("race-mode"))return;const width=stage.clientWidth,height=stage.clientHeight,ratio=referenceArt.naturalWidth/referenceArt.naturalHeight;if(!Number.isFinite(ratio))return;const imageWidth=Math.min(width,height*ratio),imageHeight=imageWidth/ratio,offsetX=(width-imageWidth)/2,offsetY=(height-imageHeight)/2;document.querySelectorAll('.character').forEach((button,i)=>{button.style.setProperty('left',(offsetX+imageWidth*(referencePoints[i][0]-5)/100)+'px','important');button.style.setProperty('top',(offsetY+imageHeight*(referencePoints[i][1]-8)/100)+'px','important');button.style.setProperty('width',imageWidth*.10+'px','important');button.style.setProperty('height',imageHeight*.16+'px','important');});placeMusicCard();}
referenceArt.addEventListener('load',alignReferenceCharacters);new ResizeObserver(alignReferenceCharacters).observe(stage);alignReferenceCharacters();

