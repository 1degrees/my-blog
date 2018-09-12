import {
    calLength2,
    randomColor,
    lerpAngle,
    lerpDistance,
    inOboundary,
    rgbColor,
    rgbNum,
    rnd,
    rateRandom,
    distance,
    AABBbox,
    dis2,
    rndi2
} from './utils'
import canvas from './canvasInfo'
import gInfo from './gameInfo'

export default class WaveObj {
    static num = 10;

    constructor() {
        this.x = [];
        this.y = [];
        this.alive = [];
        this.r = [];
    }

    init() {
        for (var i = 0; i < this.num; i++) {
            this.alive[i] = false;
            this.r[i] = 0;
        }
    }

    draw() {
        let {
            ctx1
        } = canvas;
        let {
            deltaTime
        } = gInfo;
        ctx1.save();
        ctx1.lineWidth = 2;
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = "white";
        for (var i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                this.r[i] += deltaTime * 0.1;
                if (this.r[i] > 60) {
                    this.alive[i] = false;
                    break;
                };
                var alpha = 1 - this.r[i] / 60;
                ctx1.beginPath();
                ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
                ctx1.closePath();
                ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
                ctx1.stroke();

            }
        }
        ctx1.restore();
    }

    born(x, y) {
        for (var i = 0; i < this.num; i++) {
            if (!this.alive[i]) {
                this.alive[i] = true;
                this.r[i] = 20;
                this.x[i] = x;
                this.y[i] = y;
                return;
            }
        }
    }
}