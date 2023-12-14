/**
 * part 1done
 * part 2done
 */
import fs from "fs";
const INPUT_GRID = fs
	// .readFileSync("./ex.txt", "ascii")
	.readFileSync("./data.txt", "ascii")
	.trim()
	.split("\n")
	.map((item) => item.split(""));

class Grid {
	OBSTACLES = ["#", "O"];

	// input how many cycles to run
	CYCLES = +process.argv[2];

	constructor(input_grid) {
		this.input_grid = input_grid;

		this.turn(this.CYCLES);
		this.findTotalLoad();
	}

	tilt() {
		let changed = true;
		while (changed) {
			changed = false;
			for (let line = 1; line < this.input_grid.length; line++) {
				for (let ch = 0; ch < this.input_grid[0].length; ch++) {
					if (
						this.input_grid[line][ch] === "O" &&
						!this.OBSTACLES.includes(this.input_grid[line - 1][ch])
					) {
						this.input_grid[line - 1][ch] = "O";
						this.input_grid[line][ch] = ".";
						changed = true;
					}
				}
			}
		}
	}

	turn(cycles) {
		for (let i = 1; i <= cycles; i++) {
			for (let j = 0; j < 4; j++) {
				this.tilt();
				this.rotate();
			}
		}
	}

	rotate() {
		const new_arr = [];
		this.input_grid[0].forEach((_) => new_arr.push([]));

		this.input_grid.forEach((line) => {
			line.forEach((ch, cx) => {
				new_arr[cx].unshift(ch);
			});
		});

		this.input_grid = new_arr;
	}

	findTotalLoad() {
		let total = 0;

		this.input_grid.forEach((line, lx) => {
			const nos_o = line.reduce((acc, curr) => {
				if (curr === "O") {
					return (acc = acc + 1);
				}
				return acc;
			}, 0);
			total += (this.input_grid.length - lx) * nos_o;
		});
		console.log(total);
		return total;
	}

	logger() {
		this.input_grid.forEach((item) => {
			console.log(item.join(""));
		});
		console.log("\n");
	}
}

const grid = new Grid(INPUT_GRID);
