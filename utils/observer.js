/*
 * @Author: xiao·Zhang 
 * @Date:   2018-08-09 11:03:25 
 * @Last    Modified by: xiao·Zhang
 * @Last    Modified time: 2018-11-29 10:35:49
 * @file:   注册事件触发器（观察者模式）
 */

class Handle {
    constructor(name, ...func){
        this.handles = [...func];
        this.name = name || '';
    }

    addEvent(func){
        let { handles } = this;
        handles.push(func);
    }

    removeEvent(func){
        let { handles } = this;
        let i = handles.indexOf(func);
        i != -1 && handles.splice(i,1);
    }

    dispatch(...params){
        let { handles } = this;
        for(let i in handles){
            try {
                handles[i](...params)
            } catch (err) {
                console.error(err)
            }
        }
    }

    toString(){
        return this.name
    }

    valueOf(){
        return this.name;
    }
};

class MessageMechanism {
    constructor(){
        this.handles = {};
    }

    on(name, func){
        let { handles } = this;
        if(handles[name]) {
            handles[name].addEvent(func);
        } else {
            handles[name] = new Handle(name,func);
        }
    }

    off(name, func){
        let { handles } = this;
        if(handles[name]) {
            handles[name].removeEvent(func);
        }
    }

    fire(name, ...params){
        let { handles } = this;
        if(handles[name]) {
            handles[name].dispatch(...params);
        }
    }
}

const  messageEvent = new MessageMechanism();

export default messageEvent