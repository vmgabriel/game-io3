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

window.addEventListener("orientationchange", function() {
	// Announce the new orientation number
  document.location.reload(false);
}, false);

window.addEventListener('resize', function(e)
{
  resizeApp();
});
