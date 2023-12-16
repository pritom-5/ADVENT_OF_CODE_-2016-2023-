/**
 * part 1 and 2 both correct
 */
import fs from "fs";

// const input = fs.readFileSync("../../data/16/ex.txt", "ascii").trim();
const input = fs.readFileSync("../../data/16/data.txt", "ascii").trim();

const input_grid = input.split("\n").map((item) => item.split(""));

/**@typedef {"up"|"down"|"left"|"right"} DirT*/
/** @type {{DirT: [number, number]}} */
const DIR = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

/**
 *
 * @param {string[][]} grid
 * @param {number} x row number index
 * @param {number} y column number index
 * @param {DirT} dir
 * @param {Set<string>} path path in this shape `x y dir`
 * @param {Set<string>} visited in this shape `x y`
 * @returns {undefined}
 */
function walk(grid, x, y, dir, path, visited) {
  if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) {
    return;
  }

  const curr = grid[x][y];

  if (["\\", "/", "-", "|"].includes(curr) && path.has(`${x} ${y} ${dir}`)) {
    return;
  }

  path.add(`${x} ${y} ${dir}`);
  visited.add(`${x} ${y}`);

  switch (curr) {
    case ".": {
      walk(grid, x + DIR[dir][0], y + DIR[dir][1], dir, path, visited);
      break;
    }
    case "|": {
      if (dir === "left" || dir === "right") {
        walk(grid, x + DIR["up"][0], y + DIR["up"][1], "up", path, visited);
        walk(
          grid,
          x + DIR["down"][0],
          y + DIR["down"][1],
          "down",
          path,
          visited
        );
      } else if (dir === "up" || dir === "down") {
        walk(grid, x + DIR[dir][0], y + DIR[dir][1], dir, path, visited);
      }
      break;
    }
    case "-": {
      if (dir === "left" || dir === "right") {
        walk(grid, x + DIR[dir][0], y + DIR[dir][1], dir, path, visited);
      } else if (dir === "up" || dir === "down") {
        walk(
          grid,
          x + DIR["left"][0],
          y + DIR["left"][1],
          "left",
          path,
          visited
        );
        walk(
          grid,
          x + DIR["right"][0],
          y + DIR["right"][1],
          "right",
          path,
          visited
        );
      }
      break;
    }

    case "/": {
      if (dir === "up") {
        walk(
          grid,
          x + DIR["right"][0],
          y + DIR["right"][1],
          "right",
          path,
          visited
        );
      } else if (dir === "down") {
        walk(
          grid,
          x + DIR["left"][0],
          y + DIR["left"][1],
          "left",
          path,
          visited
        );
      } else if (dir === "left") {
        walk(
          grid,
          x + DIR["down"][0],
          y + DIR["down"][1],
          "down",
          path,
          visited
        );
      } else if (dir === "right") {
        walk(grid, x + DIR["up"][0], y + DIR["up"][1], "up", path, visited);
      }

      break;
    }

    case "\\": {
      if (dir === "up") {
        walk(
          grid,
          x + DIR["left"][0],
          y + DIR["left"][1],
          "left",
          path,
          visited
        );
      } else if (dir === "down") {
        walk(
          grid,
          x + DIR["right"][0],
          y + DIR["right"][1],
          "right",
          path,
          visited
        );
      } else if (dir === "left") {
        walk(grid, x + DIR["up"][0], y + DIR["up"][1], "up", path, visited);
      } else if (dir === "right") {
        walk(
          grid,
          x + DIR["down"][0],
          y + DIR["down"][1],
          "down",
          path,
          visited
        );
      }
      break;
    }

    default:
      break;
  }

  return;
}

// for part 2
/**
 * @type {[number, number, number, number, DirT][]}
 * shape: [x_lower_limit, x_higher_limit, y_lower_limit, y_higher_limit, direction]
 */
const values = [
  [0, 0, 0, input_grid[0].length - 1, "down"],
  [
    input_grid.length - 1,
    input_grid.length - 1,
    0,
    input_grid[0].length - 1,
    "up",
  ],
  [0, input_grid.length - 1, 0, 0, "right"],
  [
    0,
    input_grid.length - 1,
    input_grid[0].length - 1,
    input_grid[0].length - 1,
    "left",
  ],
];

function main_01(grid) {
  const visited = new Set();
  const m = new Set();

  walk(grid, 0, 0, "right", m, visited);

  console.log(visited.size);
}

function main_02(grid) {
  let max = 0;

  const history = {};

  values.forEach((item) => {
    for (let x = item[0]; x <= item[1]; x++) {
      for (let y = item[2]; y <= item[3]; y++) {
        const visited = new Set();
        const m = new Set();
        walk(grid, x, y, item[4], m, visited);
        max = Math.max(max, visited.size);
        history[`${x} ${y}`] = [visited.size, item[4]];
      }
    }
  });

  console.log(max);
}

main_02(input_grid);
// main_01(input_grid);
