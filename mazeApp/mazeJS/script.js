//! Challenges
//? How do we generate a maze?
//* Many algo's to generate maze. learn about tree data structures + recursion
//? How are we going to draw this thing on the screen?
//* Use MatterJS to draw Maze onto canvas
//? How do we make some keyboard keys control the ball?
//* MatterJS has ability to map key presses to movements
//? How do we detect when the ball touches the finish line (green square)
//* MatterJS has ability to detect collision between Elements and report as events

//==================================

//! MatterJS
//? World
//* Object that contains all different 'things' in our matter app
//? Engine
//* Reads in current state of world from world object, then calcs changes in positions of all shapes
//? Runner
//* Gets engine and world to work together, runs about 60x per second
//? Render
//* When Engine processes update, Render will post shapes to screen
//? Body
//* Shape that we are displaying. May be Circle, rectangel, oval, ect...

//==================================

const width = 800;
const height = 600;

const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse
} = Matter;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
  })
);

// Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true })
];

World.add(world, walls);

// const randomWidth = Math.random() * width;
// const randomHeight = Math.random() * height;

// Random Shapes
for (let i = 0; i < 50; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50, {
        isStatic: false
      })
    );
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 35, {
        render: {
          // fillStyle: "blueviolet"
        }
      })
    );
  }
}
