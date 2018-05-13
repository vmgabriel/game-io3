var App = function() {};

App.prototype.start = function()
{
	// Scenes
	var scenes = [];

	//scenes.push(BootScene);
	scenes.push(PreloadScene);
	//scenes.push(IntroScene);

	// Game config
  var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'juego',
    id: 'canvasGame',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: scenes
  };

	// Create game app
	var game = new Phaser.Game(config);

	// Globals
	//game._URL = 'http://localhost/PhaserGames/PixelMemory/';	// this.sys.game._URL
	//game._USER_ID = 0;

	//game._CONFIG = config;
};

var PreloadScene= new Phaser.Scene('Preload');

PreloadScene.preload = function()
{
	'use strict';

  this.load.setBaseURL('http://labs.phaser.io');

  this.load.image('sky', 'assets/skies/space3.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  this.load.image('red', 'assets/particles/red.png');
};

PreloadScene.create= function()
{
	'use strict';

  this.add.image(400, 300, 'sky');

  var particles = this.add.particles('red');

  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  });

  var logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
};

PreloadScene.update= function()
{
	'use strict';
};

PreloadScene.render= function()
{

};

var Helper = function() {};

Helper.prototype.createText = function(ctx, x, y, string, size, anchor)
{
	'use strict';
};

window.onload = function()
{
	'use strict';

	var app = new App();
	app.start();
}
