// let sum = 0;
let sum = { sum: 0 };

const data_arr = [
  [1, 2],
  [2, 3],
  [100, 200],
];

function reset() {
  sum = { sum: 0 };
}

function sumF(a, b) {
  reset();
  sum.sum = a + b;
  return sum;
}

data_arr.forEach((item) => {
  console.log("pre: ", sum);
  const r = sumF(item[0], item[1]);

  console.log("post: ", r);
});
