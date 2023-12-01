import { describe, expect, it } from "bun:test";
import main, {
  convertStringToArr_01,
  convertStringToArr_02,
  isTriangleValid,
} from ".";

const triangle_values: [[number, number, number], boolean][] = [
  [[5, 10, 25], false],
  [[5, 10, 12], true],
];

describe("test triangle", () => {
  it.each(triangle_values)("input %d, ouput: %s", (a, b) => {
    const result = isTriangleValid(a);
    expect(result).toBe(b);
  });
});

const input_string_01 = `101 
102 
103 
201 
202 
203 
301 
302 
303`;
const input_string_arr_01 = [
  [101, 102, 103],
  [201, 202, 203],
  [301, 302, 303],
];

const input_string_02 = `
1,2,3
4,5,6
7,89,100
12,44,87
`;
const input_string_arr_02: [number, number, number][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 89, 100],
  [12, 44, 87],
];

describe.only("get array from string", () => {
  it("test convertStringToArr_01", () => {
    const r = convertStringToArr_01(input_string_02);
    expect(r).toEqual(input_string_arr_02);
  });
  it("test convertStringToArr_02", () => {
    const r = convertStringToArr_02(input_string_01);
    expect(r).toEqual(input_string_arr_01 as [number, number, number][]);
  });
});
