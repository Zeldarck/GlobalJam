var gameLevel1 = function(){
	this.mechant = null;
};


gameLevel1.prototype = { 
    // Assets loading - do not use asssets here
		 preload: function () {
        // Load this images, available with the associated keys later
        game.load.image('background', 'assets/background.jpg');
        game.load.image('character', 'assets/snowboy_sky_masque.png');
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
        //this.ballSprite = game.add.sprite(120, 325, 'ballFrames');
        //this.ballSprite.scale.set(0.5,0.5);
		
		this.mechant = game.add.sprite(350, 450, 'mechant');
        this.characterSprite = game.add.sprite(375, 300, 'character');

        // Add animations
        /*
		this.characterSprite.animations.add("up",[0,1,2,3,4,5,6,7,8]);
        this.characterSprite.animations.add("left",[13,14,15,16,17,18,19,20,21]);
        this.characterSprite.animations.add("down",[26,27,28,29,30,31,32,33,34]);
        this.characterSprite.animations.add("right",[39,40,41,42,43,44,45,46,47]);
        */
		//this.ballSprite.animations.add("rolling");

        // Shortcut method to create 4 inputs for the arrow keys
        this.cursorKeys = game.input.keyboard.createCursorKeys();
        // Creation of a specific key observer
        this.spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Physics engine initialisation (optional for arcade engine, need for other ones)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Add a physical body to the sprite
        game.physics.enable(this.characterSprite, Phaser.Physics.ARCADE);
        // The sprite will collide with the borders
        this.characterSprite.body.collideWorldBounds = true;
        // We limit the physic body to a smaller part of the sprite (it contains white spaces)
        this.characterSprite.body.setSize(10, 35, 30, 20);
		
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
        game.camera.follow(this.characterSprite);
        // Every tiles in the walls layer will be able to colide in this layer
        map.setCollisionByExclusion([],true,'walls');
        map.setCollisionByExclusion([],true,'goals');

        // Sprites are z-ordered by creation. As we added tiles later,
        //  we move back other sprites to top
        //this.ballSprite.bringToTop();
        this.characterSprite.bringToTop();
        this.mechant.bringToTop();
		this.mechant.body.bounce.setTo(0.5,0.2);
		
        this.startDate = new Date();
		
		game.physics.arcade.gravity.y = 800;
		this.characterSprite.body.bounce.setTo(0.5,0.2);
		this.characterSprite.body.mass = 50;
		
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
		
		game.physics.arcade.collide(this.characterSprite, this.wallLayer);
		 game.physics.arcade.collide(this.mechant, this.wallLayer);
		  game.physics.arcade.collide(this.characterSprite, this.mechant);
		  
		this.characterSprite.body.velocity.x = 0;

		if (this.cursorKeys.left.isDown)
		{
			this.characterSprite.body.velocity.x = -150;

		}
		else if (this.cursorKeys.right.isDown)
		{
			this.characterSprite.body.velocity.x = 150;

		}
		

		
		if (this.cursorKeys.up.isDown && this.characterSprite.body.onFloor())
		{
			this.characterSprite.body.velocity.y = -500;
		}
		
		this.moveRangeDefense();

	
		 
		// game.physics.arcade.collide(this.characterSprite, this.mechant);// (function(mechant){
		    // mechant.body.velocity.x -= 100;
		    // this.mechantChase = 0;
        // })(this.mechant));

		 var maxCharacterVelocity = 600;
        this.characterSprite.body.maxVelocity.set(maxCharacterVelocity,maxCharacterVelocity);    
		this.mechant.body.maxVelocity.set(maxCharacterVelocity,maxCharacterVelocity);    
       // var characterSpeed = 40;
        // var moving = false;
        // var walkAnimationSpeed = 100;
        // var walkAnimationLooping = true;//true means that the animation will loop once finished

        // if(this.cursorKeys.up.isDown){
			// this.characterSprite.body.velocity.y -= 250;
			// if(!moving) this.characterSprite.animations.play("up",walkAnimationSpeed,walkAnimationLooping);
            // moving = true;
        // }

    

    },
    // Called after the renderer rendered - usefull for debug rendering, ...
    render: function  () {
        if(this.debug){
            game.debug.body(this.characterSprite);
            game.debug.body(this.ballSprite);
        }else{
            game.debug.reset();
        }
    },
	
	
	moveRangeDefense: function () {
		this.mechant.body.velocity.x = 0;
		if( (Math.abs(this.mechant.body.y - this.characterSprite.body.y) < 10 && Math.abs(this.mechant.body.x - this.characterSprite.body.x) < this.mechantView )|| this.mechantChase >0){
			if((Math.abs(this.mechant.body.y - this.characterSprite.body.y) < 10 && Math.abs(this.mechant.body.x - this.characterSprite.body.x) < this.mechantView ) ){
				this.mechantChase = 50;
			}else{
				this.mechantChase--;
			}
			if(this.mechant.body.x - this.characterSprite.body.x < 0){
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