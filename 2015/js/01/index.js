class Instruction {
	/**
	 * @typedef {"(" | ")"} Brackets
	 */
	/**
	 * @type {Record<Brackets, -1 | 1>}}
	 */
	#BRACKET_TYPES = {
		"(": 1,
		")": -1,
	};
	#floor = 0;
	/**
	 *
	 * @param {string} pattern
	 */
	constructor(pattern) {
		this.pattern = pattern;

		// this.#findFloor();
		// this.#getResult();

		console.log(this.#findCh());
	}

	#findFloor() {
		this.pattern.split("").forEach((item) => {
			this.#floor += this.#BRACKET_TYPES[item];
		});
	}

	#findCh() {
		for (let i = 0; i < this.pattern.length; i++) {
			const ch = this.pattern[i];
			this.#floor += this.#BRACKET_TYPES[ch];
			if (this.#floor === -1) {
				return i + 1;
			}
		}
		return -1;
	}

	#getResult() {
		console.log(this.#floor);
	}
}

// const a = new Instruction(")");
// const b = new Instruction("()())");
// const c = new Instruction(")())())");

const fs = require("fs");
new Instruction(fs.readFileSync("./data.txt", "ascii").trim());
