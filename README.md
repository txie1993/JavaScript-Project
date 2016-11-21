# JS Rush Hour

[Live](https://txie1993.github.io/Rush-Hour)

![rushhour](https://github.com/txie1993/Rush-Hour/blob/master/docs/Screen%20Shot%202016-11-17%20at%2011.03.30%20PM.png?raw=true)

## Background

Rush Hour is a classic game in which the player must move around cars in a parking lot in order for one car to make it to the exit.

* The level ends when the player moves the red car out of bounds.
* Cars can only move back and forth if they are horizontal, or up and down if they are vertical.
* Cars cannot be turned or removed.

## Technologies and Languages Used

* JavaScript (ES6)
* HTML5 canvas
* CSS3


## Implementation Details

The biggest challenge to building this project was creating a workaround for collision with the drag-and-drop interface. In most 2D games, movement is controlled by pressing buttons on a keyboard or controller, but some problems arise with another input method. Namely, the ability to clip through obstacles was a large hurdle to overcome: if the cars in Rush Hour were controlled by the arrow keys, I could simply disable a direction if a car was pressed against another. However, because the car was always supposed to be at the cursor's position, the player could simply warp the car to the other side of an obstacle by moving the mouse over (provided there was enough room for the car on the other side for it to not overlap with an obstacle)! Disabling mouse controls entirely while a car was in a collided state with another car wasn't a feasible option, as there was no simple way of knowing when to re-enable a car for movement.

The answer is simple, right? Just disable movement to one direction when you hit a car in that direction! Like this!

```javascript
let left = e.pageX - this.len / 2 - this.offsetLeft;

    if (!coll)(this.pos[0] = left);


    else {
        if (coll.pos[0] === this.oppPos[0]) { // if we are hitting them from the left
            // console.log("left side collision");
            if (this.pos[0] >= left) this.pos[0] = left; // we can move left
        } else if (coll.oppPos[0] === this.pos[0]) { // if we are hitting them from the right
            // console.log("right side collision");
            if (this.pos[0] < left) this.pos[0] = left; // we can move right
        }
    }
```

And now, we run into another problem: The browser simply doesn't poll the mouse frequently enough for this to work. The way hitboxes are set up, collisions are detected by the outline of a car's rectangle, and if two cars overlap, neither of them can move. In an ideal world, we would poll our mouse something along the lines of 1000 times a second like in a competitive FPS, but instead, we can only poll our mouse 60 times a second max with Canvas. As a result, dragging a car into another car will, 99 times out of 100, result in a game-breaking hitbox overlap.

But why not just warp the car back into place if it overlaps? I tried that by moving the car back to the side of the obstacle it supposedly hit, as determined by our car's position relative to the obstacle's midpoint. This could be exploited by dragging the mouse fast enough that the game would warp the car to the other side of the obstacle!

In the end, I made a compromise: I traded a lot of UI smoothness for bug-free navigation. Now, when the mouse is held, the selected car will "follow" the cursor, moving in a similar way to an arrow key-controlled object. This way, cars will never overlap, but the car often times will not move as fast as the mouse, which can be frustrating to the user. 10 px/frame was the best compromise I could make on the car's movement speed being relatively smooth.

Unfortunately, increasing the framerate of the game to increase smoothness was not an option, as some browsers cannot even support 25 FPS on a Canvas game, and increasing minimum hardware requirements for a game is never a good idea when I don't know who the end user will be.

```javascript
this.pos[0] > left ? this.pos[0] -= 10 : this.pos[0] += 10
```

**UPDATE** 11/20/2016

I thought of an idea that stemmed off of a previous version of the game: the one with the game logic that allowed the user to move the mouse to the other side of an obstacle to warp through it...

All I needed to do was make sure that the mouse was within a certain distance of the vehicle, so I created a limitation that makes sure the mouse is within 170px of the car before moving. I chose 170px because each car is at least 180px tall or wide. This way, the cars cannot phase through one another AND I get direct mouse input control.

Here is the final method for dragging the car:

```javascript

drag(e) {
    if (this.draggable) {
        let left = e.pageX - this.len / 2 - this.offsetLeft;
        let right = e.pageX + this.len / 2 - this.offsetLeft;
        let top = e.pageY - this.height / 2 - this.offsetTop;
        let bot = e.pageY + this.height / 2 - this.offsetTop;

        let coll = this.colliding(top, bot, left, right);

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
```

## Future Features

- [ ] High score for fewest moves
- [ ] High score for fastest time
- [ ] Custom Levels
- [ ] Difficulty Selector
- [ ] Higher Quality Art
- [ ] Sounds
