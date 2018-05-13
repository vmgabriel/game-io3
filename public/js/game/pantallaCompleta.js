// Fullscreen
function fs_status()
{
  if(document.fullscreenElement)
  {
    return true;
  }
  else if(document.webkitFullscreenElement)
  {
    return true;
  }
  else if(document.mozFullScreenElement)
  {
    return true;
  }
  else
  {
    return false;
  }
}

function goFullscreen()
{
  if(fs_status())
  {
    return;
  }

  var el = document.getElementsByTagName('canvas')[0];
  var requestFullScreen = el.requestFullscreen || el.msRequestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullscreen;

  if(requestFullScreen)
  {
    requestFullScreen.call(el);
  }
  resizeApp();
}

document.getElementById('juego').addEventListener('click', goFullscreen);
document.getElementById('juego').addEventListener('touchstart', goFullscreen);
