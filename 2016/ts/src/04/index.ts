import read_data_arr from "./utils";

type LetterCountT = [string, number][];

function counterLetter(input: string, letter_count: LetterCountT) {
  for (let i of input) {
    if (i == "-") continue;
    const index = letter_count.findIndex((value) => value[0] === i);
    if (index != -1) {
      letter_count[index][1]++;
    } else {
      letter_count.push([i, 1]);
    }
  }

  return letter_count;
}

function sortLetterCount(letter_count: LetterCountT) {
  letter_count.sort((a, b) => {
    if (b[1] === a[1]) {
      const ch_code_1 = b[0].charCodeAt(0);
      const ch_code_2 = a[0].charCodeAt(0);
      return ch_code_2 - ch_code_1;
    }
    return b[1] - a[1];
  });

  return letter_count;
}

function isChecksumValid(
  checksum_input: string,
  sorted_letter_count: LetterCountT
) {
  let original_checksum = "";
  for (let i = 0; i < 5; i++) {
    original_checksum += sorted_letter_count[i][0];
  }

  return original_checksum === checksum_input;
}

function parseInput(input: string) {
  const first_pass = input.split("-");
  const letters = first_pass.filter(
    (item, idx) => idx !== first_pass.length - 1
  );
  const room_id = first_pass[first_pass.length - 1].split("[")[0];

  const checksum = first_pass[first_pass.length - 1].match(/[a-z]+/g);

  return { words: letters.join("-"), room_id, checksum: checksum![0] };
}

function getRoomId(input: string) {
  const parsed_input = parseInput(input);

  const letter_count: [string, number][] = [];
  const letter_count_full = counterLetter(parsed_input.words, letter_count);
  const sorted_letter_count = sortLetterCount(letter_count_full);

  const is_check_valid = isChecksumValid(
    parsed_input.checksum,
    sorted_letter_count
  );

  return is_check_valid ? Number(parsed_input.room_id) : 0;
}

function main(input: string[]) {
  for (let item of read_data_arr) {
    const parsed_input = parseInput(item);
    const dec_input = decrypted_msg(parsed_input.words, +parsed_input.room_id);

    if (dec_input == "northpole object storage") {
      console.log(parsed_input.room_id);
    }
  }
}
main(read_data_arr);

// function main(input: string[]) {
//   let Total_id = 0;
//   for (let item of read_data_arr) {
//     const v = getRoomId(item);
//     Total_id += v;
//   }
//   console.log(Total_id);
// }

// const test_value = "not-a-real-room";
// const checksum = "oarel";
// const INPUT_0 = "not-a-real-room-404[oarel]";

function turndedLetter(input_letter: string, total: number): string {
  const input_code = input_letter.charCodeAt(0);

  const updated_code = 97 + ((input_code - 97 + total) % 26);

  const updated_string = String.fromCharCode(updated_code);
  //   console.log(updated_code, updated_string);
  return updated_string;
}

function decrypted_msg(input: string, total: number) {
  let final_string = "";
  for (let item of input) {
    if (item == "-") {
      final_string += " ";
    } else {
      final_string += turndedLetter(item, total);
    }
  }

  //   console.log(final_string);
  return final_string;
}

// const input = process.argv[2];
// const input = "qzmt-zixmtkozy-ivhz";
// decrypted_msg(input, 343);
// turndedLetter(input, 343);
