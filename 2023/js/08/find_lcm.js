function findLcm(input_arr) {
  const limit = input_arr.reduce((acc, curr) => acc * curr, 1);
  const max_item = Math.max(...input_arr);

  for (let i = max_item; i <= limit; i++) {
    if (input_arr.every((item) => i % item === 0)) {
      return i;
    }
  }
  return limit;
}

exports.lcm = findLcm;
