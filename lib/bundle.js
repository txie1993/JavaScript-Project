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
	        const resetButton = document.getElementById("reset");
	        resetButton.addEventListener("mousedown", () => this.resetBoard());
	        this.won = false;
	        this.canvas = canvas;
	        this.cars = [];
	        this.currentCar = null;
	        this.canvas.addEventListener("mousedown", (e) => this.checkDown(e));
	        this.canvas.addEventListener("mousemove", (e) => this.checkMove(e));
	        this.canvas.addEventListener("mouseup", (e) => this.checkUp(e));
	
	        this.setCars();
	
	        this.level = 0;
	
	    }
	
	    setCars(level) {
	      this.won = false;
	      const newCars = null;
	      const yellowCar = document.getElementById("yellowCar");
	      const redCar = document.getElementById("redCar");
	      const purpleCar = document.getElementById("purpleCar");
	      const orangeCar = document.getElementById("orangeCar");
	      const blueCar = document.getElementById("blueCar");
	      const greenCar = document.getElementById("greenCar");
	      if (level===0) newCars = [new Car({
	          id: 1,
	          pos: [5, 305],
	          len: 180,
	          height: 90,
	          game: this,
	          horizontal: true,
	          img: redCar
	      })];
	
	      this.cars = newCars;
	
	      this.mainCar = this.cars[0];
	    }
	
	    resetBoard(){
	      console.log("hi");
	      this.cars = [];
	      this.setCars();
	
	    }
	
	    checkDown(e) {
	
	        let clickX = e.pageX - this.canvas.offsetLeft;
	        let clickY = e.pageY - this.canvas.offsetTop;
	
	        this.cars.forEach((car) => {
	            if ((clickX >= car.pos[0] + 8 &&
	                    clickX <= car.pos[0] + car.len + 8) &&
	                (clickY >= car.pos[1] + 8 &&
	                    clickY <= car.pos[1] + car.height + 8)) {
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
	
	    checkWin() {
	        if (this.mainCar && this.mainCar.pos[0] > 400){
	          this.mainCar = null;
	          this.cars = [];
	          this.won = true;
	          return true;
	        }
	        return false;
	    }
	
	
	    draw(ctx) {
	        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	        if (this.won) {
	            ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	            ctx.fillStyle = Game.BG_COLOR;
	            ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	        } else {
	            let idx = 0;
	
	            for (let i = 0; i < 6; i++) {
	                for (let j = 0; j < 6; j++) {
	                    idx % 2 === 0 ? ctx.fillStyle = "#adadad" : ctx.fillStyle = "#cecece";
	                    if (i === 5 && j === 3) ctx.fillStyle = "#ff0000";
	                    ctx.fillRect(100 * i, 100 * j, 100, 100);
	                    idx++;
	                }
	                idx++;
	            }
	
	
	            //draw arrow
	            ctx.lineWidth = 5;
	            ctx.strokeStyle = '#fff600';
	            ctx.beginPath();
	            ctx.moveTo(550, 330);
	            ctx.lineTo(570, 350);
	            ctx.lineTo(520, 350);
	            ctx.lineTo(565, 350);
	            ctx.moveTo(573, 350);
	            ctx.lineTo(550, 370);
	            ctx.stroke();
	
	
	            this.cars.forEach((car) => {
	                car.draw(ctx);
	            });
	            this.checkWin();
	        }
	    }
	
	}
	
	Game.DIM_X = 600;
	Game.DIM_Y = 600;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Car {
	    constructor(options) {
	        this.id = options.id;
	        this.img = options.img;
	        this.pos = options.pos;
	        this.len = options.len;
	        this.height = options.height;
	        this.game = options.game;
	        this.horizontal = options.horizontal;
	        this.draggable = false;
	        this.oppPos = [this.pos[0] + this.len, this.pos[1] + this.height];
	
	        this.offsetTop = this.game.canvas.offsetTop;
	        this.offsetLeft = this.game.canvas.offsetLeft;
	
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
	                    collide = car;
	                    return car;
	                }
	            }
	        });
	        return collide;
	    }
	
	    draw(ctx) {
	        if (this.horizontal) {
	            const canvas = this.game.canvas;
	            ctx.translate(canvas.width / 2, canvas.height / 2);
	            ctx.rotate(-Math.PI / 2);
	            // draw the signature
	            // since images draw from top-left offset the draw by 1/2 width & height
	            ctx.drawImage(this.img, (-this.pos[1])+210, this.pos[0]-300, this.height, this.len);
	            // un-rotate the canvas by -90% (== -Math.PI/2)
	            ctx.rotate(Math.PI / 2);
	            // un-translate the canvas back to origin==top-left canvas
	            ctx.translate(-canvas.width / 2, -canvas.height / 2);
	        } else ctx.drawImage(this.img, this.pos[0], this.pos[1], this.len, this.height);
	    }
	
	    drag(e) {
	        if (this.draggable) {
	            let coll = this.colliding(this.pos[1], this.oppPos[1], this.pos[0], this.oppPos[0]);
	
	            if (this.inBounds(e.pageX, e.pageY)) {
	                if (this.horizontal) {
	                    let left = e.pageX - this.len / 2 - this.offsetLeft;
	
	                    if (!coll)(this.pos[0] > left ? this.pos[0] -= 5 : this.pos[0] += 5);
	
	
	                    else {
	                        if (coll.pos[0] === this.oppPos[0]) { // if we are hitting them from the left
	                            console.log("left side collision");
	                            if (this.pos[0] >= left) this.pos[0] -= 5; // we can move left
	                        } else if (coll.oppPos[0] === this.pos[0]) { // if we are hitting them from the right
	                            console.log("right side collision");
	                            if (this.pos[0] < left) this.pos[0] += 5; // we can move right
	                        }
	                    }
	
	                    this.oppPos[0] = this.pos[0] + this.len;
	                } else {
	                    let top = e.pageY - this.height / 2 - this.offsetTop;
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
	
	    inBounds(x, y, lowX = this.offsetLeft, highX = 600 + this.offsetLeft, lowY = this.offsetTop, highY = 600 + this.offsetTop) {
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