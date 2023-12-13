// too low part 1: 19822
const input_1 = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`;

const input_2 = `#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

// const flipped_input = rotateInput(input_1);
// const { has_mirror, line } = findHorizontalRefLine(flipped_input);

// console.log(has_mirror, line);

class Pattern {
  rotated_pattern_grid = [];
  horizontal_value = 0;
  vertical_value = 0;
  total = 0;
  constructor(pattern, index) {
    this.pattern_grid = pattern.split("\n");
    this.index = index;

    this.rotateInput();
    this.horizontal_value = this.findHorizontalRefLine(this.pattern_grid);
    this.vertical_value = this.findHorizontalRefLine(this.rotated_pattern_grid);

    this.findTotal();
  }

  findTotal() {
    this.total =
      (this.horizontal_value.has_mirror ? this.horizontal_value.line : 0) *
        100 +
      (this.vertical_value.has_mirror ? this.vertical_value.line : 0);
  }

  flipeedSliceString(chunk_slice) {
    const result = [];

    for (let i = 0; i < chunk_slice.length; i++) {
      result.unshift(chunk_slice[i]);
    }
    return result.join(" ");
  }

  findHorizontalRefLine(pattern_grid) {
    let line = 1;

    while (line < pattern_grid.length) {
      const chunk_len = Math.min(line, pattern_grid.length - line);

      const ch_1 = pattern_grid.slice(line - chunk_len, line).join(" ");
      const ch_2 = pattern_grid.slice(line, line + chunk_len);
      const ch_2_string = this.flipeedSliceString(ch_2);

      // console.log(ch_1);
      // console.log(ch_2_string);
      // console.log("\n");

      if (ch_1 === ch_2_string) {
        break;
      }

      line++;
    }

    const has_mirror = line < pattern_grid.length;

    return { has_mirror, line };
  }

  rotateInput() {
    let new_arr = new Array(this.pattern_grid[0].length)
      .fill(0)
      .map((item) => new Array(this.pattern_grid.length).fill(0));

    for (let [lx, line] of this.pattern_grid.entries()) {
      for (let [cx, ch] of line.split("").entries()) {
        new_arr[cx][lx] = ch;
      }
    }

    new_arr = new_arr.map((item) => item.join(""));

    this.rotated_pattern_grid = new_arr;
  }
}

const fs = require("fs");
function main() {
  const inputs = fs
    // .readFileSync("./ex.txt", "ascii")
    .readFileSync("./data.txt", "ascii")
    // .readFileSync("./ex_1.txt", "ascii")
    .trim()
    .split("\n\n");

  const Patterns = [];

  inputs.forEach((item, idx) => {
    Patterns.push(new Pattern(item, idx));
  });

  const total = Patterns.reduce((acc, curr) => acc + curr.total, 0);

  console.log(total);
  //  logger(Patterns);
}

main();

function logger(patterns) {
  patterns.forEach((item) => {
    console.log(item, "\n");
    console.log("====================================");
  });
}
