// both part 1 and part 2 are correct

const fs = require("fs");

// const input = fs.readFileSync("./data/11/ex.txt", "ascii").trim();
const input = fs.readFileSync("./data/11/data.txt", "ascii").trim();

const INPUT_GRID = input.split("\n");
const GALAXY_LIST = [];
const EXP_FACT = 2; // part 1
// const EXP_FACT = 1000000; // part 2

function getGalaxyList(input_grid) {
  input_grid.forEach((line, l_idx) => {
    line.split("").forEach((ch, idx) => {
      if (ch === "#") {
        GALAXY_LIST.push([l_idx, idx]);
      }
    });
  });
}

function getDistanceBetweenTwoGs(a, b, empty_row_list, empty_col_list) {
  let nos_empty_cols = empty_col_list.reduce((acc, curr) => {
    if (a[1] > b[1]) {
      if (curr < a[1] && curr > b[1]) {
        return acc + 1;
      } else {
        return acc;
      }
    } else {
      if (curr > a[1] && curr < b[1]) {
        return acc + 1;
      } else {
        return acc;
      }
    }
  }, 0);

  let nos_empty_rows = empty_row_list.reduce((acc, curr) => {
    if (a[0] > b[0]) {
      if (curr < a[0] && curr > b[0]) {
        return acc + 1;
      } else {
        return acc;
      }
    } else {
      if (curr > a[0] && curr < b[0]) {
        return acc + 1;
      } else {
        return acc;
      }
    }
  }, 0);

  let vertcal_distance = nos_empty_rows * EXP_FACT;
  let hor_distance = nos_empty_cols * EXP_FACT;

  const total =
    Math.abs(a[0] - b[0]) +
    hor_distance +
    Math.abs(a[1] - b[1]) +
    vertcal_distance -
    nos_empty_cols -
    nos_empty_rows;

  return total;
}

function getTotalDistanceBetweenGs(empty_row_list, empty_col_list) {
  const first = GALAXY_LIST.shift();
  const a = walk(first, GALAXY_LIST, 0, empty_row_list, empty_col_list);

  console.log(a);
}

function walk(curr_gal, gal_arr, total, empty_row_list, empty_col_list) {
  if (gal_arr.length < 1) {
    return total;
  }

  for (let item of gal_arr) {
    total += getDistanceBetweenTwoGs(
      curr_gal,
      item,
      empty_row_list,
      empty_col_list
    );
  }

  curr_gal = gal_arr.shift();

  return walk(curr_gal, gal_arr, total, empty_row_list, empty_col_list);
}

function getIdxOfZeros(arr) {
  const arr_0 = [];
  arr.forEach((item, i) => {
    if (item === 0) {
      arr_0.push(i);
    }
  });
  return arr_0;
}

function countEmptyRowCol(or_arr) {
  const row_count = new Array(or_arr.length).fill(0);
  const col_count = new Array(or_arr[0].length).fill(0);

  or_arr.forEach((line, l_idx) => {
    line.split("").forEach((ch, ch_idx) => {
      if (ch !== ".") {
        row_count[l_idx]++;
        col_count[ch_idx]++;
      }
    });
  });

  return {
    row_count: getIdxOfZeros(row_count),
    col_count: getIdxOfZeros(col_count),
  };
}

function main() {
  const { row_count: empty_row_list, col_count: empty_col_list } =
    countEmptyRowCol(INPUT_GRID);
  getGalaxyList(INPUT_GRID);

  getTotalDistanceBetweenGs(empty_row_list, empty_col_list);
}

main();
