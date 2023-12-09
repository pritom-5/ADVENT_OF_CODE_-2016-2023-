/**
 * both correct part1 and part2
 */
const fs = require("fs");

const FILE_NAME = "./data.txt";
// const FILE_NAME = "./ex.txt";
const input = fs.readFileSync(FILE_NAME, "ascii");

// console.log(input);

class Output {
  chips = [];

  constructor(name) {
    this.name = name;
  }

  addChip(no) {
    console.log("output not: ", no);
    this.chips.push(no);
    this.chips.sort((a, b) => {
      return a - b;
    });
  }
}

class Bot {
  chips = [];
  instructions = []; // {low: {type: bot/ output, chip_no} high: }[]
  history_of_chips = []; //[ chip 1, chil 2] []

  constructor(name) {
    this.name = name;
  }

  // TODO:
  // add another method that checks for a pair of chips in the chips
  // isThisTwoChipsAvailableInChips(chip1, chip2) {
  //   return this.chips.includes(chip1) && this.chips.includes(chip2);
  // }

  addChip(no) {
    this.chips.push(no);
    this.chips.sort((a, b) => {
      return a - b;
    });
  }

  addInstruction(low, low_type, high, high_type) {
    this.instructions.push({
      low: { type: low_type, des: low },
      high: { type: high_type, des: high },
    });
  }

  removeLowChip() {
    // if (this.chips.lengtg)
    return this.chips.shift();
  }

  removeHighChip() {
    return this.chips.pop();
  }
}

//////////////////////////////////////////////////////// POPULATE BOTS and OUTPUTS
const BOTS = {};
const OUTPUTS = {};

function initialPass() {
  input
    .trim()
    .split("\n")
    .forEach((item) => {
      if (item.trim().split(" ")[0] === "value") {
        const chip_no = +item.trim().split(" ")[1];
        const bot_no = item.trim().split(" ")[5];

        if (BOTS[bot_no]) {
          BOTS[bot_no].addChip(chip_no);
        } else {
          const a = new Bot(bot_no);

          BOTS[bot_no] = a;
          a.addChip(chip_no);
        }
      } else if (item.trim().split(" ")[0] === "bot") {
        const splits = item.trim().split(" ");
        const bot_no = splits[1];
        const low_des_no = splits[6];
        const low_type = splits[5];
        const high_des_no = splits[11];
        const high_type = splits[10];

        // console.log(bot_no, low_type, low_des_no, high_type, high_des_no);

        createNewBot(bot_no);

        if (high_type === "output") {
          createNewOutput(high_des_no);
        }
        if (low_type === "output") {
          createNewOutput(low_des_no);
        }
        if (high_type === "bot") {
          createNewBot(high_des_no);
        }
        if (low_type === "bot") {
          createNewBot(low_des_no);
        }

        addInstructionToBot(
          bot_no,
          low_des_no,
          low_type,
          high_des_no,
          high_type
        );
      }
    });
}
initialPass();

//////////////////////////////////////////////////////// LOOP THROUGH INSTRACTIONS
function followInstractions() {
  while (true) {
    let changed = false;
    for (let item of Object.values(BOTS)) {
      if (item.chips.length === 2) {
        const { low, high } = item.instructions.shift();
        console.log(item, low, high);

        const removed_high = item.chips.pop();
        const removed_low = item.chips.shift();

        switch (high.type) {
          case "bot":
            BOTS[high.des].addChip(removed_high);
            break;

          case "output":
            OUTPUTS[high.des].addChip(removed_high);
            break;
          default:
            break;
        }

        switch (low.type) {
          case "bot":
            BOTS[low.des].addChip(removed_low);
            break;

          case "output":
            OUTPUTS[low.des].addChip(removed_low);
            break;
          default:
            break;
        }

        changed = true;
      }
    }
    if (!changed) {
      break;
    }
  }
}
followInstractions();

console.log(OUTPUTS);

//////////////////////////////////////////////////////// UTILS
function createNewOutput(no) {
  // check if output already exists
  if (OUTPUTS[no]) {
    return;
  }
  const a = new Output(no);
  OUTPUTS[no] = a;
}

function createNewBot(no) {
  // check if bot already exists
  if (BOTS[no]) {
    return;
  }
  const a = new Bot(no);
  BOTS[no] = a;
}

function addInstructionToBot(no, low_des_no, low_type, high_des_no, high_type) {
  BOTS[no].addInstruction(low_des_no, low_type, high_des_no, high_type);
}

function atLeastOneBotHasTwoChips() {
  return Object.values(BOTS).some((item) => item.chips.length >= 2);
}
