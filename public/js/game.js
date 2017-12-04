var ancho = $(window).width()
if (ancho > 800) {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-foodiversity')

  var styleTxt = { font: "22px pixe", align: "center" }
  var nave;
  var enemigos;
  var balas;
  var bulletTime = 0;
  var flechas;
  var disparo;
  var explosiones;
  var background;
  var score = 0;
  var scoreText;
  var lives;
  var balasEnemigos;
  var firingTimer = 0;
  var livingEnemies = [];
  var velocidadInicial = 1000
  var explosionS
  var disparoS
  var descender = null
  var user
  var username
  var mensajeServidor
  var puntajeServidor
  var puntajesSever
  var usuarioServer

  function closeBtnModal() {
    alert('funciono')
  }
  //<a id="closeBtnModal">x</a>
  function openswal() {
    swal({
      title: '<div>  <h2 class="tituloPuntajeSwal">GAME OVER</h2> <p class="puntajeSwal">'+ score + ' ' + 'Puntos </p> <textarea indexTab="2" cols="0" rows="0" class="correoJuego" placeholder="Email"></textarea><p class="advertenciaCorreo">debes digitar tu correo</p> <textarea indexTab="1" cols="0" rows="0" class="usuarioJuego" placeholder="Usuario"></textarea><p class="advertenciaCorreo">debes digitar un nuevo usuario o un usuario ya registrado</p></div>',
      customClass: 'modalJuegoSwal',
      confirmButtonColor: '#ec3345',
      customClass: 'swalGamer',
      confirmButtonClass: 'btnSwalJuego',
      html: true,
      closeOnConfirm: false,
      showCloseButton: true,
      // showLoaderOnConfirm: true,
      confirmButtonText:'Registrar tu puntaje',
      allowEscapeKey: false
    }, function(val) {
      if ($('.correoJuego').val() === '' || $('.correoJuego').val() === null || $('.usuarioJuego').val() === '' || $('.usuarioJuego').val() === null) {
        // GameOver.validarCorreo()
      } else {
        user = $('.correoJuego').val()
        username = $('.usuarioJuego').val()
        GameOver.registroPuntaje()
      }
    })
  }
  function openswalCero() {
    swal({
      title: '<div>  <h2 class="tituloPuntajeSwal">GAME OVER</h2> <p class="puntajeSwal">'+ score + ' ' + 'Puntos </p></div>',
      customClass: 'modalJuegoSwal',
      confirmButtonColor: '#ec3345',
      customClass: 'swalGamer',
      confirmButtonClass: 'btnSwalJuego',
      html: true,
      closeOnConfirm: false,
      showCloseButton: true,
      // showLoaderOnConfirm: true,
      confirmButtonText:'Cerrar',
      allowEscapeKey: false
    }, function(val) {
      CeroPuntaje.VolverIntento()
    })
  }

  var HomeState = {
    preload: function() {
      this.game.load.image('galagaLogo', '../assets/galaga.png');
      this.game.load.image('text1', '../assets__game/ganaboletas.png');
      this.game.load.image('text2', '../assets__game/clickaqui.png');
      this.game.load.image('instruc1', '../assets__game/instruc1.png');
      this.game.load.image('instruc2', '../assets__game/instruc2.png');

      //sonidos
      this.game.load.audio('explosionS', '../assets__game/explode.wav');
      this.game.load.audio('disparoS', '../assets__game/shoot.wav');
      // imagenes
      this.game.load.image('balas', '../assets__game/bullet.png');
      this.game.load.image('balasEnemigos', '../assets__game/enemy-bullet.png');
      this.game.load.image('nave', '../assets__game/player.png');
      this.game.load.image('background', '../assets__game/starfield.png');
      // spritesheet
      this.game.load.spritesheet('papas', '../assets__game/papas.png', 35, 43);
      this.game.load.spritesheet('pizza', '../assets__game/pizza.png', 35, 32);
      this.game.load.spritesheet('pollo', '../assets__game/pollo.png', 35, 32);
      this.game.load.spritesheet('hambu', '../assets__game/hambu.png', 35, 27);
      this.game.load.spritesheet('explosion', '../assets__game/explode.png', 128, 128);
    },
    create: function() {
      this.game.stage.backgroundColor = "#ec3345";
      scoreText = game.add.text(10, 20, 'SCORE : ' + score, styleTxt);
      scoreText.fill = '#ec3345';
      //  logo
      var galagaLogo = this.game.add.button(400, 240, 'galagaLogo', this.iniciarJuego, this);
      galagaLogo.anchor.setTo(0.5, 0.5);
      galagaLogo.scale.setTo(0.5, 0.5)

      var text1 = this.game.add.button(400, 300 - 140, 'text1', this.iniciarJuego, this);
      text1.anchor.setTo(0.5, 0.5);
      text1.scale.setTo(0.8, 0.8)

      var text2 = this.game.add.button(400, 300 + 20, 'text2', this.iniciarJuego, this);
      text2.anchor.setTo(0.5, 0.5);
      text2.scale.setTo(0.8, 0.8)

      var instruccion1 = this.game.add.button(400, 300 + 120, 'instruc1', this.iniciarJuego, this);
      instruccion1.anchor.setTo(0.5, 0.5);
      instruccion1.scale.setTo(0.8, 0.8)

      var instruccion2 = this.game.add.button(400, 300 + 160, 'instruc2', this.iniciarJuego, this);
      instruccion2.anchor.setTo(0.5, 0.5);
      instruccion2.scale.setTo(0.8, 0.8)
    },
    iniciarJuego: function() {
      this.state.start('InitGame')
    }
  }

  var InitGame = {
    create: function() {
      //  scroll background
      background = this.game.add.tileSprite(0, 0, 800, 600, 'background');
      //sonidos
      explosionS = this.game.add.audio('explosionS')
      disparoS = this.game.add.audio('disparoS')
      //  balas
      balas = this.game.add.group();
      balas.enableBody = true;
      balas.physicsBodyType = Phaser.Physics.ARCADE;
      balas.createMultiple(30, 'balas');
      balas.setAll('anchor.x', 0.5);
      balas.setAll('anchor.y', 1);
      balas.setAll('outOfBoundsKill', true);
      balas.setAll('checkWorldBounds', true);

      // balas enemigos
      balasEnemigoss = this.game.add.group();
      balasEnemigoss.enableBody = true;
      balasEnemigoss.physicsBodyType = Phaser.Physics.ARCADE;
      balasEnemigoss.createMultiple(30, 'balasEnemigos');
      balasEnemigoss.setAll('anchor.x', 0.5);
      balasEnemigoss.setAll('anchor.y', 1);
      balasEnemigoss.setAll('outOfBoundsKill', true);
      balasEnemigoss.setAll('checkWorldBounds', true);

      //  nave
      nave = this.game.add.sprite(400, 570, 'nave');
      nave.anchor.setTo(0.5, 0.5);
      this.game.physics.enable(nave, Phaser.Physics.ARCADE);
      nave.body.collideWorldBounds = true;

      //  enemigos
      enemigos = this.game.add.group();
      enemigos.enableBody = true;
      enemigos.physicsBodyType = Phaser.Physics.ARCADE;


      this.crearEnemigos()

      //  puntaje
      scoreText = this.game.add.text(10, 10, 'SCORE : ' + score, styleTxt);
      scoreText.fill = '#fff';
      scoreText.padding.set(300, 16);
      //  vidas
      lives = this.game.add.group();
      // this.game.add.text(this.game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });


      for (var i = 0; i < 3; i++)
      {
          var ship = lives.create(game.world.width - 90 + (30 * i), 30, 'nave');
          ship.anchor.setTo(0.5, 0.5);
          ship.scale.setTo(0.8, 0.8)
      }

      //  explosion
      explosiones = game.add.group();
      explosiones.createMultiple(30, 'explosion');
      explosiones.forEach(this.confJuego, this);

      //  controles
      flechas = this.game.input.keyboard.createCursorKeys()
      disparo = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    },
    update: function() {
      background.tilePosition.y += 2;
      if (enemigos.alive && nave.alive) {
        enemigos.y += 0.1;
      }
      if (enemigos.y === 600) {
        enemigos.callAll('kill')
        this.crearEnemigos()
        balasEnemigoss.callAll('kill')

        // nave
        bullet.kill();
        explosionS.play()
        live = lives.getFirstAlive();
        if (live)
        {
            live.kill();
        }
        var explosion = explosiones.getFirstExists(false);
        explosion.reset(nave.body.x = 400, nave.body.y = 560);
        explosion.play('explosion', 30, false, true);
        if (lives.countLiving() < 1)
        {
            nave.kill();
            balasEnemigoss.callAll('kill');
            clearInterval(descender)
            if (score === 0) {
              this.state.start('CeroPuntaje')

            } else {
              this.state.start('GameOver')
            }
        }
      }
      if (nave.alive)
      {
          //  control naves
          nave.body.velocity.setTo(0, 0);

          if (flechas.left.isDown)
          {
              nave.body.velocity.x = -200;
          }
          else if (flechas.right.isDown)
          {
              nave.body.velocity.x = 200;
          }
          // if (flechas.up.isDown)
          // {
          //     nave.body.velocity.y = -200;
          // }
          // else if (flechas.down.isDown)
          // {
          //     nave.body.velocity.y = 200;
          // }

          //  disparo
          if (disparo.isDown)
          {
              this.disparaBala();
          }

          if (game.time.now > firingTimer)
          {
              this.enemyFires();
          }

          //  coliciones
          game.physics.arcade.overlap(balas, enemigos, this.matarEnemigo, null, this);
          game.physics.arcade.overlap(balasEnemigoss, nave, this.matarNave, null, this);
          game.physics.arcade.overlap(enemigos, nave, this.matarNave, null, this);
      }
    },
    crearEnemigos: function() {
        for (var y = 0; y < 5; y++)
        {
          var spriteEnemigos = ['papas', 'pollo', 'hambu', 'hambu', 'pizza']

            for (var x = 0; x < 14; x++)
            {
                var enemigo = enemigos.create(x * 48, y * 40, spriteEnemigos[y]);
                enemigo.anchor.setTo(0.5, 0.5);
                enemigo.animations.add('fly', [ 0, 1, 2, 3 ], 8, true);
                enemigo.play('fly');
                enemigo.body.moves = false;
            }
        }

        enemigos.x = 40;
        enemigos.y = 50;

        //  animacion movimiento enemigos
        var tween = this.game.add.tween(enemigos).to( { x: 140 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        // this.descenderEnemigo()
    },
    // descenderEnemigo: function() {
    //   if (enemigos.alive && nave.alive) {
    //     console.log('descender');
    //     enemigos.y += 10;
    //     descender = setInterval(this.descenderEnemigo, 3000);
    //   } else {
    //     console.log('descender');
    //     return clearInterval(descender)
    //   }
    // },
    matarEnemigo: function(bullet, enemigo) {

        //  When a bullet hits an enemigo we kill them both
        bullet.kill();
        enemigo.kill();
        explosionS.play()

        //  Increase the score
        score += 20;
        scoreText.text = 'SCORE : ' + score;

        //  And create an explosion :)
        var explosion = explosiones.getFirstExists(false);
        explosion.reset(enemigo.body.x, enemigo.body.y);
        explosion.play('explosion', 30, false, true);

        if (enemigos.countLiving() == 0)
        {
            score += 1000;
            scoreText.text = 'SCORE : ' + score;
            this.crearEnemigos()
            balasEnemigoss.callAll('kill',this);

            // stateText.text = " You Won, \n Click to restart";
            // stateText.visible = true;
            //
            // //the "click to restart" handler
            // game.input.onTap.addOnce(restart,this);
        }

    },
    matarNave: function(nave,bullet) {

        bullet.kill();
        explosionS.play()

        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
        }

        //  And create an explosion :)
        var explosion = explosiones.getFirstExists(false);
        explosion.reset(nave.body.x = 400, nave.body.y = 560);
        explosion.play('explosion', 30, false, true);

        // When the nave dies
        if (lives.countLiving() < 1)
        {
            nave.kill();
            balasEnemigoss.callAll('kill');
            clearInterval(descender)
            if (score === 0) {
              this.state.start('CeroPuntaje')

            } else {
              this.state.start('GameOver')
            }
        }

    },
    confJuego: function(invader) {

        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('explosion');

    },
    enemyFires: function() {

        //  Grab the first bullet we can from the pool
        balasEnemigos = balasEnemigoss.getFirstExists(false);

        livingEnemies.length=0;

        enemigos.forEachAlive(function(enemigo){

            // put every living enemy in an array
            livingEnemies.push(enemigo);
        });


        if (balasEnemigos && livingEnemies.length > 0)
        {

            var random=game.rnd.integerInRange(0,livingEnemies.length-1);

            // randomly select one of them
            var shooter=livingEnemies[random];
            // And fire the bullet from this enemy
            balasEnemigos.reset(shooter.body.x, shooter.body.y);

            game.physics.arcade.moveToObject(balasEnemigos,nave,220);
            firingTimer = game.time.now + 300;
        }

    },
    disparaBala: function() {
        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the pool
            bullet = balas.getFirstExists(false);

            if (bullet)
            {
                disparoS.play()
                //  And fire it
                bullet.reset(nave.x, nave.y + 8);
                bullet.body.velocity.y = -400;
                bulletTime = game.time.now + 400;
            }
        }

    }
  }
  var CeroPuntaje = {
    create: function() {
      openswalCero()
    },
    VolverIntento: function() {
      swal.close()
      this.state.start('HomeState')
    }
  }
  var GameOver = {
    create: function() {
      openswal()
    },
    validarCorreo: function() {
      console.log('correo eléctronico vacio ');
      this.state.start('HomeState')
      user = ''
      score = 0
    },
    registroPuntaje: function() {
      const userPuntaje = {
        puntaje: score,
        usuario: username,
        correoElectronico: user,
        fechaRegistro: Date.now()
      }
      const self = this
      $.ajax({
          url:"/registroPuntaje",
          type:'POST',
          data:userPuntaje,
          success:function(response) {
            score = 0
            user = ''
            username = ''
            mensajeServidor = response.mensaje
            puntajeServidor = response.puntaje
            self.state.start('Reset')
            puntajesSever = response.ranking.puntajes
            usuarioServer = response.ranking.usuarios
            swal.close()
          },
          error: function() {
            score = 0
            user = ''
            username = ''
            self.state.start('HomeState')
          }
      })
    }
  }
  var Reset = {
    preload: function() {
      this.game.load.image('btnRegistro', '../assets__game/btn-reset.png');
      this.game.load.image('btnPuntaje', '../assets__game/puntajes.png');
    },
    create: function() {
      this.game.stage.backgroundColor = "#ec3345";
      var stateText = game.add.text(game.world.centerX,game.world.centerY - 50, mensajeServidor, styleTxt);
      stateText.anchor.setTo(0.5, 0.5);
      stateText.fill = '#fff';

      var puntajeText = game.add.text(game.world.centerX,game.world.centerY, puntajeServidor, { font: "40px pixe", align: "center" });
      puntajeText.anchor.setTo(0.5, 0.5);
      puntajeText.fill = '#fff';

      var btnRegistro = this.game.add.button(410, game.world.centerY + 80, 'btnRegistro', this.reset, this);
          btnRegistro.anchor.setTo(0, 0.5);
          btnRegistro.scale.setTo(0.9, 0.9)

      var btnRanking = this.game.add.button(390, game.world.centerY + 80, 'btnPuntaje', this.puntajes, this);
          btnRanking.anchor.setTo(1, 0.5);
          btnRanking.scale.setTo(0.9, 0.9)

    },
    puntajes: function() {
      this.state.start('Ranking')
    },
    reset: function() {
      mensajeServidor: ''
      puntajeServidor: ''
      this.state.start('HomeState')
    }
  }
  var Ranking = {
    preload: function() {
      this.game.load.image('btVolver', '../assets__game/volver.png');
      // this.game.load.image('background', '../assets__game/starfield.png');
    },
    create: function() {
      this.game.stage.backgroundColor = "#ec3345";
      // background = this.game.add.tileSprite(0, 0, 800, 600, 'background');
      var marginBottom = 0
      for (var i = 0; i < 10; i++) {
        marginBottom += 40
        var pos = game.add.text(120, 40 + marginBottom, i+1 + '.', { font: "22px pixe", align: "left" });
        pos.anchor.setTo(0.5, 0.5);
        pos.fill = '#fff';

        var stateText = game.add.text(game.world.centerX, 40 + marginBottom, usuarioServer[i], { font: "22px pixe", align: "left" });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.fill = '#fff';

        var puntos = game.add.text(640, 40 + marginBottom, puntajesSever[i], { font: "22px pixe", align: "left" });
        puntos.anchor.setTo(0.5, 0.5);
        puntos.fill = '#fff';
      }

      var btVolver = this.game.add.button(400, 510, 'btVolver', this.volver, this);
          btVolver.anchor.setTo(0.5, 0.5);
          btVolver.scale.setTo(0.9, 0.9)

    },
    volver: function() {
      this.state.start('Reset')
    }
  }


  game.state.add('HomeState', HomeState)
  game.state.add('InitGame', InitGame)
  game.state.add('GameOver', GameOver)
  game.state.add('CeroPuntaje', CeroPuntaje)
  game.state.add('Reset', Reset)
  game.state.add('Ranking', Ranking)
  game.state.start('HomeState')

}
