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

const width = window.innerWidth;
const height = window.innerHeight;
const cellsHorizontal = 8;
const cellsVertical = 10;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height
    // fill: #484
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

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

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
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
    ) {
      continue;
    }

    // - check if we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // Remove wall from horizontal or vertical (depending on direction)

    switch (direction) {
      case "left":
        verticals[row][column - 1] = true;
        break;
      case "right":
        verticals[row][column] = true;
        break;
      case "up":
        horizontals[row - 1][column] = true;
        break;
      case "down":
        horizontals[row][column] = true;
        break;
    }
    // Visit that next cell
    stepThroughCell(nextRow, nextColumn);
  }
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      10,
      {
        label: "wall",
        isStatic: true,
        render: {
          // fillStyle: "red"
        }
      }
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      10,
      unitLengthY,
      {
        isStatic: true,
        label: "wall",
        render: {
          // fillStyle: "red"
        }
      }
    );
    World.add(world, wall);
  });
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];

World.add(world, walls);

// Goal
const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  {
    isStatic: true,
    label: "goal",
    render: {
      fillStyle: "blueviolet"
    }
  }
);

World.add(world, goal);

// Ball
const ballRadius = Math.min(unitLengthX, unitLengthY);
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius * 0.3, {
  isStatic: false,
  label: "ball"
});
World.add(world, ball);

document.addEventListener("keydown", e => {
  const { x, y } = ball.velocity;
  switch (e.key) {
    case "ArrowUp":
      Body.setVelocity(ball, { x, y: y - 5 });
      break;
    case "ArrowDown":
      Body.setVelocity(ball, { x, y: y + 5 });
      break;
    case "ArrowRight":
      Body.setVelocity(ball, { x: x + 5, y });
      break;
    case "ArrowLeft":
      Body.setVelocity(ball, { x: x - 5, y });
      break;
  }
});

// Win Condition
Events.on(engine, "collisionStart", event => {
  event.pairs.forEach(collision => {
    const labels = ["ball", "goal"];
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      document.querySelector(".winner").classList.remove("hidden");
      world.gravity.y = 1;
      world.bodies.forEach(body => {
        if (body.label === "wall") {
          Body.setStatic(body, false);
        }
      });
    }
  });
});

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
