import fs from "fs";

function readDataFromFile(): string {
  const readData = fs.readFileSync("./data.txt", "utf-8");
  return readData;
}
function readDataFromFile_new(): string {
  //   const readData = fs.readFileSync("./data_dummy.txt", "utf-8");
  const readData = fs.readFileSync("./data.txt", "utf-8");
  return readData;
}

export function convertStringToArr_01(input_string: string) {
  return input_string
    .trim()
    .split("\n")
    .map((item) => {
      return item
        .trim()
        .split(",")
        .map((value) => Number(value));
    });
}

export function convertStringToArr_02(input_string: string) {
  const single_item_arr = input_string.trim().split("\n");

  console.log(single_item_arr);

  let counter = 0;
  let temp_arr = [];
  let final_arr = [];
  for (let item of single_item_arr) {
    ++counter;
    temp_arr.push(Number(item));
    if (counter === 3) {
      counter = 0;
      final_arr.push(temp_arr);
      temp_arr = [];
    }
  }

  return final_arr as [number, number, number][];
}

export function isTriangleValid(edges: [number, number, number]): boolean {
  const sorted_edges = edges.sort((a, b) => a - b);

  const max_edge = sorted_edges[2];
  return sorted_edges[0] + sorted_edges[1] > max_edge;
}

export default function main(
  triangle_input_arr: [number, number, number][]
): number {
  let counter = 0;
  for (const item of triangle_input_arr) {
    const r = isTriangleValid(item);
    if (r) {
      ++counter;
    }
  }

  return counter;
}

// const r = convertStringToArr_02(readDataFromFile_new()) as [
//   number,
//   number,
//   number
// ][];
// console.log(r);
// const v = main(r);
// console.log(v);
