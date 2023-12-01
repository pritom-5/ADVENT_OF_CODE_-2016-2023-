import { describe, expect, it } from "bun:test";
import main from ".";

const one = `ULL
RRDDD
LURDL
UUUUD`;

describe("02-01", () => {
  it("right code", () => {
    const result = main(one);
    expect(result).toBe("1985");
  });
});

describe.only("02-02", () => {
  it("right code", () => {
    const result = main(one);
    expect(result).toBe("5DB3");
  });
});
