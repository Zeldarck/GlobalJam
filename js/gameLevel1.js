var gameLevel1 = function(){
	this.monsters = null;
	this.hero = null;
};

//***Heros***
function Character(life,sprite){
	this.sprite = sprite;
	this.life = life;
	this.facing = 'right';
	this.jump = true;
	}

//    Monstre      \\

function Monster(Move, MaxMove, Direction, View, Chase, sprite){
    this.sprite = sprite;
    this.move = Move;
    this.maxMove = MaxMove;
    this.direction = Direction;
    this.view = View;
    this.chase = Chase;
}
function setMonster(monster, x, y) {
    monster.sprite.body.drag.x = x;
    monster.sprite.body.drag.y = y;
    monster.sprite.body.collideWorldBounds = true;
    monster.sprite.body.bounce.setTo(0.5,0.2);
    monster.sprite.body.setSize(44, 40, 0, 0);
    monster.sprite.body.mass = 5;
    monster.sprite.body.immovable = true;
}

gameLevel1.prototype = { 
    // Assets loading - do not use asssets here
		 preload: function () {
        // Load this images, available with the associated keys later
        game.load.image('background', 'assets/background.jpg');
        game.load.image('character', 'assets/snowboy_sky_masque.png');
		game.load.spritesheet('characterFrames', 'assets/sprites_sheet-snowboy.png', 90, 54);
        // Each sprite is 54x55 . -1 means we don't limit to a number of sprites,
        //  0 is the margin of the file, 10 the spacing between each sprites
        //game.load.spritesheet('characterFrames', 'assets/SaraFullSheet7.png', 54, 55, -1, 0 ,10);
        //game.load.spritesheet('ballFrames', 'assets/ball_animation.png', 45, 45);
        game.load.image('monster', 'assets/mechant.png');

        //Tilemap
        //Created with Tiled software, with needed format: Orthogonal / CSV / .json files
        game.load.tilemap('map', 'assets/tiled.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('RPGpack_sheet', 'assets/RPGpack_sheet.png');

    },
    // Called after preload - create sprites,... using assets here
    create: function () {
        // Create a sprite
        this.backgroundSprite = game.add.sprite(0, 0, 'background');

        var sprite = game.add.sprite(375, 300, 'characterFrames');
        this.monsters = [];
        //this.monsters = this.add.physicsGroup();

        this.monster = new Monster(0, 150, -1, 100, 0, game.add.sprite(350, 450, 'monster'));
        this.monster2 = new Monster(0, 100, -1, 100, 0, game.add.sprite(350, 450, 'monster'));

        this.monsters.push(this.monster);
        this.monsters.push(this.monster2);

		//create hero
		this.hero = new Character(10,sprite); 
        // Add animations     
        this.hero.sprite.animations.add("left",[6,7,8,9,10,11]);
        this.hero.sprite.animations.add("right",[0,1,2,3,4,5]);
        
        // Observers
        this.cursorKeys = game.input.keyboard.createCursorKeys();
        this.spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Physics engine initialisation (optional for arcade engine, need for other ones)
        game.physics.startSystem(Phaser.Physics.ARCADE);
		
        // Init hero sprite
        game.physics.enable(this.hero.sprite, Phaser.Physics.ARCADE);
				
        // Init hero
        this.hero.sprite.body.collideWorldBounds = true;
        this.hero.sprite.body.setSize(15, 35, 35, 20);

        // Init monsters sprite
        game.physics.enable(this.monster.sprite, Phaser.Physics.ARCADE);
        game.physics.enable(this.monster2.sprite, Phaser.Physics.ARCADE);

        // The sprite will collide with the borders
        // We limit the physic body to a smaller part of the sprite (it contains white spaces)

        var map = game.add.tilemap('map');
        // The tileset name must match the one defined in Tiled
        map.addTilesetImage('RPGpack_sheet');
        // The layer name must match the one defined in Tiled
        var backgroundLayer = map.createLayer('background');
        this.wallLayer = map.createLayer('walls');
        this.goalLayer = map.createLayer('goals');
        //The world will have the map size
        backgroundLayer.resizeWorld();
        //The camera will follow the player, as the world is bigger than the screen
        game.camera.follow(this.hero.sprite);
        // Every tiles in the walls layer will be able to colide in this layer
        map.setCollisionByExclusion([],true,'walls');
        map.setCollisionByExclusion([],true,'goals');

        // Sprites are z-ordered by creation. As we added tiles later,
        //  we move back other sprites to top
        this.hero.sprite.bringToTop();

        setMonster(this.monster, 250, 250);
        setMonster(this.monster2, 250, 250);
        for (var monster in this.monsters)
        {
            this.monsters[monster].sprite.bringToTop();
        }

        this.startDate = new Date();
		
		//Physic héros
		game.physics.arcade.gravity.y = 800;
		this.hero.sprite.body.mass = 50;
		this.hero.sprite.body.drag.x = 250;
		this.hero.sprite.body.drag.y = 250;
		
    },
    // Called for each refresh
    update: function (){
		var moving = false;
		var walkAnimationSpeed = 6;

        for (var monster in this.monsters)
        {
            game.physics.arcade.collide(this.hero.sprite, this.monsters[monster].sprite, this.collideHeroMonster);
            game.physics.arcade.collide(this.monsters[monster].sprite, this.wallLayer);
        }
        //game.physics.arcade.collide(this.hero.sprite, this.monster.sprite);
        //game.physics.arcade.collide(this.monster.sprite, this.wallLayer);
		game.physics.arcade.collide(this.hero.sprite, this.wallLayer);

		this.hero.sprite.body.velocity.x = 0;

		  
		game.physics.arcade.overlap(this.hero.sprite, this.monster.sprite,this.overlapHeroMonster);
  
		  
		  
		//this.hero.sprite.body.velocity.x = 0;

		if(this.hero.sprite.body.blocked.down || this.hero.sprite.body.touching.down){
			this.hero.jump = true;
		}
		
		if (this.cursorKeys.left.isDown)
		{
			this.hero.sprite.body.velocity.x = -150;
			if(!moving  && this.hero.jump ){
				this.hero.sprite.animations.play("left",walkAnimationSpeed,true)
				moving = true;
			};
			 this.hero.facing = 'left';

		}
		else if (this.cursorKeys.right.isDown)
		{
			this.hero.sprite.body.velocity.x = 150;
			if(!moving && this.hero.jump){
				this.hero.sprite.animations.play("right",walkAnimationSpeed,true)
				moving = true;
			};		
			 this.hero.facing = 'right';			

		}
		
		if (this.cursorKeys.up.isDown && this.hero.jump)
		{
			this.hero.sprite.animations.stop();
			this.hero.jump = false;
			moving =false;
			this.hero.sprite.body.velocity.y = -500;
		}
		
		if(!moving){
			this.hero.sprite.animations.stop();

            if (this.hero.facing == 'left')
            {
                this.hero.sprite.frame = 6;
            }
            else
            {
                this.hero.sprite.frame = 0;
            }
		}




        for (var monster in this.monsters)
        {
            this.moveRangeDefense(this.monsters[monster]);
        }

		 var maxCharacterVelocity = 600;
        this.hero.sprite.body.maxVelocity.set(maxCharacterVelocity,maxCharacterVelocity);
        for (var monster in this.monsters)
        {
            this.monsters[monster].sprite.body.maxVelocity.set(maxCharacterVelocity,maxCharacterVelocity);
        }


    

    },
    // Called after the renderer rendered - usefull for debug rendering, ...
    render: function  () {
        if(this.debug){
            game.debug.body(this.hero.sprite);
            game.debug.body(this.ballSprite);
        }else{
            game.debug.reset();
        }
    },
	
	
	moveRangeDefense: function (monster) {
		monster.sprite.body.velocity.x = 0;
		if( (Math.abs(monster.sprite.body.y - this.hero.sprite.body.y) < 10 && Math.abs(monster.sprite.body.x - this.hero.sprite.body.x) < monster.view )|| monster.chase >0){
			if((Math.abs(monster.sprite.body.y - this.hero.sprite.body.y) < 10 && Math.abs(monster.sprite.body.x - this.hero.sprite.body.x) < monster.view ) ){
				monster.chase = 50;
			}else{
				monster.chase--;
			}
			if(monster.sprite.body.x - this.hero.sprite.body.x < 0){
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
	
	collideHeroMonster: function (heroSprite,monsterSprite) {
		var x= heroSprite.body.x - monsterSprite.body.x;
		var y= heroSprite.body.y - monsterSprite.body.y;
		heroSprite.body.velocity.y += y*3 ;
		monsterSprite.body.velocity.y -= y*2;
		
		heroSprite.body.velocity.x += x*5 ;
		monsterSprite.body.velocity.x -= x*5;
		return true;
	},
	
	overlapHeroMonster: function (heroSprite,monsterSprite) {
		var x= heroSprite.body.x - monsterSprite.body.x;
		var y= heroSprite.body.y - monsterSprite.body.y;
		heroSprite.body.velocity.y += y ;
		monsterSprite.body.velocity.y -= y;
		
		heroSprite.body.velocity.x += x ;
		monsterSprite.body.velocity.x -= x;
		return true;
	}
	
	
};