(function(){
    function findparent(el, name){ //递归找元素的特定class的父元素
        if(!el.parentElement) return null;
        if(el.parentElement.className.includes(name)) {
            return el.parentElement
        } else {
            return findparent(el.parentElement, name);
        }
    }

    function findAllMoveNode(el, n){ //递归找元素前、后N个元素
        var nodes = [];
        if(n > 0 && el.nextElementSibling){
            nodes.push(el.nextElementSibling);
            nodes = nodes.concat(findAllMoveNode(el.nextElementSibling, n - 1))
        } else if(n < 0){
            nodes.push(el.nextElementSibling);
            nodes = nodes.concat(findAllMoveNode(el.nextElementSibling, n + 1))
        }
        return nodes;
    }

    var dragEle = {
        allEl : document.querySelectorAll('.skin-line-before-border-top'),
        el : document.querySelector('.question-body'),
        mel: null, //移动的元素
        sy:0, //移动的元素
        n: 0, //元素移动了几个位置   -上移  +下移
        init: function(){
            this.touchstart();
            this.touchmove();
            this.touchend();
        },
        findEleIndex: function(el){
            var index = -1;
            self.allEl.forEach(function(e, i){
                if(el === e) index = i;
            })
            return index;
        },
        expearEle: function(els){
            var noMoves = [];
            this.allEl.forEach(function(e, i){
                if(!els.includes(e)){
                    noMoves.push(e)
                }
            })
            return noMoves;
        },
        transfrom : function(el, y) {
            el.style.transform = 'translateY(' + y +'px)';
        },
        moveNode: function(el, y){
            this.transfrom(el, y);
            this.moveNextNode(el, y);
        },
        moveNextNode: function(el, y) {
            var self = this;
            var n = this.n = Math.round(y / 54);
            var nodes = findAllMoveNode(el, n);
            nodes.forEach(function(e, i){
                self.transfrom(e, n < 0 ? 54 : -54);
            })
            var noMoves = this.expearEle(nodes.concat(el))
            noMoves.forEach(function(e, i){
                self.transfrom(e, 0);
            })

        },
        touchstart: function(){
            var self = this;
            this.el.addEventListener('touchstart',function(event){
                var mel = findparent(event.target,'skin-line-before-border-top')
                if( mel && !self.mel){
                    self.mel = mel;
                    self.mel.className += " moving";
                    self.sy = event.touches[0].clientY;
                }
            })
        },
        touchmove: function(event){
            var self = this;
            this.el.addEventListener('touchmove',function(event){
                if(self.mel){
                    self.moveNode(self.mel, event.touches[0].clientY - self.sy)
                }
            })
        },
        touchend: function(event){
            var self = this;
            this.el.addEventListener('touchend',function(event){
                self.mel.className = self.mel.className.replace(' moving','');
                //  调整所有元素位置操作  省略  并置空初始值
            })
        }
    }

    dragEle.init();
}())