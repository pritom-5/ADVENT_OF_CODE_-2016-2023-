/**
 * both part 1 and part 2 done
 */

import fs from "fs";

// const i = "HASH"; // const i2 = "rn"; // const i3 = "cm-";
// const a = new HashingInput(i2);
// console.log(a.getHashingValue());

class HashingInput {
  LIMIT = 256;
  MULTIPLIER_FACTOR = 17;

  /** @param {string} input  */
  constructor(input) {
    this.input = input;
  }
  /**  @param {string} input @returns {number} */
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
/**
 * @typedef {string} LensLabelT
 * @typedef {number} LensFocusT
 * @typedef {[LensLabelT, LensFocusT]} LensT*/

class Box {
  /** @type {Array<LensT>} */
  lens = [];

  /** @param {LensFocusT} no  */
  constructor(no) {
    this.no = +no;
  }

  /** @param {LensLabelT} lens_label  @returns {number} -1 if item not found and index value if found */
  #getExistingLens(lens_label) {
    // check if lens in box
    const lens_index = this.lens.findIndex(
      ([label, _]) => label === lens_label
    );
    return lens_index;
  }

  /** @param {LensLabelT} lens_label  @returns {number} */
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

  /** @param {LensLabelT} lens_label  @param {LensFocusT} focus */
  addLens(lens_label, focus) {
    const lens_index = this.#getExistingLens(lens_label);

    if (lens_index !== -1) {
      this.lens[lens_index] = [lens_label, focus];
    } else {
      this.lens.push([lens_label, focus]);
    }
  }

  /** @param {LensLabelT} lens_label  */
  removeLens(lens_label) {
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

////////////////////////////////////////////////////

/** @returns {Array<string>} */
function assignLensIntoBox() {
  /** @type {Set<string>} */
  const list_of_labels = new Set();

  const input = fs.readFileSync("../../data/15/data.txt", "ascii").trim();
  // const input = fs.readFileSync("../../data/15/ex.txt", "ascii").trim();

  // loop through each input element
  input.split(",").forEach((item) => {
    // extract label and operator
    const label = item.match(/[a-zA-Z]+/)[0];
    const operation = item.match(/[-|=]/)[0];

    // get all the labels
    list_of_labels.add(label);

    // get box number using HASH
    const temp_a = new HashingInput(label);
    const box_no = temp_a.getHashingValue();

    switch (operation) {
      case "-":
        BOXES[`${box_no}`].removeLens(label);
        break;
      case "=":
        const focus = +item.match(/[0-9]/)[0];
        // operate on the box
        BOXES[`${box_no}`].addLens(label, focus);
        break;
    }
  });
  return Array.from(list_of_labels);
}

////////////////////////////////////////////////////

function getTotalValue(list_of_labels) {
  let total = 0;

  list_of_labels.forEach((label) => {
    Object.values(BOXES).forEach((box) => {
      total += box.findValueForSpecificLensLabel(label);
    });
  });

  console.log(total);
}

function getResultPart1() {
  let total = 0;
  const input = fs.readFileSync("../../data/15/data.txt", "ascii").trim();
  input.split(",").forEach((item) => {
    const x = new HashingInput(item);
    total += x.getHashingValue();
  });
  console.log(total);
}

function getResultPart2() {
  initialize_boxes();
  const list_of_labels = assignLensIntoBox();
  getTotalValue(list_of_labels);
}

//////////////////////
function main() {
  // getResultPart2();
  // getResultPart1();
}
main();
