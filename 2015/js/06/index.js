// [[10, 20], []];
// [8, 15][(8, 22)][(12, 15)][(12, 22)];

class LightGrid {
  lights = [];

  #sortLights() {
    this.lights.sort((a, b) => a[0] > b[0]);
  }

  mergeArray() {
    for (let i = 0; i < this.lights.length - 1; ) {
      if (this.lights[i][1] >= this.lights[i + 1][0]) {
        const new_arr = [this.lights[i][0], this.lights[i + 1][1]];
        this.lights = [
          ...this.lights.slice(0, i),
          new_arr,
          ...this.lights.slice(i + 2),
        ];
      } else {
        i++;
      }
    }
  }

  #printLights() {
    console.log(this.lights);
  }

  turnOn(from, to) {
    this.lights.push([from, to]);

    this.#sortLights();
    this.mergeArray();

    //  this.#printLights();
  }

  turnOff(from, to) {
    // find starting point that covers from or equal to from
    const start_idx = this.lights.findIndex(
      (item) => item[0] <= from && item[1] >= from
    );
    const start = this.lights[start_idx][0];

    // find to that's less than or equal end point
    const end_idx = this.lights.findIndex(
      (item) => item[1] >= to && item[0] <= from
    );
    const end = this.lights[end_idx][1];

    if (start === from && end === to) {
      this.lights = [
        ...this.lights.slice(0, start_idx),
        ...this.lights.slice(end_idx + 1),
      ];
    } else if (start === from && end > to) {
      this.lights = [
        ...this.lights.slice(0, start_idx),
        [to + 1, end],
        ...this.lights.slice(end_idx + 1),
      ];
    } else if (start < from && end === to) {
      this.lights = [
        ...this.lights.slice(0, start_idx),
        [start, from - 1],
        ...this.lights.slice(end_idx + 1),
      ];
    } else if (start < from && end > to) {
      this.lights = [
        ...this.lights.slice(0, start_idx),
        [start, from - 1],
        [to + 1, end],
        ...this.lights.slice(end_idx + 1),
      ];
    }

    //   this.#printLights();
  }

  toggle(from, to) {
    for (let i = from; i <= to; ) {
      const isInIntervalIndex = this.lights.findIndex(
        (item) => i >= item[0] && i <= item[1]
      );

      if (isInIntervalIndex !== -1) {
        const end = this.lights[isInIntervalIndex][1];
        this.turnOff(i, Math.min(this.lights[isInIntervalIndex][1], to));
        i = end + 1;
      } else {
        const nextIntervalIndex = this.lights.findIndex((item) => i < item[0]);
        const nextStart = this.lights[nextIntervalIndex][0];
        this.turnOn(i, Math.min(this.lights[nextIntervalIndex][0] - 1, to));
        i = nextStart;
      }
    }

    //    this.#printLights();
  }
}

// const a = new LightGrid();
// a.turnOn(10, 20);
// a.turnOn(15, 22);
// a.turnOn(5, 22);
// a.turnOn(15, 25);
// a.turnOn(2, 4);

// a.turnOff(7, 12);

// // a.toggle(5, 14);
// a.toggle(5, 13);

import fs from "fs";

const input_arr = fs
  // .readFileSync("../../data/06/data.txt", "ascii")
  .readFileSync("../../data/06/ex.txt", "ascii")
  .trim()
  .split("\n");

const lights = new LightGrid();

input_arr.forEach((line) => {
  const [ins, from, through, to] = line.split(" ");

  switch (ins) {
    case "on":
      {
        lights.turnOn(+from, +to);
      }
      break;
    case "off":
      {
        lights.turnOff(+from, +to);
      }
      break;
    case "toggle":
      {
        lights.toggle(+from, +to);
      }
      break;

    default:
      break;
  }
});
