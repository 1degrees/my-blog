import canvas from './canvasInfo'
import gInfo from './gameInfo'

export default class FruitObj {
    constructor(){
        this.num = 30;
        this.alive = [];
        this.x = [];
        this.y = [];
        this.l = [];
        this.aneNo = [];
        this.spd = [];
        this.fruitType = [];
        this.orange = new Image();
        this.blue = new Image();
    }

    init(){
        for(var i=0;i<this.num;i++){
            this.alive[i] = false;
            this.x[i] = 0;
            this.y[i] = 0;
            this.aneNo[i] = 0;
            this.spd[i] = Math.random()*0.017+0.003;
            this.fruitType[i] = '';
        }
        this.orange.src = require('./images/fruit.png');
        this.blue.src = require('./images/blue.png');
    }

    draw() {
        let { deltaTime, ane } = gInfo;
        let { ctx2 } = canvas;
        for(var i=0; i < this.num; i++){
            if(this.alive[i]){
                if(this.fruitType[i]=='blue'){
                    var pic = this.blue;
                }else{
                    var pic = this.orange;
                }
                if(this.l[i]<14){
                    this.x[i] = ane.headx[this.aneNo[i]];
                    this.y[i] = ane.heady[this.aneNo[i]];
                    this.l[i] += this.spd[i] * deltaTime;
                    ctx2.drawImage(pic, this.x[i] - this.l[i]*0.5, this.y[i] - this.l[i]*0.5, this.l[i], this.l[i]);
    
                }else{
                    this.y[i] -= this.spd[i] * 7 * deltaTime;
                     ctx2.drawImage(pic, this.x[i] - this.l[i]*0.5, this.y[i] - this.l[i]*0.5, this.l[i], this.l[i]);
                }
                if(this.y[i]<20){
                    this.alive[i]=false;
                }
            }
        }
    }

    born(i) {
        let { ane } = gInfo;
        this.aneNo[i] = Math.floor(Math.random()*ane.num);
        this.l[i] = 0;
        this.alive[i] = true;
        var ran = Math.random();
        if(ran < 0.2){
            this.fruitType[i] = 'blue';
        }else{
            this.fruitType[i] = 'orange';
        }
    }

    dead(i) {
        this.alive[i] = false;
    }
}