const Car = require("./car");

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
      console.log(this.canvas.offsetLeft);

      let clickX = e.pageX - this.canvas.offsetLeft;
      let clickY = e.pageY - this.canvas.offsetTop;

      // console.log(clickX, clickY);
        this.cars.forEach((car) => {
            if ((clickX >= car.pos[0] + 8 &&
                    clickX <= car.pos[0] + car.len + 8) &&
                (clickY >= car.pos[1] + 8 &&
                    clickY <= car.pos[1] + car.height + 8)) {
                this.currentCar = car;
                // console.log(car);
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
