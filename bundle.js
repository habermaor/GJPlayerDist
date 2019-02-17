/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

﻿//var data = require('./dataMC');
var data;
var loadState = __webpack_require__(1);
var playState = __webpack_require__(3);
var winState = __webpack_require__(7);
var loseState = __webpack_require__(8);

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');
//var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });
game.state.add('load', loadState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('lose', loseState);

game.state.start('load');
game.globals = {  player: null };
var firing_sound;
var hitting_sound;
var soundtrack;
var collecting_sound;
var jump_sound;

//var player;
var bullets;

var enemies;
var spaceBar;
var direction = 1;
var stars;
var layer;
var score = 0;
var scoreText;
var endPoint;
var leftKey;
var rightKey;
this.pad;

this.stick;

this.buttonA;
this.buttonB;












/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

﻿module.exports = {
    defauldData: __webpack_require__(2),
    preload: function () {
        var defauldData = this.defauldData;

        var url = new URL(window.location.href);
        var gameId = url.searchParams.get("id");
        console.log("gameId",gameId);


        let getGame = new Promise((resolve, reject) => {
            this.game.data = defauldData;
            const xhr = new XMLHttpRequest();            
            xhr.open("GET", '/api/item/' + gameId);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => { this.game.data = defauldData; this.game.state.start('play'); reject(xhr.statusText); }
            xhr.send();
        })
        getGame.then(
            (json) => {
                this.game.data = JSON.parse(json); 
                this.game.state.start('play');
            })
        .catch(
        (reason) => {
            console.log(reason);
            this.game.data = defauldData;
            this.game.state.start('play');
           
        })
    },
    create: function () {
        loaderText = this.game.add.text(16, 16, 'Your own game is being loaded.. How Awesome is that?!', { fontSize: '32px', fill: '#fff' });
    }
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

﻿/*note! this is only in use for testing the player app, the real default comes from the editor app!*/
module.exports =
    {

        assets: {
            background: { key: "sky", url: "assets/mc_game/office_opacity.jpg" },
            soundtrack: { key: "soundtrack", url: "assets/mc_game/awesomesauce.mp3" },
            objects: [
                {
                    key: "star1", url: "assets/mc_game/mentor_small.png",
                    audio: {
                        collect: { key: "star1_collect", url: "assets/mc_game/collect_coin.wav" }
                    },
                    positions: [{ x: 600, y: 1200 }]
                },
                {
                    key: "star2", url: "assets/mc_game/advisor_small.png",
                    audio: {
                        collect: { key: "star1_collect", url: "assets/mc_game/collect_coin.wav" }
                    }, positions: [{ x: 300, y: 700 }]
                },
                {
                    key: "star3", url: "assets/mc_game/investor_small.png",
                    audio: {
                        collect: { key: "star1_collect", url: "assets/mc_game/collect_coin.wav" }
                    }, positions: [{ x: 1400, y: 1200 }]
                },
                {
                    key: "star4", url: "assets/mc_game/international_small.png",
                    audio: {
                        collect: { key: "star1_collect", url: "assets/mc_game/collect_coin.wav" }
                    }, positions: [{ x: 1400, y: 200 }]
                }
            ],
            bullet: {
                key: "bullet", url: "assets/lips.png", speed:450, audio: {
                    firing: { key: "bullet_firing", url: "assets/kiss.wav" },
                    hit: { key: "bullet_hit", url: "assets/oh_no.wav" }
                }
            },
            enemies: [{
                speed: 200,
                key: "enemy", url: "assets/mc_game/maor_horizontal.png", frameWidth: 482, frameHeight: 498,
                bullet: {
                    key: "enemy_bullet", url: "assets/bomb.png", speed: 450, audio: {
                        firing: { key: "enemy_bullet_firing", url: "assets/Fire_in_the_Hole.mp3" },
                        hit: { key: "enemy_bullet_hit", url: "assets/Explosion.mp3" }
                    }
                },
                animations: {
                    walk: {
                        from: 20,
                        to: 29
                    },
                    jump: {
                        from: 20,
                        to: 29
                    },
                    die: {
                        from: 0,
                        to: 9
                    },
                    idle: {
                        from: 10,
                        to: 19
                    }
                }
                , positions: [{ x: 800, y: 1400 }, { x: 300, y: 700 }, { x: 1400, y: 1200 }, { x: 1400, y: 200 }]
            }],           
          
            hero: {
                speed: 300,
                x: 100, y: 1450,
                scale:1,
                key: "hero", url: "assets/mc_game/example_hero.png",
                frameWidth: 415,
                frameHeight: 536,
                audio: {jump:""},
                frameWidth: 266.6666666666667,
                frameHeight: 300,
                animations: {
                    walk: {
                        from: 5,
                        to: 9
                    },
                    jump: {
                        from: 10,
                        to: 14
                    },
                    idle: {
                        from: 0,
                        to: 4
                    },
                    die: {
                        from: 0,
                        to: 4
                    }
                }
            },
            specialTiles: [
                  //    {
                  //    key: "jetpack",
                  //    url: "assets/JetpackRockets.png",
                  //    collide: {
                  //        with: "hero",
                  //        effect: {
                  //            property: "jetpack",
                  //            value: {gravity:0.2,time:10000}
                  //        }
                  //    },
                  //    positions: [{ x: 400, y: 1400 }]
                  //},
                  //{
                  //    key: "killer",
                  //    url: "assets/potion.png",
                  //    collide: {
                  //        with: "hero",
                  //        effect: {
                  //            property: "killer",
                  //            value: {customAnimation:"idle"}
                  //        }
                  //    },
                  //    positions: [{ x: 400, y: 1400 }]
                  //},
                  //{
                  //    key: "potion",
                  //    url: "assets/potion.png",
                  //    collide: {
                  //        with: "hero",
                  //        effect: {
                  //            property: "sizer",
                  //            value: { width: 0.1, height: 0.1 }
                  //        }
                  //    },
                  //    positions: [{ x: 400, y: 1400 }]
                  //},
           //{
           //    key: "trampoline",
           //    url: "assets/ToyTrampoline.png",
           //    collide: {
           //        with: "hero",
           //        effect: {
           //            property: "jumper",
           //            value: { x: 1000, y: -10 }
           //        }
           //    },
           //    positions: [{ x: 400, y: 1400 }]
           //},
             //{
             //    key: "portal",
             //    url: "assets/Loop_Portal.gif",
             //    collide: {
             //        with: "hero",
             //        effect: {
             //            property: "portal",
             //            value: {x:900,y:1200}
             //        }
             //    },
             //    positions: [{ x: 200, y: 1400 }]
             //}
            ],
     
            endStage: { key: "endStage", url: "assets/trophy.png", x: 1330, y: 250 },

            tilemap: { key: "tilemap", url: "assets/mc_game/mario.json", width: 52, height: 52/*TODO - put all the tilemap data here, instead of external file*/ },
            tileImages: [{ key: "b3ad8f", url: "assets/mc_game/b3ad8f.png" }]/*TODO - no need in this. images should be taken from map json*/
        },

    }



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

﻿module.exports = {

    Bullet: __webpack_require__(4),
    Enemy: __webpack_require__(5),


    preload: function () {

        var data = this.game && this.game.data;
        var game = this.game;
        var player = this.game.globals.player;

        game.load.onFileComplete.add(fileComplete, this);

        data.assets.objects.forEach(function (object) {
            game.load.image(object.key, object.url);
        });
        data.assets.specialTiles && data.assets.specialTiles.forEach(function (specialTile) {
            game.load.image(specialTile.key, specialTile.url);
        });
        game.load.image(data.assets.bullet.key, data.assets.bullet.url);
        game.load.image(data.assets.endStage.key, data.assets.endStage.url);
        game.load.spritesheet(data.assets.hero.key, data.assets.hero.url, data.assets.hero.frameWidth, data.assets.hero.frameHeight);
        data.assets.enemies.forEach(function (enemy) {
            game.load.spritesheet(enemy.key, enemy.url, enemy.frameWidth, enemy.frameHeight);
            game.load.image(enemy.bullet.key, enemy.bullet.url);

            game.load.audio(enemy.bullet.audio.firing.key, enemy.bullet.audio.firing.url);
            game.load.audio(enemy.bullet.audio.hit.key, enemy.bullet.audio.hit.url);
        });
        game.load.spritesheet(data.assets.enemies[0].key, data.assets.enemies[0].url);
        game.load.audio(data.assets.bullet.audio.firing.key, data.assets.bullet.audio.firing.url);
        game.load.audio(data.assets.bullet.audio.hit.key, data.assets.bullet.audio.hit.url);
        game.load.audio(data.assets.hero.audio.jump.key, data.assets.hero.audio.jump.url);



        game.load.audio(data.assets.soundtrack.key, data.assets.soundtrack.url);
        game.load.audio(data.assets.objects[0].audio.collect.key, data.assets.objects[0].audio.collect.url);


        game.load.crossOrigin = 'anonymous';

        game.load.image(data.assets.background.key, data.assets.background.url)
        game.load.tilemap(data.assets.tilemap.key, data.assets.tilemap.url, null, Phaser.Tilemap.TILED_JSON);
        game.load.image(data.assets.tileImages[0].key, data.assets.tileImages[0].url);

        game.load.atlas('dpad', 'assets/dpad.png', 'assets/dpad.json');
        loaderText = this.game.add.text(16, 16, 'Your own pictures, sounds and creativity are being downloaded! Fantastic!', { fontSize: '32px', fill: '#fff' });
        loaderProgressText = this.game.add.text(16, 100, '', { fontSize: '20px', fill: '#fff' });


        function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
            loaderProgressText.setText("Loading: " + progress + "% - " + totalLoaded + " out of " + totalFiles + " files of awsomness!");
        }



    },
    create: function () {

        loaderText.destroy();
        loaderProgressText.destroy();
        Enemy = this.Enemy;
        var data = this.game && this.game.data;
        var game = this.game;

        game.scale.forceOrientation(true);
        game.scale.pageAlignHorizontally = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        if (data.assets.soundtrack.key) {
            soundtrack = game.add.audio(data.assets.soundtrack.key);
            soundtrack.loopFull(0.5);
        }

        // game.add.tileSprite(0, 0, (data.assets.tilemap.width / data.assets.tilemap.height) * window.innerHeight * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, data.assets.background.key).alpha = 0.6;
        game.stage.backgroundColor = "#fff";
        game.add.tileSprite(0, 0, 1664, 1664, data.assets.background.key).alpha = 0.4;

        map = game.add.tilemap(data.assets.tilemap.key);
        game.world.setBounds(0, 0, (data.assets.tilemap.width / data.assets.tilemap.height) * window.innerHeight * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
        endPoint = game.add.sprite(data.assets.endStage.x, data.assets.endStage.y, data.assets.endStage.key);
        endPoint.enableBody = true;
        game.physics.arcade.enable(endPoint);



        map.addTilesetImage(data.assets.tileImages[0].key);

        map.setCollisionByExclusion([]);
        //joystick
        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.stick = this.pad.addDPad(0, 0, 200, 'dpad');
        this.stick.alignBottomLeft(0);
        spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceBar.onDown.add(this.jump, this);

        sKey = game.input.keyboard.addKey(Phaser.KeyCode.S);
        sKey.onDown.add(this.shootBullet, this);


        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);




        this.buttonA = this.pad.addButton(window.innerWidth - 100, window.innerHeight - 100, 'dpad', 'button1-up', 'button1-down');
        this.buttonA.onDown.add(this.shootBullet, this);


        this.buttonB = this.pad.addButton(window.innerWidth - 250, window.innerHeight - 100, 'dpad', 'button2-up', 'button2-down');
        this.buttonB.onDown.add(this.jump, this);








        layer = map.createLayer('office_tile');//this is the layer name from Tiled. todo - make this dynamic?
        layer.resizeWorld();
        game.globals.player = game.add.sprite(data.assets.hero.x, data.assets.hero.y, data.assets.hero.key);
        var player = game.globals.player;
        player.anchor.setTo(.5, .5);
        player.scale.setTo(data.assets.hero.scale || 1, data.assets.hero.scale || 1);


        game.physics.arcade.enable(player);
        player.body.setSize(player.width * 0.5, player.height * 0.75, player.width * 0.25, player.height * 0.25);



        game.camera.follow(player);
        game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);


        player.body.bounce.y = 0;
        player.body.gravity.y = data.assets.hero.gravity || 300;
        player.body.collideWorldBounds = true;

        player.animations.add('die', this.getFramesArray(data.assets.hero.animations.jump.from, data.assets.hero.animations.jump.to), 30);

        player.animations.add('walk', this.getFramesArray(data.assets.hero.animations.walk.from, data.assets.hero.animations.walk.to), 30);
        player.animations.add('idle', this.getFramesArray(data.assets.hero.animations.idle.from, data.assets.hero.animations.idle.to), 30);
        player.animations.add('jump', this.getFramesArray(data.assets.hero.animations.jump.from, data.assets.hero.animations.jump.to), 30);

        stars = game.add.group();
        stars.enableBody = true;

        data.assets.objects.forEach(function (object) {
            object.positions.forEach(function (position) {
                var star = stars.create(position.x, position.y, object.key);
                star.anchor.set(0.5, 0);
                var tween = game.add.tween(star.scale).to({ x: -1 }, 1000, "Linear", true, 0, -1, true);
                tween.onLoop.add(function () {
                    star.frameName = (star.frameName === 'front') ? 'back' : 'front';
                }, this);
            });
        });
        enemies = game.add.group();
        enemies.enableBody = true;

        data.assets.enemies.forEach(function (bad) {
            bad.positions.forEach(function (position) {
                var enemy = new Enemy(game, position.x, position.y, bad.key);
                enemy.attackSound = game.add.audio(bad.bullet.audio.firing.key);
                enemy.HitSound = game.add.audio(bad.bullet.audio.hit.key);
                enemies.add(enemy);
            });
            
          

        });
        game.time.events.loop(Phaser.Timer.SECOND * 2, this.turnRandomEnemy, this);
        game.time.events.loop(Phaser.Timer.SECOND * 3, this.randomEnemyAttack, this);

        
        bullets = game.add.group();
        bullets.enableBody = true;


        //  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        firing_sound = game.add.audio(data.assets.bullet.audio.firing.key);
        hitting_sound = game.add.audio(data.assets.bullet.audio.hit.key);
        collecting_sound = game.add.audio(data.assets.objects[0].audio.collect.key);
        jump_sound = game.add.audio(data.assets.hero.audio.jump.key);



        speciel_tiles = game.add.group();
        speciel_tiles.enableBody = true;

        data.assets.specialTiles && data.assets.specialTiles.forEach(function (specialTile) {
            specialTile.positions.forEach(function (position) {
                var tile = speciel_tiles.create(position.x, position.y, specialTile.key);
                tile.collideData = specialTile.collide;
            });
        });

    },
    update: function () {
        var data = this.game && this.game.data;
        var game = this.game;
        var player = this.game.globals.player;

        game.physics.arcade.collide(player, layer);
        game.physics.arcade.overlap(player, endPoint, this.win, null, this);
        game.physics.arcade.collide(stars, layer);
        game.physics.arcade.collide(enemies, layer);
        game.physics.arcade.overlap(player, speciel_tiles, this.collideWithSpecialTile, null, this);
        game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
        if (player && player.body) player.body.velocity.x = 0;
        if (player && player.body && !player.isDead && (this.stick.isDown || leftKey.isDown || rightKey.isDown)) {

            if ((this.stick.direction === Phaser.LEFT) || leftKey.isDown) {
                player.body.velocity.x = -data.assets.hero.speed;

                player.animations.play('walk');
                player.scale.x = -1 * (Math.abs(player.scale.x));
                direction = -1;
            }
            else if (this.stick.direction === Phaser.RIGHT || rightKey.isDown) {
                player.body.velocity.x = data.assets.hero.speed;
                player.animations.play('walk');
                player.scale.x = Math.abs(player.scale.x);
                direction = 1;
            }

        }
        else {
            if (player && player.body && player.body.onFloor())
                player.animations.play('idle');

        }

    },


    win: function () {
        var data = this.game && this.game.data;
        var game = this.game;
        game.state.start('win');
    },
    lose: function () {
        var data = this.game && this.game.data;
        var game = this.game;

        console.log("TODO - lose stuff, cool animation and lose stage");
        // game.state.start('lose');
    },
    jump: function () {
        var player = this.game.globals.player;

        if (player && player.body && player.body.onFloor()) {
            player.body.velocity.y = -350;
            jump_sound.play();
            player.animations.play('jump');
        }
    },
    turnRandomEnemy: function () {
        var data = this.game && this.game.data;
        var game = this.game;
        enemy = enemies.children[Math.floor(Math.random() * enemies.children.length)]
        if (enemy) {
            // randomise the movement	
            baddieMover = game.rnd.integerInRange(1, 3);	// simple if statement to choose if and which way the baddie moves	

            if (enemy.x < enemy.rangeLeft && baddieMover == 2) {
                baddieMover = 1; // enemy is too far left, so move it right
            }
            else if (enemy.x > enemy.rangeRight && baddieMover == 1) {
                baddieMover = 2; // enemy is too far right, so move it left       
            } if (baddieMover == 1) {
                enemy.body.velocity.x = data.assets.enemies[0].speed;//TODO - refrence to the relevant enemy 
            }
            else if (baddieMover == 2) {
                enemy.body.velocity.x = -data.assets.enemies[0].speed;
            }
            else {
                enemy.body.velocity.x = 0;
            }


        }
    },
    randomEnemyAttack: function () {
        var data = this.game && this.game.data;
        var game = this.game;
        enemy = enemies.children[Math.floor(Math.random() * enemies.children.length)]
        if (enemy) {
            enemy.attack();
        }
    },
    collectStar: function (player, star) {
        var data = this.game && this.game.data;
        var game = this.game;
        star.kill();
        collecting_sound.play();
        this.score += 10;
        //scoreText.text = 'Score: ' + score;
    },

    shootBullet: function () {
        Bullet = this.Bullet;
        var player = this.game.globals.player;

        var data = this.game && this.game.data;
        var game = this.game;
        if (bullets.length < 5) {
            var bullet = new Bullet(game, player.x + 10, player.y + 10, direction, data.assets.bullet.speed, data.assets.bullet.key);
            bullets.add(bullet);
            firing_sound.play();
        }
    },

    collideWithSpecialTile: function (player, tile) {
        _self = this;
        if (tile.collideData.with == "hero" || tile.collideData.with == "all") {
            switch (tile.collideData.effect.property) {
                case "jetpack":
                    if (player.body.gravity.y != tile.collideData.effect.value.gravity) {
                        let originalGravity = player.body.gravity.y;
                        player.body.gravity.y = tile.collideData.effect.value.gravity;
                        this.game.time.events.add(tile.collideData.effect.value.time, function () { player.body.gravity.y = originalGravity }, this).autoDestroy = true;
                    }
                    break;
                case "portal":
                    player.body.x = tile.collideData.effect.value.x;
                    player.body.y = tile.collideData.effect.value.y;
                    break;
                case "jumper":
                    player.body.velocity.setTo(tile.collideData.effect.value.x, tile.collideData.effect.value.y)
                    break;
                case "sizer":
                    player.scale.setTo(tile.collideData.effect.value.width, tile.collideData.effect.value.height)
                    break;
                case "killer":
                    if (!player.isDead) {
                        player.isDead = true;
                        player.body.velocity.x = 0;
                        // enemy.animations.play('die', 10, false, true).onComplete.add(function () { enemies.remove(enemy); });

                        player.animations.play(tile.collideData.effect.value.customAnimation ? tile.collideData.effect.value.customAnimation : 'idle', 30, false, true).onComplete.add(function () { _self.lose() });
                        //  player.destroy();
                        hitting_sound.play();

                    }
                    break;
                case "speeder":
                    player.body.velocity.x = 1000;
                    player.body.moveTo(1000, 1000, 360)
                    break;

                default:
                    break;

            }
        }
    },






    getFramesArray: function (start, end) {
        return Array(end - start + 1).fill().map((item, index) => start + index);
    }


}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

﻿
module.exports = class Bullet extends Phaser.Sprite {
    constructor(game, x, y, direction, speed, key) {
        super(game, x, y, key);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.xSpeed = direction * speed;
    }
    update() {
        this.game.physics.arcade.overlap(this, enemies, function (bullet, enemy) {
            bullets.remove(bullet);
            enemy.isDead = true;
            enemy.body.velocity.x = 0;

            enemy.animations.play('die', 10, false, true).onComplete.add(function () { enemies.remove(enemy); });
            hitting_sound.play();
            this.score += 1;
            //  scoreText.text = 'score: ' + score;




        });


        this.body.velocity.y = 0;
        this.body.velocity.x = this.xSpeed;
        if (this.x < 0 || this.x > 1664) {
            this.destroy();
        }

    }
   
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

﻿EnemyBullet = __webpack_require__(6),

module.exports = class Enemy extends Phaser.Sprite {
    constructor(game, x, y, key) {
        function getFramesArray(start, end) {
            return Array(end - start + 1).fill().map((item, index) => start + index);
        };
      

        super(game, x, y, key, 64, 64);
        var data = this.game && this.game.data;
        var _self = this;
       // Phaser.Sprite.call(this, game, x, y, key, 64, 64);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(.5, .5);
        this.scale.setTo(data.assets.enemies[0].scale || 1, data.assets.enemies[0].scale || 1);

        this.collideWorldBounds = true;
        this.enableBody = true;
        this.animations.add('die', getFramesArray(data.assets.enemies[0].animations.die.from, data.assets.enemies[0].animations.die.to), 10);
        this.animations.add('idle', getFramesArray(data.assets.enemies[0].animations.idle.from, data.assets.enemies[0].animations.idle.to), 10);
        this.animations.add('walk', getFramesArray(data.assets.enemies[0].animations.walk.from, data.assets.enemies[0].animations.walk.to), 10);
        this.animations.add('jump', getFramesArray(data.assets.enemies[0].animations.jump.from, data.assets.enemies[0].animations.jump.to), 10);

     


     



        this.animations.currentFrame = 0;

        this.body.gravity.y = data.assets.enemies[0].gravity || 800;
        this.body.bounce.y = 0;
        this.body.bounce.x = 1;
        this.body.collideWorldBounds = true;
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        // this.body.velocity.x = 30 + Math.random() * 50;
    };
   

    attack() {
        let data = this.game && this.game.data;
        let game = this.game;
        let direction;
        this.body.velocity.x > 0 ? direction = 1 : direction = -1;
        var bullet = new EnemyBullet(game, this.x + 10, this.y + 10, this, direction, data.assets.enemies[0].bullet.speed, data.assets.enemies[0].bullet.key);
        this.bullets.add(bullet);
        firing_sound.play();
    }

    update () {
        if (this.isDead) {
            //  this.animations.play('die').onComplete.add(function () { enemies.remove(this); });;
        }
        else if (this.body.velocity.x == 0) {
            this.animations.play('idle');
        }
        else if (this.body.velocity.x < 0) {
            this.animations.play('walk');
            this.scale.x = -1 * (Math.abs(this.scale.x));

        }
        else if (this.body.velocity.x > 0) {
            this.animations.play('walk');
            this.scale.x = Math.abs(this.scale.x);
        }

    }
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

﻿
module.exports = class EnemyBullet extends Phaser.Sprite {

    constructor(game, x, y,enemy , direction, speed, key) {
        super(game, x, y, key);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        enemy.attackSound.play();
        this.xSpeed = direction * speed;
    }
    update() {
        var player = this.game.globals.player;
        var game = this.game;
        this.game.physics.arcade.overlap(this, player, function (bullet, player) {
            enemy.bullets.remove(bullet);
            player.isDead = true;
            player.body.velocity.x = 0;
    
         //   player.animations.play('die', 10, false, true).onComplete.add(function () { game.state.start('lose'); });
            enemy.HitSound.play();
            game.state.start('lose');
        });


        this.body.velocity.y = 0;
        this.body.velocity.x = this.xSpeed;
        if (this.x < 0 || this.x > 1664) {
            this.destroy();
        }

    }
   
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

﻿module.exports = {
    preload: function () {
        this.game.load.image('win_bg', this.game.data && this.game.data.assets
            && this.game.data.assets.winImage && this.game.data.assets.winImage.url
            || "assets/gameover.png")
    },
    create: function () {
        var data = this.game.data;
        this.game.plugins.removeAll();
        this.game.add.tileSprite(0, 0, (data.assets.tilemap.width / data.assets.tilemap.height) * window.innerHeight * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, 'win_bg');

    }
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

﻿module.exports = {
    preload: function () {
        this.game.load.image('win_bg', this.game.data && this.game.data.assets
            && this.game.data.assets.winImage && this.game.data.assets.winImage.url
            || "assets/gameover.png")
    },
    create: function () {
        var data = this.game.data;
        this.game.plugins.removeAll();
        this.game.add.tileSprite(0, 0, (data.assets.tilemap.width / data.assets.tilemap.height) * window.innerHeight * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, 'win_bg');

    }
}

/***/ })
/******/ ]);