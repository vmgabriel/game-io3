// Resize
function resizeApp()
{
  var div = document.getElementById('juego');
  var canvas = document.getElementsByTagName('canvas')[0];

  div.style.width = window.innerHeight * 0.6;
  div.style.height = window.innerHeight;
  canvas.style.width = window.innerHeight * 0.6;
  canvas.style.height = window.innerHeight;
}

// Recargar la pagina si este cambia de orientacion
window.addEventListener("orientationchange", function() {
	// Announce the new orientation number
  document.location.reload(false);
}, false);

//Evento del reajuste de la pantalla
window.addEventListener('resize', function(e)
{
  resizeApp();
});
