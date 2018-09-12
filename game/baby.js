import {
	lerpAngle,
	lerpDistance
} from './utils'
import canvas from './canvasInfo'
import gInfo from './gameInfo'

export default class BabyObj {
    constructor(){
        this.babyEye = new Image();
        this.babyBody = new Image();
        this.babyTail = new Image();
        this.babyTailTimer = 0;
        this.babyTailCount = 0;
        this.babyEyeTimer = 0;
        this.babyEyeCount = 0;
        this.babyEyeInterval = 1000;
        this.babyBodyTimer = 0;
        this.babyBodyCount = 0;
    }

    init(){
        let { canvasWidth,canvasHeight } = canvas;
        this.x = canvasWidth * 0.5-50;
        this.y = canvasHeight * 0.5+50;
        this.angle = 0;
    }

    draw(){
        let { deltaTime, babyTail, babyBody, babyEye, mom, data } = gInfo;
        let { ctx1 } = canvas;
        this.x=lerpDistance(mom.x, this.x, 0.98);
        this.y=lerpDistance(mom.y, this.y, 0.98);
        let deltaY = mom.y - this.y;
        let deltaX = mom.x - this.x;
        let beta = Math.atan2(deltaY, deltaX) + Math.PI;
        this.angle = lerpAngle(beta,this.angle,0.1);
        
        this.babyTailTimer += deltaTime;
        if(this.babyTailTimer>50){
            this.babyTailCount = (this.babyTailCount+1) % 8;
            this.babyTailTimer %= 50;
        }
    
        this.babyEyeTimer += deltaTime;
        if(this.babyEyeTimer > this.babyEyeInterval){
            this.babyEyeCount = (this.babyEyeCount+1)%2;
            this.babyEyeTimer %= this.babyEyeInterval;
            if(this.babyEyeCount == 1){
                this.babyEyeInterval = 200;
            }else{
                this.babyEyeInterval = Math.random()*1500+2000;
            }
        }
    
        this.babyBodyTimer += deltaTime;
        if(this.babyBodyTimer > 300){
            this.babyBodyCount = this.babyBodyCount+1;
            this.babyBodyTimer %= 300;
            if(this.babyBodyCount > 19){
                // 游戏结束
                this.babyBodyCount = 19;
                data.gameOver=true;
            }
        }
    
        ctx1.save();
        ctx1.translate(this.x, this.y);
        ctx1.rotate(this.angle);
        var babyTailCount = this.babyTailCount;
        var babyEyeCount = this.babyEyeCount;
        var babyBodyCount = this.babyBodyCount;
        ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width*0.5+23, -babyTail[babyTailCount].height*0.5);
        ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width*0.5, -babyBody[babyBodyCount].height*0.5);
        ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width*0.5, -babyEye[babyEyeCount].height*0.5);
        ctx1.restore();
    }
}