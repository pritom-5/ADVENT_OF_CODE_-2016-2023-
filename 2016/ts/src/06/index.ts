const DATA = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar
`;

class Six {
  data_arr: string[];
  input_data: string;
  data_arr_col_wise: string[][];

  constructor(data: string) {
    this.data_arr = [];
    this.data_arr_col_wise = [];

    this.input_data = data;
  }

  parseData() {
    this.data_arr = [...this.input_data.trim().split("\n")];

    this.data_arr_col_wise = new Array(this.data_arr[0].length)
      .fill(0)
      .map((item) => []) as string[][];

    for (let word of this.data_arr) {
      for (let i = 0; i < word.length; i++) {
        this.data_arr_col_wise[i].push(word[i]);
      }
    }

    // console.log(this.data_arr_col_wise.length, "\n");
  }

  calculateFequency(ch_arr: string[]) {
    const ch_freq: [string, number][] = [];

    for (let ch of ch_arr) {
      const index = ch_freq.findIndex((item) => item[0] === ch);

      if (index == -1) {
        ch_freq.push([ch, 1]);
      } else {
        ch_freq[index][1]++;
      }
    }

    return ch_freq;
  }

  findMostFrequentCh(ch_freq: [string, number][]) {
    ch_freq.sort((a, b) => {
      return b[1] - a[1];
    });

    return ch_freq[0][0];
  }

  findLeastFrequentch(ch_freq: [string, number][]) {
    ch_freq.sort((a, b) => {
      return a[1] - b[1];
    });

    return ch_freq[0][0];
  }

  makeMessage() {
    let final_message = "";

    this.parseData();

    for (let ch_arr of this.data_arr_col_wise) {
      final_message += this.findMostFrequentCh(this.calculateFequency(ch_arr));
    }

    return final_message;
  }

  makeMessage02() {
    let final_message = "";

    this.parseData();

    for (let ch_arr of this.data_arr_col_wise) {
      final_message += this.findLeastFrequentch(this.calculateFequency(ch_arr));
    }

    return final_message;
  }
}

import fs from "fs";
const FILE_PATH = "./data.txt";
const read_data: string = fs.readFileSync(FILE_PATH, "utf-8").trim();

const main = new Six(read_data);
const ch = main.makeMessage02();
console.log(ch);
