import fs from "fs";

type Light_state_t = 1 | 0;
type PointT = [number, number];
type ActionT = "on" | "off" | "toggle";

class Lights {
  private LIGHTS: Light_state_t[][] = [];
  private Light_state: Record<"on" | "off", Light_state_t> = {
    on: 1,
    off: 0,
  };

  constructor(private nos_col: number, private nos_row: number) {
    this.nos_col = nos_col;
    this.nos_row = nos_row;

    this.populate_lights();
  }

  private populate_lights() {
    this.LIGHTS = new Array(this.nos_row)
      .fill(0)
      .map((_) => new Array(this.nos_col).fill(0));
  }

  private turnon(light_point: PointT) {
    this.LIGHTS[light_point[0]][light_point[1]] = this.Light_state.on;
  }

  private turnoff(light_point: PointT) {
    this.LIGHTS[light_point[0]][light_point[1]] = this.Light_state.off;
  }

  private toggle(light_point: PointT) {
    const current_state = this.LIGHTS[light_point[0]][light_point[1]];
    this.LIGHTS[light_point[0]][light_point[1]] =
      current_state === this.Light_state.on
        ? this.Light_state.off
        : this.Light_state.on;
  }

  // 5, 9

  public brain(from: PointT, to: PointT, action: ActionT) {
    const [from_col, from_row] = from;
    const [to_col, to_row] = to;

    for (let r = from_row; r <= to_row; r++) {
      const min_col = r === from_row ? from_col : 0;
      const max_col = r === to_row ? to_col : this.nos_col - 1;

      for (let c = min_col; c <= max_col; c++) {
        switch (action) {
          case "on":
            {
              this.turnon([r, c]);
            }
            break;

          case "off":
            {
              this.turnoff([r, c]);
            }
            break;

          case "toggle":
            {
              this.toggle([r, c]);
            }
            break;
          default:
            break;
        }
      }
    }
    this.print();
  }

  public totalNosLights() {
    let total = 0;
    this.LIGHTS.forEach((line) => {
      line.forEach((item) => {
        if (item === this.Light_state.on) {
          total++;
        }
      });
    });

    console.log(total);
  }
  private print() {
    this.LIGHTS.forEach((item) => console.log(item));
  }
}
function parseInput(input: string[], l: Lights) {
  input.forEach((line) => {
    const [action, from, _, to] = line.split(" ");
    const from_cor = from.split(",").map((item) => parseInt(item)) as PointT;
    const to_cor = to.split(",").map((item) => parseInt(item)) as PointT;
    l.brain(from_cor, to_cor, action as ActionT);
  });

  l.totalNosLights();
}

function main() {
  const l = new Lights(1000, 1000);
  const path = "../../../data/06/data.txt";
  const input = fs
    .readFileSync(path, "ascii")
    .trim()
    .split("\n")
    .map((item) => item.trim());

  parseInput(input, l);
}
// main();

function test() {
  const l = new Lights(10, 10);
  const input_test = ["toggle 1,5 through 9,9", "on 1,5 through 9,9"];
  parseInput(input_test, l);
}

test();
