import canvas from './canvasInfo'
import gInfo from './gameInfo'

export default class DustObj {
    static num = 30;

    constructor(){
        this.x = [];
        this.y = [];
        this.amp = []  //振幅
        this.No = [];  //下标
    }

    init(){
        let { canvasWidth, canvasHeight } = canvas;
        for(var i=0;i<this.num;i++){
            this.x[i] = Math.random()*canvasWidth;
            this.y[i] = Math.random()*canvasHeight;
            this.amp[i] = 20+Math.random()*25;
            this.No[i] = Math.floor(Math.random()*7);
        }
         this.alpha=0;
    }

    draw(){
        let { deltaTime, dustPic } = gInfo;
        let { ctx1 } = canvas;
        this.alpha += deltaTime*0.0008;
        var l = Math.sin(this.alpha);
        for(var i=0; i<this.num; i++){
            var no=this.No[i];
            ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i]*l, this.y[i]);
        }
    }
}