/**
 * both p_1 and p_2 works
 */
const all_diff_arr = [];

function walk_forward(arr, diff_to_find_next_item) {
  if (arr.every((item) => item == 0)) {
    return diff_to_find_next_item;
  }
  all_diff_arr.push(arr);

  const new_arr = [];

  for (let i = 0; i < arr.length - 1; i++) {
    new_arr.push(arr[i + 1] - arr[i]);
  }

  diff_to_find_next_item += new_arr[new_arr.length - 1];

  return walk_forward(new_arr, diff_to_find_next_item);
}

function walk_backward(arr, diff_to_find_prev_item) {
  if (arr.every((item) => item == 0)) {
    return diff_to_find_prev_item;
  }

  const new_arr = [];

  for (let i = 0; i < arr.length - 1; i++) {
    new_arr.push(arr[i] - arr[i + 1]);
  }

  diff_to_find_prev_item -= new_arr[0];

  console.log(new_arr);

  return walk_backward(new_arr, diff_to_find_prev_item);
}

function parseInput_1(input) {
  let total = 0;
  input
    .trim()
    .split("\n")
    .forEach((item) => {
      const inputs_0 = item.split(" ").map((num) => parseInt(num));
      const last_item = walk_forward(inputs_0, 0);
      total += inputs_0[inputs_0.length - 1] + last_item;
    });

  console.log(total);
}

function parseInput_2(input) {
  let total = 0;
  input
    .trim()
    .split("\n")
    .forEach((item) => {
      const inputs_0 = item.split(" ").map((num) => parseInt(num));
      const first_item = walk_backward(inputs_0, 0);
      total += inputs_0[0] - first_item;
    });

  console.log(total);
}

const fs = require("fs");

// const INPUT = fs.readFileSync("../../data/09/ex.txt", "ascii");
const INPUT = fs.readFileSync("../../data/09/data.txt", "ascii");
parseInput_2(INPUT);
