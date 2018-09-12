import canvas from './canvasInfo'
import gInfo from './gameInfo'

export default class HaloObj {
    constructor(){
        this.x=[];
        this.y=[];
        this.r=[];
        this.alive=[];
    }

    num = 5

    init(){
        for(var i=0;i<this.num;i++){
            this.x[i] = 0;
            this.y[i] = 0;
            this.r[i] = 0;
            this.alive[i] = false;
        }
    }

    draw(){
        let { ctx1 } = canvas;
        let { deltaTime } = gInfo;
        ctx1.save();
        ctx1.lineWidth = 2;
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = "rgba(134,45,145,1)";
        for(var i=0; i<this.num; i++){
            if(this.alive[i]){
                this.r[i] += deltaTime*0.1;
                if(this.r[i] > 100){ 
                    this.alive[i] = false; 
                    break; 
                };
                let alpha = 1-this.r[i]/100;
                ctx1.beginPath();
                ctx1.arc(this.x[i], this.y[i],this.r[i], 0, Math.PI*2);
                ctx1.closePath();
                ctx1.strokeStyle="rgba(134,45,145,"+alpha+")";
                ctx1.stroke();
            }
        }
        ctx1.restore();
    }

    born(x,y){
        for(var i=0; i < this.num; i++){
            if(!this.alive[i]){
                this.x[i] = x;
                this.y[i] = y;
                this.r[i] = 10;
                this.alive[i] = true;
            }
        }
    }
}