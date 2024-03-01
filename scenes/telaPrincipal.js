class TelaPrincipal extends Phaser.Scene {
  larguraJogo = 3840;
  alturaJogo = 800;
  chavePontuacao = 0;
  vidas = 3;
  constructor() {
    super({ key: "Game" });
  }
  preload() {
    this.load.spritesheet("spritePirata", "assets/spritesheet.png", {
      frameWidth: 300,
      frameHeight: 300,
    }); //Importa o spritesheet do pirata
    this.load.spritesheet("enemy", "assets/enemy.png", {
      frameWidth: 496,
      frameHeight: 390,
    }); //Importa o spritesheet do inimigo
    this.load.spritesheet("key", "assets/KeyIcons.png", {
      frameWidth: 32,
      frameHeight: 32,
    }); //Importa o spritesheet da chave
    this.load.spritesheet("bau", "assets/Chests.png", {
      frameWidth: 48,
      frameHeight: 32,
    }); //Importa o spritesheet do bau
    this.load.tilemapTiledJSON("mapa", "assets/map.json"); //Importa mapa do jogo em json
    this.load.image("barco", "assets/barco.png"); // barco do mapa
    this.load.image("grassLongPlatform", "assets/grassLongPlatform.png"); // Chão do mapa
    this.load.image("sheet", "assets/sheet.png"); // Algumas peças do mapa
    this.load.image("sky", "assets/sky1.png"); // Céu
  }
  create() {
    this.sky = this.add.tileSprite(0, 0, 1920, 1200, "sky").setOrigin(0).setScale(3840 / 1920); //Cria o céu
    this.keys = this.physics.add.staticGroup(); //Cria um grupo de objetos com física estáticos
    this.map = this.make.tilemap({
      key: "mapa",
      tileWidth: 32,
      tileHeight: 32,
    }); //Cria o mapa colocando o tamanho de cada "azulejo", que no nosso tiled foi 32x32
    this.tileset1 = this.map.addTilesetImage("barco"); //Adiciona no map um tileset e armazena ela
    this.tileset2 = this.map.addTilesetImage("grassLongPlatform"); //Adiciona no map um tileset e armazena ela
    this.tileset3 = this.map.addTilesetImage("sheet"); //Adiciona no map um tileset e armazena ela
    this.pirata = this.physics.add.sprite(400, 300, "spritePirata").setScale(0.5); //Cria o pirata
    this.bau = this.physics.add.sprite(this.larguraJogo - 64, 640, "bau").setScale(3); //Cria o bau
    this.barco = this.map.createLayer("Barco", [this.tileset1]); //Cria a camada do chão, passando o tileset e o nome que definimos no tiled map editor
    this.cenario = this.map.createLayer("Map", [this.tileset2, this.tileset3]); //Cria a camada do chão, passando o tileset e o nome que definimos no tiled map editor

    this.physics.add.collider(this.bau, this.cenario) //Adiciona colisão entre o bau e a camada do cenario
    this.physics.add.collider(this.cenario, this.keys) //Adiciona colisão entre as chaves e a camada do cenario
    this.pirata.body.setSize(140, 250);//Ajusta o tamanho do corpo do pirata
    this.pirata.body.setOffset(70, 50);//Ajusta a posição do corpo do pirata
    this.chaveText = this.add.text(16, 16, "Chaves: 0", {fontSize: "32px", fill: "#000"}).setScrollFactor(0); //Adiciona o texto de chaves na tela e faz ela acompanhar a câmera
    this.vidasText = this.add.text(256, 16, "Vidas: 3", {fontSize: "32px", fill: "#000"}).setScrollFactor(0); //Adiciona o texto de vidas na tela e faz ela acompanhar a câmera

    const grupoParedes = this.physics.add.staticGroup(); //Cria um grupo de objetos com física estáticos

    const paredesMundo = [
      this.add.rectangle(320, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0),
      this.add.rectangle(
        this.larguraJogo,
        this.alturaJogo / 2,
        2,
        this.alturaJogo,
        0xee0000,
        0
      ),
      this.add.rectangle(this.larguraJogo/2, 0, this.larguraJogo, 2, 0xee0000, 0),
    ]; //Array de retângulos que representam as paredes do mundo
    for (let parede of paredesMundo) {
      grupoParedes.add(parede);
    } //Adiciona as paredes do mundo no grupo de paredes
    this.enemys = this.physics.add.group([
      this.physics.add.sprite(1000, 50, "enemy").setScale(0.15),
      this.physics.add.sprite(1450, 50, "enemy").setScale(0.15),
      this.physics.add.sprite(1900, 50, "enemy").setScale(0.15),
      this.physics.add.sprite(2400, 50, "enemy").setScale(0.15),
      this.physics.add.sprite(2850, 50, "enemy").setScale(0.15),
      this.physics.add.sprite(3350, 50, "enemy").setScale(0.15),
    ]) //Cria um grupo de inimigos
    
    this.limiteInimigos = [
      this.physics.add.staticGroup([this.add.rectangle(800, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0), this.add.rectangle(1088, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0)]),
      this.physics.add.staticGroup([this.add.rectangle(1248, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0), this.add.rectangle(1536, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0)]),
      this.physics.add.staticGroup([this.add.rectangle(1696, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0), this.add.rectangle(1984, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0)]),
      this.physics.add.staticGroup([this.add.rectangle(2180, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0), this.add.rectangle(2468, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0)]),
      this.physics.add.staticGroup([this.add.rectangle(2664, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0), this.add.rectangle(2952, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0)]),
      this.physics.add.staticGroup([this.add.rectangle(3180, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0), this.add.rectangle(3468, this.alturaJogo / 2, 1, this.alturaJogo, 0xee0000, 0)])
    ] //Array de grupos de retângulos que representam as paredes imaginárias que os inimigos batem para trocar de direção
    this.enemys.children.iterate((enemy, index) => { //Itera sobre os inimigos
      enemy.setVelocityX(Phaser.Math.Between(50, 150) ); //Define a velocidade do inimigo
      this.physics.add.overlap(enemy, this.limiteInimigos[index], () => {
        enemy.setVelocityX(-enemy.body.velocity.x); //Inverte a velocidade do inimigo caso ele bata em uma parede imaginaria 
      })
      this.physics.add.overlap(enemy, this.pirata, (enemy, pirata) => { //Adiciona o overlap entre o inimigo e o pirata
        if (pirata.body.touching.down && enemy.body.touching.up && !enemy.body.blocked.right && !enemy.body.blocked.left) { //Verifica se o pirata está tocando o inimigo por cima
          const novaKey = this.physics.add.sprite(enemy.x, enemy.y, "key") //Cria uma chave
          this.physics.add.collider(novaKey, this.cenario) //Adiciona colisão entre a chave e a camada do cenario
          this.physics.add.overlap(novaKey, this.pirata, (key, pirata) => { //Cria uma chave e adiciona o overlap entre a chave e o pirata 
            this.chavePontuacao += 1; //Adiciona 1 na pontuação de chaves
            this.chaveText.setText("Chaves: " + this.chavePontuacao); //Atualiza o texto da pontuação de chaves
            key.destroy(); //Destroi a chave quando o pirata pega ela
          });
          enemy.destroy(); //Destroi o inimigo quando o pirata pula em cima dele
        }
        else {
          // Se o pirata não estiver pulando em cima do inimigo, ele perde uma vida e volta para a posição inicial
          pirata.x = 400;
          pirata.y = 300;
          this.vidas -= 1;
          if (this.vidas <= 0) {
            this.scene.start("PerdeuTela") //Se as vidas do pirata acabarem, o jogo acaba
            this.scene.stop("Game") //Se as vidas do pirata acabarem, o jogo acaba
          }
          this.vidasText.setText("Vidas: " + this.vidas);
        }
      })
    })

    this.cameras.main.setBounds(0, 0, 3840, 800); //Define o limite da câmera
    this.cameras.main.startFollow(this.pirata, true); //Faz a câmera seguir o pirata
    this.cenario.setCollisionByProperty({ collider: true }); //Seta as colisões onde tem a propriedade collider: true no tiled map
    this.physics.add.collider(this.pirata, this.cenario); //Adiciona colisão entre o pirata e a camada do cenario
    this.physics.add.collider(this.enemys, this.cenario) //Adiciona colisão entre os inimigos e a camada do cenario
    this.physics.add.collider(grupoParedes, this.pirata) //Adiciona colisão entre o pirata e as paredes do mundo


    //Animação do pirata
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("spritePirata", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("spritePirata", {
        start: 4,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("spritePirata", {
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: 1,
    });
    this.anims.create({
      key: "open",
      frames: this.anims.generateFrameNumbers("bau", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 1,
    });

    this.physics.add.overlap(this.pirata, this.bau, () => {
      if (this.chavePontuacao >= 6) {
        this.bau.anims.play("open", true); //Se o pirata tiver 6 chaves, o bau é aberto
        if (this.bau.anims.currentFrame.index === 9) {
          this.scene.start("Vitoria"); //Se a animação do bau acabar, o jogo acaba
          this.scene.stop("Game");
        }
      }
    }); //Adiciona o overlap entre o pirata e o bau

    this.teclado = this.input.keyboard.createCursorKeys(); //Cria um objeto com as teclas do teclado
  }
  update() {
    this.sky.tilePositionX += 0.25; //Faz o céu se mover
    if (this.teclado.left.isDown) { //Verifica se a tecla de seta para esquerda está pressionada
      this.pirata.setVelocityX(-250);
      this.pirata.anims.play("walk", true);
      this.pirata.setFlip(true, false);
      //Se a tecla de seta para esquerda estiver pressionada, o pirata anda para a esquerda e a animação de andar é ativada
    } else if (this.teclado.right.isDown) {
      this.pirata.setVelocityX(250);
      this.pirata.anims.play("walk", true);
      this.pirata.setFlip(false, false);
      // Se a tecla de seta para direita estiver pressionada, o pirata anda para a direita e a animação de andar é ativada
    } else {
      this.pirata.setVelocityX(0);
      this.pirata.anims.play("idle", true);
      // Se nenhuma tecla de movimento estiver pressionada, o pirata para e a animação de idle é ativada
    }
    if (this.teclado.up.isDown && this.pirata.body.onFloor()) {
      this.pirata.setVelocityY(-450);
      // Se a tecla de seta para cima estiver pressionada e o pirata estiver no chão, o pirata pula
    }
  }
}
