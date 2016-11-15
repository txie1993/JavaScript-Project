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
	  const game = new Game(canvasEl);
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Car = __webpack_require__(3);
	
	class Game {
	  constructor(canvas) {
	    this.canvas = canvas;
	    this.cars = [];
	
	    this.canvas.addEventListener("mousedown", (e) => this.checkClick(e));
	    this.cars.push(new Car({pos: [0,0], len: 200, height: 100, color: "#333333", game: this}));
	
	  }
	
	  checkClick(e){
	    this.cars.forEach((car) => {
	      if ((e.pageX >= car.pos[0]+10 &&
	        e.pageX <= car.pos[0]+car.len+10) &&
	        (e.pageY >= car.pos[1]+10 &&
	          e.pageY <= car.pos[1]+car.height+10)){
	        console.log(car);
	      }
	      else {
	        console.log("afdshj");
	      }
	    });
	  }
	
	  checkCollisions() {
	    const allObjects = this.cars;
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
	
	    this.cars.forEach((object) => {
	      object.draw(ctx);
	    });
	  }
	
	  isOutOfBounds(pos) {
	    return (pos[0] < 0) || (pos[1] < 0) ||
	      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
	  }
	
	}
	
	Game.BG_COLOR = "#123456";
	Game.DIM_X = 600;
	Game.DIM_Y = 600;
	Game.FPS = 30;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	  }
	
	  start() {
	    this.lastTime = 0;
	    //start the animation
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  animate(time) {
	    const timeDelta = time - this.lastTime;
	    this.lastTime = time;
	    this.game.draw(this.ctx);
	
	    //every call to animate requests causes another call to animate
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}
	
	module.exports = GameView;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Car {
	    constructor(options) {
	        this.pos = options.pos;
	        this.len = options.len;
	        this.height = options.height;
	        this.color = options.color;
	        this.game = options.game;
	        this.draggable = false;
	    }
	
	    collideWith(otherObject) {
	
	    }
	
	    draw(ctx) {
	        ctx.beginPath();
	        // ctx.rect(0, 0, 100, 100);
	        ctx.rect(this.pos[0], this.pos[1], this.len, 100);
	        ctx.closePath();
	        ctx.fillStyle = this.color;
	        ctx.fill();
	    }
	
	    isCollidedWith(otherObject) {}
	
	    drag(e) {
	        if (this.draggable) {
	            this.pos[0] = e.pageX - this.canvas.offsetLeft;
	            this.pos[1] = e.pageY - this.canvas.offsetTop;
	        }
	    }
	
	    mousedown() {
	        this.draggable = true;
	        console.log("swag");
	    }
	    mouseup() {
	        this.draggable = false;
	    }
	}
	
	module.exports = Car;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map