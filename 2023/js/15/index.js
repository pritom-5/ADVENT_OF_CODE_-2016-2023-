/**
 * part 2 : 58482 : too low
 */

import fs from "fs";

// const i = "HASH"; // const i2 = "rn"; // const i3 = "cm-";
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
    this.no = +no;
  }

  #getExistingLens(lens_label) {
    // check if lens in box
    const lens_index = this.lens.findIndex(
      ([label, _]) => label === lens_label
    );
    return lens_index;
  }

  /** @param {string} lens_label  */
  findValueForSpecificLensLabel(lens_label) {
    const lens_idx = this.#getExistingLens(lens_label);

    if (lens_idx === -1) {
      return 0;
    }

    const box_value = this.no + 1;
    const idx_value = lens_idx + 1;
    const lens_value = this.lens[lens_idx][1];

    return box_value * idx_value * lens_value;
  }

  // on =
  /** @param {string} lens_label  @param {number} focus */
  addLens(lens_label, focus) {
    const lens_index = this.#getExistingLens(lens_label);

    // remove
    // console.log(lens_index);

    if (lens_index !== -1) {
      this.lens[lens_index] = [lens_label, focus];
    } else {
      this.lens.push([lens_label, focus]);
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

/** @type {Array<Box>} */
const BOXES = {};

function initialize_boxes() {
  for (let i = 0; i < 256; i++) {
    BOXES[i] = new Box(i);
  }
}
initialize_boxes();

/** @returns {Array<string>} */
function assignLensIntoBox() {
  /** @type {Set<stirng>} */
  const list_of_labels = new Set();

  const input = fs.readFileSync("../../data/15/data.txt", "ascii").trim();
  // const input = fs.readFileSync("../../data/15/ex.txt", "ascii").trim();
  input.split(",").forEach((item) => {
    //    console.log(item);
    const label = item.slice(0, 2);
    const operation = item[2];

    list_of_labels.add(label);

    // get box number using HASH
    const temp_a = new HashingInput(label);
    const box_no = temp_a.getHashingValue();

    switch (operation) {
      case "-":
        // operate on the box
        BOXES[`${box_no}`].removeLens(label);
        break;
      case "=":
        // extract focus
        const focus = +item[3];
        // operate on the box
        BOXES[`${box_no}`].addLens(label, focus);
        break;
    }
  });
  return Array.from(list_of_labels);
}

function getTotalValue(list_of_labels) {
  let total = 0;

  list_of_labels.forEach((label) => {
    Object.values(BOXES).forEach((box) => {
      total += box.findValueForSpecificLensLabel(label);
    });

    // console.log(label, "----------", total);
  });

  console.log(total);
}

//////////////////////
function main() {
  let total = 0;
  const list_of_labels = assignLensIntoBox();
  getTotalValue(list_of_labels);
  // console.log(list_of_labels);
}
main();
// console.log(BOXES);
