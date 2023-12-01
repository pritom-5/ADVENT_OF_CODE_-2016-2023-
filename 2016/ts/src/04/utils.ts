import fs from "fs";

const FILE_PATH = "./data.txt";

const read_data = fs.readFileSync(FILE_PATH, "utf8");
const read_data_arr = read_data.split("\n");

export default read_data_arr;
