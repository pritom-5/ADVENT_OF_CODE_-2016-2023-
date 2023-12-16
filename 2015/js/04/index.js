class GetHash {
  /** @param {string} input  */
  constructor(input) {
    this.input = input;
  }

  /** @returns {string} */
  getHash() {
    if (this.input && this.input.length > 0) {
      const value = Bun.MD5.hash(this.input, "hex");
      return value;
    }
    return "";
  }

  /** @param {string} hash @returns {boolean} */
  static checkForFiveZeros(hash) {
    return;
  }
}

// const INPUT = "ABC";
const INPUT = "ckczppom";
const a = new GetHash(INPUT);
console.log(a.getHash());
