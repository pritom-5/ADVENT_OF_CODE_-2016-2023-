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

    this.#printLights();
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

    this.#printLights();
  }

  toggle(from, to) {
    // can't figure out how to toggle interval easily

    // loop through every interval check this three condition
    // --------         --------------               ----------
    //     -------          ------              ----------

    // make a list of from tos to turn on lights based on difference

    this.lights.forEach((item) => {
      // fully covered
      if (from <= item[0] && to >= item[1]) {
        // turn whole block off
      } else if (item[0] < from && item[1] < to) {
        // left lobbed
        // turn from to item[1] off
      } else if (item[0] > from && item[1] > to) {
        // right logged
        // turn item[0] to to off
      }
    });

    console.log("lits_to_off", lits_to_off);
  }
}

const a = new LightGrid();
a.turnOn(10, 20);
a.turnOn(15, 22);
a.turnOn(5, 22);
a.turnOn(15, 25);
a.turnOn(2, 4);

a.turnOff(7, 12);

a.toggle(5, 14);
