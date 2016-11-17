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
