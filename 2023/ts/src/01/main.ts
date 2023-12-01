import fs from "fs";
import CalibrationValue from ".";
const DATA_PATH = `${import.meta.dir}/data.txt`;
const data_raw = fs.readFileSync(DATA_PATH, "utf-8").trim();
const main = new CalibrationValue(data_raw);
console.log(main.getTotal());
