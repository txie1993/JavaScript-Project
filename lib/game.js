const Car = require("./car");

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.addEventListener("mousedown", (e) => this.checkDown(e));
        document.addEventListener("mousemove", (e) => this.checkMove(e));
        document.addEventListener("mouseup", (e) => this.checkUp(e));
        this.level = 0;
        this.endGame = 2;
        this.winButtons = document.getElementById("win");
        this.completeScreen = document.getElementById("complete");
        const resetButton = document.getElementById("reset");
        const resetButton2 = document.getElementById("resetlevel");
        const nextLevel = document.getElementById("nextlevel");
        const restartButton = document.getElementById("restart");
        resetButton.addEventListener("mousedown", () => this.resetBoard(this.level));
        resetButton2.addEventListener("mousedown", () => this.resetBoard(this.level));
        nextLevel.addEventListener("mousedown", () => this.setCars(++this.level));
        restartButton.addEventListener("mousedown", () => {
            this.level = 0;
            this.resetBoard(this.level);
            this.completeScreen.className = "hidden";
        });
        this.won = false;

        this.cars = [];
        this.currentCar = null;

        this.setCars(this.level);


    }

    setCars(level) {
        this.won = false;
        this.winButtons.className = "hidden";
        if (this.level < this.endGame) {
            let newCars;
            const yellowCar = document.getElementById("yellowCar");
            const redCar = document.getElementById("redCar");
            const purpleCar = document.getElementById("purpleCar");
            const orangeCar = document.getElementById("orangeCar");
            const blueCar = document.getElementById("blueCar");
            const greenCar = document.getElementById("greenCar");
            if (level === 0) newCars = [new Car({
                id: 1,
                pos: [5, 305],
                len: 180,
                height: 90,
                game: this,
                horizontal: true,
                img: redCar
            })];
            else if (level === 1) newCars = [new Car({
                    id: 1,
                    pos: [5, 305],
                    len: 180,
                    height: 90,
                    game: this,
                    horizontal: true,
                    img: redCar
                }),
                new Car({
                    id: 2,
                    pos: [505, 305],
                    len: 90,
                    height: 180,
                    game: this,
                    horizontal: false,
                    img: greenCar
                }),
            ];

            this.cars = newCars;

            this.mainCar = this.cars[0];
        }
    }

    resetBoard(level) {
        this.cars = [];
        this.setCars(this.level);

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
        if (this.mainCar && this.mainCar.pos[0] > 400) {
            this.mainCar = null;
            this.cars = [];
            this.won = true;
            return true;
        }
        return false;
    }


    draw(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
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
        if (this.level === this.endGame) {
            this.completeScreen.className = "completescreen";
        } else if (this.won) {
            this.winButtons.className = "winscreen";
        } else {


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
