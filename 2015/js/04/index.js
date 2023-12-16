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
    return hash.slice(0, 5) === "00000";
  }

  /** @param {string} hash @returns {boolean} */
  static checkForSixZeros(hash) {
    return hash.slice(0, 6) === "000000";
  }
}

// const INPUT = "ABC";
const INPUT = "ckczppom";

for (let i = 0; true; i++) {
  //   console.log(i);
  const a = new GetHash(`${INPUT}${i}`);
  const new_hash = a.getHash();
  if (GetHash.checkForSixZeros(new_hash)) {
    console.log(i);
    break;
  }
}
