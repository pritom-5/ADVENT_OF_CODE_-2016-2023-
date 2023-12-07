class Card {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

const Cards_01 = {}; // sorted by value

Cards_01["2"] = new Card("2", 2);
Cards_01["3"] = new Card("3", 3);
Cards_01["4"] = new Card("4", 4);
Cards_01["5"] = new Card("5", 5);
Cards_01["6"] = new Card("6", 6);
Cards_01["7"] = new Card("7", 7);
Cards_01["8"] = new Card("8", 8);
Cards_01["9"] = new Card("9", 9);
Cards_01["T"] = new Card("T", 10);
Cards_01["J"] = new Card("J", 1); // updated j value
Cards_01["Q"] = new Card("Q", 12);
Cards_01["K"] = new Card("K", 13);
Cards_01["A"] = new Card("A", 14);

const Cards_02 = { J: new Card("J", 1), ...Cards_01 };

const GAME_POINTS = {
  five_of_kind: 5000,
  four_of_kind: 4000,
  full_house: 3500,
  three_of_kind: 3000,
  two_pairs: 2000,
  pair: 1000,
};

exports.constants = { Cards_01, Cards_02, GAME_POINTS };
