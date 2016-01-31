var gameLevel1 = function(){
	this.monsters = null;
	this.hero = null;
	this.sb = null;
	this.sbThrown=0;
	this.swordTimer=0;
	this.monstersTab = null;
    this.mbs = null;
    this.pnj = null;
};

//***Heros***
function Character(life,sprite) {
    this.sprite = sprite;
    this.life = life;
    this.facing = 'right';
    this.gloves = true;
    this.ski = true;
    this.mask = true;
    this.jump = true;
    this.sprite.life = 10;
    this.sword = null;
    this.frameRight = 48;
    this.frameLeft = 54;
    this.jumpTimer = 0;
}

function mudball(sprite) {
    this.mb = sprite;
    this.mbThrown = 0;
}
	
Character.prototype.makeSword = function() {
	 if (this.facing == 'left')
    {
		this.sword = game.add.sprite(this.sprite.x + 5,this.sprite.y + 10, null);
		
	}
    else
    {
		this.sword = game.add.sprite(this.sprite.x + 50,this.sprite.y + 10, null);
    }

		game.physics.enable(this.sword, Phaser.Physics.ARCADE);
		this.sword.body.setSize(40, 40, 0, 0);   
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
		if(this.hero.gloves){
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
		if(this.hero.gloves){
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

//    Pnj    \\

function Pnj(sprite)
{
    this.sprite = sprite;
    this.trade = true;
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
//    Monstre      \\

function Monster(Move, MaxMove, Direction, View, Chase, sprite, rangeArmor, cacArmor, moveFunction){
    this.sprite = sprite;
    this.move = Move;
    this.maxMove = MaxMove;
    this.direction = Direction;
    this.view = View;
    this.chase = Chase;
    this.health = 100;
    this.mbThrown = 0;
	this.rangeArmor = rangeArmor;
	this.cacArmor = cacArmor;
	this.moveFunction = moveFunction;
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
		game.load.spritesheet('characterFrames', 'assets/sprites_sheet_snowboy.png', 90, 54);
        // Each sprite is 54x55 . -1 means we don't limit to a number of sprites,
        //  0 is the margin of the file, 10 the spacing between each sprites
        //game.load.spritesheet('characterFrames', 'assets/SaraFullSheet7.png', 54, 55, -1, 0 ,10);
        //game.load.spritesheet('ballFrames', 'assets/ball_animation.png', 45, 45);
        game.load.image('mechant', 'assets/mechant.png');
        game.load.image('snowball', 'assets/snowball.png');
        game.load.image('mudball', 'assets/mudball.png');
        game.load.image('monster', 'assets/mechant.png');
        game.load.image('pnj', 'assets/Sara.png');
        game.load.spritesheet('rhino', 'assets/sprites_sheet_rino.png',100,54);


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

        var sprite = game.add.sprite(20, 250, 'characterFrames');


		



        //create pnj
        this.pnj = new Pnj(game.add.sprite(600, 150, 'pnj'));


		//create hero
		this.hero = new Character(10,sprite); 
        // Add animations     
        this.hero.sprite.animations.add("left",[54,55,56,57,58,59]);
        this.hero.sprite.animations.add("right",[48,49,50,51,52,53]);
		this.hero.sprite.animations.add("swordRight",[96,97,98,99,100,100,99,98,97,96]);
		this.hero.sprite.animations.add("swordLeft",[102,103,104,105,105,104,103,102]);

        
        // Observers
        this.cursorKeys = game.input.keyboard.createCursorKeys();
        this.spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.wKey=game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.yKey=game.input.keyboard.addKey(Phaser.Keyboard.Y);
        this.nKey=game.input.keyboard.addKey(Phaser.Keyboard.N);
		//A super Q key to test methods !
		this.qKey=game.input.keyboard.addKey(Phaser.Keyboard.Q);

        // Physics engine initialisation (optional for arcade engine, need for other ones)
        game.physics.startSystem(Phaser.Physics.ARCADE);
		
        // Init hero sprite
        game.physics.enable(this.hero.sprite, Phaser.Physics.ARCADE);

        // Init hero
        this.hero.sprite.body.collideWorldBounds = false;
        this.hero.sprite.body.setSize(10, 35, 35, 20);

        //Init pnj
        game.physics.enable(this.pnj.sprite, Phaser.Physics.ARCADE);
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
        //The world will have the map size
        this.wallLayer.resizeWorld();
        //The camera will follow the player, as the world is bigger than the screen
        game.camera.follow(this.hero.sprite);
        // Every tiles in the walls layer will be able to colide in this layer
        map.setCollisionByExclusion([],true,'wallLayer');
        //map.setCollisionByExclusion([],true,'sprites_plateforme');
		
		
		this.monsters= 	this.add.physicsGroup();
        this.mbs = this.add.physicsGroup();

		
		//PARTIE A RENDRE PROPRE -- bien faire pop le smonstres après le reste, bring to the top fonctionne pas vraiment
        this.monstersTab = [];

			


		//CREATION PANGOLIN
        var  sprite2 = this.monsters.create(350, 350, 'monster');
        var monster = new Monster(0, 150, -1, 100, 0, sprite2, 0 , 0, this.moveRangeDefense);
        this.monstersTab.push(monster);
        game.physics.enable(monster.sprite, Phaser.Physics.ARCADE);

		
        sprite2 = this.monsters.create(300, 350, 'monster');
        monster = new Monster(0, 150, -1, 100, 0, sprite2, 0 , 0, this.moveRangeDefense);
		this.monstersTab.push(monster);
		game.physics.enable(monster.sprite, Phaser.Physics.ARCADE);

		
		
		//CREATION SURICATES
        sprite2 = this.monsters.create(350, 350, 'monster');
        monster = new Monster(0, 150, -1, 250, 0, sprite2, 0 , 0, this.rangeAttack);
        this.monstersTab.push(monster);
        game.physics.enable(monster.sprite, Phaser.Physics.ARCADE);
		
		
		//CREATION RHINO
		sprite2 = this.monsters.create(350, 100, 'rhino');
        monster = new Monster(0, 150, -1, 250, 0, sprite2,0,0,this.moveCharger);
		monster.sprite.body.drag.x = 250;
		monster.sprite.body.drag.y = 250;
		monster.sprite.animations.add("rhinoRight",[0,1]);
		monster.sprite.animations.add("rhinoLeft",[2,3]);
		this.monstersTab.push(monster);
		game.physics.enable(monster.sprite, Phaser.Physics.ARCADE);


        // Sprites are z-ordered by creation. As we added tiles later,
        //  we move back other sprites to top
        this.hero.sprite.bringToTop();


		setMonster(this.monstersTab[0], 250, 250,44,40,0,0);
		setMonster(this.monstersTab[1], 250, 250,44,40,0,0);
		setMonster(this.monstersTab[2], 250, 250,44,40,0,0);
		setMonster(this.monstersTab[3], 250, 250,100,54,0,0);

		 for (var i in this.monstersTab)
        {
            this.monstersTab[i].sprite.bringToTop();
        }


        this.startDate = new Date();
		
		//Physic héros
		game.physics.arcade.gravity.y = 800;
		this.hero.sprite.body.mass = 50;
		this.hero.sprite.body.drag.x = 250;
		this.hero.sprite.body.drag.y = 250;
		this.hero.sprite.body.maxVelocity.set(200,700);
		
		
		

    },
    // Called for each refresh
    update: function (){

		var moving = false;
		var walkAnimationSpeed = 6;

        game.physics.arcade.collide(this.pnj.sprite, this.wallLayer);
        game.physics.arcade.overlap(this.pnj.sprite, this.hero.sprite, this.exchange);
		game.physics.arcade.collide(this.hero.sprite, this.monsters,this.collideHeroMonster);
        game.physics.arcade.collide(this.monsters, this.wallLayer);
        game.physics.arcade.collide(this.sb, this.wallLayer);
        game.physics.arcade.collide(this.mbs, this.wallLayer);
        game.physics.arcade.collide(this.sb, this.monsters, this.snowballDamage);
        game.physics.arcade.collide(this.mbs, this.hero.sprite, this.mudballDamage);
		game.physics.arcade.collide(this.hero.sprite, this.wallLayer);

		game.physics.arcade.overlap(this.hero.sprite, this.monsters,this.overlapHeroMonster);
 	  
		this.hero.sprite.body.velocity.x *=   0.8 ;
		if(this.hero.sprite.body.blocked.down || this.hero.sprite.body.touching.down){
			this.hero.jump = true;
		}

        this.mbs.forEach(this.killHold, this);
		
		if(this.spacebarKey.isDown)
		{
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
		}
		
		
		
		if (this.cursorKeys.left.isDown)
		{
			this.hero.sprite.body.velocity.x -= 150;
			if(!moving  && this.hero.jump ){
				this.hero.sprite.animations.play("left",walkAnimationSpeed,true)
				moving = true;
			};
			 this.hero.facing = 'left';

		}
		else if (this.cursorKeys.right.isDown)
		{
			this.hero.sprite.body.velocity.x += 150;
			if(!moving && this.hero.jump){
				this.hero.sprite.animations.play("right",walkAnimationSpeed,true)
				moving = true;
			};		
			 this.hero.facing = 'right';			

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
			this.snowball();
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

			
			// if (this.monstersTab[2].health > 0) {
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
		// if(game.state.callbackContext.hero.sword != null)
		// game.debug.body(game.state.callbackContext.hero.sword);
    },
	
	// Movemevement for the PANGOLIN
	moveRangeDefense: function (monster,level) {
		level.hero.sprite.body.velocity.x *=   0.9 ;
		if( (Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 10 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view )|| monster.chase >0){
			if((Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 10 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view ) ){
				monster.chase = 50;
			}else{
				monster.chase--;
			}
			if(monster.sprite.body.x - level.hero.sprite.body.x < 0){
				monster.sprite.body.velocity.x = 130;
			}else{
				monster.sprite.body.velocity.x = -130;
			}
			
			if(monster.sprite.body.onFloor()){
				monster.sprite.body.velocity.y = -200;
			}
			
		}
		else 
		{
			monster.sprite.body.velocity.x = monster.direction * 150;
			monster.move++;
			if(monster.move > monster.maxMove){
				monster.move = 0;
				monster.direction *= -1;
			}
		}
		
		
	},
	
	killHold: function (mudball) {
      if (game.time.now - mudball.mbThrown > 1000){
		    this.mbs.remove(mudball);
			mudball.kill();
	  }
    },

    // Attack for the suricate
    rangeAttack: function (monster,level) {
			monster.sprite.body.velocity.x = 0;
			if( (Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 10 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view )|| monster.chase >0){
				if((Math.abs(monster.sprite.body.y - level.hero.sprite.body.y) < 10 && Math.abs(monster.sprite.body.x - level.hero.sprite.body.x) < monster.view ) ){
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
					monster.sprite.animations.play("rhinoRight",6,true)
					facteur = -1;
				}else{
					monster.sprite.animations.play("rhinoLeft",6,true)
					monster.prev = false;
				}
				
				monster.sprite.body.velocity.x = facteur * 250;
			}else{
				
				if(!monster.prev && test){
					monster.sprite.animations.play("rhinoLeft",6,true)
					facteur = -1;
				}else{
					monster.sprite.animations.play("rhinoRight",6,true)
					monster.prev = true;
				}
				
				monster.sprite.body.velocity.x = facteur * -250;
			}
			
			if( monster.sprite.body.blocked.left || monster.sprite.body.blocked.right || monster.sprite.body.touching.left || monster.sprite.body.touching.right){
				monster.sprite.body.velocity.y = -150;
			}
			
		}
		else 
		{
			monster.sprite.animations.stop();
		}
		
		
	},

	//How to throw a snowball
	snowball: function(){
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
            var tmp = level.mbs.create(monster.sprite.body.x, monster.sprite.body.y, 'mudball');

            game.physics.enable(tmp, Phaser.Physics.ARCADE);
            tmp.body.collideWorldBounds = false;
            tmp.body.drag.y = 500;

            if(monster.direction == 1){
                tmp.body.velocity.x = 500;
                tmp.body.velocity.y = -200;
            }
            else{
                tmp.body.velocity.x = -500;
                tmp.body.velocity.y = -200;
            }
            tmp.mbThrown = game.time.now;
    },

    exchange: function (pnjSprite, heroSprite) {
        if (game.state.callbackContext.pnj.trade == true)
        {
            if(game.state.callbackContext.yKey.isDown) {
                console.log("Trade ok");
                game.state.callbackContext.pnj.trade = false;
                game.state.callbackContext.hero.looseMask();
            }

            else if(game.state.callbackContext.nKey.isDown)
                console.log("Trade ko");
        }
    },

    collideHeroMonster: function (heroSprite,monsterSprite) {
        i = game.state.callbackContext.monsters.children.indexOf(monsterSprite);
        //game.state.callbackContext.monstersTab[i]; donne le monstre touché
		var x= heroSprite.body.x - monsterSprite.body.x;
		var y= heroSprite.body.y - monsterSprite.body.y;
        game.state.callbackContext.hero.life -= 1;
        // if (game.state.callbackContext.hero.life == 0)
        // {
            // game.state.callbackContext.hero.sprite.kill();
        // }
		if(x < 0){
			heroSprite.body.velocity.y += y*3 ;
			monsterSprite.body.velocity.y -= y*2;
		
			heroSprite.body.velocity.x += x*15 ;
			monsterSprite.body.velocity.x -= x*15;

		}
		else
		{
			heroSprite.body.velocity.y += y*3 ;
			monsterSprite.body.velocity.y -= y*2;
			
			heroSprite.body.velocity.x += x*3 ;
			monsterSprite.body.velocity.x -= x*3;
		}	
			
		return true;
	},
	
	overlapHeroMonster: function (heroSprite,monsterSprite) {
		i = game.state.callbackContext.monsters.children.indexOf(monsterSprite);
        game.state.callbackContext.monstersTab[i].chase = 0;

		
		var x= heroSprite.body.x - monsterSprite.body.x;
		var y= heroSprite.body.y - monsterSprite.body.y;
		heroSprite.body.velocity.y += y ;
		monsterSprite.body.velocity.y = -150;
		
		heroSprite.body.velocity.x += x ;
		monsterSprite.body.x -= x/5;
		monsterSprite.body.velocity.x *= -1;

		return true;
	},

    snowballDamage : function (snowBallSprite, monsterSprite) {
        var i = game.state.callbackContext.monsters.children.indexOf(monsterSprite);
        game.state.callbackContext.monstersTab[i].health = game.state.callbackContext.monstersTab[i].health - 50;
        game.state.callbackContext.sb.kill();
        if (game.state.callbackContext.monstersTab[i].health <= 0) {
            game.state.callbackContext.monsters.remove(monsterSprite);
            monsterSprite.kill();
			game.state.callbackContext.monstersTab.splice(i,1);
        }
    },

    mudballDamage : function (mudBallSprite, heroSprite) {
        heroSprite.kill();
        game.state.callbackContext.hero.life -= 1;
        game.state.callbackContext.monsters.remove(mudBallSprite);
        // if (game.state.callbackContext.hero.life == 0)
        // {
            // game.state.callbackContext.hero.sprite.kill();
        // }
    },
	
	swordDamage : function (swordSprite, monsterSprite) {
        var i = game.state.callbackContext.monsters.children.indexOf(monsterSprite);
        game.state.callbackContext.monstersTab[i].health = game.state.callbackContext.monstersTab[i].health - 10;
        game.state.callbackContext.sb = null;
        if (game.state.callbackContext.monstersTab[i].health <= 0) {
            game.state.callbackContext.monsters.remove(monsterSprite);
            // monsterSprite.visible = false;
			monsterSprite.kill();
			game.state.callbackContext.monstersTab.splice(i,1);
        }
		game.state.callbackContext.collideHeroMonster(game.state.callbackContext.hero.sprite,monsterSprite);
    }
	
};