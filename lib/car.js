class Car {
    constructor(options) {
        this.pos = options.pos;
        this.len = options.len;
        this.height = options.height;
        this.color = options.color;
        this.game = options.game;
        this.orientation = options.orientation;
        this.draggable = false;
        this.oppPos = [this.pos[0] + this.len, this.pos[1] + this.height];
    }

    colliding() {
      const insideCoords = (myX, myY, x1, y1, x2, y2) => {
        return(
          (myX > x1 && myX < x2) && (myY > y1 && myY < y2)
        );
      };
      let collide = false;
        this.game.cars.map((car) => {
            if (
                insideCoords(this.pos[0], this.pos[1], car.pos[0], car.pos[1], car.oppPos[0], car.oppPos[1]) ||
                insideCoords(this.oppPos[0], this.oppPos[1], car.pos[0], car.pos[1], car.oppPos[0], car.oppPos[1]) ||
                insideCoords(this.pos[0], this.oppPos[1], car.pos[0], car.pos[1], car.oppPos[0], car.oppPos[1]) ||
                insideCoords(this.oppPos[0], this.pos[1], car.pos[0], car.pos[1], car.oppPos[0], car.oppPos[1])
            ) {
                collide = true;
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
          console.log(this.colliding());
            if (this.inBounds(e.pageX, e.pageY) && !this.colliding()) {
                if (this.orientation === "horizontal") {
                    this.pos[0] = e.pageX - 8 - this.len / 2;
                    this.oppPos[0] = this.pos[0] + this.len;
                } else {
                    this.pos[1] = e.pageY - 8 - this.height / 2;
                    this.oppPos[1] = this.pos[1] + this.height;
                }
            }
        }
    }

    inBounds(x, y) {
        return (
            x - this.len / 2 >= 0 &&
            x + this.len / 2 <= 608 &&
            y - this.height / 2 >= 0 &&
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
