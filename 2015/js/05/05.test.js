import { describe, expect, test } from "bun:test";
import SantaString from ".";

describe("a", () => {
  const i = "yzsmlbnftftgwadz";
  const j = "smhgllqqqcjfubfc";
  const a = new SantaString(i);
  const b = new SantaString(j);
  test("", () => {
    expect(a.isGoodString_2()).toBeTrue();
  });
  test("", () => {
    expect(b.isGoodString_2()).toBeFalse();
  });
});
