const fs = require("fs");
const input = fs.readFileSync("../../data/06/example.txt", "ascii");
// const input = fs.readFileSync("../../data/06/input.txt", "ascii");

let race_obj = [];

function possibleWaysOfWinnint() {
	let total = 1;
	for (let [time, distance] of race_obj) {
		const val = RaceWalk(time, time, distance, 0);
		total *= val;
	}
	console.log(total);
}

function RaceWalk(total_time, hold_time, distance, nos_wins, has_won) {
	if (hold_time <= 0) {
		return nos_wins;
	}

	const my_dis = hold_time * (total_time - hold_time);

	if (my_dis > distance) {
		nos_wins++;
		if (!has_won) {
			has_won = true;
		}
	} else {
		if (has_won) {
			return nos_wins;
		}
	}

	console.log(
		"hold, my_dis, dis, nos",
		hold_time,
		my_dis,
		distance,
		nos_wins
	);
	return RaceWalk(total_time, hold_time - 1, distance, nos_wins, has_won);
}

// RaceWalk(71530, 71530, 940200, 0, false);

function part1() {
	input.split("\n").forEach((item, idx) => {
		const numbers = item.match(/[0-9]+/g);
		for (let [idx_1, item] of numbers.entries()) {
			if (idx === 0) {
				race_obj.push([+item]);
			} else {
				race_obj[idx_1].push(+item);
			}
		}
	});

	possibleWaysOfWinnint();
}

function part2() {
	race_obj = input.split("\n").map((item) => {
		return +item.match(/[0-9]+/g).join("");
	});

	let nos_wins = 0;
	let hold_time = race_obj[0];
	let distance = race_obj[1];

	while (hold_time >= 0) {
		const my_dis = hold_time * (race_obj[0] - hold_time);
		if (my_dis > distance) {
			nos_wins++;
		}

		//   console.log("hold, my_dis, dis, nos", hold_time, my_dis, distance, nos_wins);
		hold_time--;
	}
	console.log(nos_wins);
}
