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

const width = 600;
const height = 600;
const cells = 3;

const { Engine, Render, Runner, World, Bodies } = Matter;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width,
    height
  }
});

// Maze Generation

const shuffle = arr => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

// console.log(shuffle());

const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
  // If i have visited the cell at [row, column], then return
  if (grid[row][column]) {
    // console.log(grid[row][column]);
    return;
  }

  // Mark this sell as veing visited
  grid[row][column] = true;

  // Assemble rendomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "right"],
    [row + 1, column, "down"],
    [row, column - 1, "left"]
  ]);

  // for each neightbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;
    // - see if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue;
    }

    // - check if we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // Remove wall from horizontal or vertical (depending on direction)
  }

  // Visit that next cell
};

stepThroughCell(startRow, startColumn);

console.log(startRow, startColumn);
console.log(grid);

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];

World.add(world, walls);

// const randomWidth = Math.random() * width;
// const randomHeight = Math.random() * height;

//!=============================================
//!=============================================
//! DEMO

// const width = 800;
// const height = 600;

// const {
//   Engine,
//   Render,
//   Runner,
//   World,
//   Bodies,
//   MouseConstraint,
//   Mouse
// } = Matter;

// const engine = Engine.create();
// const { world } = engine;
// const render = Render.create({
//   element: document.body,
//   engine: engine,
//   options: {
//     wireframes: false,
//     width,
//     height
//   }
// });

// Render.run(render);
// Runner.run(Runner.create(), engine);

// World.add(
//   world,
//   MouseConstraint.create(engine, {
//     mouse: Mouse.create(render.canvas)
//   })
// );

// // Walls
// const walls = [
//   Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
//   Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
//   Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
//   Bodies.rectangle(800, 300, 40, 600, { isStatic: true })
// ];

// World.add(world, walls);

// // const randomWidth = Math.random() * width;
// // const randomHeight = Math.random() * height;

// // Random Shapes
// for (let i = 0; i < 50; i++) {
//   if (Math.random() > 0.5) {
//     World.add(
//       world,
//       Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50, {
//         isStatic: true,
//         render: {
//           // fillStyle: "red"
//         }
//       })
//     );
//   } else {
//     World.add(
//       world,
//       Bodies.circle(Math.random() * width, Math.random() * height, 35, {
//         isStatic: false,
//         render: {
//           // fillStyle: "blueviolet"
//         }
//       })
//     );
//   }
// }
