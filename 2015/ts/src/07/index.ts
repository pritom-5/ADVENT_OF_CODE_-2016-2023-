/**
 * both part 1 and 2 correct
 */
const input = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`;

class Buck {
  instructions: string[] = [];
  value: number | undefined = undefined;

  constructor(private name: string, ins: string) {
    this.name = name;
    this.instructions.push(ins);

    this.getValue();
  }

  private getValue() {
    if (this.instructions[0].split(" ").length === 1) {
      this.value = parseInt(this.instructions[0]);
    }
  }

  static getValuesFromInstruction(ins: string) {
    if (ins.split(" ").length === 1) {
      return { vars: [ins], action: "assign" };
    }
    // and or lshift rshift not
    if (ins.includes("NOT")) {
      const ins_items = ins.split(" ");
      return { vars: [ins_items[1]], action: "NOT" };
    } else {
      const ins_items = ins.split(" ");
      return { vars: [ins_items[0], ins_items[2]], action: ins_items[1] };
    }
  }

  static getAndValue(...values: number[]) {
    return values[0] & values[1];
  }
  static getOrValue(...values: number[]) {
    return values[0] | values[1];
  }
  static getLshiftValue(...values: number[]) {
    return values[0] << values[1];
  }
  static getRshiftValue(...values: number[]) {
    return values[0] >> values[1];
  }
  static getNotValue(...values: number[]) {
    return 65536 + ~values[0];
  }
}

const ACTION = {
  AND: Buck.getAndValue,
  OR: Buck.getOrValue,
  LSHIFT: Buck.getLshiftValue,
  RSHIFT: Buck.getRshiftValue,
  NOT: Buck.getNotValue,
};

const Bucks: Record<string, Buck> = {};

function parseInput(_input: string, target: string = "a") {
  _input.split("\n").forEach((line) => {
    const [ins, bucket] = line.split(" -> ");
    const x = new Buck(bucket, ins);
    Bucks[bucket] = x;
  });

  const x = walk(target);
  console.log(x);
}

// parseInput(input);

function walk(target: string): number {
  if (!isNaN(Number(target))) {
    return Number(target);
  }
  if (Bucks[target] && Bucks[target].value) {
    return Bucks[target].value as number;
  }

  const ins = Bucks[target].instructions[0];
  const { vars, action } = Buck.getValuesFromInstruction(ins);

  const result: number[] = [];

  for (let _var of vars) {
    const a = walk(_var);
    result.push(a);
  }

  if (action === "assign") {
    Bucks[target].value = result[0];
  } else {
    Bucks[target].value = ACTION[action](...result);
  }

  return Bucks[target].value as number;
}

import fs from "fs";
const path = "../../../data/07/data_02.txt";
function main() {
  const _input = fs.readFileSync(path, "ascii");
  parseInput(_input);
}
main();
