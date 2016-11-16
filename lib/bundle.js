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
	const GameView = __webpack_require__(3);
	
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

	const Car = __webpack_require__(2);
	
	class Game {
	    constructor(canvas) {
	        this.canvas = canvas;
	        this.cars = [];
	        this.currentCar = null;
	        this.canvas.addEventListener("mousedown", (e) => this.checkDown(e));
	        this.canvas.addEventListener("mousemove", (e) => this.checkMove(e));
	        this.canvas.addEventListener("mouseup", (e) => this.checkUp(e));
	        this.cars.push(new Car({
	            id: 1,
	            pos: [0, 300],
	            len: 180,
	            height: 90,
	            color: "#acbbca",
	            game: this,
	            orientation: "horizontal"
	        }));
	        this.cars.push(new Car({
	            id: 2,
	            pos: [300, 0],
	            len: 90,
	            height: 180,
	            color: "#8723ef",
	            game: this,
	            orientation: "vertical"
	        }));
	        this.cars.push(new Car({
	            id: 3,
	            pos: [500, 100],
	            len: 90,
	            height: 180,
	            color: "#93acef",
	            game: this,
	            orientation: "vertical"
	        }));
	
	        this.mainCar = this.cars[0];
	
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
	
	    won() {
	      return (this.mainCar.pos[0] > 400);
	    }
	
	
	    draw(ctx) {
	        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	        ctx.fillStyle = Game.BG_COLOR;
	        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	        this.cars.forEach((object) => {
	            object.draw(ctx);
	        });
	
	        if (this.won()) console.log("winrar");
	    }
	
	}
	
	Game.BG_COLOR = "#123456";
	Game.DIM_X = 600;
	Game.DIM_Y = 600;
	Game.FPS = 60;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Car {
	    constructor(options) {
	        this.id = options.id;
	        this.pos = options.pos;
	        this.len = options.len;
	        this.height = options.height;
	        this.color = options.color;
	        this.game = options.game;
	        this.orientation = options.orientation;
	        this.draggable = false;
	        this.oppPos = [this.pos[0] + this.len, this.pos[1] + this.height];
	
	        // this.prev = 0;
	    }
	
	    colliding(top, bot, left, right) {
	        const insideCoords = (topLeft, bottomRight) => {
	            return (
	                (left <= bottomRight[0] && //is the left of my car more left than the right of the other car
	                    right >= topLeft[0] && //is the right of my car more right than the left of the other car
	                    top <= bottomRight[1] && // is the top of my car higher than the bottom of the other car
	                    bot >= topLeft[1]) //is the bottom of my car lower than the top of the other car
	            );
	        };
	
	        let collide = false;
	        this.game.cars.forEach((car) => {
	            if (this.id != car.id && !collide) {
	                if (insideCoords(car.pos, car.oppPos)) {
	                    // console.log("colliding");
	                    collide = car;
	                    return car;
	                }
	            }
	        });
	        return collide;
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
	            let coll = this.colliding(this.pos[1], this.oppPos[1], this.pos[0], this.oppPos[0]);
	
	            if (this.inBounds(e.pageX, e.pageY)) {
	                if (this.orientation === "horizontal") {
	                    let left = e.pageX - this.len / 2;
	
	                    if (!coll) {
	                        console.log(left);
	                        this.pos[0] = left;
	                    } else {
	                        let collMid = (coll.pos[0] + coll.oppPos[0] / 2);
	                        if (this.oppPos[0] < collMid) this.pos[0] -= 10;
	                        else this.pos[0] += 10;
	                        if (coll.pos[0] === this.oppPos[0]) { // if we are hitting them from the left
	                            console.log("left side collision");
	                            if (this.pos[0] >= left) this.pos[0] = left; // we can move left
	                        } else if (coll.oppPos[0] === this.pos[0]) { // if we are hitting them from the right
	                            console.log("right side collision");
	                            if (this.pos[0] < left) this.pos[0] = left; // we can move right
	                        } else {
	                            console.log("collided");
	
	                        }
	                    }
	
	                    this.oppPos[0] = this.pos[0] + this.len;
	                } else {
	                    let top = e.pageY - this.height / 2 - 8;
	                    if (!coll)(this.pos[1] > top ? this.pos[1] -= 5 : this.pos[1] += 5);
	
	
	                    else {
	                        if (coll.pos[1] === this.oppPos[1]) { // if we are hitting them from the top
	                            console.log("top side collision");
	                            if (this.pos[1] > top) this.pos[1] -= 5; // we can move top
	                        } else if (coll.oppPos[1] === this.pos[1]) { // if we are hitting them from the bottom
	                            console.log("bottom side collision");
	                            if (this.pos[1] < top) this.pos[1] += 5; // we can move down
	                        }
	                    }
	                    this.oppPos[1] = this.pos[1] + this.height;
	                }
	            }
	        }
	    }
	
	    inBounds(x, y, lowX = 8, highX = 608, lowY = 8, highY = 608) {
	        return (
	            x - this.len / 2 >= lowX &&
	            x + this.len / 2 <= highX &&
	            y - this.height / 2 >= lowY &&
	            y + this.height / 2 <= highY
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


/***/ },
/* 3 */
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
	    const timeDelta = (time - this.lastTime);
	    this.lastTime = time;
	    this.game.draw(this.ctx);
	
	    //every call to animate requests causes another call to animate
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map