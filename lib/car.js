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
        ctx.rect(this.pos[0], this.pos[1], this.len, 100);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    isCollidedWith(otherObject) {}

    drag(e) {
        if (this.draggable) {
            if (this.orientation === "horizontal") this.pos[0] = e.pageX - 8 - this.len/2;
            else this.pos[1] = e.pageY - 8;
        }
    }

    mousedown() {
        this.draggable = true;
    }
    mouseup() {
        this.draggable = false;
    }
}

module.exports = Car;
