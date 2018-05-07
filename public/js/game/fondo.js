var micanvas, ctx;

var tiempo = 0;
var stop;

var fondo = new Image();

fondo.src = 'img/game/img.png';

window.addEventListener('load',init);

function init(){
  micanvas = document.getElementById('canvasGame');
  micanvas.width = 800;
  micanvas.height = 400;
  ctx = micanvas.getContext('2d');
  comenzar();
}

function comenzar() {
  clearTimeout(stop);
  stop = setTimeout(comenzar,1);
  dibujar(ctx);
}

function detener() {
  clearTimeout(stop);
}

function dibujar(ctx) {
  ctx.clearRect(0,0,micanvas.width,micanvas.height);
  ctx.drawImage(fondo,tiempo,0);
  ctx.drawImage(fondo,tiempo-800,0);

  tiempo--;
  if(tiempo < 0) {
    tiempo = tiempo + 800;
  }
}
