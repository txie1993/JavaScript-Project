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
            pos: [0, 0],
            len: 200,
            height: 100,
            color: "#acbbca",
            game: this,
            orientation: "horizontal"
        }));

    }

    checkDown(e) {
        this.cars.forEach((car) => {
            if ((e.pageX >= car.pos[0] + 10 &&
                    e.pageX <= car.pos[0] + car.len + 10) &&
                (e.pageY >= car.pos[1] + 10 &&
                    e.pageY <= car.pos[1] + car.height + 10)) {
                console.log(this.canvas.offsetLeft);
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
