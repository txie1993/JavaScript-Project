/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext("2d");
	  const game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.asteroids = [];
	    this.bullets = [];
	    this.ships = [];
	
	    this.addAsteroids();
	  }
	
	  add(object) {
	    if (object instanceof Asteroid) {
	      this.asteroids.push(object);
	    } else if (object instanceof Bullet) {
	      this.bullets.push(object);
	    } else if (object instanceof Ship) {
	      this.ships.push(object);
	    } else {
	      throw "wtf?";
	    }
	  }
	
	  addAsteroids() {
	    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
	      this.add(new Asteroid({ game: this }));
	    }
	  }
	
	  addShip() {
	    const ship = new Ship({
	      pos: this.randomPosition(),
	      game: this
	    });
	
	    this.add(ship);
	
	    return ship;
	  }
	
	  allObjects() {
	    return [].concat(this.ships, this.asteroids, this.bullets);
	  }
	
	  checkCollisions() {
	    const allObjects = this.allObjects();
	    for (let i = 0; i < allObjects.length; i++) {
	      for (let j = 0; j < allObjects.length; j++) {
	        const obj1 = allObjects[i];
	        const obj2 = allObjects[j];
	
	        if (obj1.isCollidedWith(obj2)) {
	          const collision = obj1.collideWith(obj2);
	          if (collision) return;
	        }
	      }
	    }
	  }
	
	  draw(ctx) {
	    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    ctx.fillStyle = Game.BG_COLOR;
	    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	    this.allObjects().forEach((object) => {
	      object.draw(ctx);
	    });
	  }
	
	  isOutOfBounds(pos) {
	    return (pos[0] < 0) || (pos[1] < 0) ||
	      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
	  }
	
	  moveObjects(delta) {
	    this.allObjects().forEach((object) => {
	      object.move(delta);
	    });
	  }
	
	  randomPosition() {
	    return [
	      Game.DIM_X * Math.random(),
	      Game.DIM_Y * Math.random()
	    ];
	  }
	
	  remove(object) {
	    if (object instanceof Bullet) {
	      this.bullets.splice(this.bullets.indexOf(object), 1);
	    } else if (object instanceof Asteroid) {
	      this.asteroids.splice(this.asteroids.indexOf(object), 1);
	    } else if (object instanceof Ship) {
	      this.ships.splice(this.ships.indexOf(object), 1);
	    } else {
	      throw "wtf?";
	    }
	  }
	
	  step(delta) {
	    this.moveObjects(delta);
	    this.checkCollisions();
	  }
	
	  wrap(pos) {
	    return [
	      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
	    ];
	  }
	}
	
	Game.BG_COLOR = "#000000";
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	Game.FPS = 32;
	Game.NUM_ASTEROIDS = 10;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	    this.ship = this.game.addShip();
	  }
	
	  bindKeyHandlers() {
	    const ship = this.ship;
	
	    Object.keys(GameView.MOVES).forEach((k) => {
	      let move = GameView.MOVES[k];
	      key(k, () => { ship.power(move); });
	    });
	
	    key("space", () => { ship.fireBullet() });
	  }
	
	  start() {
	    this.bindKeyHandlers();
	    this.lastTime = 0;
	    //start the animation
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  animate(time) {
	    const timeDelta = time - this.lastTime;
	
	    this.game.step(timeDelta);
	    this.game.draw(this.ctx);
	    this.lastTime = time;
	
	    //every call to animate requests causes another call to animate
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}
	
	GameView.MOVES = {
	  "w": [ 0, -1],
	  "a": [-1,  0],
	  "s": [ 0,  1],
	  "d": [ 1,  0],
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map