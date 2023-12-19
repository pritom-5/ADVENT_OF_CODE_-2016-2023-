/**
 * stop js from replacing escaped characters with String.raw`${stirng}`
 */

const input = `
  '\xa8br\x8bjr"'
  "nq"
  'zjrfcpbktjmrzgsz\xcaqsc\x03n"huqab'
  "daz\\zyyxddpwk"
  'draes\xa2n\\g\x27ek"lj"\\viqych'
  'nnx\\krnrfomdnt\x2flbl\xd2xpo"cp"k'
`;

class Value {
  constructor(public line: string) {
    this.line = line;

    // this.replaceAllch();
    this.escapeAll();
  }
  getChCount() {
    return this.line.length - 2;
  }

  getChCount_02() {
    return this.line.length + 2;
  }

  private escapeAll() {
    this.escapeSlash();
    this.escapeQuote();
  }

  private escapeQuote() {
    const re = /"/gi;
    this.line = this.line.replace(re, (matched) => `\\${matched}`);
  }

  private escapeSlash() {
    const re = /\\/gi;
    this.line = this.line.replace(re, (matched) => `\\${matched}`);
  }

  private replaceAllch() {
    this.replaceSlash();
    this.replaceHex();
    this.replaceQuote();
  }

  private replaceHex() {
    const re = /\\x[0-9a-f]{2}/gi;
    this.line = this.line.replace(re, "*");
  }
  private replaceQuote() {
    const re = /\\"/gi;
    this.line = this.line.replace(re, "&");
  }
  private replaceSlash() {
    const re = /\\\\/gi;
    this.line = this.line.replace(re, "^");
  }
}

// const a = String.raw`"\x27"`;
// const l = new Value(a);
// console.log(a, " : ", l.line);

function parseInput(_input: string) {
  let count = 0;
  _input
    .trim()
    .split("\n")
    .forEach((line) => {
      const a = new Value(String.raw`${line}`);
      console.log("\nfrom: ", line, "to: ", a.line);
      // count += a.getChCount();
      //   console.log(line, " ", line.length);
      count += a.getChCount_02() - line.length;
    });
  console.log(count);
}

import Bun from "bun";
async function main() {
  const input = await Bun.file("../../../data/08/data.txt").text();

  //   console.log(input);
  parseInput(input);
}
main();
