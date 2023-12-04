/**
 * both 01 and 02 are correct
 */

type Number_index_t = {
  num: number;
  start: number;
  end: number;
  added: boolean;
};

type Number_indexes_t = Number_index_t[][];

export default class Three {
  input_arr: string[];
  number_indexes: Number_indexes_t;
  total_number: number;

  constructor(input_arr: string[]) {
    this.input_arr = input_arr;
    this.total_number = 0;
    this.number_indexes = [];

    this.fillNumberIndexes2();
    this.crawlLineForNumber();
    this.printNumberIndex();
  }

  fillNumberIndexes2() {
    // loop through grid rows
    for (let i = 0; i < this.input_arr.length; i++) {
      const number_obj_arr: Number_index_t[] = [];

      let start = Infinity;

      // loop through each ch of row
      for (let j = 0; j < this.input_arr[0].length; j++) {
        const ch = this.input_arr[i][j];

        const ch_is_number = !isNaN(Number(this.input_arr[i][j]));

        if (ch_is_number) {
          // set start point as Infinity will ensure that
          if (start > j) {
            start = j;
          }

          const next_ch_exists_and_is_not_a_number_or_dot =
            j + 1 <= this.input_arr[0].length &&
            (isNaN(Number(this.input_arr[i][j + 1])) ||
              this.input_arr[i][j + 1] === ".");

          if (next_ch_exists_and_is_not_a_number_or_dot) {
            const num = this.input_arr[i].slice(start, j + 1);
            const num_obj: Number_index_t = {
              start,
              end: j,
              num: Number(num),
              added: false,
            };
            number_obj_arr.push(num_obj);
            start = Infinity;
          }
        }
      }
      this.number_indexes.push(number_obj_arr);
    }
  }

  printNumberIndex() {
    for (let item of this.number_indexes) {
      console.log(JSON.stringify(item), "\n");
    }

    console.log(this.total_number);
  }

  crawlLineForNumber() {
    for (let row_idx = 0; row_idx < this.input_arr.length; row_idx++) {
      for (let col_idx = 0; col_idx < this.input_arr[0].length; col_idx++) {
        const ch = this.input_arr[row_idx][col_idx];
        if (this.isSpecialCharacter(ch)) {
          // this.checkNeighborsForNumber_01(row_idx, col_idx);
          this.checkNeighborsForNumber_02(row_idx, col_idx);
        }
      }
    }
    this.printNumberIndex();
  }

  isSpecialCharacter(ch: string): boolean {
    return isNaN(Number(ch)) && ch != ".";
  }

  isSpecialCharacter_02(ch: string): boolean {
    return ch === "*";
  }

  checkNeighborsForNumber_02(row_idx: number, col_idx: number) {
    const numbers: number[] = [];

    // check 3 x 3 grid
    for (let r of [row_idx - 1, row_idx, row_idx + 1]) {
      if (r >= this.input_arr.length || r < 0) {
        continue;
      }

      for (let c of [col_idx - 1, col_idx, col_idx + 1]) {
        if (c >= this.input_arr.length || c < 0) {
          continue;
        }

        const not_self = r === row_idx && c === col_idx;
        if (not_self) {
          continue;
        }

        const idx_of_number_surrounding_ch = this.number_indexes[r].findIndex(
          (item) => {
            if (item.added) {
              return false;
            }

            const a_number_exists_in_up_down_left_right_or_diagonal_pos =
              item.start <= c && item.end >= c;

            if (a_number_exists_in_up_down_left_right_or_diagonal_pos) {
              return true;
            }
          }
        );

        if (idx_of_number_surrounding_ch !== -1) {
          numbers.push(
            this.number_indexes[r][idx_of_number_surrounding_ch].num
          );
          this.number_indexes[r][idx_of_number_surrounding_ch].added = true;
        }
      }
    }

    const gear_has_exact_two_members = numbers.length === 2;

    if (gear_has_exact_two_members) {
      this.total_number += numbers[0] * numbers[1];
    }
  }

  checkNeighborsForNumber_01(row_idx: number, col_idx: number) {
    for (let r of [-1, 0, 1]) {
      const updated_row_idx = row_idx + r;

      if (updated_row_idx < 0 || updated_row_idx >= this.input_arr.length) {
        continue;
      }

      for (let c of [-1, 0, +1]) {
        const updated_col_idx = col_idx + c;
        if (r == 0 && c == 0) {
          continue;
        }

        if (
          updated_col_idx < 0 ||
          updated_col_idx >= this.input_arr[row_idx + r].length
        ) {
          continue;
        }

        const idx = this.number_indexes[updated_row_idx].findIndex((item) => {
          if (item.added) {
            return false;
          }
          if (
            item.start === updated_col_idx ||
            item.end === updated_col_idx ||
            (item.start < updated_col_idx && item.end > updated_col_idx)
          ) {
            return true;
          }
        });

        if (idx !== -1) {
          this.total_number += this.number_indexes[updated_row_idx][idx].num;
          this.number_indexes[updated_row_idx][idx].added = true;
        }
      }
    }
  }
}
