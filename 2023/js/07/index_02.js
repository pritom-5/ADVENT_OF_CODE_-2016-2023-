// part 2 252113488

class Card {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

const Cards = {}; // sorted by value

Cards["2"] = new Card("2", 2);
Cards["3"] = new Card("3", 3);
Cards["4"] = new Card("4", 4);
Cards["5"] = new Card("5", 5);
Cards["6"] = new Card("6", 6);
Cards["7"] = new Card("7", 7);
Cards["8"] = new Card("8", 8);
Cards["9"] = new Card("9", 9);
Cards["T"] = new Card("T", 10);
Cards["J"] = new Card("J", 1); // updated j value
Cards["Q"] = new Card("Q", 12);
Cards["K"] = new Card("K", 13);
Cards["A"] = new Card("A", 14);

class Hand {
  hand_value = 0;
  card_count = {};
  rank_card_on_index = [];
  type = ""; // for logging purpose
  nos_j = 0;

  constructor(cards, bid) {
    this.bid = bid;
    this.cards = cards;

    this.cardCount();
    this.getValueOfHand_02();
  }

  cardCount() {
    this.card_count = this.cards.split("").reduce((acc, curr) => {
      this.rank_card_on_index.push(Cards[curr].value);
      if (curr === "J") {
        this.nos_j++;
        return acc;
      }
      if (acc[curr]) {
        return { [curr]: acc[curr]++, ...acc };
      } else {
        return { [curr]: 1, ...acc };
      }
    }, this.card_count);
  }

  getCardValues() {
    const card_values = Object.values(this.card_count).sort((a, b) => b - a);
    // console.log(card_values);
    if (this.nos_j === 5) {
      card_values[0] = this.nos_j;
    } else {
      card_values[0] += this.nos_j;
    }

    return card_values;
  }

  getValueOfHand_02() {
    const card_values = this.getCardValues();

    switch (card_values[0]) {
      case 5:
        this.hand_value += 5000;
        this.type = "five of kind";
        break;
      case 4:
        // check four of a kind
        this.type = "four of kind";
        this.hand_value += 4000;
        break;

      case 3:
        // check full house
        if (card_values[1] === 2) {
          this.type = "full house";
          this.hand_value += 3500;
        } else {
          this.type = "three of kind";
          this.hand_value += 3000;
        }
        break;
      case 2:
        if (card_values[1] === 2) {
          this.type = "two pairs";
          this.hand_value += 2000;
        } else {
          this.hand_value += 1000;
          this.type = "pair";
        }
        break;
      default:
        this.hand_value = this.getHighestCard();
        break;
    }
  }

  getHighestCard() {
    return Cards[this.cards[0]].value;
  }
}

const Hands = [];

const fs = require("fs");
// const FILE_NAME = "./ex.txt";
// const FILE_NAME = "./ex_1.txt";
const FILE_NAME = "./data.txt";
const input = fs.readFileSync(FILE_NAME, "ascii").trim();

input.split("\n").forEach((item) => {
  Hands.push(
    new Hand(
      item.trim().split(" ")[0].trim(),
      +item.trim().split(" ")[1].trim()
    )
  );
});

function sortHands() {
  Hands.sort((a, b) => {
    if (a.hand_value === b.hand_value) {
      let idx = 0;
      while (true && idx < b.cards.length) {
        if (a.rank_card_on_index[idx] !== b.rank_card_on_index[idx]) {
          return a.rank_card_on_index[idx] - b.rank_card_on_index[idx];
        }
        idx++;
      }
    } else {
      return a.hand_value - b.hand_value;
    }
  });
}

function getFinalValue() {
  sortHands();
  let total = 0;

  Hands.forEach((item, idx) => {
    total += (idx + 1) * item.bid;
  });

  return total;
}

console.log(getFinalValue());
