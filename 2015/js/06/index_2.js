class LightGrid {
  MAX_COL = 10;
  MAX_ROW = 10;
  lights = {};

  constructor() {}

  /**
   * @param {[number, number]} from
   * @param {[number, number]} to
   */
  add(from, to) {
    for (let r = from[1]; r <= to[1]; r++) {
      const col_limit = to[1] === r ? to[1] : this.MAX_COL;
      const col_start = from[1] === r ? from[1] : 0;
      for (let c = col_start; c <= col_limit; c++) {
        if (this.lights[r]) {
          if (!this.lights[r].includes(c)) {
            this.lights[r][c] = 1;
          }
        } else {
          this.lights[r] = new Array(this.MAX_COL).fill(0);
        }
      }
      this.#sortArr(r);
    }
  }

  /**
   * @param {[number, number]} from
   * @param {[number, number]} to
   */
  remove(from, to) {
    for (let r = from[1]; r <= to[1]; r++) {
      const col_limit = to[1] === r ? to[1] : this.MAX_COL;
      const col_start = from[1] === r ? from[1] : 0;

      this.#sortArr(r);
    }
  }

  #sortArr(row_idx) {
    this.lights[row_idx].sort((a, b) => a > b);
  }

  print() {
    console.log(this.lights);
  }
}

const a = new LightGrid();
a.add([2, 3], [4, 4]);
a.add([0, 3], [9, 4]);

a.print();
