import { describe, expect, it, test } from "bun:test";
// import main, { convertDataToArr } from "./try";
import main, { convertDataToArr } from "./index";

const one = "R4, R3, L3, L2, L1";
const two = "R2, L3";
const three = "R2, R2, R2";
const four = "R5, L5, R5, R3";
const five = "R8, R4, R4, R8, R12";

const test_arr: Array<[string, number]> = [
  [two, 5],
  [three, 2],
  [four, 12],
];

describe("01/01", () => {
  it.each(test_arr)("input: %s, expected: %d", (a, b) => {
    const data_arr = convertDataToArr(a);
    const result = main(data_arr);

    console.log("--------------", result, data_arr);

    expect(result).toBe(b);
  });
});

describe("01/02", () => {
  it("should give four", () => {
    const data_arr = convertDataToArr(five);
    const result = main(data_arr);
    expect(result).toBe(4);
  });
});
