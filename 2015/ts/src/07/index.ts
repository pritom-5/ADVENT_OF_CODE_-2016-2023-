import fs from "fs";

// const PATH_FILE = "../../../data/07/ex.txt";
// const data = fs.readFileSync(PATH_FILE, "ascii");

const INPUT = `x LSHIFT 2 -> f
x AND y -> d
123 -> x
y RSHIFT 2 -> g
456 -> y
NOT x -> h
x OR y -> e
NOT y -> i`;

type SourceT = {
  operation: "LSHIFT" | "RSHIFT" | "OR" | "NOT" | "AND";
  instruction: string;
};

type OperationsT = SourceT["operation"];

class MyVariable {
  name: string;
  value: number | undefined;
  instructions: SourceT[] = [];

  constructor(name: string, value: number | undefined) {
    this.name = name;
    this.value = value;
  }

  addInstruction(
    operation: SourceT["operation"],
    instruction: SourceT["instruction"]
  ) {
    this.instructions.push({ operation, instruction });
  }

  overrideValue(value: number) {
    this.value = value;
  }
}

const VARIABLES: Record<string, MyVariable> = {};

function getOperation(line: string) {
  const re = /LSHIFT|RSHIFT|AND|NOT|OR/;
  return line.match(re);
}

function parseInput(input: string) {
  input.split("\n").forEach((item) => {
    const bucket = item.split(" -> ")[1];
    const instruction_str = item.split(" -> ")[0];

    const operation = getOperation(instruction_str);
    if (!operation) {
      VARIABLES[bucket] = new MyVariable(
        bucket,
        parseInt(instruction_str.trim())
      );
    } else {
      const tmp = new MyVariable(bucket, undefined);
      VARIABLES[bucket] = tmp;
      tmp.addInstruction(operation[0] as OperationsT, instruction_str);
    }
  });
}

parseInput(INPUT);
console.log(VARIABLES);

function followInstruction() {
  for (let item of Object.values(VARIABLES)) {
    walk(item);
  }
}

class Operate {
  static lshift(val1: number, val2: number) {
    return val1 << val2;
  }
  static rshift(val1: number, val2: number) {
    return val1 >> val2;
  }
  static and(val1: number, val2: number) {
    return val1 & val2;
  }
  static or(val1: number, val2: number) {
    return val1 | val2;
  }
  static not(val1: number) {
    return 65534 - ~val1;
  }
}

class ParseOperator {
  static parseLshiftRshift(line: string) {
    const words = line.split(" ");
    return { from: words[0], value: +words[2] };
  }
  static parseAndOr(line: string) {
    const words = line.split(" ");
    return { v1: words[0], v2: words[2] };
  }
  static parseNot(line: string) {
    return { v: line.split(" ")[1] };
  }
}

function walk(item: MyVariable) {
  if (item.instructions.length === 0) {
    return;
  }

  const instruction = item.instructions[0].instruction;

  switch (item.instructions[0].operation) {
    case "LSHIFT":
      const { from, value } = ParseOperator.parseLshiftRshift(instruction);
      if (VARIABLES[from] && VARIABLES[from].value !== undefined) {
        const v = VARIABLES[from].value!;
        // todo: do it from here
        Operate.lshift(v, value);
      } else {
      }
      break;
    case "RSHIFT":
      break;
    case "AND":
      break;
    case "NOT":
      break;
    case "OR":
      break;
    default:
      break;
  }
}
