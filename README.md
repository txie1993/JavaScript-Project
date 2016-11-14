## JS Rush Hour

### Background

Rush Hour is a classic game in which the player must move around cars in a parking lot in order for one car to make it to the exit. Cars can only move back and forth in straight lines, creating quite a bit of complexity.

1) The game ends when the player moves the red car out of bounds.
2) Cars can only move back and forth if they are horizontal, or up and down if they are vertical.
3) Cars cannot be turned or removed.

### Functionality & MVP  

With this Rush Hour implementation, users will be able to:

- [ ] Drag to move cars along their axes
- [ ] Reset the board
- [ ] Choose from preset demo initial states

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with game board, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include click to drag and a reset button. Given the fact that the controls are relatively simple, almost the entire page will be dedicated to the game, and social media links may be put into the modal.

![wireframes](https://github.com/txie1993/JavaScript-Project/blob/master/wireframe.png?raw=true)

### Architecture and Technologies

**NB**: one of the main things you should be researching and deciding upon while you write this proposal is what technologies you plan to use.  Identify and create a plan of attack for the major technical challenges in your project.  It's okay if you don't have all the details of implementation fleshed out, but you should have a solid roadmap by Monday morning.

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be two scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`car.js`: this lightweight script will house the constructor and update functions for the `Car` objects.  Each `Car` will have a size and direction and a "main" boolean to determine if that car will determine the gamestate.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of the scripts outlined above.  Goals for the day:

- Get a green bundle with `webpack`
- Create draggable cars with JQuery

**Day 2**: Get the basic game structure working. I should have a board (formatting is a maybe at this point).

- Display a board that knows when the target car has left the parking lot. The game should know when it is over.

**Day 3**: Create the modal

- Get a fully formatted info modal working.
- Work on formatting the game.


**Day 4**: Polish

- Be fully styled
- Possibly add finishing touches such as sounds to the game
- Create several solvable starting states


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Multiple game board sizes
- [ ] High score/low time keeper in browser cookies
- [ ] New car shapes 
