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
