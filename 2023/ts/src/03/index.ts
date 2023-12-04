import fs from "fs";
import Three from "./03";

// parse
function parseInput(file_name: string): string[] {
  const file_path = import.meta.dir + `/${file_name}`;
  const input = fs.readFileSync(file_path, "utf-8").trim();
  //   const input = await Bun.file(file_path).text();
  const input_arr = input.split("\n").map((item) => item.trim());

  return input_arr;
}

// answer func 01
const file_no = process.argv[2] ? process.argv[2] : "1";

let file_name = "";
switch (file_no) {
  case "1":
    file_name = "example.txt";
    break;
  case "2":
    file_name = "data.txt";
    break;
  case "3":
    file_name = "example2.txt";
    break;
  default:
    file_name = "example.txt";
    break;
}

const input = parseInput(file_name);
const main = new Three(input);
