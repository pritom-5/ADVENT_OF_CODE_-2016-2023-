//  give up.
// draw rectangles and figure out area in 2d grid
const INPUT = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

class Trench {
  TRENCH_ARR = { 0: [0] }; // row: {low: , high: }
  prev_row = 0;
  prev_col = 0;
  count = 0;

  constructor() {}

  addNumberToArr(row, col) {
    if (!this.TRENCH_ARR[row]) {
      this.TRENCH_ARR[row] = [];
    }

    this.TRENCH_ARR[row].push(col);
  }

  sortArr() {
    Object.values(this.TRENCH_ARR).forEach((line, l_ix) => {
      this.TRENCH_ARR[l_ix] = line.sort((a, b) => a > b);
    });
  }

  getCount(row) {
    if (this.TRENCH_ARR[row].length == 2) {
      this.count += Math.abs(this.TRENCH_ARR[row][0] - this.TRENCH_ARR[row][1]);
      this.TRENCH_ARR[row].pop();
      this.TRENCH_ARR[row].pop();
    }
  }

  parseInput(line) {
    let [dir, no] = line.split(" ");
    no = Number(no);

    if (dir === "U") {
      for (let i = 1; i <= no; i++) {
        this.addNumberToArr(this.prev_row - i, this.prev_col);
      }
      this.prev_row -= no;
    } else if (dir === "D") {
      for (let i = 1; i <= no; i++) {
        this.addNumberToArr(i + this.prev_row, this.prev_col);
      }
      this.prev_row += no;
    } else if (dir === "L") {
      this.addNumberToArr(this.prev_row, this.prev_col - no);
      this.prev_col -= no;
    } else if (dir === "R") {
      this.addNumberToArr(this.prev_row, this.prev_col + no);
      this.prev_col += no;
    }

    this.print(line);
  }

  print(line) {
    console.log(line);
    console.log("prev_row: ", this.prev_row, "prev_col: ", this.prev_col);
    console.log(this.TRENCH_ARR);
  }
}

function parse(_input) {
  const a = new Trench();
  _input
    .split("\n")
    .map((item) => item.trim())
    .forEach((item) => {
      a.parseInput(item);
    });

  console.log(a.TRENCH_ARR);
}

// parse(INPUT);

import fs from "fs";
const path = "../../data/18/data.txt";
function main() {
  const input = fs.readFileSync(path, "ascii").trim();
  parse(input);
}
main();
