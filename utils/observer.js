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

class ObjEvent {
    constructor(){
        this.handles = {};
    }

    add(name, func){
        let { handles } = this;
        if(handles[name]) {
            handles[name].addEvent(func);
        } else {
            handles[name] = new Handle(name,func);
        }
    }

    remove(name, func){
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

const  objEvent = new ObjEvent();

export default objEvent