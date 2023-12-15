/**
 * couldn't figure out the recursion
 */

import SPEELLS, { Boss, Player } from "./magic";

const BOSS = new Boss(13, 8);
const PLAYER = new Player(250, 10);

// /** @type {Array<number>} */
// const list_of_mana = [];

// /** @param {Boss} boss @param {Player} player  */
// function battle(player, boss) {
//   while (boss.hit_points > 0 && player.hit_points > 0) {
//     for (let spell of SPEELLS) {
//       if (!player.canAddNewSpell(spell)) {
//         continue;
//       }
//       player.addNewSpell(spell);
//       const damage = player.updateCurrentSpells();

//       // reduce boss hit_points
//       boss.takeDamage(damage);

//       if (!boss.isBossAlive()) {
//         list_of_mana.push(player.total_mana);
//       }

//       player.takeDamage(boss.damage);
//     }
//   }
// }

/** @param {Boss} boss  @param {Player} player  */
function battle_02(player_p, boss_p) {
  const arr = [];

  /** @param {Boss} boss  @param {Player} player  */
  function walk(player, boss, spell = SPEELLS[0]) {
    if (!player.isPlayerAlive() && !boss.isBossAlive()) {
      return false;
    }
    if (!player.canAddNewSpell(spell)) {
      return false;
    }

    player.addNewSpell(spell);
    const damage = player.updateCurrentSpells();

    // reduce boss hit_points
    boss.takeDamage(damage);

    if (!boss.isBossAlive()) {
      arr.push(player.total_mana);
      return false;
    }

    player.takeDamage(boss.damage);

    for (let spell of SPEELLS) {
      if (!walk(player, boss, spell)) {
        continue;
      }
    }
  }

  walk(player_p, boss_p);
  console.log(arr);
}
battle_02(PLAYER, BOSS);
