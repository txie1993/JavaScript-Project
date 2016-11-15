class Car {
    constructor(options) {
        this.pos = options.pos;
        this.len = options.len;
        this.height = options.height;
        this.color = options.color;
        this.game = options.game;
        this.orientation = options.orientation;
        this.draggable = false;
    }

    collideWith(otherObject) {

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
          if (this.inBounds(e.pageX, e.pageY)){
            if (this.orientation === "horizontal") {
              this.pos[0] = e.pageX - 8 - this.len / 2;
            } else {
                this.pos[1] = e.pageY - 8 - this.height / 2;
            }
          }
        }
    }

    inBounds(x, y){
      return (
        x - this.len/2>= 0 &&
        x + this.len/2 <= 608 &&
        y - this.height/2 >= 0 &&
        y + this.height/2 <= 608
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
