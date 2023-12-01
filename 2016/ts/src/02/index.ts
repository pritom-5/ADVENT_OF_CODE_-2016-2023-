import fs from "fs";

const one = `ULL
RRDDD
LURDL
UUUUD`;

// const NUMBERS = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];

const NUMBERS = [
  [0, 0, 1, 0, 0],
  [0, 2, 3, 4, 0],
  [5, 6, 7, 8, 9],
  [0, "A", "B", "C", 0],
  [0, 0, "D", 0, 0],
];

const DIRECTION: Record<string, [number, number]> = {
  U: [-1, 0],
  D: [1, 0],
  R: [0, 1],
  L: [0, -1],
};

function readFileData() {
  const read_data = fs.readFileSync("./data.txt", "utf8");
  return read_data.trim();
}

function keypadLogic(input_arr: string[]) {
  let SECRET_KEY = "";
  let PREVIOUS_NUMBER: [number, number] = [2, 0];

  for (let item of input_arr) {
    let prev_index: [number, number] = PREVIOUS_NUMBER;

    for (let dir of item.trim()) {
      const [v, h] = DIRECTION[dir];
      const updated_v = prev_index[0] + v;
      const updated_h = prev_index[1] + h;

      if (
        updated_v < NUMBERS.length &&
        updated_h >= 0 &&
        updated_v >= 0 &&
        updated_h < NUMBERS[0].length
      ) {
        if (NUMBERS[updated_v][updated_h] !== 0) {
          prev_index = [updated_v, updated_h];
        }
      }
    }

    PREVIOUS_NUMBER = prev_index;
    SECRET_KEY += NUMBERS[PREVIOUS_NUMBER[0]][PREVIOUS_NUMBER[1]];
  }

  return SECRET_KEY;
}

function getInputArr(input: string): string[] {
  return input.split("\n");
}

export default function main(input: string) {
  const r = keypadLogic(getInputArr(input));
  console.log(r);
  return r;
}

main(readFileData());
