// part-1 251806792
// part 2 252113488

const fs = require("fs");

// const FILE_NAME = "./ex.txt";
// const FILE_NAME = "../../data/07/ex_1.txt";
const FILE_NAME = "../../data/07/data.txt";

const INPUT = fs.readFileSync(FILE_NAME, "ascii").trim();

const {
	hand: { Hand_01, Hand_02 },
} = require("./hand");

function solve_part_01() {
	const Hands = [];
	INPUT.split("\n").forEach((item) => {
		Hands.push(
			new Hand_01(
				item.trim().split(" ")[0].trim(),
				+item.trim().split(" ")[1].trim()
			)
		);
	});
	sortHands(Hands);
	console.log("part_01", getFinalValue(Hands));
}

function solve_part_02() {
	const Hands = [];
	INPUT.split("\n").forEach((item) => {
		Hands.push(
			new Hand_02(
				item.trim().split(" ")[0].trim(),
				+item.trim().split(" ")[1].trim()
			)
		);
	});

	sortHands(Hands);
	console.log("part_02", getFinalValue(Hands));
}

solve_part_01();
solve_part_02();

function sortHands(Hands) {
	Hands.sort((a, b) => {
		if (a.hand_value === b.hand_value) {
			let idx = 0;
			while (true && idx < b.cards.length) {
				if (a.rank_card_on_index[idx] !== b.rank_card_on_index[idx]) {
					return (
						a.rank_card_on_index[idx] - b.rank_card_on_index[idx]
					);
				}
				idx++;
			}
		} else {
			return a.hand_value - b.hand_value;
		}
	});
}

function getFinalValue(Hands) {
	let total = 0;

	Hands.forEach((item, idx) => {
		total += (idx + 1) * item.bid;
	});

	return total;
}
