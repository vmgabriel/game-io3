var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');

var PhaserGame = function () {
  this.sprite;
  this.hojas;
  this.bulletTime = 0;
  this.bullet;
  this.pad;
  this.stick;

  // Animaciones
  this.quieto;

  this.timer;
  this.timerText;
};
PhaserGame.prototype = {
  init: function () {
    this.game.renderer.renderSession.roundPixels = true;
    this.physics.startSystem(Phaser.Physics.ARCADE);
  },
  preload: function ()
  {
    // Fondo de Pantalla
    this.load.image('bg', 'img/game/background/verano.jpg');

    // Josystick
    this.load.atlas('generic', 'img/game/joystick/generic-joystick.png', 'json/generic-joystick.json');

    // Personaje
    var code = getParameterByName('code');
    if (code != "1" || code != "20131020047")
    {
      game.load.spritesheet('pQuieto', 'img/game/man/quieto.png', 319, 486, 10);
    }
    else
    {
      game.load.spritesheet('pQuieto', 'img/game/girl/quieto.png', 641, 542, 10);
    }

    //Particulas
    game.load.image('hoja1', 'img/game/particles/leaf1.png');
  },

  create: function ()
  {
    // Fondo
    this.add.image(0, 0, 'bg');

    // Joystick
    this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

    this.stick = this.pad.addStick(0, 0, 200, 'generic');
    this.stick.scale = 0.6;
    this.stick.alignBottomLeft(20);
    this.stick.motionLock = Phaser.VirtualJoystick.HORIZONTAL;

    // Particulas
    this.hojas = game.add.emitter(game.world.centerX, 0, 100);

    this.hojas.makeParticles('hoja1');

    this.hojas.minParticleSpeed.setTo(-200, 30);
    this.hojas.maxParticleSpeed.setTo(300, 100);
    this.hojas.minParticleScale = 0.1;
    this.hojas.maxParticleScale = 0.6;
    this.hojas.gravity = 60;

    //  This will emit a quantity of 5 particles every 500ms. Each particle will live for 2000ms.
    //  The -1 means "run forever"
    this.hojas.flow(5000, 500, 5, -1);

    //  This will emit a single particle every 100ms. Each particle will live for 2000ms.
    //  The 100 means it will emit 100 particles in total and then stop.
    // this.hojas.flow(2000, 100, 1, 100);

    // Personaje
    this.sprite = game.add.sprite(300, 500, 'pQuieto');
    this.sprite.animations.add('quieto');
    this.sprite.animations.play('quieto', 10, true);
    this.sprite.scale.setTo(0.2, 0.2);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    // Tiempo en Juego
    this.timer = this.time.create();
    this.timer.start();
    this.timerText = this.add.text(730, 30, "");

    // Configuracion de Pantalla completa
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.input.onDown.add(gofull, this);
  },

  update: function () {
    var maxSpeed = 200;
    if (this.stick.isDown)
    {
      this.sprite.body.velocity.x = this.stick.forceX * maxSpeed;
    }
    else
    {
      this.sprite.body.velocity.x = 0;
    }
    if (this.sprite.x < 130)
    {
      this.sprite.x = 130;
    }
    this.timerText.text = this.timer.seconds.toFixed(1);
  }
};

function gofull() {
  game.scale.startFullScreen();
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

game.state.add('Game', PhaserGame, true);
