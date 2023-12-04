type Card_obj_t = {
  card_no: number;
  my_cards: number[];
  winners: number[];
  number_of_cards: number;
};
type Card_obj_arr = Card_obj_t[];

export default class Four {
  private card_obj_arr: Card_obj_arr;
  private input: string;
  private total: number;

  constructor(input: string) {
    this.card_obj_arr = [];
    this.input = input;
    this.total = 0;

    this.parseInput();
  }

  private parseInput() {
    const lines = this.input.trim().split("\n");
    for (let line of lines) {
      const card_no = line.split(": ")[0].split(" ")[1];
      const winners = line
        .split(": ")[1]
        .split(" | ")[0]
        .match(/[0-9]+/g)!
        .map((item) => Number(item.trim()));
      const my_cards = line
        .split(": ")[1]
        .split(" | ")[1]
        .match(/[0-9]+/g)!
        .map((item) => Number(item.trim()));

      this.card_obj_arr.push({
        card_no: Number(card_no),
        my_cards,
        winners,
        number_of_cards: 1,
      });
    }
  }

  getResultOf01(): number {
    for (let [i, _] of this.card_obj_arr.entries()) {
      this.checkSingleCard(i);
    }

    return this.total;
  }

  getResultOf02(): number {
    for (let [i, _] of this.card_obj_arr.entries()) {
      this.checkSingleCard_02(i);
    }

    return this.countTotalNosCards();
  }

  getCardsObjArr(): Card_obj_arr {
    return this.card_obj_arr;
  }

  private countTotalNosCards(): number {
    const nos_cards = this.card_obj_arr.reduce(
      (acc, curr) => acc + curr.number_of_cards,
      0
    );
    return nos_cards;
  }

  private checkSingleCard_02(idx: number) {
    let nos_wins = 0;

    for (let item of this.card_obj_arr[idx].my_cards) {
      const my_number_is_winner_number =
        this.card_obj_arr[idx].winners.includes(item);

      if (my_number_is_winner_number) {
        nos_wins++;
      }
    }

    // for every nos_wins add current number_of_cards to the next cards
    // card_no: 2 |  nos_wins: 3 | number_of_cards: 2 | add 2 cards to card_no 3, 4, 5
    for (let i = 1; i <= nos_wins; i++) {
      if (idx + i < this.card_obj_arr.length) {
        this.card_obj_arr[idx + i].number_of_cards +=
          this.card_obj_arr[idx].number_of_cards;
      }
    }
  }

  private checkSingleCard(idx: number) {
    let temp_total = 0;
    for (let item of this.card_obj_arr[idx].my_cards) {
      const my_number_is_winner_number =
        this.card_obj_arr[idx].winners.includes(item);
      if (my_number_is_winner_number) {
        switch (temp_total) {
          case 0:
            temp_total = 1;
            break;
          case 1:
            temp_total = 2;
            break;
          default:
            temp_total *= 2;
            break;
        }
      }
    }

    this.total += temp_total;
  }
}
