import { MD5 } from "bun";

// const input_string = "hello there mate";

/// 01
const INPUT_STRING = "uqwqemis";
// const INPUT_STRING = "abc";

function getPassword(input_string: string): string {
	let PASSWORD = "";
	let count = 1;

	while (true) {
		const new_string = input_string + `${count}`;
		const hash = getHashMD5(new_string);

		PASSWORD += getCharacter(hash);

		if (PASSWORD.length === 8) {
			console.log(PASSWORD);
			break;
		}
		count++;
	}
	return PASSWORD;
}

function getPassword_02(input_string: string): string {
	let password: string[] = new Array(8).fill("");
	let count = 1;

	while (true) {
		const new_string = input_string + `${count}`;
		const hash = getHashMD5(new_string);

		count++;

		const { idx, ch } = getCharacter_02(hash);

		if (idx > 7 || idx < 0 || password[idx] !== "" || ch === "") {
			continue;
		}

		password[idx] = ch;
		console.log(password);

		if (!password.slice(0, 8).some((item) => item === "")) {
			console.log(password.slice(0, 8).join(""));
			console.log(password);

			break;
		}
	}

	return password.join("");
}

getPassword_02(INPUT_STRING);

function getHashMD5(input_string: string): string {
	const hash = MD5.hash(input_string, "hex");

	return hash;
}

function getCharacter(hash: string): string {
	const sliced_six = hash.slice(0, 5);

	if (sliced_six === "00000") {
		return hash[5];
	}
	return "";
}

function getCharacter_02(hash: string): { idx: number; ch: string } {
	const sliced_five = hash.slice(0, 5);

	if (sliced_five === "00000") {
		console.log(hash[5], "  ", hash[6]);
		return { idx: +hash[5], ch: hash[6] };
	}

	return { idx: -1, ch: "" };
}

// 02
