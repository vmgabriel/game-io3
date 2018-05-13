var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');

var PhaserGame = function () {
  this.sprite;
  this.veggies;
  this.bulletTime = 0;
  this.bullet;
  this.pad;
  this.velx = 0;
  this.stick;
};
PhaserGame.prototype = {
  init: function () {
    this.game.renderer.renderSession.roundPixels = true;
    this.physics.startSystem(Phaser.Physics.ARCADE);
  },
  preload: function () {
    this.load.image('bg', 'img/game/sky2.png');
    this.load.atlas('generic', 'img/game/joystick/generic-joystick.png', 'json/generic-joystick.json');

    game.load.image('phaser', 'img/game/phaser-dude.png');
    game.load.spritesheet('veggies', 'img/game/fruitnveg32wh37.png', 32, 32);
  },

  create: function () {
    this.add.image(0, 0, 'bg');

    this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

    this.stick = this.pad.addStick(0, 0, 200, 'generic');
    this.stick.scale = 0.6;
    this.stick.alignBottomLeft(20);
    this.stick.motionLock = Phaser.VirtualJoystick.HORIZONTAL;

    this.veggies = game.add.group();
    this.veggies.enableBody = true;
    this.veggies.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 50; i++)
    {
      var c = this.veggies.create(game.world.randomX, Math.random() * 500, 'veggies', game.rnd.integerInRange(0, 36));
      c.name = 'veg' + i;
      c.body.immovable = true;
    }

    this.sprite = game.add.sprite(400, 550, 'phaser');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.scale.onFullScreenChange.add(onFullScreenChange, this);

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
  }
};

function onFullScreenChange(scale) {
  if (scale.isFullScreen)
  {
    button.visible = true;
  }
  else
  {
    button.visible = false;
  }
}

function gofull() {
  game.scale.startFullScreen();
}

game.state.add('Game', PhaserGame, true);
