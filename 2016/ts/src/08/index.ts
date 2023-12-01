import action_obj_arr, { Action_obj } from "./util";

type Pixel_items = "#" | ".";

class Monitor {
  DISPLAY: Pixel_items[][];
  WIDTH: number;
  HEIGHT: number;

  constructor(width: number, height: number) {
    this.DISPLAY = new Array(height)
      .fill(0)
      .map((item) => new Array(width).fill("."));

    this.WIDTH = width;
    this.HEIGHT = height;
  }

  private createRectangle(width: number, height: number) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.DISPLAY[i][j] = "#";
      }
    }
  }

  private rotateCol(col_idx: number, rotation_val: number) {
    for (let i = 1; i <= rotation_val; i++) {
      let prev_val: Pixel_items = ".";

      for (let current_idx = 0; current_idx < this.HEIGHT; current_idx++) {
        if (current_idx == 0) {
          prev_val = this.DISPLAY[current_idx][col_idx];
          this.DISPLAY[current_idx][col_idx] =
            this.DISPLAY[this.HEIGHT - 1][col_idx];
          continue;
        }
        let temp = this.DISPLAY[current_idx][col_idx];

        this.DISPLAY[current_idx][col_idx] = prev_val;
        prev_val = temp;
      }
    }
  }

  private rotateRow(row_idx: number, rotation_val: number) {
    for (let i = 1; i <= rotation_val; i++) {
      let prev_val: Pixel_items = ".";

      for (let current_idx = 0; current_idx < this.WIDTH; current_idx++) {
        if (current_idx == 0) {
          prev_val = this.DISPLAY[row_idx][current_idx];

          this.DISPLAY[row_idx][current_idx] =
            this.DISPLAY[row_idx][this.WIDTH - 1];

          continue;
        }

        let temp = this.DISPLAY[row_idx][current_idx];

        this.DISPLAY[row_idx][current_idx] = prev_val;
        prev_val = temp;
      }
    }
  }

  rotateDisplay(action_obj: Action_obj) {
    switch (action_obj.action) {
      case "rect": {
        this.createRectangle(action_obj.w, action_obj.h);
        break;
      }

      case "rotate": {
        switch (action_obj.type) {
          case "column": {
            this.rotateCol(action_obj.idx, action_obj.rotate_val);
            break;
          }
          case "row": {
            this.rotateRow(action_obj.idx, action_obj.rotate_val);
            break;
          }
        }

        break;
      }
    }

    // @remove
    this.printDisplay();
  }

  findTotal() {
    let counter = 0;

    for (let rows of this.DISPLAY) {
      for (let col of rows) {
        if (col === "#") {
          counter++;
        }
      }
    }

    console.log(counter);
  }

  private printDisplay() {
    for (let i = 0; i < this.HEIGHT; i++) {
      console.log(this.DISPLAY[i].join(""));
    }
    console.log("----------------");
  }
}

////////////////////////////
const monitor = new Monitor(50, 6);

for (let item of action_obj_arr) {
  monitor.rotateDisplay(item);
}

monitor.findTotal();
