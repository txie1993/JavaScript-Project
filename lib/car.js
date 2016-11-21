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
            ctx.drawImage(this.img, (-this.pos[1]) + 210, this.pos[0] - 300, this.height, this.len);
            ctx.rotate(Math.PI / 2);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
        } else ctx.drawImage(this.img, this.pos[0], this.pos[1], this.len, this.height);
    }

    drag(e) {
        if (this.draggable) {
            let left = e.pageX - this.len / 2 - this.offsetLeft;
            let right = e.pageX + this.len / 2 - this.offsetLeft;
            let top = e.pageY - this.height / 2 - this.offsetTop;
            let bot = e.pageY + this.height / 2 - this.offsetTop;

            let coll;
            if (this.horizontal) coll = this.colliding(this.pos[1], this.oppPos[1], left, right);
            else coll = this.colliding(top, bot, this.pos[0], this.oppPos[0]);
            if (this.inBounds(e.pageX, e.pageY) && (this.mouseNearCar(e.pageX, e.pageY)) && !coll) {
                if (this.horizontal) {
                    this.pos[0] = left;
                    this.oppPos[0] = this.pos[0] + this.len;
                } else {
                    this.pos[1] = top;
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
    mouseNearCar(x, y) {
        return (
            this.pos[0] + this.offsetLeft - 170 < x &&
            this.oppPos[0] + this.offsetLeft + 170 > x &&
            this.pos[1] + this.offsetTop - 170 < y &&
            this.oppPos[1] + this.offsetTop + 170 > y
        );
    }

    mousedown() {
        document.body.style.cursor = "default";
        this.draggable = true;
    }

    mouseup() {
        this.draggable = false;
    }
}

module.exports = Car;
