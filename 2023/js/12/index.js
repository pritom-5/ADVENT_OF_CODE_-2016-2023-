const input = ".??..??...?##. 1,1,3";

const pattern = input.split(" ")[0];
const numbers = input
  .split(" ")[1]
  .split(",")
  .map((item) => parseInt(item));

console.log(pattern, numbers);
