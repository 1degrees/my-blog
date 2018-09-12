import canvas from './canvasInfo'
import gInfo from './gameInfo'

export default class DateObj {
    constructor(){
        this.fruitNum=0;
        this.double=1;
        this.score=0;
        this.gameOver=false;
        this.alpha=0;
    }

    reset(){
        this.fruitNum=0;
        this.double=1;
    }

    addScore(){
        this.score += this.fruitNum * 100 * this.double;
        this.fruitNum = 0;
        this.double = 1;
    }

    draw(){
        let { ctx1, canvasHeight, canvasWidth } = canvas;
        let { deltaTime } = gInfo;
        var w = canvasWidth;
        var h = canvasHeight;
        ctx1.save();
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = 'white';
        ctx1.fillStyle = 'white';
        ctx1.font = '20px Verdana';
        ctx1.textAlign = 'center';
        ctx1.fillText('得分'+ this.score,  w*0.5, h-20);
        if(this.gameOver){
            this.alpha += deltaTime*0.0001;
            if(this.alpha>1) this.alpha=1;
            ctx1.fillStyle = "rgba(255,255,255,"+this.alpha+")";
            ctx1.fillText('Game Over',w*0.5,h*0.5)
        }
        ctx1.restore();
    }
}