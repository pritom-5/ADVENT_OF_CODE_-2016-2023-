const input = `R 6 (#70c710)
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
  TRENCH_ARR = { 0: { low: 0, high: 0 } }; // row: {low: , high: }
  prev_row = 0;
  prev_col = 0;
  DIR = {
    U: { r: -1, c: 0 },
    D: { r: 1, c: 0 },
    L: { r: 0, c: -1 },
    R: { r: 0, c: 1 },
  };

  constructor() {}

  parseInput(line) {
    const [dir, no, color] = line.split(" ");

    switch (dir) {
      case "U":
        {
          for (let i = 1; i <= +no; i++) {
            if (this.TRENCH_ARR[this.prev_row - i]) {
              const curr_low = this.TRENCH_ARR[this.prev_row - i].low;
              this.TRENCH_ARR[this.prev_row - i].low = Math.min(
                this.prev_col,
                curr_low
              );
              const curr_high = this.TRENCH_ARR[this.prev_row - i].high;
              this.TRENCH_ARR[this.prev_row - i].low = Math.max(
                this.prev_col,
                curr_high
              );
            } else {
              this.TRENCH_ARR[this.prev_row + i] = {
                low: this.prev_col,
                high: this.prev_col,
              };
            }
          }
          this.prev_row -= +no;
        }
        break;
      case "D":
        {
          for (let i = 1; i <= +no; i++) {
            if (this.TRENCH_ARR[this.prev_row + i]) {
              const curr_low = this.TRENCH_ARR[this.prev_row + i].low;
              this.TRENCH_ARR[this.prev_row + i].low = Math.min(
                this.prev_col,
                curr_low
              );

              const curr_high = this.TRENCH_ARR[this.prev_row + i].high;
              this.TRENCH_ARR[this.prev_row + i].low = Math.max(
                this.prev_col,
                curr_high
              );
            } else {
              this.TRENCH_ARR[this.prev_row + i] = {
                low: this.prev_col,
                high: this.prev_col,
              };
            }
          }
          this.prev_row += +no;
        }
        break;
      case "L":
        {
          this.TRENCH_ARR[this.prev_row].low -= +no;
          this.prev_col -= +no;
        }
        break;
      case "R":
        {
          this.TRENCH_ARR[this.prev_row].high += +no;
          this.prev_col += +no;
        }
        break;

      default:
        break;
    }
  }

  print() {
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

  a.print();
}

parse(input);
