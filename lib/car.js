class Car {
    constructor(options) {
        this.pos = options.pos;
        this.len = options.len;
        this.height = options.height;
        this.color = options.color;
        this.game = options.game;
        this.draggable = false;
    }

    collideWith(otherObject) {

    }

    draw(ctx) {
        ctx.beginPath();
        // ctx.rect(0, 0, 100, 100);
        ctx.rect(this.pos[0], this.pos[1], this.len, 100);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    isCollidedWith(otherObject) {}

    drag(e) {
        if (this.draggable) {
            this.pos[0] = e.pageX - this.canvas.offsetLeft;
            this.pos[1] = e.pageY - this.canvas.offsetTop;
        }
    }

    mousedown() {
        this.draggable = true;
        console.log("swag");
    }
    mouseup() {
        this.draggable = false;
    }
}

module.exports = Car;
