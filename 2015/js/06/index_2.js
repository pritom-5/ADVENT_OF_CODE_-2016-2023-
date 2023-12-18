class LightGrid {
  lights = {};
  LIGHT_STATE = {
    on: 1,
    off: 0,
  };

  constructor(max_col = 9, max_row = 9) {
    this.MAX_COL = max_col;
    this.MAX_ROW = max_row;

    this.#populateLights();
  }

  #populateLights() {
    for (let i = 0; i <= this.MAX_ROW; i++) {
      this.lights[i] = new Array(this.MAX_COL + 1).fill(0);
    }
  }

  /**
   * @param {[number, number]} from
   * @param {[number, number]} to
   */
  turnOn(from, to) {
    // console.log("turnon: ", from, to);

    const row_start = from[1];
    const row_end = to[1];
    const col_start = from[0];
    const col_end = to[0];

    for (let r = row_start; r <= row_end; r++) {
      const min_col = row_start === r ? col_start : 0;
      const max_col = row_end === r ? col_end : this.MAX_COL;

      for (let c = min_col; c <= max_col; c++) {
        this.lights[r][c] = this.LIGHT_STATE.on;
      }
    }
  }

  /**
   * @param {[number, number]} from
   * @param {[number, number]} to
   */
  turnOff(from, to) {
    const row_start = from[1];
    const row_end = to[1];
    const col_start = from[0];
    const col_end = to[0];

    for (let r = row_start; r <= row_end; r++) {
      const min_col = row_start === r ? col_start : 0;
      const max_col = row_end === r ? col_end : this.MAX_COL;

      for (let c = min_col; c <= max_col; c++) {
        this.lights[r][c] = this.LIGHT_STATE.off;
      }
    }
  }

  toggle(from, to) {
    const row_start = from[1];
    const row_end = to[1];
    const col_start = from[0];
    const col_end = to[0];

    for (let r = row_start; r <= row_end; r++) {
      const min_col = row_start === r ? col_start : 0;
      const max_col = row_end === r ? col_end : this.MAX_COL;

      for (let c = min_col; c <= max_col; c++) {
        this.lights[r][c] =
          this.lights[r][c] === this.LIGHT_STATE.off
            ? this.LIGHT_STATE.on
            : this.LIGHT_STATE.off;
      }
    }
  }

  getNosLightOn() {
    let total = 0;

    Object.values(this.lights).forEach((item) => {
      item.forEach((num) => {
        if (num === this.LIGHT_STATE.on) {
          total++;
        }
      });
    });

    console.log(total);
    return total;
  }

  #sortArr(row_idx) {
    this.lights[row_idx].sort((a, b) => a > b);
  }

  print() {
    console.log(this.lights);
  }
}

function test() {
  const a = new LightGrid();
  a.turnOn([2, 3], [4, 4]);
  a.turnOn([0, 3], [9, 4]);

  a.print();
  a.turnOff([4, 3], [5, 4]);

  a.print();
  a.toggle([1, 3], [7, 4]);

  a.print();

  a.getNosLightOn();
}
// test();

import fs from "fs";

function main() {
  const input_arr = fs
    .readFileSync("../../data/06/data.txt", "ascii")
    // .readFileSync("../../data/06/ex.txt", "ascii")
    .trim()
    .split("\n");

  const lights = new LightGrid(999, 999);

  input_arr.forEach((line) => {
    const [ins, from, through, to] = line.split(" ");

    // console.log("main: ", ins, from, to);

    const from_arr = from.split(",").map((item) => parseInt(item));
    const to_arr = to.split(",").map((item) => parseInt(item));

    switch (ins) {
      case "on":
        {
          lights.turnOn(from_arr, to_arr);
        }
        break;
      case "off":
        {
          lights.turnOff(from_arr, to_arr);
        }
        break;
      case "toggle":
        {
          lights.toggle(from_arr, to_arr);
        }
        break;

      default:
        break;
    }
  });

  lights.getNosLightOn();
}

main();
