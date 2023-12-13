const input = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const DIR = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const VALID_NEXT_DIR = {
  S: [0, 1, 2, 3, 4],
  L: [0, 3],
  J: [0, 2],
  7: [1, 2],
  F: [1, 3],
  "|": [1, 2],
  "-": [2, 3],
};

const maze_grid = input
  .trim()
  .split("\n")
  .map((item) => item.trim())
  .map((item) => item.split(""));

const START = [1, 1];

// console.log(maze_grid);

function walk(curr, des, grid, isFirst, seen, path, valid_path) {
  if (curr === des && !isFirst) {
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

  seen.push(`${curr[0]} ${curr[1]}`);
  path.push([curr[0], curr[1]]);

  const curr_ch = grid[curr[0]][curr[1]];

  for (let item of VALID_NEXT_DIR[curr_ch]) {
    const new_x = curr[0] + DIR[item][0];
    const new_y = curr[1] + DIR[item][1];

    let valid_path;

    switch (item) {
      case 0:
        valid_path = 1;
        break;
      case 1:
        valid_path = 0;
      case 2:
        valid_path = 3;
      case 3:
        valid_path = 2;
      default:
        break;
    }

    if (walk([new_x, new_y], des, grid, false, seen, path)) {
      return true;
    }
  }

  path.pop();
}

function main() {
  const seen = [];
  const path = [];

  walk(START, START, maze_grid, true, seen, path, 1);

  console.log(path);
}

main();
