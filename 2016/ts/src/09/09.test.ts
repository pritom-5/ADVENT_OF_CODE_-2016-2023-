import { beforeEach, describe, expect, it } from "bun:test";
import Decompress from ".";

const INPUT = "A(2x2)BCD(2x2)EFG";
const INPUT_1 = "ADVENT";
const INPUT_2 = "A(1x5)BC";
const INPUT_3 = "(3x3)XYZ";
const INPUT_4 = "(6x1)(1x3)A";
const INPUT_5 = "X(8x2)(3x3)ABCY";

const AOC_TEST_INPUTS: [string, string, number][] = [
  [INPUT_1, "ADVENT", 6],
  [INPUT_2, "ABBBBBC", 7],
  [INPUT_3, "XYZXYZXYZ", 9],
  [INPUT, "ABCBCDEFEFG", 11],
  [INPUT_4, "(1x3)A", 6],
  [INPUT_5, "X(3x3)ABC(3x3)ABCY", 18],
];

describe("test Decompress class", () => {
  it.each(AOC_TEST_INPUTS)(
    "input: %s expected_value: %s, length: %d",
    (input, expected_value, expected_length) => {
      const dc = new Decompress(input);
      const output = dc.getCopied();

      expect(output).toBe(expected_value);
    }
  );
});
