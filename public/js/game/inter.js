(function(){
    'use strict';
    window.addEventListener('load',init,false);
    window.addEventListener('resize',resize,false);
    var canvas=null,ctx=null;
    var scaleX=1,scaleY=1;
    var touches=[];
    var lastPress=null;
    var pause=false;
    var time=0;
    var shootTimer=0;
    var shots=[];
    var player=new Rectangle(100,260,10,10);
    var btnLeft=new Button(10,270,20,20);
    var btnRight=new Button(40,270,20,20);
    var btnShoot=new Button(170,270,20,20);
    var btnPause=new Button(90,0,20,20);

    function init(){
        canvas=document.getElementById('canvasGame');
        ctx=canvas.getContext('2d');
        canvas.width=200;
        canvas.height=300;

        enableInputs();
        resize();
        run();
    }

    function resize(){
        if(window.innerWidth>window.innerHeight){
            canvas.style.position='';
            canvas.style.top='';
            canvas.style.left='';
            canvas.style.width='';
            canvas.style.height='';
            scaleX=1;
            scaleY=1;
        }
        else{
            canvas.style.position='fixed';
            canvas.style.top='0';
            canvas.style.left='0';
            canvas.style.width='100%';
            canvas.style.height='100%';
            scaleX=canvas.width/window.innerWidth;
            scaleY=canvas.height/window.innerHeight;
        }
    }

    function run(){
        requestAnimationFrame(run);

        var now=Date.now();
        var deltaTime=(now-time)/1000;
        if(deltaTime>1){
            deltaTime=0;
        }
        time=now;

        act();
        paint(ctx);
    }

    function act(deltaTime){
        if(!pause){
            // Move Rect
            if(btnRight.touch()) //RIGHT
                player.x+=120*deltaTime;
            if(btnLeft.touch()) //LEFT
                player.x-=120*deltaTime;

            // Out Screen
            if(player.x>canvas.width-player.width)
                player.x=canvas.width-player.width;
            if(player.x<0)
                player.x=0;

            // New Shot
            if(shootTimer>0){
                shootTimer-=deltaTime;
            }
            else if(btnShoot.touch()){
                shots.push(new Rectangle(player.x+3,player.y,4,4));
                shootTimer=0.1;
            }

            // Move Shots
            for(var i=0,l=shots.length;i<l;i++){
                shots[i].y-=120*deltaTime;
                if(shots[i].y<0){
                    shots.splice(i--,1);
                    l--;
                }
            }
        }
        // Pause/Unpause
        if(lastPress==1&&btnPause.touch()){
            pause=!pause;
            lastPress=null;
        }
    }

    function paint(ctx){
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle='#0f0';
        player.fill(ctx);
        ctx.fillStyle='#f00';
        for(var i=0,l=shots.length;i<l;i++)
            shots[i].fill(ctx);

        ctx.fillStyle='#fff';
        ctx.fillText('Last Press: '+lastPress,0,20);
        ctx.fillText('Shots: '+shots.length,0,30);
        if(pause){
            ctx.textAlign='center';
            ctx.fillText('PAUSE',95,150);
            ctx.textAlign='left';
        }

        ctx.strokeStyle='#fff';
        btnRight.stroke(ctx);
        btnLeft.stroke(ctx);
        btnShoot.stroke(ctx);
        btnPause.stroke(ctx);

        // Touch Debug
        ctx.fillStyle='#999';
        for(var i=0,l=touches.length;i<l;i++){
            if(touches[i]!=null){
                ctx.fillRect(touches[i].x-1,touches[i].y-1,2,2);
            }
        }
    }

    function enableInputs(){
        canvas.addEventListener('touchstart',function(evt){
            var t=evt.changedTouches;
            for(var i=0;i<t.length;i++){
                var x=~~((t[i].clientX-canvas.offsetLeft)*scaleX);
                var y=~~((t[i].clientY-canvas.offsetTop)*scaleY);
                touches[t[i].identifier%100]=new Vtouch(x,y);
                lastPress=1;
            }
        },false);
        canvas.addEventListener('touchmove',function(evt){
            evt.preventDefault();
            var t=evt.changedTouches;
            for(var i=0;i<t.length;i++){
                if(touches[t[i].identifier%100]){
                    touches[t[i].identifier%100].x=~~((t[i].clientX-canvas.offsetLeft)*scaleX);
                    touches[t[i].identifier%100].y=~~((t[i].clientY-canvas.offsetTop)*scaleY);
                }
            }
        },false);
        canvas.addEventListener('touchend',function(evt){
            var t=evt.changedTouches;
            for(var i=0;i<t.length;i++){
                touches[t[i].identifier%100]=null;
            }
        },false);
        canvas.addEventListener('touchcancel',function(evt){
            var t=evt.changedTouches;
            for(var i=0;i<t.length;i++){
                touches[t[i].identifier%100]=null;
            }
        },false);

        canvas.addEventListener('mousedown',function(evt){
            evt.preventDefault();
            var x=~~((evt.clientX-canvas.offsetLeft)*scaleX);
            var y=~~((evt.clientY-canvas.offsetTop)*scaleY);
            touches[0]=new Vtouch(x,y);
            lastPress=1;
        },false);
        document.addEventListener('mousemove',function(evt){
            if(touches[0]){
                touches[0].x=~~((evt.clientX-canvas.offsetLeft)*scaleX);
                touches[0].y=~~((evt.clientY-canvas.offsetTop)*scaleY);
            }
        },false);
        document.addEventListener('mouseup',function(evt){
            touches[0]=null;
        },false);

        function Vtouch(x,y){
            this.x=x||0;
            this.y=y||0;
        }
    }

    function Rectangle(x,y,width,height){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
    }

    Rectangle.prototype.intersects=function(rect){
        if(rect!=null){
            return(this.x<rect.x+rect.width&&
                this.x+this.width>rect.x&&
                this.y<rect.y+rect.height&&
                this.y+this.height>rect.y);
        }
    }

    Rectangle.prototype.fill=function(ctx){
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    function Button(x,y,width,height){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
    }

    Button.prototype.touch=function(){
        for(var i=0,l=touches.length;i<l;i++){
            if(touches[i]!=null){
                if(this.x<touches[i].x&&
                    this.x+this.width>touches[i].x&&
                    this.y<touches[i].y&&
                    this.y+this.height>touches[i].y){
                    return true;
                }
            }
        }
        return false;
    }

    Button.prototype.stroke=function(ctx){
        ctx.strokeRect(this.x,this.y,this.width,this.height);
    }

    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback){window.setTimeout(callback,17);};
    })();
})();
