import {
	lerpAngle,
	lerpDistance
} from './utils'
import canvas from './canvasInfo'
import gInfo from './gameInfo'

export default class MomObj {
    constructor(){
        this.x;
        this.y;
        this.angle;
        this.bigEye = new Image();
        this.bigBody = new Image();
        this.bigTail = new Image();
        this.bigTailCount=0;
        this.bigTailTimer=0;
        this.bigEyeTimer=0;
        this.bigEyeCount=0;
        this.bigEyeInterval=1000;
        this.momBodyCount=0;
    }

    init(){
        let { canvasWidth, canvasHeight } = canvas;
        this.x=canvasWidth*0.5;
        this.y=canvasHeight*0.5;
        this.angle=0;
        this.bigBody.src= require('./images/bigSwim0.png');
    }

    draw(){
        let { mx, my, deltaTime, momBodyOrg, momBodyBlue, data, bigTail, bigEye } = gInfo;
        let { ctx1 } = canvas
        this.x = lerpDistance(mx, this.x, 0.98);
        this.y = lerpDistance(my, this.y, 0.98);
        var deltaY = my - this.y;
        var deltaX = mx - this.x;
        var beta = Math.atan2(deltaY,deltaX)+Math.PI;
        this.angle = lerpAngle(beta,this.angle,0.1);
        
        this.bigTailTimer += deltaTime;
        if(this.bigTailTimer > 50){
            this.bigTailCount = (this.bigTailCount + 1) % 8;
            this.bigTailTimer %= 50;
        }
        
        this.bigEyeTimer += deltaTime;
        if(this.bigEyeTimer > this.bigEyeInterval){
            this.bigEyeCount = (this.bigEyeCount + 1) %2;
            this.bigEyeTimer %= this.bigEyeInterval;
            if(this.bigEyeCount == 0){
                this.bigEyeInterval = Math.random()*1500+2000;
            }else{
                this.bigEyeInterval = 200;
            }
        }

        ctx1.save();
        ctx1.translate(this.x, this.y);
        ctx1.rotate(this.angle);
        let bigTailCount = this.bigTailCount;
        let bigEyeCount = this.bigEyeCount;
        let momBodyCount = this.momBodyCount;
        if(data.double==1){
            ctx1.drawImage(momBodyOrg[momBodyCount], -momBodyOrg[momBodyCount].width*0.5, -momBodyOrg[momBodyCount].height*0.5);
        }else{
            ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width*0.5, -momBodyBlue[momBodyCount].height*0.5);
        }
        ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width*0.5+30, -bigTail[bigTailCount].height*0.5);
        ctx1.drawImage(bigEye[bigEyeCount], -bigEye[bigEyeCount].width*0.5, -bigEye[bigEyeCount].height*0.5);
        ctx1.restore();
    }
}