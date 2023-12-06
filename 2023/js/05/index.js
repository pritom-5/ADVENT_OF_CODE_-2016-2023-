const fs = require("fs");
// const input = fs.readFileSync("./data", "ascii");
const input = fs.readFileSync("./example.txt", "ascii");

const path = [];

const data_obj = input
  .trim()
  .split("\n\n")
  .slice(1)
  .reduce((acc_0, curr_0) => {
    const items = curr_0.trim().split("\n");
    const from = items[0].split(" ")[0].split("-")[0];
    const to = items[0].split(" ")[0].split("-")[2];
    const x = items.slice(1).reduce((acc, curr) => {
      if (!path.includes(to)) {
        path.push(to);
      }
      const from_num = +curr.split(" ")[1];
      const to_num = +curr.split(" ")[0];
      const no = +curr.split(" ")[2];
      return [
        {
          [to]: to_num,
          [from]: from_num,
          no: no,
          upper_limit: from_num + no,
          lower_limit: from_num,
        },
        ...acc,
      ];
    }, []);

    return { [to]: x, ...acc_0 };
  }, {});

// data_obj.seeds = input
//   .split("\n")[0]
//   .split(": ")[1]
//   .split(" ")
//   .map((item) => +item);

// part 02
let seeds = [];

const seed_arr = input
  .split("\n")[0]
  .split(": ")[1]
  .split(" ")
  .map((item) => +item);

// data_obj["seed"] = [];

// let seed_idx = 0;
// let seed_no_idx = 1;
// let count = 0;

// while (true) {
//   if (seed_no_idx >= seed_arr.length - 1) {
//     break;
//   }
//   if (count === seed_arr[seed_no_idx]) {
//     seed_idx += 2;
//     seed_no_idx += 2;
//     count = 0;
//   }

//   console.log(seed_arr[seed_idx] + count);
//   count++;
// }

// console.log(seeds);

let min = Infinity;

// let prev = "seed";
// for (let item of path.slice(1)) {
//   for (let [idx, param] of data_obj[item].entries()) {
//     const upper = param[prev] + param["no"];
//     const lower = param[prev];

//     // console.log(data_obj[item]);

//     data_obj[item][idx]["upper"] = upper;
//     data_obj[item][idx]["lower"] = lower;
//   }
//   prev = item;
// }
// console.log(data_obj);

// // data_obj.seeds.forEach((seed) => {

/////////////////////////////////////////////////////////////////// make arr
for (let i = 0; i < seed_arr.length; i += 2) {
  const start = seed_arr[i];
  const end = start + seed_arr[i + 1];

  seeds.push({ start, end });
}

/////////////////////////////////////////////////////////////////// make arr part 01
// for (let i = 0; i < seed_arr.length; i += 1) {
//   const start = seed_arr[i];

//   seeds.push({ start, end: start });
// }

// console.log(seeds);

for (let seed_chunk of seeds) {
  for (let seed = seed_chunk.start; seed <= seed_chunk.end; seed++) {
    let prev_number = seed;
    let prev_type = "seed";
    // const temp_obj = {};
    // temp_obj["seed"] = seed;
    for (let val of path) {
      const items = data_obj[val];

      for (let val_1 of items) {
        // const upper_lim = val_1[prev] + val_1.no;
        // const lower_lim = val_1[prev];

        if (
          val_1.upper_limit > prev_number &&
          prev_number >= val_1.lower_limit
        ) {
          const diff = val_1[prev_type] - prev_number;
          const new_val = val_1[val] + Math.abs(diff);
          prev_number = new_val;
          prev_type = val;
          break;
        }
      }

      // if (!temp_obj[val]) {
      //   temp_obj[val] = temp_obj[prev];
      // }
      prev_type = val;
    }
    min = Math.min(min, prev_number);
  }
}
console.log(min);
