class Present {
  /** @type {number} length */
  #length;
  /** @type {number} width */
  #width;
  /** @type {number} height */
  #height;

  /**
   * @param {string} dimension
   */
  constructor(dimension) {
    [this.#length, this.#width, this.#height] = dimension
      .split("x")
      .map((item) => parseInt(item));
  }

  /** @return {number} */
  getTotalWrapperNeeded() {
    return this.#getWrapper() + this.#getExtra();
  }

  /** @return {number} */
  getTotalRibbonLength() {
    return this.#getRibbonLength() + this.#getBow();
  }

  /** @returns {number} */
  #getWrapper() {
    return (
      2 * this.#length * this.#width +
      2 * this.#width * this.#height +
      2 * this.#height * this.#length
    );
  }

  /** @returns {number} */
  #getRibbonLength() {
    const dims = this.#getTwoShortestDims();
    return dims[0] * 2 + dims[1] * 2;
  }

  /** @returns {number} */
  #getBow() {
    return this.#height * this.#width * this.#length;
  }

  /** @returns {number} */
  #getExtra() {
    const dims = this.#getTwoShortestDims();
    return dims[0] * dims[1];
  }

  /** @returns {Array<number, number>} */
  #getTwoShortestDims() {
    const dims = [this.#length, this.#height, this.#width].sort(
      (a, b) => a > b
    );

    return [dims[0], dims[1]];
  }
}

// const a = new Present("2x3x4");
// const b = new Present("1x1x10");
// console.log(a.getTotalWrapperNeeded());
// console.log(b.getTotalWrapperNeeded());

import fs from "fs";
const input = fs.readFileSync("../../data/02/data.txt", "ascii").trim();

let TOTAL = 0;

////////// part 1
// input.split("\n").forEach((item) => {
//   const a = new Present(item);
//   TOTAL += a.getTotalWrapperNeeded();
// });

////////// part 2
input.split("\n").forEach((item) => {
  const a = new Present(item);
  TOTAL += a.getTotalRibbonLength();
});

console.log(TOTAL);
