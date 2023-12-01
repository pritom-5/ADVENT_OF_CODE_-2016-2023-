import fs from "fs";

const one = "R4, R3, L3, L2, L1";
const two = "R2, L3";
const three = "R2, R2, R2";
const four = "R5, L5, R5, R3";
const five = "R8, R4, R4, R8, R12";

type tAxis = "n" | "s" | "e" | "w";
type tSteer = "L" | "R";
type tDirection = {
  L: number[];
  R: number[];
  update_dir: Record<tSteer, tAxis>;
};

const direction_obj: Record<tAxis, tDirection> = {
  n: { L: [-1, 0], R: [1, 0], update_dir: { L: "w", R: "e" } },
  s: { L: [1, 0], R: [-1, 0], update_dir: { L: "e", R: "w" } },
  e: { L: [0, 1], R: [0, -1], update_dir: { L: "n", R: "s" } },
  w: { L: [0, -1], R: [0, 1], update_dir: { L: "s", R: "n" } },
};

function getDataFromFile(): string {
  const read_data = fs.readFileSync("./data.txt", "utf8");
  return read_data;
}

export function convertDataToArr(input: string): [tSteer, number][] {
  return input
    .trim()
    .split(",")
    .map((item) => {
      const a = item.trim()[0] as tSteer;
      const b = item.match(/\d+/g);

      return [a, Number(b)];
    });
}

function isAlreadyVisited(
  memory: number[][],
  cordinate: number[]
): number[] | null {
  const r_cordinate = memory.find((item) => String(item) === String(cordinate));
  if (!r_cordinate) {
    return null;
  } else {
    return r_cordinate;
  }
}

function countLogic(
  input_arr: [tSteer, number][],
  direction: keyof typeof direction_obj,
  cordinate: number[],
  memory: number[][]
): number[] {
  for (let item of input_arr) {
    for (let i = 0; i < item[1]; i++) {
      const [x, y] = direction_obj[direction][item[0]];
      cordinate = [cordinate[0] + x, cordinate[1] + y];

      const is_already_visited = isAlreadyVisited(memory, cordinate);
      if (!!is_already_visited) {
        return is_already_visited;
      }

      memory.push(cordinate);
      // console.log(item, direction, cordinate, memory);
    }
    direction = direction_obj[direction]["update_dir"][item[0]];
  }

  return cordinate;
}

function absoluteDistanceCordinate(cordinate: number[]): number {
  return Math.abs(cordinate[0]) + Math.abs(cordinate[1]);
}

export default function main(input_arr: [tSteer, number][]): number {
  let DIRECTION: keyof typeof direction_obj = "n";
  let CORDINATE = [0, 0];
  let MEMORY: number[][] = [];

  const r = countLogic(input_arr, DIRECTION, CORDINATE, MEMORY);
  const v = absoluteDistanceCordinate(r);

  return v;
}

// main(convertStringToArr(four))
