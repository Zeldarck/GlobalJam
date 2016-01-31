var gameLevel1 = function(){
	this.monsters = null;
	this.hero = null;
	this.sb = null;
	this.sbThrown=0;
	this.swordTimer=0;
	this.monstersTab = null;
	this.mbs = null;
	this.fbs = null;
    this.pnj = null;
	this.music = null;
	this.elsaTime = 0; 
	this.snowman= null;
	this.pingouin = null;
	this.esquimo = null;
	this.text = null;
	this.textTime = 0;
};


//***PNJ***
function Pnj(speak,sprite,type) {
    this.sprite = sprite;
	this.trade =  true;
	this.sprite.whoisit = type;
	this.type =  type;
    this.speak = speak;
}



//***Heros***
function Character(life,sprite) {
    this.sprite = sprite;
    this.life = life;
    this.facing = 'right';
    this.gloves = true;
    this.ski = true;
    this.mask = true;
    this.jump = true;
	this.actionAllow =  true;
	this.maskPut =  false;
    this.sword = null;
    this.frameRight = 48;
    this.frameLeft = 54;
    this.jumpTimer = 0;
	this.inertiex = 0;
	this.inertiey = 0;

}

//function mudball(sprite) {
//    this.mb = sprite;
//    this.mbThrown = 0;
//}
	
Character.prototype.makeSword = function() {
	 if (this.facing == 'left')
    {
		this.sword = game.add.sprite(this.sprite.x + 5,this.sprite.y + 5, null);
		
	}
    else
    {
		this.sword = game.add.sprite(this.sprite.x + 50,this.sprite.y + 5, null);
    }

		game.physics.enable(this.sword, Phaser.Physics.ARCADE);
		this.sword.body.setSize(50, 40, 0, 0);   
}

Character.prototype.destroySword = function() {
	 this.sword.kill();
	 this.sword.destroy();

}


Character.prototype.looseMask = function(){
	this.mask = false;
	if(this.ski){
		if(this.gloves){
			//Ski + Gloves
			this.frameRight=24;
			this.frameLeft=30;
			this.sprite.animations.add("right",[24,25,26,27,28,29]);
			this.sprite.animations.add("left",[30,31,32,33,34,35]);			
		}else{
			//Ski
			this.frameRight=36;
			this.frameLeft=42;
			this.sprite.animations.add("right",[36,37,38,39,40,41]);
			this.sprite.animations.add("left",[42,43,44,45,46,47]);
		}
	}else{
		if(this.gloves){
			//Gloves
			this.frameRight=12;
			this.frameLeft=18;
			this.sprite.animations.add("right",[12,13,14,15,16,17]);
			this.sprite.animations.add("left",[18,19,20,21,22,23]);			
		}else{
			//X
			this.frameRight=0;
			this.frameLeft=6;
			this.sprite.animations.add("right",[0,1,2,3,4,5]);
			this.sprite.animations.add("left",[6,7,8,9,10,11]);			
		}		
	}
}

Character.prototype.looseSki = function(){
	this.ski = false;
	if(this.mask){
		if(this.gloves){
			//Mask + Gloves
			this.frameRight=72;
			this.frameLeft=78;
			this.sprite.animations.add("right",[72,73,74,75,76,77]);
			this.sprite.animations.add("left",[78,79,80,81,82,83]);			
		}else{
			//Mask
			this.frameRight=60;
			this.frameLeft=66;
			this.sprite.animations.add("right",[60,61,62,63,64,65]);
			this.sprite.animations.add("left",[66,67,68,69,70,71]);
		}
	}else{
		if(this.gloves){
			//Gloves
			this.frameRight=12;
			this.frameLeft=18;
			this.sprite.animations.add("right",[12,13,14,15,16,17]);
			this.sprite.animations.add("left",[18,19,20,21,22,23]);				
		}else{
			//X
			this.frameRight=0;
			this.frameLeft=6;
			this.sprite.animations.add("right",[0,1,2,3,4,5]);
			this.sprite.animations.add("left",[6,7,8,9,10,11]);			
		}		
	}
}

Character.prototype.looseGloves = function(){
	this.gloves = false;
	if(this.ski){
		if(this.mask){
			//Ski + Mask
			this.frameRight=84;
			this.frameLeft=90;
			this.sprite.animations.add("right",[84,85,86,87,88,89]);
			this.sprite.animations.add("left",[90,91,92,93,94,95]);			
		}else{
			//Ski
			this.frameRight=36;
			this.frameLeft=42;
			this.sprite.animations.add("right",[36,37,38,39,40,41]);
			this.sprite.animations.add("left",[42,43,44,45,46,47]);
		}
	}else{
		if(this.mask){
			//Mask
			this.frameRight=60;
			this.frameLeft=66;
			this.sprite.animations.add("right",[60,61,62,63,64,65]);
			this.sprite.animations.add("left",[66,67,68,69,70,71]);			
		}else{
			//X
			this.frameRight=0;
			this.frameLeft=6;
			this.sprite.animations.add("right",[0,1,2,3,4,5]);
			this.sprite.animations.add("left",[6,7,8,9,10,11]);			
		}		
	}
}


//function setPnj(pnj, dragX, dragY, sizeX, sizeY, offsetX, offsetY)
//{
//    pnj.sprite.body.drag.x = dragX;
//    pnj.sprite.body.drag.y = dragY;
//    pnj.sprite.body.collideWorldBounds = true;
//    pnj.sprite.body.setSize(sizeX, sizeY, offsetX, offsetY);
//    pnj.sprite.body.mass = 50;
//    pnj.sprite.body.immovable = true;
//}

function Boss(Move, MaxMove, Direction, View, Chase, sprite, rangeArmor, cacArmor, moveFunction, attack){
	this.sprite = sprite;
	this.move = Move;
	this.maxMove = MaxMove;
	this.direction = Direction;
	this.view = View;
	this.chase = Chase;
	this.life = 400;
	this.mbThrown = 0;
	this.rangeArmor = rangeArmor;
	this.cacArmor = cacArmor;
	this.moveFunction = moveFunction;
	this.inertiex = 0;
	this.inertiey = 0;
	this.attack = attack;
}

//    Monstre      \\

function Monster(Move, MaxMove, Direction, View, Chase, sprite, rangeArmor, cacArmor, moveFunction, attack){
	this.sprite = sprite;
	this.move = Move;
	this.maxMove = MaxMove;
	this.direction = Direction;
	this.view = View;
	this.chase = Chase;
	this.life = 100;
	this.mbThrown = 0;
	this.rangeArmor = rangeArmor;
	this.cacArmor = cacArmor;
	this.moveFunction = moveFunction;
	this.inertiex = 0;
	this.inertiey = 0;
	this.attack = attack;
}

function setMonster(monster, dragX, dragY, sizeX, sizeY, offsetX, offsetY) {
    monster.sprite.body.drag.x = dragX;
    monster.sprite.body.drag.y = dragY;
    monster.sprite.body.collideWorldBounds = true;
	monster.sprite.body.setSize(sizeX, sizeY, offsetX, offsetY);
    monster.sprite.body.mass = 50;
    monster.sprite.body.immovable = true;
}


gameLevel1.prototype = { 



    // Assets loading - do not use asssets here
    preload: function () {
        // Load this images, available with the associated keys later
        game.load.image('background', 'assets/background.jpg');
        game.load.image('character', 'assets/snowboy_sky_masque.png');
        game.load.spritesheet('characterFrames', 'assets/sprites_sheet-snowboy.png', 90, 54);
        game.load.spritesheet('pandolin', 'assets/sprites_sheet_pandolin.png', 24, 50);
        // Each sprite is 54x55 . -1 means we don't limit to a number of sprites,
        //  0 is the margin of the file, 10 the spacing between each sprites
        //game.load.spritesheet('characterFrames', 'assets/SaraFullSheet7.png', 54, 55, -1, 0 ,10);
        //game.load.spritesheet('ballFrames', 'assets/ball_animation.png', 45, 45);
        game.load.image('mechant', 'assets/mechant.png');
        game.load.image('snowball', 'assets/snowball.png');
		game.load.image('mudball', 'assets/mudball.png');
		game.load.image('fireball', 'assets/fireball.png');
        game.load.image('monster', 'assets/mechant.png');
        game.load.spritesheet('snowman', 'assets/sprites_sheet_snowman.png',56,54);
		game.load.spritesheet('esquimo', 'assets/sprites_sheet_esquimo.png',38,54);
		game.load.spritesheet('pingouin', 'assets/sprites_sheet_pingouin.png',22,54);
        game.load.spritesheet('rhino', 'assets/sprites_sheet_rino.png',100,54);
        game.load.spritesheet('pango', 'assets/sprites_sheet_pandolin.png',50,24);
        game.load.spritesheet('suri', 'assets/sprites_sheet_suricate2.png',24,40);

		//audio
		game.load.audio('music', 'assets/Kalimba.mp3');
		game.load.audio('throw', 'assets/lancer_1.wav');
		game.load.audio('throwe', 'assets/lancer_2.wav');
		game.load.audio('sword', 'assets/impact_1.wav');
		game.load.audio('walk', 'assets/pas_1.wav');

		//Tilemap
        //Created with Tiled software, with needed format: Orthogonal / CSV / .json files
        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('sprites_plateforme', 'assets/sprites_plateforme.png');

    },
    // Called after preload - create sprites,... using assets here
    create: function () {
        // Create a sprite
        //this.backgroundSprite = game.add.sprite(0, 0, 'background');
		game.stage.backgroundColor = '#787878';

        var sprite = game.add.sprite(20, 280, 'characterFrames');


		



        //create pnjs
        this.snowman = new Pnj('I want that gloves',game.add.sprite(8730, 370, 'snowman'),0);
        this.esquimo = new Pnj('I want a mask',game.add.sprite(15380, 720, 'esquimo'),1);
        this.pingouin = new Pnj('Gimme gimme gimme a ski',game.add.sprite(21220, 345, 'pingouin'),2);
		
		this.snowman.sprite.animations.add("static",[0,1]);
		this.esquimo.sprite.animations.add("static",[0,1]);
		this.pingouin.sprite.animations.add("static",[0,1]);


		//create hero
		this.hero = new Character(100,sprite); 
        // Add animations
        this.hero.sprite.animations.add("left",[54,55,56,57,58,59]);
        this.hero.sprite.animations.add("right",[48,49,50,51,52,53]);
		this.hero.sprite.animations.add("swordRight",[96,97,98,99,100,100,99,98,97,96]);
		this.hero.sprite.animations.add("swordLeft",[102,103,104,105,105,104,103,102]);

		//song
		this.music = game.add.audio('music');
		this.music.play();
		this.music.loop = true;

		this.throw = game.add.audio('throw');
		this.throwe = game.add.audio('throwe');
		this.swordsong = game.add.audio('sword');
		this.walk = game.add.audio('walk');
		this.walk.allowMultiple = true;
		this.walk.volume = 0.15;
		this.throw.volume = 0.20;
		this.throwe.volume = 0.20;
		this.swordsong.allowMultiple = true;


        // Observers
        this.cursorKeys = game.input.keyboard.createCursorKeys();
        this.cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
		this.xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.wKey=game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.yKey=game.input.keyboard.addKey(Phaser.Keyboard.Y);
        this.nKey=game.input.keyboard.addKey(Phaser.Keyboard.N);
		//A super Q key to test methods !
		this.qKey=game.input.keyboard.addKey(Phaser.Keyboard.Q);
		this.tKey=game.input.keyboard.addKey(Phaser.Keyboard.T);
		


        // Physics engine initialisation (optional for arcade engine, need for other ones)
        game.physics.startSystem(Phaser.Physics.ARCADE);
		
        // Init hero sprite
        game.physics.enable(this.hero.sprite, Phaser.Physics.ARCADE);
        // Init hero
        this.hero.sprite.body.collideWorldBounds = true;
        this.hero.sprite.body.setSize(10, 35, 35, 20);

        //Init pnj
        game.physics.enable(this.snowman.sprite, Phaser.Physics.ARCADE);
		game.physics.enable(this.esquimo.sprite, Phaser.Physics.ARCADE);
		game.physics.enable(this.pingouin.sprite, Phaser.Physics.ARCADE);


        //setPnj(this.pnj, 350, 250,54,55,0,0);

        // The sprite will collide with the borders
        // We limit the physic body to a smaller part of the sprite (it contains white spaces)

        var map = game.add.tilemap('map');
        // The tileset name must match the one defined in Tiled
        map.addTilesetImage('sprites_plateforme');
        // The layer name must match the one defined in Tiled
        //var backgroundLayer = map.createLayer('background');
        this.wallLayer = map.createLayer('wallLayer');
        this.decorationLayer = map.createLayer('decorationLayer');
		this.deathLayer = map.createLayer('deathLayer');
        //The world will have the map size
        this.wallLayer.resizeWorld();
        //The camera will follow the player, as the world is bigger than the screen
        game.camera.follow(this.hero.sprite);
        // Every tiles in the walls layer will be able to colide in this layer
        map.setCollisionByExclusion([],true,'wallLayer');
		map.setCollisionByExclusion([],true,'deathLayer');

        //map.setCollisionByExclusion([],true,'sprites_plateforme');
		
		
		this.monsters= 	this.add.physicsGroup();
		this.mbs = this.add.physicsGroup();
		this.fbs = this.add.physicsGroup();

		
		//PARTIE A RENDRE PROPRE -- bien faire pop le smonstres après le reste, bring to the top fonctionne pas vraiment
        this.monstersTab = [];

		// Create your monsters !!
		var rhinos = [[1435, 310, 250, 200],
			// [4605, 260, 250, 200],
			// [7105, 260, 250, 200],
			// [11620, 240, 250, 200],
			// [16000, 680, 250, 200],
			[18630, 340, 250, 200]];

		var pongos = [[255, 340, 250, 110],
			// [2870, 340, 250, 200],
			// [6120, 340, 250, 200],
			// [17580, 710, 250, 200],
			// [11700, 780, 250, 200],
			[22640, 460, 250, 200]];

		var suris = [[3850, 90, 350, 200],
			// [8525, 260, 650, 200],
			// [11650, 640, 650, 200],
			// [14380, 270, 650, 200],
			// [19550, 260, 650, 200],
			[22640, 460, 350, 200]];


		//create boss
		var sprite2 = this.monsters.create(500, 50, 'pango');
		this.boss = new Boss(0, 400, -1, 250, 0, sprite2, 70 , 20, this.bossAttack, 30);
		this.boss.sprite.animations.add("pangoRight",[4,5]);
		this.boss.sprite.animations.add("pangoLeft",[0,1]);
		this.boss.sprite.animations.add("pangoRollRight",[2,3]);
		this.boss.sprite.animations.add("pangoRollLeft",[6,7]);
		this.monstersTab.push(this.boss);
		game.physics.enable(this.boss.sprite, Phaser.Physics.ARCADE);
		this.boss.sprite.body.drag.x = 250;
		this.boss.sprite.body.drag.y = 250;
		setMonster(this.boss, 250, 250, 50, 24, 0,0);
		console.log(this.boss);

		//CREATION PANGOLIN
		for (var c in pongos) {
			sprite2 = this.monsters.create(pongos[c][0], pongos[c][1], 'pango');
			var monster = new Monster(0, pongos[c][3], -1, pongos[c][2], 0, sprite2, 70 , 20, this.moveRangeDefense, 30);
			monster.sprite.animations.add("pangoRight",[4,5]);
			monster.sprite.animations.add("pangoLeft",[0,1]);
			monster.sprite.animations.add("pangoRollRight",[2,3]);
			monster.sprite.animations.add("pangoRollLeft",[6,7]);
			this.monstersTab.push(monster);
			game.physics.enable(monster.sprite, Phaser.Physics.ARCADE);
			monster.sprite.body.drag.x = 250;
			monster.sprite.body.drag.y = 250;
			setMonster(monster, 250, 250, 50, 24, 0,0);
		}

		//CREATION SURICATES
		for (var c in suris) {
			sprite2 = this.monsters.create(suris[c][0], suris[c][1], 'suri');
			monster = new Monster(0, suris[c][3], -1, suris[c][2], 0, sprite2, 30, 30, this.rangeAttack , 10);
			monster.sprite.animations.add("suriRight", [0, 1, 2, 1, 0]);
			monster.sprite.animations.add("suriLeft", [5, 4, 3, 4, 5]);
			this.monstersTab.push(monster);
			game.physics.enable(monster.sprite, Phaser.Physics.ARCADE);
			setMonster(monster, 250, 250, 24, 40, 0, 0);
		}
		
		//CREATION RHINO
		for (var c in rhinos) {
			sprite2 = this.monsters.create(rhinos[c][0], rhinos[c][1], 'rhino');
			monster = new Monster(0, rhinos[c][3], -1, rhinos[c][2], 0, sprite2,30,30,this.moveCharger, 40);
			monster.sprite.body.drag.x = 250;
			monster.sprite.body.drag.y = 250;
			monster.sprite.animations.add("rhinoRight",[0,1]);
			monster.sprite.animations.add("rhinoLeft",[2,3]);
			this.monstersTab.push(monster);
			game.physics.enable(monster.sprite, Phaser.Physics.ARCADE);
			setMonster(monster, 250, 250, 100,54,0,0);
		}

        // Sprites are z-ordered by creation. As we added tiles later,
        //  we move back other sprites to top
        this.hero.sprite.bringToTop();

		 for (var i in this.monstersTab)
        {
            this.monstersTab[i].sprite.bringToTop();
        }

		
		//Physic héros
		game.physics.arcade.gravity.y = 800;
		this.hero.sprite.body.mass = 50;
		this.hero.sprite.body.drag.x = 250;
		this.hero.sprite.body.drag.y = 250;
		this.hero.sprite.body.maxVelocity.set(500,700);
		
		
		

    },
    // Called for each refresh
    update: function (){

		var moving = false;
		var walkAnimationSpeed = 6;
		
		this.snowman.sprite.animations.play("static",4,true);
		this.esquimo.sprite.animations.play("static",4,true);
		this.pingouin.sprite.animations.play("static",4,true);

					
        game.physics.arcade.collide(this.esquimo.sprite, this.wallLayer);
		 game.physics.arcade.collide(this.pingouin.sprite, this.wallLayer);
		game.physics.arcade.collide(this.snowman.sprite, this.wallLayer);
		
		game.physics.arcade.overlap(this.esquimo.sprite, this.hero.sprite, this.exchange);
		game.physics.arcade.overlap(this.pingouin.sprite, this.hero.sprite, this.exchange);
		game.physics.arcade.overlap(this.snowman.sprite, this.hero.sprite, this.exchange);

			if(this.text != null && (game.time.now - this.textTime > 100)){
				this.text.destroy();
				this.text = null;
			}
		

		game.physics.arcade.collide(this.hero.sprite, this.monsters,this.collideHeroMonster);
		game.physics.arcade.collide(this.hero.sprite, this.boss.sprite, this.collideHeroMonster);
        game.physics.arcade.collide(this.monsters, this.wallLayer);
		game.physics.arcade.collide(this.sb, this.wallLayer);
		game.physics.arcade.collide(this.mbs, this.wallLayer);
		game.physics.arcade.collide(this.boss.sprite, this.wallLayer);
		game.physics.arcade.collide(this.fbs, this.wallLayer);
		game.physics.arcade.collide(this.sb, this.boss.sprite, this.snowballDamage);
		game.physics.arcade.collide(this.sb, this.monsters, this.snowballDamage);
		game.physics.arcade.collide(this.mbs, this.hero.sprite, this.mudballDamage);
		game.physics.arcade.collide(this.fbs, this.hero.sprite, this.fireballDamage);
		game.physics.arcade.collide(this.hero.sprite, this.wallLayer);
		game.physics.arcade.collide(this.hero.sprite, this.deathLayer,function(){
			if (game.state.callbackContext.hero.sprite.y>1100)
			{
				game.state.callbackContext.hero.sprite.kill();
				game.state.callbackContext.finishGame(false);
			}
		});
		


		game.physics.arcade.overlap(this.hero.sprite, this.monsters,this.overlapHeroMonster);
 	  
		this.hero.sprite.body.velocity.x *=   0.8 ;
		if(this.hero.sprite.body.blocked.down || this.hero.sprite.body.touching.down){
			this.hero.jump = true;
		}

		this.mbs.forEach(this.killHoldm, this);
		this.fbs.forEach(this.killHoldf, this);

		
		this.hero.actionAllow = true;
		
		if(this.cKey.isDown)
		{
			if(this.hero.mask){
				this.hero.actionAllow = false;
				this.hero.maskPut = true;
				
			}else{
				this.hero.maskPut = false;
			}
		}
		
		
		if(this.xKey.isDown)
		{
			if(this.hero.actionAllow && this.hero.ski){
				if (this.swordsong.isPlaying == false)
					this.swordsong.play();
				this.hero.makeSword();
				 if (this.hero.facing == 'left')
				{
					this.hero.sprite.animations.play("swordLeft",40,false)
				}
				else
				{
					this.hero.sprite.animations.play("swordRight",40,false)
				}
				
				if(game.time.now - this.swordTimer > 250){
					this.swordTimer = game.time.now;
					game.physics.arcade.overlap(this.hero.sword, this.monsters, this.swordDamage);
				}
				this.hero.destroySword();
				moving = true;
				this.hero.actionAllow = false;
			}
		}

		if (this.tKey.isDown)
		{
			console.log(this.hero.sprite.x, this.hero.sprite.y);
		}

		var direction = 1;
		if (this.cursorKeys.left.isDown)
		{
			this.hero.sprite.body.velocity.x -= 250;
			if(!moving  && this.hero.jump ){
				this.hero.sprite.animations.play("left",walkAnimationSpeed,true);
				moving = true;
			};
			if (moving == true && this.walk.isPlaying == false)
				this.walk.play();
			 this.hero.facing = 'left';
		}
		else if (this.cursorKeys.right.isDown)
		{
			this.hero.sprite.body.velocity.x += 250;
			if(!moving && this.hero.jump){
				this.hero.sprite.animations.play("right",walkAnimationSpeed,true);
				moving = true;
			};		
			 this.hero.facing = 'right';
			if (moving == true && this.walk.isPlaying == false)
				this.walk.play();
		}

		 if (this.hero.facing == 'left')
			{
				direction = 1;
			}
			else
			{
				direction = -1;
			}
		
		
		this.hero.sprite.body.velocity.x += this.hero.inertiex * direction ;
		this.hero.inertiex *= 0.9;
		if(this.hero.inertiex < 50){
			this.hero.inertiex = 0;
		}
		
		
		if (this.cursorKeys.up.isDown)
		{	
			if(this.hero.jump && !(this.hero.sprite.body.blocked.down || this.hero.sprite.body.touching.down)){
				this.hero.sprite.animations.stop();
				this.hero.jump = false;
				moving =false;
				this.hero.sprite.body.velocity.y = -400;
				this.hero.jumpTimer = 0;
			}else if(this.hero.jump){
				this.hero.sprite.animations.stop();
				this.hero.jump = false;
				moving =false;
				this.hero.sprite.body.velocity.y -= 50;
				this.hero.jumpTimer = game.time.now;
			}else if(game.time.now - this.hero.jumpTimer < 400 && this.hero.sprite.body.velocity.y > -250){
				this.hero.sprite.body.velocity.y -= 50;
			}
		}

		//Snowball
		if(this.wKey.isDown && (game.time.now-this.sbThrown)>1000)
		{
			if(this.hero.actionAllow && this.hero.gloves){
				this.snowball();
				this.hero.actionAllow = false;
			}
		}
		
		if ((game.time.now-this.sbThrown) > 1000 )
        {
            this.sb = null;
        }
		
		//Change outfit
		if(this.qKey.isDown){
			this.hero.looseMask();
		}
		//sbThrown = false


		
		
		if(!moving){
			//this.hero.sprite.animations.stop();

            if (this.hero.facing == 'left')
            {
                this.hero.sprite.frame = this.hero.frameLeft;
            }
            else
            {
                this.hero.sprite.frame = this.hero.frameRight;
            }
		}



            // this.moveRangeDefense(this.monstersTab[0]);
			 // this.moveRangeDefense(this.monstersTab[1]);
            // this.moveCharger(this.monstersTab[3]);

			
			// if (this.monstersTab[2].life > 0) {
               // this.rangeAttack(this.monstersTab[2]);
            // }
			

        for (var i in this.monstersTab)
        {
			this.monstersTab[i].moveFunction(this.monstersTab[i],this);
            this.monstersTab[i].sprite.body.maxVelocity.set(600,600);
        }


	
    

    },
    // Called after the renderer rendered - usefull for debug rendering, ...
    render: function  () {
		if(game.state.callbackContext.hero.sword != null)
		game.debug.body(game.state.callbackContext.hero.sword);
    },
	
	// Movemevement for the PANGOLIN
	moveRangeDefense: function (monster,level) {
		level.hero.sprite.body.velocity.x *=   0.9 ;
		if( (Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 25 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view )|| monster.chase >0){
			if((Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 25 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view ) ){
				monster.chase = 50;
			}else{
				monster.chase--;
			}
			if(monster.sprite.body.x - level.hero.sprite.body.x < 0){
				monster.sprite.animations.play("pangoRollLeft",6,true);
				monster.sprite.body.velocity.x = 130 - monster.inertiex/1.5;
			}else{
				monster.sprite.animations.play("pangoRollRight",6,true);
				monster.sprite.body.velocity.x = -130 + monster.inertiex/1.5;
			}
			
			if(monster.sprite.body.onFloor()){
				monster.sprite.body.velocity.y = -200;
			}
			
			if( monster.sprite.body.blocked.left || monster.sprite.body.blocked.right || monster.sprite.body.touching.left || monster.sprite.body.touching.right){
				monster.sprite.body.velocity.y = -150;
			}
			
		}
		else 
		{
			if(monster.direction < 0){
				monster.sprite.animations.play("pangoLeft",6,true);
			}else{
				monster.sprite.animations.play("pangoRight",6,true);
			}
			monster.sprite.body.velocity.x = monster.direction * 150 -  monster.direction * monster.inertiex/1.5;
			monster.move++;
			if(monster.move > monster.maxMove || ((monster.sprite.body.blocked.left || monster.sprite.body.blocked.right) && monster.move > 10)){
				monster.move = 0;
				monster.direction *= -1;
			}
		}
		//monster.sprite.body.velocity.y = monster.inertiey;
		monster.inertiex *= 0.8;
		monster.inertiey *= 0.8;

			
	},

	killHoldm: function (mudball) {
		if (game.time.now - mudball.mbThrown > 1000){
			this.mbs.remove(mudball);
			mudball.kill();
		}
	},

	killHoldf: function (fireball) {
		if (game.time.now - fireball.fbThrown > 1000){
			this.fbs.remove(fireball);
			fireball.kill();
		}
	},

	// Attack for the suricate
	rangeAttack: function (monster,level) {
		monster.sprite.body.velocity.x = 0;
		if( (Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 180 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view )|| monster.chase >0){
			if((Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 180 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view ) ){
				monster.chase = 50;
			}else{
				monster.chase--;
			}
			if(monster.sprite.body.x - level.hero.sprite.body.x < 0){
				monster.direction = 1;
			}else{
				monster.direction = -1;
			}
			if ((game.time.now - monster.mbThrown) > 1000 )
			{
				monster.mbThrown = game.time.now;
				level.mudball(monster,level);
			}
		}
	},

	bossAttack: function (monster,level) {
		monster.sprite.body.velocity.x = 0;
		if( (Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 180 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view )|| monster.chase >0){
			if((Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 180 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view ) ){
				monster.chase = 50;
			}else{
				monster.chase--;
			}
			if(monster.sprite.body.x - level.hero.sprite.body.x < 0){
				monster.direction = 1;
			}else{
				monster.direction = -1;
			}
			if ((game.time.now - monster.mbThrown) > 1000 )
			{
				monster.mbThrown = game.time.now;
				level.fireball(monster,level);
			}
		}
	},

	// Movemevement for the RHINO
	moveCharger: function (monster,level) {
		level.hero.sprite.body.velocity.x *=   0.9 ;
		var test = false;
		var facteur = 1;
		if( (Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 30 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view )|| monster.chase >0){
			if((Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 30 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view ) ){
				monster.chase = 150;
			}else{
				test = true;
				monster.chase--;
			}
						
			
			if(monster.sprite.body.x - level.hero.sprite.body.x < 0){
				
				if(monster.prev && test){
					monster.sprite.animations.play("rhinoRight",6,true);
					facteur = -1;
				}else{
					monster.sprite.animations.play("rhinoLeft",6,true);
					monster.prev = false;
				}
				
				monster.sprite.body.velocity.x = facteur * 250 + monster.inertiex;
			}else{
				
				if(!monster.prev && test){
					monster.sprite.animations.play("rhinoLeft",6,true);
					facteur = -1;
				}else{
					monster.sprite.animations.play("rhinoRight",6,true);
					monster.prev = true;
				}
				
				monster.sprite.body.velocity.x = facteur * -250 + monster.inertiex;
			}
			
			if( monster.sprite.body.blocked.left || monster.sprite.body.blocked.right || monster.sprite.body.touching.left || monster.sprite.body.touching.right){
				monster.sprite.body.velocity.y = -150;
			}
			
		}
		else 
		{
			monster.sprite.animations.stop();
		}
		//monster.sprite.body.velocity.y = monster.inertiey;
		monster.inertiex *= 0.9;
		monster.inertiey *= 0.9;
	},

	//How to throw a snowball
	snowball: function(){
		this.throw.play();
		if(this.hero.gloves){
			this.sb = game.add.sprite(this.hero.sprite.body.x, this.hero.sprite.body.y, 'snowball');

			game.physics.enable(this.sb, Phaser.Physics.ARCADE);
			this.sb.body.collideWorldBounds = false;
			this.sb.body.drag.y = 500;
			
			if(this.hero.facing=='right'){
				this.sb.body.velocity.x = 500;
				this.sb.body.velocity.y = -200;
			}else{
				this.sb.body.velocity.x = -500;
				this.sb.body.velocity.y = -200;
			}
			this.sbThrown = game.time.now;
		}
	},

    //How to throw a snowball
	mudball: function (monster,level){
		this.throwe.play();
		var tmp = level.mbs.create(monster.sprite.body.x, monster.sprite.body.y, 'mudball');

		game.physics.enable(tmp, Phaser.Physics.ARCADE);
		tmp.body.collideWorldBounds = false;
		tmp.body.drag.y = 500;

		if(monster.direction == 1){
			monster.sprite.animations.play('suriRight',15,false);
			tmp.body.velocity.x = 500;
			tmp.body.velocity.y = -200;
		}
		else{
			monster.sprite.animations.play('suriLeft',15,false);
			tmp.body.velocity.x = -500;
			tmp.body.velocity.y = -200;
		}
		tmp.mbThrown = game.time.now;
	},

	fireball: function (monster,level){
		this.throwe.play();
		var tmp = level.fbs.create(monster.sprite.body.x, monster.sprite.body.y, 'fireball');
		game.physics.enable(tmp, Phaser.Physics.ARCADE);
		tmp.body.collideWorldBounds = false;
		tmp.body.drag.y = 500;

		if(monster.direction == 1){
			monster.sprite.animations.play('suriRight',15,false);
			tmp.body.velocity.x = 500;
			tmp.body.velocity.y = -200;
		}
		else{
			monster.sprite.animations.play('suriLeft',15,false);
			tmp.body.velocity.x = -500;
			tmp.body.velocity.y = -200;
		}
		tmp.fbThrown = game.time.now;
	},

    exchange: function (pnjSprite, heroSprite) {
		var pnj = null;
		
		if(pnjSprite.whoisit == 0){
			pnj = game.state.callbackContext.snowman;
		}else if(pnjSprite.whoisit == 1){
			pnj = game.state.callbackContext.esquimo;
		}else{
			pnj = game.state.callbackContext.pingouin;
		}
			
        if (pnj.trade)
        {
			if(game.state.callbackContext.text == null){
				game.state.callbackContext.text = game.add.text(pnj.sprite.x,pnj.sprite.y-100,pnj.speak + '---- Y ?');
			}
			game.state.callbackContext.textTime = game.time.now;

				if(game.state.callbackContext.yKey.isDown) {
					 pnj.trade = false;
					 if(pnjSprite.whoisit == 0){
						game.state.callbackContext.hero.looseGloves();
					}else if(pnjSprite.whoisit == 1){
						game.state.callbackContext.hero.looseMask();
					}else{
						game.state.callbackContext.hero.looseSki();
					}
					 
					 
					 
				}else if(game.state.callbackContext.nKey.isDown){
					
				}
        }
    },


    collideHeroMonster: function (heroSprite,monsterSprite) {
        i = game.state.callbackContext.monsters.children.indexOf(monsterSprite);
        var monster = game.state.callbackContext.monstersTab[i];// donne le monstre touché
		var x= heroSprite.body.x - monsterSprite.body.x;
		var y= heroSprite.body.y - monsterSprite.body.y;
        game.state.callbackContext.hero.life -=  ((Math.random() * monster.attack) + 5);;
        if (game.state.callbackContext.hero.life <= 0)
        {
            game.state.callbackContext.hero.sprite.kill();
			game.state.callbackContext.finishGame(false);
        }
		if(x < 0){
			game.state.callbackContext.hero.inertiey = 600;
			monster.inertiey = 600;
		
			game.state.callbackContext.hero.inertiex =  800;
			monster.inertiex =  800;

		}
		else
		{
			game.state.callbackContext.hero.inertiey = 600;
			monster.inertiey =  600;
			
			game.state.callbackContext.hero.inertiex =  800;
			monster.inertiex =  800;
		}	
		return true;
	},
	
	overlapHeroMonster: function (heroSprite,monsterSprite) {
		i = game.state.callbackContext.monsters.children.indexOf(monsterSprite);
        game.state.callbackContext.monstersTab[i].chase = 0;

		
		var x= heroSprite.body.x - monsterSprite.body.x;
		var y= heroSprite.body.y - monsterSprite.body.y;
		heroSprite.body.velocity.y += y ;
		monsterSprite.body.velocity.y = -50;
		
		heroSprite.body.velocity.x += x ;
		monsterSprite.body.x -= x/5;
		monsterSprite.body.velocity.x *= -1;

		return true;
	},

    snowballDamage : function (snowBallSprite, monsterSprite) {
        var i = game.state.callbackContext.monsters.children.indexOf(monsterSprite);
        game.state.callbackContext.monstersTab[i].life -= (1-game.state.callbackContext.monstersTab[i].rangeArmor/100) * ((Math.random() * 80) + 50);
        game.state.callbackContext.sb.kill();
        if (game.state.callbackContext.monstersTab[i].life <= 0) {
            game.state.callbackContext.monsters.remove(monsterSprite);
            monsterSprite.kill();
			game.state.callbackContext.monstersTab.splice(i,1);
        }
    },

	mudballDamage : function (mudBallSprite, heroSprite) {
		heroSprite.kill();
		var damage = 35;
		if(game.state.callbackContext.hero.maskPut){
			damage = 5;
		}
		game.state.callbackContext.hero.life -= (Math.random() * damage) + 5;
		game.state.callbackContext.monsters.remove(mudBallSprite);
		if (game.state.callbackContext.hero.life <= 0)
		{
			game.state.callbackContext.hero.sprite.kill();
			game.state.callbackContext.finishGame(false);
		}
	},

	fireballDamage : function (mudBallSprite, heroSprite) {
		heroSprite.kill();
		var damage = 35;
		if(game.state.callbackContext.hero.maskPut){
			damage = 10;
		}
		game.state.callbackContext.hero.life -= (Math.random() * damage) + 5;
		game.state.callbackContext.monsters.remove(mudBallSprite);
		if (game.state.callbackContext.hero.life <= 0)
		{
			game.state.callbackContext.hero.sprite.kill();
			game.state.callbackContext.finishGame(false);
		}
	},

	pushBack: function (heroSprite,monsterSprite) {
		var i = game.state.callbackContext.monsters.children.indexOf(monsterSprite);
        var monster = game.state.callbackContext.monstersTab[i];// donne le monstre touché
		var x= heroSprite.body.x - monsterSprite.body.x;
		var y= heroSprite.body.y - monsterSprite.body.y;
        game.state.callbackContext.hero.life -= 1;
		monster.inertiex =  1200;


		return true;
	},
	
	swordDamage : function (swordSprite, monsterSprite) {
        var i = game.state.callbackContext.monsters.children.indexOf(monsterSprite);
        game.state.callbackContext.monstersTab[i].life -= (1-game.state.callbackContext.monstersTab[i].cacArmor/100) * ((Math.random() * 80) + 50);
        game.state.callbackContext.sb = null;

        if (game.state.callbackContext.monstersTab[i].life <= 0) {

            game.state.callbackContext.monsters.remove(monsterSprite);
			monsterSprite.kill();
			game.state.callbackContext.monstersTab.splice(i,1);
        }else{
			game.state.callbackContext.pushBack(game.state.callbackContext.hero.sprite,monsterSprite);
		}
    },
	
	finishGame : function (win) {
		var text;
		if(win){
			text = game.add.text(400,300,"You Win");
		}else{
			text = game.add.text(400,300,"You loose");
		}
        text.fixedToCamera = true;
        game.paused = true;
        window.setTimeout(function(){
            game.state.restart(true);
            game.paused = false;
        }, 2000);
		
		
	}
	
};