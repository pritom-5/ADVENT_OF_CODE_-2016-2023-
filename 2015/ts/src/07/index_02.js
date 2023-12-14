const i = `x LSHIFT 2 -> f
x AND y -> d
123 -> x
y RSHIFT 2 -> g
456 -> y
NOT x -> h
x OR y -> e
NOT y -> i`;

class MyVar {
  ins = [];
  constructor(name, value = undefined) {
    this.name = name;
    this.value = value;
  }
  addIns(ins) {
    this.ins.push(ins);
  }
  addValue(value) {
    this.value = value;
  }
}

const MYVARS = {};
function parseInptu(input) {
  input.split("\n").forEach((item) => {
    const ins = item.split(" -> ")[0];
    const value = item.split(" -> ")[1];

    if (isNaN(Number(ins))) {
      const a = new MyVar(value);
      MYVARS[value] = a;
      a.addIns(ins);
    } else {
      MYVARS[value] = new MyVar(value, +ins);
    }
  });
}

function isInsEmpty() {
  return Object.values(MYVARS).every((val) => val.ins.length == 0);
}

function getResult3(ins) {
  const words = ins.split(" ");
  const v1 = words[0];
  const v2 = words[2];
  const type = words[1];

  switch (type) {
    case "LSHIFT":
      if (MYVARS[v1] && MYVARS[v1].value) {
        return MYVARS[v1].value << Number(v2);
      }
    case "RSHIFT":
      if (MYVARS[v1] && MYVARS[v1].value) {
        return MYVARS[v1].value >> Number(v2);
      }
    case "AND":
      if (!isNaN(Number(v1)) && MYVARS[v2].value) {
        return Number(v1) & MYVARS[v2].value;
      }
      if (MYVARS[v1] && MYVARS[v2] && MYVARS[v1].value && MYVARS[v2].value) {
        return MYVARS[v1].value & MYVARS[v2].value;
      }
    case "OR":
      if (MYVARS[v1] && MYVARS[v2] && MYVARS[v1].value && MYVARS[v2].value) {
        return MYVARS[v1].value | MYVARS[v2].value;
      }
    default:
      break;
  }
}

function getResultNot(ins) {
  const words = ins.split(" ");
  const v2 = words[1];

  if (MYVARS[v2] && MYVARS[v2].value) {
    return 65536 + ~MYVARS[v2].value;
  }
}

function addValueFromVar(ins, item_name) {
  const var_1 = ins[0];
  const value = MYVARS[var_1].value;

  if (value) {
    MYVARS[item_name].addValue(value);
  }
}

function parseIns() {
  while (!isInsEmpty()) {
    for (let item of Object.values(MYVARS)) {
      // @remove
      const _ = MYVARS;

      // console.log("\nitem: ", item);
      if (item.ins.length !== 0) {
        if (item.ins[0].split(" ").length === 3) {
          const res = getResult3(item.ins[0]);
          if (res) {
            item.addValue(res);
            item.ins.shift();
          }
        } else if (item.ins[0].split(" ").length === 2) {
          const res = getResultNot(item.ins[0]);
          if (res) {
            item.addValue(res);
            item.ins.shift();
          }
        } else if (item.ins[0].split(" ").length === 1) {
          addValueFromVar(item.ins, item.name);
        }
      }
    }
  }
}

import fs from "fs";
const INPUT = fs.readFileSync("../../../data/07/data.txt", "ascii").trim();
// const INPUT = fs.readFileSync("./data/07/data.txt", "ascii").trim();
parseInptu(INPUT);
parseIns();

console.log(MYVARS);
