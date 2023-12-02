import fs from "fs";
import Two from "./02";

const LIMIT = { red: 12, green: 13, blue: 14 };
const FILE_PATH = import.meta.dir + "/data.txt";
const inputs = fs.readFileSync(FILE_PATH, "utf-8");

const main = new Two(inputs, LIMIT);
main.parseAll();
main.getSumPowerOfMinCubeRequiredForEachGame();
