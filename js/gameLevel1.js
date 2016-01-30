var gameLevel1 = function(){
	this.monster = null;
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
    monster.sprite.body.setSize(40, 40, 0, 0);
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
        this.monster = new Monster(0, 150, -1, 100, 0, game.add.sprite(350, 450, 'monster'));

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
        this.hero.sprite.body.setSize(10, 35, 30, 20);
		
		game.physics.enable(this.monster.sprite, Phaser.Physics.ARCADE);
        // The sprite will collide with the borders
        // We limit the physic body to a smaller part of the sprite (it contains white spaces)
        //Ball body
        //game.physics.enable(this.ballSprite, Phaser.Physics.ARCADE);
        //this.ballSprite.body.collideWorldBounds = true;
        // A ball is very bouncy, we set its bounce to the max
        //this.ballSprite.body.bounce.set(0.8, 0.8);
        // We decrease the default mass (1) to have a more reactive ball during collision (it is not as heavy as the player !)
        //this.ballSprite.body.mass = 0.5;
        // Drag will progressively decrease ball velocity
        //this.ballSprite.body.drag.x = 50;
        //this.ballSprite.body.drag.y = 50;


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
        this.monster.sprite.bringToTop();

        this.startDate = new Date();
		
		//Physic héros
		game.physics.arcade.gravity.y = 800;
		this.hero.sprite.body.mass = 50;
		
        setMonster(this.monster, 50, 50);
    },
    // Called for each refresh
    update: function (){
		var moving = false;
		var walkAnimationSpeed = 6;

		game.physics.arcade.collide(this.hero.sprite, this.monster.sprite);
		game.physics.arcade.collide(this.hero.sprite, this.wallLayer);
		game.physics.arcade.collide(this.monster.sprite, this.wallLayer);
		  
		this.hero.sprite.body.velocity.x = 0;

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

		
		
		
		this.moveRangeDefense();

		 var maxCharacterVelocity = 600;
        this.hero.sprite.body.maxVelocity.set(maxCharacterVelocity,maxCharacterVelocity);    
		this.monster.sprite.body.maxVelocity.set(maxCharacterVelocity,maxCharacterVelocity);
 

    

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
	
	
	moveRangeDefense: function () {
		this.monster.sprite.body.velocity.x = 0;
		if( (Math.abs(this.monster.sprite.body.y - this.hero.sprite.body.y) < 10 && Math.abs(this.monster.sprite.body.x - this.hero.sprite.body.x) < this.monster.view )|| this.monster.chase >0){
			if((Math.abs(this.monster.sprite.body.y - this.hero.sprite.body.y) < 10 && Math.abs(this.monster.sprite.body.x - this.hero.sprite.body.x) < this.monster.view ) ){
				this.monster.chase = 50;
			}else{
				this.monster.chase--;
			}
			if(this.monster.sprite.body.x - this.hero.sprite.body.x < 0){
				this.monster.sprite.body.velocity.x = 130;
			}else{
				this.monster.sprite.body.velocity.x = -130;
			}
			
			if(this.monster.sprite.body.onFloor()){
				this.monster.sprite.body.velocity.y = -200;
			}
			
		}
		else 
		{
			this.monster.sprite.body.velocity.x = this.monster.direction * 150;
			this.monster.move++;
			if(this.monster.move > this.monster.maxMove){
				this.monster.move = 0;
				this.monster.direction *= -1;
			}
		}
		
		
	},
	
	collideHeroMonster: function () {
			
	}
};