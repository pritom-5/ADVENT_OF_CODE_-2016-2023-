export default class SantaString {
  VOWELS = ["a", "e", "i", "o", "u"];
  NAUGHTY_WORDS = ["ab", "cd", "pq", "xy"];

  /** @param {string} input  */
  constructor(input) {
    this.input = input;
  }

  isGoodString() {
    return (
      this.#doesHaveAtLeastThreeVowels() &&
      this.#haveBackToBackLetter() &&
      this.#notHaveNaughtyStrings()
    );
  }

  isGoodString_2() {
    return this.#haveTwoAroundOne() && this.#haveTwoPairOfCh();
  }

  /** @returns {boolean} */
  #haveTwoAroundOne() {
    let start = 0;
    let end = 3;

    while (end <= this.input.length) {
      const s = this.input.slice(start, end);

      if (s[0] === s[2]) {
        return true;
      }
      start++;
      end++;
    }
    return false;
  }

  /** @returns {boolean} */
  #haveTwoPairOfCh() {
    let start = 0;
    let end = 2;

    while (end <= this.input.length) {
      const sliced = this.input.slice(start, end);

      const first = this.input.slice(0, start);
      const second = this.input.slice(end, this.input.length);
      // const string_without_sliced = first + second;

      // console.log(string_without_sliced);

      if (first.includes(sliced) || second.includes(sliced)) {
        return true;
      }

      start++;
      end++;
    }
    return false;
  }

  /** @returns {boolean} */
  #doesHaveAtLeastThreeVowels() {
    const vowels_regex = /a|e|i|o|u/g;
    const matched_vowels = this.input.match(vowels_regex);
    return matched_vowels && matched_vowels.length >= 3;
  }

  /** @returns {boolean} */
  #notHaveNaughtyStrings() {
    for (let i = 0; i < this.NAUGHTY_WORDS.length; i++) {
      if (this.input.includes(this.NAUGHTY_WORDS[i])) {
        return false;
      }
    }
    return true;
  }

  /** @returns {boolean} */
  #haveBackToBackLetter() {
    let start = 0;
    let end = 2;

    while (end <= this.input.length) {
      const s = this.input.slice(start, end);
      if (s[0] == s[1]) {
        return true;
      }
      start++;
      end++;
    }

    return false;
  }
}

// const b = "ugknbfddgicrmopn";
// const a = new SantaString(b);
// console.log(a.isGoodString());

import fs from "fs";
let total = 0;
// const INPUT = fs.readFileSync("../../data/05/ex.txt", "ascii").trim();
// const INPUT = fs.readFileSync("../../data/05/ex1.txt", "ascii").trim();
const INPUT = fs.readFileSync("../../data/05/data.txt", "ascii").trim();
INPUT.split("\n").forEach((word) => {
  const a = new SantaString(word);
  console.log(word, ": ", a.isGoodString_2());
  if (a.isGoodString_2()) {
    total++;
  }
});

console.log(total);
