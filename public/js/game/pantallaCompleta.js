// Get the canvas element form the page
var canvas = document.getElementById("canvasGame");
var contexto = canvas.getContext('2d');

// Obtener el maximo del canvas
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

function fullscreen(){
  var el = document.getElementById('canvasGame');
  if(el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  }
  else {
    el.mozRequestFullScreen();
  }
}

canvas.addEventListener("click", fullscreen)
