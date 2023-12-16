const input = ".??..??...?##. 1,1,3";

const input_arr = input.split(" ")[0].split("");
const pattern = input
  .split(" ")[1]
  .split("")
  .map((item) => parseInt(item));

const list_of_q = input_arr.reduce((acc, curr, idx) => {
  if (curr == "?") {
    return [...acc, idx];
  } else {
    return acc;
  }
}, []);

console.log(list_of_q);

function walk(curr, list) {
  const new_arr = [...curr];
  for (let id of list) {
    for (let item of [".", "#"]) {
      new_arr[id] = item;
      console.log(new_arr);
    }
  }
}

walk(input_arr, list_of_q);
