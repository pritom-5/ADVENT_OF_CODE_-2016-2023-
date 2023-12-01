import fs from "fs";

let dir_obj = { up: true, right: false, down: false, left: false };
let cordinate: [number, number] = [0, 0];
// let pre_visited: [number, number][] = [];

function resetGlobal() {
  dir_obj = { up: true, right: false, down: false, left: false };
  cordinate = [0, 0];
  //   pre_visited = [];
}

export function readDataFromFile() {
  const or_data = fs.readFileSync("./data.txt");
  const or_data_string = String(or_data);

  return or_data_string;
}
export function convertDataToArr(or_data_string: string) {
  const dir_arr = or_data_string.split(",").map((item) => item.trim());
  return dir_arr;
}

function updateDir(direction: keyof typeof dir_obj) {
  dir_obj = { up: false, right: false, down: false, left: false };

  switch (direction) {
    case "up":
      dir_obj.up = true;
      break;
    case "down":
      dir_obj.down = true;
      break;
    case "right":
      dir_obj.right = true;
      break;
    case "left":
      dir_obj.left = true;
      break;
  }
}

// const prev_map: Array<Array<[number, number]>> = [];
const prev_map: Array<string> = [];

function alreadyVisited(pre_visited: string[]): [number, number] | null {
  if (pre_visited.includes(String(cordinate))) {
    let value = pre_visited.find(
      (item) => item === String(cordinate)
    ) as string;
    return extractCordinateFromString(value) as [number, number];
  }
  return null;
}

// function alreadyVisited(
//   curr_cor: [number, number],
//   pre_visited: [number, number][]
// ): [number, number] | null {
//   //---
//   if (pre_visited.map((item) => String(item)).includes(String(curr_cor))) {
//     console.log("already...");
//     return pre_visited.find((item) => String(item) === String(curr_cor)) as [
//       number,
//       number
//     ];
//   }
//   return null;
// }

// function alreadyVisited(curr_cor: [number, number]): boolean {
// 	for (let item of prev_map) {
// 		const x_values = item[0];
// 		const y_values = item[1];
// 		if (curr_cor[0] > x_values[0] && curr_cor[0] < x_values[1]) {
// 			if (curr_cor[1] > y_values[0] && curr_cor[1] < x_values[1]) {
// 				return true;
// 			}
// 		}
// 	}
// 	return false;
// }

// function markVisited(prev_cor: [number, number], curr_cor: [number, number]) {
// 	const range_map: [number, number][] = [
// 		[prev_cor[0], curr_cor[0]],
// 		[prev_cor[1], curr_cor[1]],
// 	];
// 	prev_map.push(range_map);
// }

function extractCordinateFromString(
  cordinate_string: string
): [number, number] {
  const cordinate_str_arr = cordinate_string.match(/\d+/g) as string[];
  return [Number(cordinate_str_arr[0]), Number(cordinate_str_arr[1])];
}

function countLogic(dir_arr: string[], pre_visited: string[]) {
  for (let item of dir_arr) {
    const prev_cor = cordinate;
    const guide = item[0];
    const guide_number = Number(item.slice(1, item.length));
    if (dir_obj.up) {
      if (item[0] === "R") {
        for (let i = 1; i <= guide_number; i++) {
          cordinate[0] += 1;

          console.log(cordinate);

          const already_visited_cordinate = alreadyVisited(pre_visited);
          if (!!already_visited_cordinate) {
            return already_visited_cordinate;
          }

          pre_visited.push(String(cordinate));
          console.log(pre_visited);
        }
        updateDir("right");
      } else {
        for (let i = 1; i <= guide_number; i++) {
          cordinate[0] -= 1;

          const already_visited_cordinate = alreadyVisited(pre_visited);
          if (!!already_visited_cordinate) {
            return already_visited_cordinate;
          }

          pre_visited.push(String(cordinate));
        }
        updateDir("left");
      }
    } else if (dir_obj.down) {
      if (item[0] === "R") {
        for (let i = 1; i <= guide_number; i++) {
          cordinate[0] -= 1;

          const already_visited_cordinate = alreadyVisited(pre_visited);
          if (!!already_visited_cordinate) {
            return already_visited_cordinate;
          }

          pre_visited.push(String(cordinate));
        }
        updateDir("left");
      } else {
        for (let i = 1; i <= guide_number; i++) {
          cordinate[0] += 1;

          const already_visited_cordinate = alreadyVisited(pre_visited);
          if (!!already_visited_cordinate) {
            return already_visited_cordinate;
          }

          pre_visited.push(String(cordinate));
        }
        updateDir("right");
      }
    } else if (dir_obj.right) {
      if (item[0] === "R") {
        for (let i = 1; i <= guide_number; i++) {
          cordinate[1] -= 1;

          const already_visited_cordinate = alreadyVisited(pre_visited);
          if (!!already_visited_cordinate) {
            return already_visited_cordinate;
          }

          pre_visited.push(String(cordinate));
        }
        updateDir("down");
      } else {
        for (let i = 1; i <= guide_number; i++) {
          cordinate[1] += 1;

          const already_visited_cordinate = alreadyVisited(pre_visited);
          if (!!already_visited_cordinate) {
            return already_visited_cordinate;
          }

          pre_visited.push(String(cordinate));
        }
        updateDir("up");
      }
    } else if (dir_obj.left) {
      if (item[0] === "R") {
        for (let i = 1; i <= guide_number; i++) {
          cordinate[1] += 1;

          const already_visited_cordinate = alreadyVisited(pre_visited);
          if (!!already_visited_cordinate) {
            return already_visited_cordinate;
          }

          pre_visited.push(String(cordinate));
        }
        updateDir("up");
      } else {
        for (let i = 1; i <= guide_number; i++) {
          cordinate[1] -= 1;

          const already_visited_cordinate = alreadyVisited(pre_visited);
          if (!!already_visited_cordinate) {
            return already_visited_cordinate;
          }

          pre_visited.push(String(cordinate));
        }
        updateDir("down");
      }
    }
  }

  return cordinate;
}

function countAbsoluteDistance(c: [number, number]) {
  return Math.abs(c[0]) + Math.abs(c[1]);
}

export default function main(data_arr: string[]) {
  resetGlobal();
  const pre_visited: string[] = [];
  const final_cordinate = countLogic(data_arr, pre_visited);
  console.log(pre_visited);
  return countAbsoluteDistance(final_cordinate);
}

const r = main(convertDataToArr(readDataFromFile()));
console.log(r);
