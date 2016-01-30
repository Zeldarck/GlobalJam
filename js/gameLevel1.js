var gameLevel1 = function(){
	this.mechant = null;
	this.hero = null;
};

//***Heros***
function Character(life,sprite){
	this.sprite = sprite;
	this.life = life;
	this.facing = 'right';
	}


gameLevel1.prototype = { 
    // Assets loading - do not use asssets here
		 preload: function () {
        // Load this images, available with the associated keys later
        game.load.image('background', 'assets/background.jpg');
        game.load.image('character', 'assets/snowboy_sky_masque.png');
		game.load.spritesheet('characterFrames', 'assets/sprites_sheet-snowboy.png', 54,54);
        // Each sprite is 54x55 . -1 means we don't limit to a number of sprites,
        //  0 is the margin of the file, 10 the spacing between each sprites
        //game.load.spritesheet('characterFrames', 'assets/SaraFullSheet7.png', 54, 55, -1, 0 ,10);
        //game.load.spritesheet('ballFrames', 'assets/ball_animation.png', 45, 45);
        game.load.image('mechant', 'assets/mechant.png');

        //Tilemap
        //Created with Tiled software, with needed format: Orthogonal / CSV / .json files
        game.load.tilemap('map', 'assets/tiled.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('RPGpack_sheet', 'assets/RPGpack_sheet.png');

    },
    // Called after preload - create sprites,... using assets here
    create: function () {
        // Create a sprite
        this.backgroundSprite = game.add.sprite(0, 0, 'background');

		
		this.mechant = game.add.sprite(350, 450, 'mechant');
        sprite = game.add.sprite(375, 300, 'characterFrames');
		
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
		
		game.physics.enable(this.mechant, Phaser.Physics.ARCADE);
        // The sprite will collide with the borders
        this.mechant.body.collideWorldBounds = true;
        // We limit the physic body to a smaller part of the sprite (it contains white spaces)
        this.mechant.body.setSize(40, 40, 0, 0);
		
		this.mechant.body.mass = 5;
		this.mechant.body.collideWorldBounds = true;
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
        this.mechant.bringToTop();
		this.mechant.body.bounce.setTo(0.5,0.2);
		
        this.startDate = new Date();
		
		//Physic héros
		game.physics.arcade.gravity.y = 800;
		this.hero.sprite.body.bounce.setTo(0.5,0.2);
		this.hero.sprite.body.mass = 50;
		
		this.mechant.body.drag.x = 50;
		this.mechant.body.drag.y = 50;

		this.mechantMove = 0;
		this.mechantMaxMove = 150;
		this.mechantDirection = -1;
		this.mechantView =100;
		this.mechantChase = 0;
		this.mechant.body.immovable = true;
    },
    // Called for each refresh
    update: function (){
		var moving = false;
		var walkAnimationSpeed = 6;
		
		game.physics.arcade.collide(this.hero.sprite, this.mechant);
		game.physics.arcade.collide(this.hero.sprite, this.wallLayer);
		game.physics.arcade.collide(this.mechant, this.wallLayer);
		  
		this.hero.sprite.body.velocity.x = 0;

		if (this.cursorKeys.left.isDown)
		{
			this.hero.sprite.body.velocity.x = -150;
			if(!moving){
				this.hero.sprite.animations.play("left",walkAnimationSpeed,true)
			    facing = 'left';
			};
			moving = true;

		}
		else if (this.cursorKeys.right.isDown)
		{
			this.hero.sprite.body.velocity.x = 150;
			if(!moving){
				this.hero.sprite.animations.play("right",walkAnimationSpeed,true)
			    facing = 'right';
			};			
			moving = true;

		}
		if(!moving){
			this.hero.sprite.frame = 0;
		}

		
		if (this.cursorKeys.up.isDown && this.hero.sprite.body.onFloor())
		{
			this.hero.sprite.body.velocity.y = -500;
		}
		
		this.moveRangeDefense();

	
		 
		// game.physics.arcade.collide(this.hero.sprite, this.mechant);// (function(mechant){
		    // mechant.body.velocity.x -= 100;
		    // this.mechantChase = 0;
        // })(this.mechant));

		 var maxCharacterVelocity = 600;
        this.hero.sprite.body.maxVelocity.set(maxCharacterVelocity,maxCharacterVelocity);    
		this.mechant.body.maxVelocity.set(maxCharacterVelocity,maxCharacterVelocity);    
       // var characterSpeed = 40;
        // var moving = false;
        // var walkAnimationSpeed = 100;
        // var walkAnimationLooping = true;//true means that the animation will loop once finished

        // if(this.cursorKeys.up.isDown){
			// this.hero.sprite.body.velocity.y -= 250;
			// if(!moving) this.hero.sprite.animations.play("up",walkAnimationSpeed,walkAnimationLooping);
            // moving = true;
        // }

    

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
		this.mechant.body.velocity.x = 0;
		if( (Math.abs(this.mechant.body.y - this.hero.sprite.body.y) < 10 && Math.abs(this.mechant.body.x - this.hero.sprite.body.x) < this.mechantView )|| this.mechantChase >0){
			if((Math.abs(this.mechant.body.y - this.hero.sprite.body.y) < 10 && Math.abs(this.mechant.body.x - this.hero.sprite.body.x) < this.mechantView ) ){
				this.mechantChase = 50;
			}else{
				this.mechantChase--;
			}
			if(this.mechant.body.x - this.hero.sprite.body.x < 0){
				this.mechant.body.velocity.x = 130;
			}else{
				this.mechant.body.velocity.x = -130;
			}
			
			if(this.mechant.body.onFloor()){
				this.mechant.body.velocity.y = -200;
			}
			
		}
		else 
		{
			this.mechant.body.velocity.x = this.mechantDirection * 150;
			this.mechantMove++;
			if(this.mechantMove > this.mechantMaxMove){
				this.mechantMove = 0;
				this.mechantDirection *= -1;
			}
		}
		
		
	}
};