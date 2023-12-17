class LightGrid {
  MAX_COL = 10;
  MAX_ROW = 10;
  lights = {};

  constructor() {
    this.#populateLights();
  }

  #populateLights() {
    for (let i = 0; i < this.MAX_ROW; i++) {
      this.lights[i] = [];
    }
  }

  /**
   * @param {[number, number]} from
   * @param {[number, number]} to
   */
  add(from, to) {
    const row_start = from[1];
    const row_end = to[1];
    const col_start = from[0];
    const col_end = to[0];

    for (let r = row_start; r <= row_end; r++) {
      const min_col = row_start === r ? col_start : 0;
      const max_col = row_end === r ? col_end : this.MAX_COL;

      for (let c = min_col; c <= max_col; c++) {
        if (!this.lights[r].includes(c)) {
          this.lights[r].push(c);
        }
      }

      this.#sortArr(r);
    }
  }

  #filterOutInvalidLights(row_idx) {
    this.lights[row_idx] = this.lights[row_idx].filter((item) => item !== -1);
  }

  /**
   * @param {[number, number]} from
   * @param {[number, number]} to
   */
  remove(from, to) {
    for (let r = from[1]; r <= to[1]; r++) {
      const row_start = from[1];
      const row_end = to[1];
      const col_start = from[0];
      const col_end = to[0];

      const min_col = row_start === r ? col_start : 0;
      const max_col = row_end === r ? col_end : this.MAX_COL;

      for (let j = 0; j <= this.lights[r].length; j++) {
        if (this.lights[r][j] >= min_col && this.lights[r][j] <= max_col) {
          this.lights[r][j] = -1;
        }
      }

      this.#filterOutInvalidLights(r);
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
        if (!this.lights[r].includes(c)) {
          this.lights[r].push(c);
        }
      }

      this.#sortArr(r);
    }

    this.#filterOutInvalidLights(r);
  }

  #sortArr(row_idx) {
    this.lights[row_idx].sort((a, b) => a > b);
  }

  print() {
    console.log(this.lights);
  }
}

// [x, y] [x1, y1]
const a = new LightGrid();
a.add([2, 3], [4, 4]);
a.add([0, 3], [9, 4]);

a.remove([4, 3], [5, 4]);

a.print();
