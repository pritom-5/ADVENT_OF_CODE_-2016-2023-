import { beforeEach, describe, expect, test } from "bun:test";
import getInputFromFile from ".";
import Four from "./04";

let FOUR: Four;

beforeEach(() => {
  const file_name = "example.txt";
  FOUR = new Four(getInputFromFile(file_name));
});

// test properly parsed
describe("properly parsed", () => {
  test("should parse 1 card", () => {
    const obj_arr_output = FOUR.getCardsObjArr();

    expect(obj_arr_output[0].card_no).toBe(1);
    expect(obj_arr_output[0].number_of_cards).toBe(1);
    expect(obj_arr_output[0].my_cards).toEqual([83, 86, 6, 31, 17, 9, 48, 53]);
    expect(obj_arr_output[0].winners).toEqual([41, 48, 83, 86, 17]);

    expect(obj_arr_output[3].card_no).toBe(4);
    expect(obj_arr_output[3].number_of_cards).toBe(1);
    expect(obj_arr_output[3].my_cards).toEqual([59, 84, 76, 51, 58, 5, 54, 83]);
    expect(obj_arr_output[3].winners).toEqual([41, 92, 73, 84, 69]);
  });
});

//  test 01
describe("test ans 01", () => {
  test("check 01", () => {
    const ouput = FOUR.getResultOf01();

    expect(ouput).toBe(13);
  });
});

// test 02 result
describe("test ans 02", () => {
  test("check 02", () => {
    const ouput = FOUR.getResultOf02();

    expect(ouput).toBe(30);
  });
});
