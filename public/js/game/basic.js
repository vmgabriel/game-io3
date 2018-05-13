var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');

var PhaserGame = function () {
  // Sprites
  this.sprite;
  this.hojas;

  // Joystick
  this.pad;
  this.stick;

  // Animaciones
  this.quieto;

  // Tiempo
  this.timer;
  this.timerText;

  // Vida
  this.vida = 3;
  this.corazones;
  this.posCorazon = 30;

  // Gravedad
  this.gravedad = 80;

  // Particulas en el juego
  this.particulas = 17;

  //Datos de personaje
  this.orientacionPersonaje = 0;
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

    // Corazones
    game.load.image('corazon', 'img/game/type/heart.png');

    // Personaje
    var code = getParameterByName('code');
    if (code == "1" || code == "20131020047")
    {
      game.load.spritesheet('pQuieto', 'img/game/girl/quieto.png', 641, 542, 10);
      game.load.spritesheet('pMuerto', 'img/game/girl/muerte.png', 605, 604, 10);
      game.load.spritesheet('pCorrer', 'img/game/girl/correr.png', (5128/8), 542, 8);
    }
    else
    {
      game.load.spritesheet('pQuieto', 'img/game/man/quieto.png', 319, 486, 10);
      game.load.spritesheet('pMuerto', 'img/game/man/muerte.png', 588, 600, 10);
      game.load.spritesheet('pCorrer', 'img/game/man/correr.png', 415, 507, 10);
    }

    //Particulas
    game.load.image('hoja1', 'img/game/particles/leaf1.png');
  },

  create: function ()
  {
    // Poniendo gravedad del juego
    game.physics.arcade.gravity.y = this.gravedad;

    // Fondo
    this.add.image(0, 0, 'bg');

    // Joystick
    this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

    this.stick = this.pad.addStick(0, 0, 200, 'generic');
    this.stick.scale = 0.6;
    this.stick.alignBottomLeft(20);
    this.stick.motionLock = Phaser.VirtualJoystick.HORIZONTAL;

    // Particulas
    // this.hojas = game.add.physicsGroup();
    // for (var i=0; i < this.particulas; i++)
    // {
    //   var c = this.hojas.create(game.world.randomX, 0, 'hoja1');
    //   c.name = 'hoj' + i;
    //   c.body.immovable = true;
    //   c.scale.setTo((Math.random() * 0.6) + 0.01);
    // }
    this.hojas = game.add.group();
    this.hojas.createMultiple(250, 'hoja1', 0, false);
    //this.hojas.scale.setTo((Math.random() * 0.6) + 0.01);
    game.physics.enable(this.hojas, Phaser.Physics.ARCADE);

    game.time.events.loop(150, generacionHojas, this);

    // Corazones
    this.corazones = game.add.physicsGroup();
    for (var i = 0; i < this.vida; i++)
    {
      var c = this.corazones.create(30*(i+1), 30, 'corazon');
      c.name = 'coraz' + i;
      c.body.immovable = true;
      c.scale.setTo(1.6);
      c.body.allowGravity = false;
    }

    // Tiempo en Juego
    this.timer = this.time.create();
    this.timer.start();
    this.timerText = this.add.text(730, 30, "");

    // Personaje
    this.sprite = game.add.sprite(300, 500, 'pQuieto');
    this.sprite.scale.setTo(0.2, 0.2);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowGravity = false;
    this.sprite.loadTexture('pQuieto', 0);
    this.sprite.animations.add('quieto');
    this.sprite.animations.play('quieto', 30, true);

    // Configuracion de Pantalla completa
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.input.onDown.add(gofull, this);
    game.input.onUp.add(quietoPersonaje, this);
  },

  update: function () {
    // Velocidad Maxima del Personaje
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
    if (this.sprite.x > 730)
    {
      this.sprite.x = 730;
    }

    if (this.stick.forceX < 0) {
      if (this.orientacionPersonaje != -1) {
        this.sprite.scale.x *= -1;
        this.sprite.loadTexture('pCorrer', 0);
        this.sprite.animations.add('correr');
        this.sprite.animations.play('correr', 30, true);
        this.orientacionPersonaje = -1;
      }
    } else if (this.stick.forceX > 0) {
      if (this.orientacionPersonaje != 1) {
        this.sprite.scale.x = Math.abs(this.sprite.scale.x);
        this.sprite.loadTexture('pCorrer', 0);
        this.sprite.animations.add('correr');
        this.sprite.animations.play('correr', 30, true);
        this.orientacionPersonaje = 1;
      }
    }

    // Actualizacion del tiempo en pantalla
    this.timerText.text = this.timer.seconds.toFixed(1);

    // Eliminar las hojas al salir del mundo
    this.hojas.forEachAlive(checkBounds, this);
  },
  render: function () {
    game.debug.text("Velocidad de personaje: " + this.sprite.body.velocity.x, 32, 32);
  }
};

function quietoPersonaje() {
  this.sprite.loadTexture('pQuieto', 0);
  this.sprite.animations.add('quieto');
  this.sprite.animations.play('quieto', 30, true);
  this.orientacionPersonaje = 0;
}

function gofull() {
  game.scale.startFullScreen();
}

function generacionHojas() {
  var hoja = this.hojas.getFirstExists(false);
  if (hoja)
  {
    hoja.frame = game.rnd.integerInRange(0,6);
    hoja.exists = true;
    hoja.reset(game.world.randomX, 0);
    hoja.scale.setTo((Math.random() * 0.6) + 0.01);
    //hoja.body.bounce.y = 0.8;
  }
}

function checkBounds(hoja)
{
  if (hoja.y > game.world.width)
  {
    hoja.kill();
  }
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

game.state.add('Game', PhaserGame, true);
