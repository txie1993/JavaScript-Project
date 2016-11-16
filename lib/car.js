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
    }

    colliding(top, bot, left, right, eX, eY) {
        const insideCoords = (topLeft, bottomRight) => {
            return (
                  (left < bottomRight[0] && //is the left of my car more left than the right of the other car
                    right > topLeft[0] && //is the right of my car more right than the left of the other car
                    top < bottomRight[1] && // is the top of my car higher than the bottom of the other car
                    bot > topLeft[1]) //is the bottom of my car further than the top of the other car
            );
        };

        let collide = false;
        this.game.cars.map((car) => {
            if (this.id != car.id) {
                if (insideCoords(car.pos, car.oppPos)) {
                    console.log("colliding");
                    collide = car;
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
            let left = e.pageX - this.len / 2 - 8;
            let right = e.pageX + this.len / 2 - 8;
            let top = e.pageY - this.height / 2 - 8;
            let bot = e.pageY + this.height / 2 - 8;

            let coll = this.colliding(top, bot, left, right, e.pageX, e.pageY);

            if (this.inBounds(e.pageX, e.pageY) && !coll) {
                if (this.orientation === "horizontal") {
                    this.pos[0] = left;
                    this.oppPos[0] = this.pos[0] + this.len;
                } else {
                    this.pos[1] = top;
                    this.oppPos[1] = this.pos[1] + this.height;
                }
            }
        }
    }

    inBounds(x, y) {
        return (
            x - this.len / 2 >= 8 &&
            x + this.len / 2 <= 608 &&
            y - this.height / 2 >= 8 &&
            y + this.height / 2 <= 608
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
