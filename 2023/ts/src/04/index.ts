import fs from "fs";
import Four from "./04";

export default function getInputFromFile(file_name: string): string {
  const file_path = import.meta.dir + "/" + file_name;
  const input = fs.readFileSync(file_path, "utf-8").trim();

  return input;
}

function main() {
  const input_file_no = process.argv[2];
  let input_file: string = input_file_no === "1" ? "data.txt" : "example.txt";

  const four = new Four(getInputFromFile(input_file));

  console.log(four.getCardsObjArr());
}

main();
