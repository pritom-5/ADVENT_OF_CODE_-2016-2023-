const fs = require("fs");
// const INPUT = fs.readFileSync("../../data/18/ex.txt", "ascii").trim();
const INPUT = fs.readFileSync("../../data/18/data.txt", "ascii").trim();

// const INPUT = `.#.#.#
// ...##.
// #....#
// ..#...
// #.#..#
// ####..`;

const INPUT_GRID = INPUT.split("\n").map((item) => item.split(""));

function logger(arr_grid) {
  for (let item of arr_grid) {
    console.log(item);
  }
  console.log("\n");
}

function walk(grid, steps) {
  //   logger(grid);
  if (steps >= 100) {
    return grid.flat().reduce((acc, curr) => {
      if (curr === "#") {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  }

  steps++;

  //   const new_grid = JSON.parse(JSON.stringify(grid));
  const new_grid = new Array(grid.length)
    .fill("0")
    .map((item) => new Array(grid[0].length).fill("."));

  grid.forEach((item, row_idx) => {
    item.forEach((ch, col_idx) => {
      const result = doesCurrTurnOn(row_idx, col_idx, grid);

      // for part 2 this portion is added
      // just forcefully adding lights on on four corners
      if (
        (row_idx === 0 && col_idx === 0) ||
        (row_idx === 0 && col_idx === grid[0].length - 1) ||
        (row_idx === grid.length - 1 && col_idx === 0) ||
        (row_idx === grid.length - 1 && col_idx === grid[0].length - 1)
      ) {
        new_grid[row_idx][col_idx] = "#";
      } else {
        new_grid[row_idx][col_idx] = result ? "#" : ".";
      }
    });
  });

  return walk(new_grid, steps);
}

function main() {
  const a = walk(INPUT_GRID, 0);
  console.log(a);
}

main();

function doesCurrTurnOn(curr_r, curr_c, grid) {
  let nos_on = 0;
  for (let c of [-1, 0, 1]) {
    for (let r of [-1, 0, 1]) {
      const n_c_idx = curr_c + c;
      const n_r_idx = curr_r + r;

      if (
        n_c_idx < 0 ||
        n_r_idx < 0 ||
        n_r_idx >= grid.length ||
        n_c_idx >= grid[0].length
      ) {
        continue;
      }

      if (n_c_idx === curr_c && n_r_idx === curr_r) {
        continue;
      }
      if (grid[n_r_idx][n_c_idx] === "#") {
        nos_on++;
      }
    }
  }

  const curr = grid[curr_r][curr_c];

  switch (curr) {
    case "#":
      if (nos_on === 2 || nos_on === 3) {
        return true;
      } else {
        return false;
      }
    case ".":
      if (nos_on === 3) {
        return true;
      } else {
        return false;
      }
    default:
      break;
  }
}
