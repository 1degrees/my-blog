import canvas from './canvasInfo'
import gInfo from './gameInfo'

export default class AneObj {
    static num = 50;
    constructor(){
        this.rootx=[];
        this.headx=[];
        this.heady=[];
        this.amp=[];
        this.alpha=0;
    }

    init(){
        for(var i=0;i < this.num;i++){
            this.rootx[i] = i*16 + Math.random()*20;
            this.headx[i] = this.rootx[i];
            this.heady[i] = canvasHeight-250+Math.random()*20;
            this.amp[i] = Math.random()*50+50;  //正图
        }
    }

    draw(){
        let { ctx2, canvasHeight } = canvas;
        let { deltaTime } = gInfo;
        this.alpha += deltaTime*0.0008;
        let l = Math.sin(this.alpha)
        ctx2.save()
        ctx2.lineWidth = 20;
        ctx2.lineCap = 'round'
        ctx2.strokeStyle = '#3b154e';
        ctx2.globalAlpha = 0.6;
        for(let i = 0; i < this.num; i++){
            ctx2.beginPath();
            ctx2.moveTo(this.rootx[i], canvasHeight);
            this.headx[i]=this.rootx[i]+l*this.amp[i];
            ctx2.quadraticCurveTo(this.rootx[i], canvasHeight - 100,this.headx[i],this.heady[i]);
            ctx2.stroke();
    
        }
        ctx2.restore()
    }
}
