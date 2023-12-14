class Route {
  /** @typedef {"^" | ">" | "v" | "<"} DirectionT */
  /** @type {Record<DirectionT, Array<number, number>} */
  #DIRECTION = {
    "^": [-1, 0],
    ">": [0, 1],
    v: [1, 0],
    "<": [0, -1],
  };

  /** @type {string} */
  #map;

  /** @type {{x: number, y: number}} */
  #CURRENT_POS = { x: 0, y: 0 };

  /** @type {{x: number, y: number}} */
  #CURRENT_POS_ROBO = { x: 0, y: 0 };

  /** @type {Array<string>} */
  #DELIVERED_HOUSES = new Set(["0 0"]);

  /** @param {string} map  */
  constructor(map) {
    this.#map = map.trim();

    // this.#followMap();
    this.#followMapPart2();
  }

  /** @return {number} */
  getNosHouses() {
    return this.#DELIVERED_HOUSES.size;
  }

  #followMapPart2() {
    for (let [ci, ch] of this.#map.split("").entries()) {
      if (ci % 2 === 0) {
        this.#CURRENT_POS.x += this.#DIRECTION[ch][0];
        this.#CURRENT_POS.y += this.#DIRECTION[ch][1];

        this.#DELIVERED_HOUSES.add(
          `${this.#CURRENT_POS.x} ${this.#CURRENT_POS.y}`
        );
      } else {
        this.#CURRENT_POS_ROBO.x += this.#DIRECTION[ch][0];
        this.#CURRENT_POS_ROBO.y += this.#DIRECTION[ch][1];

        this.#DELIVERED_HOUSES.add(
          `${this.#CURRENT_POS_ROBO.x} ${this.#CURRENT_POS_ROBO.y}`
        );
      }
    }
  }

  #followMap() {
    for (let ch of this.#map) {
      this.#CURRENT_POS.x += this.#DIRECTION[ch][0];
      this.#CURRENT_POS.y += this.#DIRECTION[ch][1];

      this.#DELIVERED_HOUSES.add(
        `${this.#CURRENT_POS.x} ${this.#CURRENT_POS.y}`
      );
    }
  }
}

// const a = new Route("^v");
// console.log(a.getNosHouses());

// const b = new Route("^>v<");
// console.log(b.getNosHouses());

// const c = new Route("^v^v^v^v^v");
// console.log(c.getNosHouses());

import fs from "fs";
const input = fs.readFileSync("../../data/03/data.txt", "ascii");
const a = new Route(input);
console.log(a.getNosHouses());
