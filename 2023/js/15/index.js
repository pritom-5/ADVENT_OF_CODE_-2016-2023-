// const i = "HASH";
// const i2 = "rn";
// const i3 = "cm-";
// const a = new HashingInput(i2);
// console.log(a.getHashingValue());

// let total = 0;
// import fs from "fs";
// const input = fs.readFileSync("../../data/15/data.txt", "ascii").trim();
// input.split(",").forEach((item) => {
//   const x = new HashingInput(item);
//   total += x.getHashingValue();
// });

class HashingInput {
  LIMIT = 256;
  MULTIPLIER_FACTOR = 17;

  /** @param {string} input  */
  constructor(input) {
    this.input = input;
  }
  /**
   *  @param {string} input
   *  @returns {number}
   */
  getHashingValue() {
    let total = 0;

    this.input
      .trim()
      .split("")
      .forEach((ch) => {
        const ascii_code = ch.charCodeAt(0);
        total += ascii_code;
        total *= this.MULTIPLIER_FACTOR;
        total = total % this.LIMIT;
      });

    return total;
  }
}

class Box {
  lens = [];
  constructor(no) {
    this.no = no;
  }

  #getExistingLens(lens_label) {
    // check if lens in box
    const lens_index = this.lens.findIndex(
      ([label, _]) => label === lens_label
    );
    return lens_index;
  }

  // on =
  /** @param {string} lens_label  @param {number} focus */
  addLens(lens_label, focus) {
    const lens_index = this.#getExistingLens(lens_label);
    if (lens_index !== -1) {
      this.lens.push([lens_label, focus]);
    } else {
      this.lens[lens_index] = [lens_label, focus];
    }
  }

  // on -
  removeLens(lens_label) {
    // remove and push other lens
    if (this.#getExistingLens(lens_label) !== -1) {
      this.lens = this.lens.filter(([label, _]) => label !== lens_label);
    }
  }
}

const BOXES = {};

function initialize_boxes() {
  for (let i = 0; i < 256; i++) {
    BOXES[i] = new Box(i);
  }
}

let total = 0;
import fs from "fs";
// const input = fs.readFileSync("../../data/15/data.txt", "ascii").trim();
const input = fs.readFileSync("../../data/15/ex.txt", "ascii").trim();
input.split(",").forEach((item) => {
  const label = item.split(0, 2);
  const operation = item[2];
  // get box number using HASH

  switch (operation) {
    case "-":
      // operate on the box
      break;
    case "=":
      // extract focus
      // operate on the box
      break;
  }
  const x = new HashingInput(item);
  total += x.getHashingValue();
});

// console.log(total);
