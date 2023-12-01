type Marker_Data_t = {
  start_idx: number;
  closing_idx: number;
  width: number;
  repeat: number;
};

export default class Decompress {
  private original: string;
  private copied: string;
  private weights: number[];

  constructor(input: string) {
    this.original = input;
    this.copied = "";
    this.weights = new Array(input.length).fill(1);
  }

  // AOC 02
  parseOriginal_03(): number {
    let total_weight = 0;

    for (let i = 0; i < this.original.length; ) {
      if (this.original[i] === "(") {
        const { start_idx, closing_idx, width, repeat } = this.getMarkerData(i);
        for (let j = closing_idx + 1; j <= closing_idx + width; j++) {
          this.weights[j] = this.weights[j] * repeat;
        }

        i = closing_idx + 1;
      } else {
        total_weight += this.weights[i];
        console.log(this.weights);
        i++;
      }
    }

    console.log(total_weight);
    return total_weight;
  }

  // update this and do swap in place
  parseOriginal() {
    for (let i = 0; i < this.original.length; ) {
      if (this.original[i] === "(") {
        const { closing_idx, width, repeat } = this.getMarkerData(i);

        const slice = this.original.slice(
          closing_idx + 1,
          closing_idx + width + 1
        );
        this.copied += slice.repeat(repeat);

        i = closing_idx + 1;
      } else {
        this.copied += this.original[i];
        i++;
      }
    }
  }

  private getMarkerData(start_idx: number): Marker_Data_t {
    const closing_idx = this.original.indexOf(")", start_idx);
    const sliced_data = this.original.slice(start_idx + 1, closing_idx);

    const [width, repeat] = sliced_data.split("x");

    return {
      start_idx,
      closing_idx,
      width: Number(width),
      repeat: Number(repeat),
    };
  }

  getLength() {
    const length = this.copied.length;
    console.log(length);
  }

  getCopied() {
    return this.copied;
  }

  getLength_02(): number {
    return this.parseOriginal_03();
  }
}

// const INPUT = "A(2x2)BCD(2x2)EFG";
// const INPUT_1 = "ADVENT";
// const INPUT_2 = "A(1x5)BC";
// const INPUT_3 = "(3x3)XYZ";
// const INPUT_4 = "(6x1)(1x3)A";
// const INPUT_5 = "X(8x2)(3x3)ABCY";
// const INPUT_6 = "(27x12)(20x12)(13x14)(7x10)(1x12)A";
// const INPUT_7 = "(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN";

import fs from "fs";
const DATA_PATH = "./data.txt";
const AOC_INPUT = fs.readFileSync(DATA_PATH, "utf-8").trim();

// const dec_0 = new Decompress(AOC_INPUT);
// dec_0.getLength_02();
