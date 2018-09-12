import gInfo from './gameInfo'
import { calLength2 } from './utils'

// 大鱼吃果实（碰撞）
export function momFruitCollision(){
    let { mom, fruit, wave, data } = gInfo;
    if(!data.gameOver){
            for(var i=0;i<fruit.num;i++){
                if(fruit.alive[i]){
                    var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
                    if(l<900){
                        fruit.dead(i);
                        data.fruitNum++;
                        mom.momBodyCount++;
                        if(mom.momBodyCount>7){
                            mom.momBodyCount=7;
                        }
                        if(fruit.fruitType[i]=='blue'){
                            data.double=2;
                        }
                        wave.born(fruit.x[i],fruit.y[i]);
                    }
                }
            }
    }
}
  
// 大鱼喂小鱼
export function momBabyCollision(){
    let { mom, baby, halo, data } = gInfo;
    if(data.fruitNum>0 && !data.gameOver){
        var l = calLength2(mom.x,mom.y,baby.x,baby.y);
        if(l<900){
            baby.babyBodyCount=0;
            mom.momBodyCount=0;
            data.addScore();
            halo.born(baby.x,baby.y);
        }
    }
}

export function fruitMonitor(){
    let { fruit } = gInfo;
	var num = 0;
	for(var i=0;i< fruit.num;i++){
		if(fruit.alive[i]) num++
	}
    if(num < 15){
    	sendFruit();
    	return;
    }
}

function sendFruit(){
    let { fruit } = gInfo;
	for(var i=0; i < fruit.num; i++){
		if(!fruit.alive[i]){
            fruit.born(i);
            return;
		}
	}
}