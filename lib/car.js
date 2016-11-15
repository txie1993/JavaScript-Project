class Car {
    constructor(options) {
        this.pos = options.pos;
        this.len = options.len;
        this.color = options.color;
        this.game = options.game;
    }

    collideWith(otherObject) {

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
