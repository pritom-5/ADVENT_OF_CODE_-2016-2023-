/**
 * for second part getting result of 56322 while original result is 56324
 * couldn't figure out why. test runs fine. Tested bunch of values result is fine.
 */
export default class CalibrationValue {
  user_input: string;
  total: number;

  constructor(input: string) {
    this.user_input = input;
    this.total = 0;
  }

  parseInput(input_value: string): number[] {
    const number_regex = /[0-9]/g;
    const parsed_numbers = input_value
      .match(number_regex)
      ?.map((item) => Number(item)) as number[];

    console.log(parsed_numbers);

    return parsed_numbers;
  }

  updatedReplacedInput(input_value: string): string {
    console.log("original: ", input_value);
    const letter_digits_obj: Record<string, { value: [string, string] }> = {
      on: { value: ["one", "1"] },
      tw: { value: ["two", "2"] },
      th: { value: ["three", "3"] },
      fo: { value: ["four", "4"] },
      fi: { value: ["five", "5"] },
      si: { value: ["six", "6"] },
      se: { value: ["seven", "7"] },
      ei: { value: ["eight", "8"] },
      ni: { value: ["nine", "9"] },
    };

    // sliding window to replace value
    // @TODO
    for (let i = 0; i < input_value.length - 1; i++) {
      // replace first word number
      const slice = input_value.slice(i, i + 2);
      if (
        !!letter_digits_obj[slice] &&
        input_value.indexOf(letter_digits_obj[slice]["value"][0]) === i
      ) {
        input_value = input_value.replace(
          letter_digits_obj[slice]["value"][0],
          letter_digits_obj[slice]["value"][1]
        );
      }
    }

    console.log("updated: ", input_value);
    return input_value;
  }

  addToTotal(input_value: string) {
    // update input_value with replaced number
    input_value = this.updatedReplacedInput(input_value);

    const parsed_inputs = this.parseInput(input_value);
    if (parsed_inputs.length > 1) {
      const first = parsed_inputs[0];
      const last = parsed_inputs[parsed_inputs.length - 1];

      const constructed_number = `${first}${last}`;

      this.total += Number(constructed_number);
    } else if (parsed_inputs.length === 1) {
      const first = parsed_inputs[0];

      const constructed_number = `${first}${first}`;

      this.total += Number(constructed_number);
    }

    console.log(this.total);
  }

  parseWholeInput() {
    const input_string_arr = this.user_input.trim().split("\n");

    for (let item of input_string_arr) {
      this.addToTotal(item);
    }
  }

  getTotal(): number {
    this.parseWholeInput();
    return this.total;
  }
}
