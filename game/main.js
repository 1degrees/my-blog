import { momFruitCollision, momBabyCollision, fruitMonitor } from './collision'
import canvas from './canvasInfo'
import gInfo from './gameInfo'
import AneObj from './ane'
import BabyObj from './baby'
import DataObj from './data'
import DustObj from './dust'
import FruitObj from './fruit'
import HaloObj from './halo'
import MomObj from './mom'
import WaveObj from './wave'

let img;

export default function game(){
	init();
	gameloop();
}

function init(){
    img = new Image();
    img.src = require('./images/background.jpg');
    let can1, can2, canvasWidth, canvasHeight;
    gInfo.lastTime = Date.now();
	gInfo.deltaTime = 0;
	can1 = canvas.can1 = document.getElementById('canvas1');
    canvas.ctx1 = can1.getContext("2d");
    can2 = document.getElementById('canvas2');
    canvas.ctx2 = can2.getContext("2d");
    can1.addEventListener('mousemove', onMouseMove, false);
    canvasWidth = canvas.canvasWidth = can1.width;
    canvasHeight =  canvas.canvasHeight = can1.height;

    for(var i=0;i<8;i++){
        gInfo.babyTail[i] = new Image();
        gInfo.babyTail[i].src = require('./images/bigTail'+i+'.png');
        gInfo.bigTail[i] = new Image();
        gInfo.bigTail[i].src = require('./images/bigTail'+i+'.png');
    }

    for(var i=0;i<2;i++){
        gInfo.babyEye[i] = new Image();
        gInfo.babyEye[i].src = require('./images/babyEye'+i+'.png');
    }

    for(var i=0;i<20;i++){
        gInfo.babyBody[i]=new Image();
        gInfo.babyBody[i].src=require('./images/babyFade'+i+'.png');
    }

    for(var i=0;i<2;i++){
        gInfo.bigEye[i]=new Image();
        gInfo.bigEye[i].src= require('./images/bigEye'+i+'.png');
    }

    for(var i=0;i<7;i++){
        gInfo.dustPic[i] = new Image();
        gInfo.dustPic[i].src = require("./images/dust"+ i +".png");
    }

    for(var i=0;i<8;i++){
        gInfo.momBodyOrg[i]=new Image();
        gInfo.momBodyBlue[i]=new Image();
        gInfo.momBodyOrg[i].src= require('./images/bigSwim'+i+'.png');
        gInfo.momBodyBlue[i].src=require('./images/bigSwimBlue'+i+'.png');
    }
    
    gInfo.mx = canvasWidth*0.5;
    gInfo.my = canvasHeight*0.5;

    gInfo.ane = new AneObj();
    gInfo.ane.init();
    gInfo.fruit=new FruitObj();
    gInfo.fruit.init();
    gInfo.mom=new MomObj();
    gInfo.mom.init();
    gInfo.baby=new BabyObj();
    gInfo.baby.init();
    gInfo.data=new DataObj();
    gInfo.wave=new MomObj();
    gInfo.wave.init();
    gInfo.halo=new HaloObj();
    gInfo.halo.init();
    gInfo.dust=new DustObj();
    gInfo.dust.init();
    
}

function gameloop(){
	window.requestAnimationFrame(gameloop);
	let now = Date.now();
	canvas.deltaTime = now - canvas.lastTime;
	canvas.lastTime = now;
    if(gInfo.deltaTime>40) gInfo.deltaTime = 40;
	canvas.ctx2.drawImage(img, 0, 0, canvas.canvasWidth, canvas.canvasHeight)
    gInfo.ane.draw();
    fruitMonitor();
    gInfo.fruit.draw();
    canvas.ctx1.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight)
    gInfo.mom.draw();
    gInfo.baby.draw();
    momFruitCollision();
    momBabyCollision();
    gInfo.data.draw();
    gInfo.wave.draw();
    gInfo.halo.draw();
    gInfo.dust.draw();
}

function onMouseMove(e){
    if(!gInfo.data.gameOver){
        if(e.offsetX || e.layerX){
            gInfo.mx = e.offsetX == undefined? e.layerX:e.offsetX;
            gInfo.my = e.offsetY==undefined? e.layerY:e.offsetY;
        }
    }
}