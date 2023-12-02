import { describe, expect, it } from "bun:test";
import Two from "./02";

const AOC_02_INPUT = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

const LIMIT = { red: 12, green: 13, blue: 14 };

const AOC_02_01_EXPECTED = 8;
const AOC_02_02_EXPECTED = 2286;

describe("AOC DAY 02", () => {
  it("01", () => {
    const main = new Two(AOC_02_INPUT, LIMIT);
    const output = main.getSumOfValidGameNo();
    console.log(`expected: ${AOC_02_01_EXPECTED} \n output: ${output}`);
    expect(output).toBe(AOC_02_01_EXPECTED);
  });

  it("02", () => {
    const main = new Two(AOC_02_INPUT, LIMIT);
    const output = main.getSumPowerOfMinCubeRequiredForEachGame();

    console.log(`expected: ${AOC_02_02_EXPECTED} \n output: ${output}`);
    expect(output).toBe(AOC_02_02_EXPECTED);
  });
});
