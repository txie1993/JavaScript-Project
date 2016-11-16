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

    colliding(top, bot, left, right) {
      // console.log([left, top, right, bot]);
        const insideCoords = (myX, myY, topLeft, bottomRight) => {
            return (
                (myX >= topLeft[0] && myX <= bottomRight[0]) && (myY >= topLeft[1] && myY <= bottomRight[1])
            );
        };
        let collide = false;
        this.game.cars.map((car) => {
            if (this.id != car.id) {
                if (
                    insideCoords(left, top, car.pos, car.oppPos) ||
                    insideCoords(left, bot, car.pos, car.oppPos) ||
                    insideCoords(right, top, car.pos, car.oppPos) ||
                    insideCoords(right, bot, car.pos, car.oppPos)
                ) {
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
          let coll = this.colliding(top, bot, left, right);
            if (this.inBounds(e.pageX, e.pageY) && !coll) {
                if (this.orientation === "horizontal") {
                        this.pos[0] = left;
                        this.oppPos[0] = this.pos[0] + this.len;

                } else {
                    this.pos[1] = top;
                    this.oppPos[1] = this.pos[1] + this.height;
                }
            }
            else{
              console.log(coll.oppPos);
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
