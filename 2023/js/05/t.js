const values = [1, 2, 2, 3, 3, 4, 5];

const v = values.reduce((acc, curr) => {
  return { [curr]: acc[curr] ? acc[curr]++ : 1, ...acc };
}, {});

console.log(v);
