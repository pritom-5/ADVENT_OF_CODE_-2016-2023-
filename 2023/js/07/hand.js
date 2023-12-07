const {
  constants: { Cards_01, Cards_02, GAME_POINTS },
} = require("./constants");

class Hand_01 {
  hand_value = 0;
  card_count = {};
  rank_card_on_index = [];

  constructor(cards, bid) {
    this.bid = bid;
    this.cards = cards;

    this.cardCount();
    this.getValueOfHand();
  }

  cardCount() {
    this.card_count = this.cards.split("").reduce((acc, curr) => {
      this.rank_card_on_index.push(Cards_01[curr].value);
      if (acc[curr]) {
        return { [curr]: acc[curr]++, ...acc };
      } else {
        return { [curr]: 1, ...acc };
      }
    }, this.card_count);
  }

  getCardsCountLength() {
    return Object.keys(this.card_count).length;
  }

  getHighestCard() {
    const card = this.cards[0];
    return Cards_01[card].value;
  }

  getCardValues() {
    const card_values = Object.values(this.card_count).sort((a, b) => b - a);
    return card_values;
  }

  getValueOfHand() {
    const card_values = this.getCardValues();

    switch (card_values[0]) {
      case 5:
        this.hand_value += GAME_POINTS.five_of_kind;
        this.type = "five of kind";
        break;
      case 4:
        // check four of a kind
        this.type = "four of kind";
        this.hand_value += GAME_POINTS.four_of_kind;
        break;

      case 3:
        // check full house
        if (card_values[1] === 2) {
          this.type = "full house";
          this.hand_value += GAME_POINTS.full_house;
        } else {
          this.type = "three of kind";
          this.hand_value += GAME_POINTS.three_of_kind;
        }
        break;
      case 2:
        if (card_values[1] === 2) {
          this.type = "two pairs";
          this.hand_value += GAME_POINTS.two_pairs;
        } else {
          this.hand_value += GAME_POINTS.pair;
          this.type = "pair";
        }
        break;
      default:
        this.hand_value = this.getHighestCard();
        break;
    }
  }
}

class Hand_02 {
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
      this.rank_card_on_index.push(Cards_02[curr].value);
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
        this.hand_value += GAME_POINTS.five_of_kind;
        this.type = "five of kind";
        break;
      case 4:
        this.type = "four of kind";
        this.hand_value += GAME_POINTS.four_of_kind;
        break;

      case 3:
        if (card_values[1] === 2) {
          this.type = "full house";
          this.hand_value += GAME_POINTS.full_house;
        } else {
          this.type = "three of kind";
          this.hand_value += GAME_POINTS.three_of_kind;
        }
        break;
      case 2:
        if (card_values[1] === 2) {
          this.type = "two pairs";
          this.hand_value += GAME_POINTS.two_pairs;
        } else {
          this.type = "pair";
          this.hand_value += GAME_POINTS.pair;
        }
        break;
      default:
        this.hand_value = this.getHighestCard();
        break;
    }
  }

  getHighestCard() {
    return Cards_02[this.cards[0]].value;
  }
}

exports.hand = { Hand_01, Hand_02 };
