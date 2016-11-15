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
	        this.currentCar = null;
	        this.canvas.addEventListener("mousedown", (e) => this.checkDown(e));
	        this.canvas.addEventListener("mousemove", (e) => this.checkMove(e));
	        this.canvas.addEventListener("mouseup", (e) => this.checkUp(e));
	        this.cars.push(new Car({
	            pos: [0, 0],
	            len: 200,
	            height: 100,
	            color: "#acbbca",
	            game: this,
	            orientation: "horizontal"
	        }));
	        this.cars.push(new Car({
	            pos: [300, 300],
	            len: 100,
	            height: 200,
	            color: "#8723ef",
	            game: this,
	            orientation: "vertical"
	        }));
	
	    }
	
	    checkDown(e) {
	        this.cars.forEach((car) => {
	            if ((e.pageX >= car.pos[0] + 8 &&
	                    e.pageX <= car.pos[0] + car.len + 8) &&
	                (e.pageY >= car.pos[1] + 8 &&
	                    e.pageY <= car.pos[1] + car.height + 8)) {
	                this.currentCar = car;
	                this.currentCar.mousedown();
	            }
	        });
	    }
	
	    checkUp(e) {
	        if (this.currentCar) {
	            this.currentCar.mouseup();
	            this.currentCar = null;
	        }
	    }
	
	    checkMove(e) {
	        if (this.currentCar) {
	            this.currentCar.drag(e);
	        }
	    }
	
	    checkCollisions() {
	        for (let i = 0; i < this.cars.length; i++) {
	            for (let j = 0; j < this.cars.length; j++) {
	                const obj1 = this.cars[i];
	                const obj2 = this.cars[j];
	
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
	
	    isOutOfBounds(car) {
	        return (car.pos[0] < 0) || (car.pos[1] < 0) ||
	            (car.pos[0] > Game.DIM_X) || (car.pos[1] > Game.DIM_Y);
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
	        this.orientation = options.orientation;
	        this.draggable = false;
	    }
	
	    collideWith(otherObject) {
	
	    }
	
	    draw(ctx) {
	        ctx.beginPath();
	        ctx.rect(this.pos[0], this.pos[1], this.len, this.height);
	        ctx.closePath();
	        ctx.fillStyle = this.color;
	        ctx.fill();
	    }
	
	
	    drag(e) {
	        if (this.draggable) {
	          if (this.inBounds(e.pageX, e.pageY)){
	            if (this.orientation === "horizontal") {
	              this.pos[0] = e.pageX - 8 - this.len / 2;
	            } else {
	                this.pos[1] = e.pageY - 8 - this.height / 2;
	            }
	          }
	        }
	    }
	
	    inBounds(x, y){
	      return (
	        x - this.len/2>= 0 &&
	        x + this.len/2 <= 608 &&
	        y - this.height/2 >= 0 &&
	        y + this.height/2 <= 608
	      );
	    }
	
	    mousedown() {
	        this.draggable = true;
	    }
	
	    mouseup() {
	        this.draggable = false;
	    }
	}
	
	module.exports = Car;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map