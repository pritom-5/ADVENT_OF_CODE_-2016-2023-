/**
 * part 1 and part 2 done
 */
const flavors = [
  [4, 0, -1, 0],
  [-2, 5, 0, 0],
  [0, -1, 5, -2],
  [0, 0, 0, 2],
  [5, 8, 6, 1],
];

let max = 0;

function main() {
  for (let i = 1; i < 100; i++) {
    for (let j = 1; j < 100; j++) {
      for (let k = 1; k < 100; k++) {
        for (let l = 1; l < 100; l++) {
          if (
            i * flavors[4][0] +
              j * flavors[4][1] +
              k * flavors[4][2] +
              l * flavors[4][3] ===
              500 &&
            i + j + k + l === 100
          ) {
            console.log(i, j, k, l);
            const c =
              i * flavors[0][0] +
                j * flavors[0][1] +
                k * flavors[0][2] +
                l * flavors[0][3] <
              0
                ? 0
                : i * flavors[0][0] +
                  j * flavors[0][1] +
                  k * flavors[0][2] +
                  l * flavors[0][3];

            const d =
              i * flavors[1][0] +
                j * flavors[1][1] +
                k * flavors[1][2] +
                l * flavors[1][3] <
              0
                ? 0
                : i * flavors[1][0] +
                  j * flavors[1][1] +
                  k * flavors[1][2] +
                  l * flavors[1][3];

            const f =
              i * flavors[2][0] +
                j * flavors[2][1] +
                k * flavors[2][2] +
                l * flavors[2][3] <
              0
                ? 0
                : i * flavors[2][0] +
                  j * flavors[2][1] +
                  k * flavors[2][2] +
                  l * flavors[2][3];

            const t =
              i * flavors[3][0] +
                j * flavors[3][1] +
                k * flavors[3][2] +
                l * flavors[3][3] <
              0
                ? 0
                : i * flavors[3][0] +
                  j * flavors[3][1] +
                  k * flavors[3][2] +
                  l * flavors[3][3];

            max = Math.max(max, c * d * f * t);
          }
        }
      }
    }
  }
}

main();
console.log(max);

const a = [
  [-1, 2],
  [-2, 3],
  [6, -2],
  [3, -1],
];

function main_02() {
  for (let i = 1; i < 100; i++) {
    for (let j = 1; j < 100; j++) {
      if (i + j == 100) {
        //   if (i == 44 && j == 56) {
        const c = i * a[0][0] + j * a[0][1] < 0 ? 0 : i * a[0][0] + j * a[0][1];
        const d = i * a[1][0] + j * a[1][1] < 0 ? 0 : i * a[1][0] + j * a[1][1];
        const f = i * a[2][0] + j * a[2][1] < 0 ? 0 : i * a[2][0] + j * a[2][1];
        const t = i * a[3][0] + j * a[3][1] < 0 ? 0 : i * a[3][0] + j * a[3][1];

        max = Math.max(max, c * d * f * t);
      }
    }
  }
}

// console.log(max);
