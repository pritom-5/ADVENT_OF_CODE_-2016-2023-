/**
 * both part1 and part2 correct
 */
class Bucket {
  constructor(variable_name, initial_value = 0) {
    this.variable_name = variable_name;
    this.value = initial_value;
  }

  copyValue(new_value) {
    this.value = new_value;
  }

  increase() {
    this.value++;
  }

  decrease() {
    this.value--;
  }
}

const VARIABLES = {};

function createNewBucket(name, value) {
  const a = new Bucket(name, value);
  VARIABLES[name] = a;
}

createNewBucket("a");
createNewBucket("b");
createNewBucket("c", 1); // updated to 1 for part 2
createNewBucket("d");

function parseInput(input) {
  const lines = input.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const a = VARIABLES;
    const line = lines[i];

    const letters = line.split(" ");

    switch (letters[0]) {
      case "cpy": {
        let copy_from = letters[1];
        let copy_to = letters[2];

        // copy from numbr
        if (!isNaN(Number(copy_from))) {
          VARIABLES[copy_to].copyValue(+copy_from);
        } else {
          VARIABLES[copy_to].copyValue(VARIABLES[copy_from].value);
        }

        break;
      }

      case "inc": {
        const variable_name = letters[1];
        VARIABLES[variable_name].increase();
        break;
      }

      case "dec": {
        const variable_name = letters[1];
        VARIABLES[variable_name].decrease();
        break;
      }
      case "jnz":
        const variable_name = letters[1];
        const move_by = +letters[2];

        if (
          (!isNaN(Number(variable_name)) && variable_name !== 0) ||
          (VARIABLES[variable_name] && VARIABLES[variable_name].value !== 0)
        ) {
          i += move_by - 1;
        }

        break;
      default:
        break;
    }
  }
}

// const FILE_PATH = "./ex.txt";
const FILE_PATH = "./data.txt";
const { create } = require("domain");
const fs = require("fs");
const INPUT = fs.readFileSync(FILE_PATH, "ascii");
parseInput(INPUT);

console.log(VARIABLES);
