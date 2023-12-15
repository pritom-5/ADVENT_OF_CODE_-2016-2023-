class Spell {
  /**
   * @param {string} name
   * @param {number} mana
   * @param {number} damage
   * @param {number} heal_hit_points
   * @param {number} effect_length
   * @param {number} rechange_mana
   * @param {number} armor_increase
   */
  constructor(
    name,
    mana,
    damage = 0,
    heal_hit_points = 0,
    effect_length = 0,
    rechange_mana = 0,
    armor_increase = 0,
    effective_each_turn = false
  ) {
    this.name = name;
    this.mana = mana;
    this.damage = damage;
    this.heal_hit_points = heal_hit_points;
    this.effect_length = effect_length;
    this.rechange_mana = rechange_mana;
    this.armor_increase = armor_increase;
    this.effective_each_turn = effective_each_turn;
  }
}

const SPEELLS = [];

SPEELLS.push(new Spell("Magic Missile", 53, 4));
SPEELLS.push(new Spell("Drain", 73, 2, 2));
SPEELLS.push(new Spell("Shield", 113, 0, 0, 6, 0, 7));
SPEELLS.push(new Spell("Poison", 173, 3, 0, 6, 0, 0, true));
SPEELLS.push(new Spell("Recharge", 229, 3, 0, 5, 101, 0, true));

console.log(SPEELLS);

export default SPEELLS;

//////////////////////////////////

class Player {
  /** @type {Array<Spell>} */
  current_spells = [];
  added_hit_points = 0;

  constructor(mana, hit_points) {
    this.total_mana = mana;
    this.hit_points = hit_points;
  }

  updateCurrentSpells() {
    if (this.current_spells.length === 0) {
      return;
    }

    this.current_spells = this.current_spells.filter(
      (item) => item.effect_length > 0
    );

    this.current_spells.forEach((item) => {
      item.effect_length--;
    });
  }

  calculate() {}
}
