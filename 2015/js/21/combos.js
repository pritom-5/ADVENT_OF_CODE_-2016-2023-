class ShopItem {
  /**
   *
   * @param {string} name
   * @param {number} cost
   * @param {number} damage
   * @param {number} armor
   * @param {"weapons" | "armor" | "rings"} type
   */
  constructor(name, cost, damage, armor, type) {
    this.name = name;
    this.cost = cost;
    this.damage = damage;
    this.armor = armor;
    this.type = type;
  }
}

class Player {
  total_damage = 0;
  total_armor = 0;
  total_cost = 0;

  /**
   *
   * @param {ShopItem} weapon
   * @param {Array<ShopItem>} armor
   * @param {Array<ShopItem>} rings
   */
  constructor(weapon, armor, rings) {
    this.weapon = weapon;
    this.armor = armor.length ? [armor[0]] : [];
    this.rings = [...rings];

    this.findDamageArmorCost();
  }

  findDamageArmorCost() {
    this.findDamage();
    this.findArmor();
    this.findCost();
  }

  findDamage() {
    this.total_damage += this.weapon.damage;

    if (this.rings.length) {
      for (let ring of this.rings) {
        this.total_damage += ring.damage;
      }
    }
  }

  findArmor() {
    this.total_armor += this.weapon.armor;

    if (this.armor.length) {
      this.total_armor += this.armor[0].armor;
    }

    if (this.rings.length) {
      for (let ring of this.rings) {
        this.total_armor += ring.armor;
      }
    }
  }
  findCost() {
    this.total_cost += this.weapon.cost;

    if (this.armor.length) {
      this.total_cost += this.armor[0].cost;
    }

    if (this.rings.length) {
      for (let ring of this.rings) {
        this.total_cost += ring.cost;
      }
    }
  }
}

const WEAPONS = [];
const ARMOR = [];
const RINGS = [];

WEAPONS.push(new ShopItem("Dagger", 8, 4, 0, "weapons"));
WEAPONS.push(new ShopItem("Shortsword", 10, 5, 0, "weapons"));
WEAPONS.push(new ShopItem("Warhammer", 25, 6, 0, "weapons"));
WEAPONS.push(new ShopItem("Longsword", 40, 7, 0, "weapons"));
WEAPONS.push(new ShopItem("Greataxe", 74, 8, 0, "weapons"));

ARMOR.push(new ShopItem("Leather", 13, 0, 1, "armor"));
ARMOR.push(new ShopItem("Chainmail", 31, 0, 2, "armor"));
ARMOR.push(new ShopItem("Splintmail", 53, 0, 3, "armor"));
ARMOR.push(new ShopItem("Bandedmail", 75, 0, 4, "armor"));
ARMOR.push(new ShopItem("Platemail", 102, 0, 5, "armor"));

RINGS.push(new ShopItem("Damage +1", 25, 1, 0, "rings"));
RINGS.push(new ShopItem("Damage +2", 50, 2, 0, "rings"));
RINGS.push(new ShopItem("Damage +3", 100, 3, 0, "rings"));
RINGS.push(new ShopItem("Defense +1", 20, 0, 1, "rings"));
RINGS.push(new ShopItem("Defense +2", 40, 0, 2, "rings"));
RINGS.push(new ShopItem("Defense +3", 80, 0, 3, "rings"));

// console.log(WEAPONS);
// console.log(RINGS);
// console.log(ARMOR);
//==========================================
// const COMBOS = [];
const PLAYERS = [];

function getCombo(weapons, armors, rings) {
  for (let item of weapons) {
    for (let i = 0; i <= armors.length; i++) {
      for (let j = 0; j <= rings.length; j++) {
        for (let k = 0; k <= rings.length; k++) {
          const r = [];
          if (j !== k && rings[k]) {
            r.push(rings[k]);
          }
          if (j !== k && rings[j]) {
            r.push(rings[j]);
          }

          const t_weapon = item;
          const t_armor = armors[i] ? armors[i] : [];
          const t_rings = r;

          PLAYERS.push(new Player(t_weapon, t_armor, t_rings));

          //   COMBOS.push({
          //     w: [item],
          //     a: armors[i] ? [armors[i]] : [],
          //     r,
          //   });
        }
      }
    }
  }

  console.log(PLAYERS);
}

getCombo(WEAPONS, ARMOR, RINGS);

export default PLAYERS;

// const weapons = [1, 2, 3, 4, 5];
// const armors = ["a", "b", "c", "d", "e"];
// const rings = ["!", "@", "#", "$", "%", "&"];
