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
    effect_length = 1,
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

/** @type {Array<Spell>} */
const SPEELLS = [];

SPEELLS.push(new Spell("Magic Missile", 53, 4));
SPEELLS.push(new Spell("Drain", 73, 2, 2));
SPEELLS.push(new Spell("Shield", 113, 0, 0, 6, 0, 7));
SPEELLS.push(new Spell("Poison", 173, 3, 0, 6, 0, 0, true));
SPEELLS.push(new Spell("Recharge", 229, 3, 0, 5, 101, 0, true));

//////////////////////////////////

class Boss {
  /** @param {number} damage @param {number} hit_points  */
  constructor(hit_points, damage) {
    this.hit_points = hit_points;
    this.damage = damage;
  }

  /** @param {number} taken_damage  */
  takeDamage(taken_damage) {
    this.hit_points -= taken_damage;
  }

  /** @returns {boolean} */
  isBossAlive() {
    return this.hit_points > 0;
  }
}

//////////////////////////////////

class Player {
  /** @type {Array<Spell>} */
  current_spells = [];
  added_mana = 0;

  /** @param {number} hit_points @param {number} mana @param {number} [armor=0]  */
  constructor(mana, hit_points, armor = 0) {
    this.total_mana = mana;
    this.hit_points = hit_points;
    this.armor = armor;
  }

  /** @returns {boolean} */
  isPlayerAlive() {
    return this.hit_points > 0;
  }

  /** @param {number} taken_damage  */
  takeDamage(taken_damage) {
    this.hit_points -= taken_damage;
  }

  /** @param {Spell} spell  @returns {boolean} */
  canAddNewSpell(spell) {
    const spell_index = this.current_spells.findIndex(
      (item) => item.name === spell.name
    );

    if (spell_index !== -1 || spell.mana > this.total_mana + this.added_mana) {
      return false;
    }

    return true;
  }

  // dont' for get to remove added_hit_points after turn
  /** @param {Spell} spell  */
  addNewSpell(spell) {
    // is spell alerady in current
    const spell_index = this.current_spells.findIndex(
      (item) => item.name === spell.name
    );

    if (spell_index !== -1) {
      return;
    }

    // have enough mana
    if (this.total_mana + this.added_mana >= spell.mana) {
      this.current_spells.push(spell);
      this.total_mana -= spell.mana;
    }
  }

  /** @returns {number} damage */
  updateCurrentSpells() {
    let damage = 0;

    if (this.current_spells.length === 0) {
      return;
    }

    this.current_spells.forEach((item) => {
      this.armor += item.armor_increase;
      this.hit_points += item.heal_hit_points;
      this.added_mana += item.rechange_mana;
      damage += item.damage;

      item.effect_length--;
    });

    this.current_spells = this.current_spells.filter(
      (item) => item.effect_length > 0
    );

    return damage;
  }
}

export default SPEELLS;
export { Boss, Player };
