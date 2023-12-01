import { describe, expect, it } from "bun:test";
import CalibrationValue from ".";

const aoc_01_01_test_inputs = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
a1b2c3d4e54f
treb7uchet
30`;
const aoc_01_01_test_expected = 186;

describe("test CalibrationValue class", () => {
  it("shold give total value", () => {
    const cv = new CalibrationValue(aoc_01_01_test_inputs);
    const output = cv.getTotal();
    expect(output).toBe(aoc_01_01_test_expected);
  });
});

const aoc_01_02_test_inputs = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
kflkpscthreehjjgckfrfdhc3krgntwofour`;
const aoc_01_02_test_expected = 315;

describe("test CalibrationValue class 02", () => {
  it("shold give total value", () => {
    const cv = new CalibrationValue(aoc_01_02_test_inputs);
    const output = cv.getTotal();
    expect(output).toBe(aoc_01_02_test_expected);
  });
});
