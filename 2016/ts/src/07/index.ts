const DATA = "ioxxoj[asdfgh]zxcvbn[hihafaf]afhoafe";
// const outside = DATA.match(/[^[\]]+(?=])/g);
const outside = DATA.match(/[a-z]+/g);
let inside = DATA.match(/\[[a-z]+\]/g) as any;

inside = inside?.map((item) => item.replace("[", "").replace("]", ""));

// console.log(outside, inside);

const input = "ioxxoj";

function isABBA() {
  let start = 0;
  let end = 3;
  while (end < input.length) {
    let a = "";
    let b = "";

    a += input[start];
    a += input[start + 1];

    b += input[end];
    b += input[end - 1];

    if (a === b) {
      return true;
    }

    start++;
    end++;
  }
  return false;
}

class Seven {
  OUTSIDE_STRING_ARR: string[];
  INSIDE_STRING_ARR: string[];
  INPUT: string;

  constructor(input: string) {
    this.OUTSIDE_STRING_ARR = [];
    this.INSIDE_STRING_ARR = [];
    this.INPUT = input;
  }

  parseInput() {
    // const inside_regex = /\[[a-z]+\]/g;
    // const outside_regex = /[a-z]+/g;
    const inside_regex = /(?<=\[)(.*?)(?=\])/g;
    const outside_regex = /([^\[\]]+)(?:$|\[)/g; // can't understand this regex
    this.OUTSIDE_STRING_ARR = this.INPUT.match(outside_regex) as string[];
    this.INSIDE_STRING_ARR = this.INPUT.match(inside_regex) as string[];

    this.OUTSIDE_STRING_ARR = this.OUTSIDE_STRING_ARR.map((item) =>
      item.replace("[", "").replace("]", "")
    );

    // console.log(this.INSIDE_STRING_ARR, this.OUTSIDE_STRING_ARR);
  }

  checkAbba(input: string) {
    let start = 0;
    let end = 3;
    while (end < input.length) {
      let a = "";
      let b = "";

      a += input[start];
      a += input[start + 1];

      const both_same_character = a.charCodeAt(0) == a.charCodeAt(1);
      if (both_same_character) {
        start++;
        end++;
        continue;
      }

      b += input[end];
      b += input[end - 1];

      if (a === b) {
        return true;
      }

      start++;
      end++;
    }
    return false;
  }

  isValid(): boolean {
    let return_value = false;

    for (let word of this.OUTSIDE_STRING_ARR) {
      const result = this.checkAbba(word);

      const word_abba_and_inside_bracket =
        result && this.INSIDE_STRING_ARR.includes(word);

      const word_abba_and_outside_bracket =
        result && !this.INSIDE_STRING_ARR.includes(word);

      if (word_abba_and_inside_bracket) {
        return false;
      } else if (word_abba_and_outside_bracket) {
        return_value = true;
      }
    }
    return return_value;
  }

  checkABA(input: string) {
    let start = 0;
    let end = 2;

    while (end < input.length) {
      const firt_last_same_ch_and_middle_different =
        input.charCodeAt(start) === input.charCodeAt(end) &&
        input.charCodeAt(start) !== input.charCodeAt(start + 1);

      if (firt_last_same_ch_and_middle_different) {
        const word_snippet = input[start + 1] + input[start] + input[start + 1];

        if (this.checkBAB(word_snippet)) {
          return true;
        }
      }

      start++;
      end++;
    }

    return false;
  }

  checkBAB(ABA_input: string) {
    for (let inner_word of this.INSIDE_STRING_ARR) {
      if (inner_word.includes(ABA_input)) {
        return true;
      }
    }

    return false;
  }

  isValid02() {
    for (let word of this.OUTSIDE_STRING_ARR) {
      const result = this.checkABA(word);

      if (result) return true;
    }
    return false;
  }

  getResult02() {
    this.parseInput();
    return this.isValid02();
  }

  getResult01() {
    this.parseInput();
    return this.isValid();
  }
}

// const data_0 = "aba[bab]xyz";
// const data_1 = "xyx[xyx]xyx";
// const data_2 = "aaa[kek]eke";
// const main = new Seven(data_2);
// let a = main.getResult02();
// console.log(a);

import fs from "fs";
const FILE_PATH = "./data.txt";
const data_input = fs.readFileSync(FILE_PATH, "utf8").trim();
const data_input_arr = data_input.split("\n");

let TOTAL = 0;
for (let item of data_input_arr) {
  const main = new Seven(item);
  const a = main.getResult02();

  if (a) {
    TOTAL++;
  }
  console.log(item, a);
}

console.log(TOTAL);
