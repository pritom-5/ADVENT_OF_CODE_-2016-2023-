export type Rorate_obj = {
  action: "rotate";
  type: "row" | "column";
  idx: number;
  rotate_val: number;
};
export type Rect_obj = { action: "rect"; w: number; h: number };
export type Action_obj = Rect_obj | Rorate_obj;
export type Action_obj_arr = Action_obj[];

const action_obj_arr: Action_obj_arr = [];

import fs from "fs";
const DATA_PATH = "./data.txt";
const raw_data = fs.readFileSync(DATA_PATH, "utf-8").trim();
const split_data = raw_data.split("\n");

function parseData(data: any) {
  for (let item of data) {
    item.split(" ")[0] === "rect" ? parseRect(item) : parseRotate(item);
  }

  console.log(action_obj_arr);
}
parseData(split_data);

function parseRect(data: any) {
  const [w, h] = data.trim().split(" ")[1].split("x");
  action_obj_arr.push({ action: "rect", w: +w, h: +h } as Rect_obj);
}

function parseRotate(data: any) {
  const first = data.split("=");
  const action: Rorate_obj = {
    action: "rotate",
    type: "row",
    idx: 0,
    rotate_val: 0,
  };

  action.type = first[0].split(" ")[1].trim();
  action.idx = Number(first[1].split(" by ")[0]);
  action.rotate_val = Number(first[1].split(" by ")[1]);

  action_obj_arr.push(action);
}

export default action_obj_arr;
