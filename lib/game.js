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
            len: 200,
            height: 100,
            color: "#acbbca",
            game: this,
            orientation: "horizontal"
        }));
        this.cars.push(new Car({
            id: 2,
            pos: [300, 0],
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


    draw(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.BG_COLOR;
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

        this.cars.forEach((object) => {
            object.draw(ctx);
        });
    }

}

Game.BG_COLOR = "#123456";
Game.DIM_X = 600;
Game.DIM_Y = 600;
Game.FPS = 30;

module.exports = Game;
