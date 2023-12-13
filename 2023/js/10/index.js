const fs = require("fs");

// const input = `-L|F7
// 7S-7|
// L|7||
// -L-J|
// L|-JF`;

// const input = fs.readFileSync("./ex.txt", "ascii");
// const input = fs.readFileSync("./ex1.txt", "ascii");
const input = fs.readFileSync("./data.txt", "ascii");

const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const VALID_NEXT_DIR = {
  L: [],
  J: [0, 2],
  7: [1, 2],
  F: [1, 3],
  "|": [1, 2],
  "-": [2, 3],
};

const EXPECTED_NEXT_PATH = {
  0: ["|", "F", "7"],
  1: ["-", "7", "J"],
  2: ["|", "J", "L"],
  3: ["-", "F", "L"],
};

const isValidObj = {
  L: { 0: ["|", "7", "F"], 1: ["J", "7", "-"], 2: [], 3: [] },
  J: { 0: ["|", "7", "F"], 1: [], 2: [], 3: ["-", "F", "L"] },
  7: { 0: [], 1: [], 2: ["|", "J", "L"], 3: ["-", "F", "L"] },
  F: { 0: [], 1: ["J", "7", "-"], 2: ["|", "J", "L"], 3: [] },
  "|": { 0: ["|", "7", "F"], 1: [], 2: ["|", "J", "L"], 3: [] },
  "-": { 0: [], 1: ["J", "7", "-"], 2: [], 3: ["-", "F", "L"] },
  S: {
    0: ["|", "7", "F"],
    1: ["J", "7", "-"],
    2: ["|", "J", "L"],
    3: ["-", "F", "L"],
  },
};

/**
 *
 * @param {string} curr character
 * @param {string} next character
 * @param {string} dir 0 | 1 | 2 | 3 css order
 * @returns
 */
function isValid(curr, prev, dir) {
  // console.log("curr: ", curr, "prev: ", prev, "dir: ", dir);
  if (curr === ".") {
    return false;
  }
  if (curr === "S") {
    return true;
  }
  if (isValidObj[prev][dir].includes(curr)) {
    return true;
  }

  return false;
}

const maze_grid = input
  .trim()
  .split("\n")
  .map((item) => item.trim())
  .map((item) => item.split(""));

let START;

for (let [lx, line] of maze_grid.entries()) {
  for (let [cx, ch] of line.entries()) {
    if (ch === "S") {
      START = [lx, cx];
    }
  }
}

// console.log(maze_grid);
function getNextValidPath(curr_idx) {
  switch (curr_idx) {
    case "0":
      break;

    default:
      break;
  }
}

function walk(curr, prev, dir, des, grid, isFirst, seen, path) {
  if (curr === des && !isFirst) {
    path.push([curr[0], curr[1]]);
    return true;
  }

  if (seen.includes(`${curr[0]} ${curr[1]}`)) {
    return false;
  }

  if (
    curr[0] < 0 ||
    curr[1] < 0 ||
    curr[0] >= grid.length ||
    grid[1] >= grid[0].length
  ) {
    return false;
  }

  const curr_ch = grid[curr[0]][curr[1]];
  if (!isValid(curr_ch, prev, dir)) {
    return false;
  }

  seen.push(`${curr[0]} ${curr[1]}`);
  path.push([curr[0], curr[1]]);

  for (let item = 0; item < DIR.length; item++) {
    const new_x = curr[0] + DIR[item][0];
    const new_y = curr[1] + DIR[item][1];

    if (walk([new_x, new_y], curr_ch, item, des, grid, false, seen, path)) {
      return true;
    }
  }
  // path.pop();
}

function main() {
  const seen = [];
  const path = [];

  walk(START, null, null, START, maze_grid, true, seen, path);

  console.log(path);
  console.log(path.length / 2);
}

main();
