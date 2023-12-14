// both part 1 and 2 correct
import PLAYERS from "./combos";

const WINNER_PLAYERS = [];
const LOSER_PLAYERS = [];
const PLAYER_HIT_POINT = 100;

const BOSS = { hit_point: 104, damage: 8, armor: 1 };
const PLAYER = { total_damage: 5, total_armor: 5 };

function battle(player_hit_point, player, boss) {
  while (player_hit_point > 0 && boss.hit_point > 0) {
    const diff = player.total_damage - boss.armor;
    boss.hit_point = diff <= 0 ? boss.hit_point - 1 : boss.hit_point - diff;

    if (boss.hit_point <= 0) {
      break;
    }

    const diff_0 = boss.damage - player.total_armor;
    player_hit_point =
      diff_0 <= 0 ? player_hit_point - 1 : player_hit_point - diff_0;
  }

  // @update part 1
  // player_hit_point > 0 && WINNER_PLAYERS.push(player);

  // @update part 2
  boss.hit_point > 0 && LOSER_PLAYERS.push(player);
}

for (let player of PLAYERS) {
  battle(PLAYER_HIT_POINT, player, { ...BOSS });
}

// @update part 2
// WINNER_PLAYERS.sort((a, b) => {
//   return a.total_cost > b.total_cost;
// });
// console.log(WINNER_PLAYERS);

// @update part 2
LOSER_PLAYERS.sort((a, b) => {
  return b.total_cost > a.total_cost;
});
console.log(LOSER_PLAYERS);
