/**
 * both 01 and 02 correct and working
 */

type GameNo = string;
type TurnT = { red?: number; green?: number; blue?: number };
type ColorT = keyof TurnT;
type LimitT = Record<ColorT, number>;
type GameObj = Record<GameNo, TurnT[]>;

export default class Two {
  private games_obj: GameObj;
  private input: string;

  private total_of_impossible_games: number;
  private limit: LimitT;
  private min_total: number;

  constructor(input: string, limit: LimitT) {
    this.input = input;
    this.total_of_impossible_games = 0;
    this.min_total = 0;
    this.games_obj = {};
    this.limit = limit;

    this.parseAll();
  }

  private parseAll() {
    const games = this.input.trim().split("\n");

    for (let game of games) {
      const game_no = game.match(/[0-9]+/)![0];
      const sub_games = game.split(":")[1].split(";");

      const sub_games_obj_arr: TurnT[] = [];

      for (let sub_game of sub_games) {
        const cubes = sub_game.split(",");

        const cubes_obj: TurnT = {};

        for (let cube of cubes) {
          const cube_no = cube.match(/[0-9]+/)![0];
          const cube_color = cube.match(/[a-z]+/)![0] as ColorT;

          cubes_obj[cube_color] = Number(cube_no);
        }

        sub_games_obj_arr.push(cubes_obj);
      }

      this.games_obj[game_no] = sub_games_obj_arr;
    }
  }

  private getTotalGameNo(): number {
    const val = Object.keys(this.games_obj).reduce(
      (acc, curr) => acc + Number(curr),
      0
    );
    return val;
  }

  getSumOfValidGameNo(): number {
    for (let game_no of Object.keys(this.games_obj)) {
      for (let subgame of this.games_obj[game_no]) {
        let possible = true;
        for (let cube of Object.keys(subgame)) {
          const cube_color = cube as ColorT;
          if (subgame[cube_color]! > this.limit[cube_color]) {
            possible = false;
            this.total_of_impossible_games -= Number(game_no);
            break;
          }
        }

        if (!possible) {
          break;
        }
      }
    }

    const total_of_possible_games =
      this.getTotalGameNo() + this.total_of_impossible_games;
    console.log(total_of_possible_games);

    return total_of_possible_games;
  }

  getSumPowerOfMinCubeRequiredForEachGame(): number {
    for (let game of Object.keys(this.games_obj)) {
      const red: number[] = [];
      const green: number[] = [];
      const blue: number[] = [];
      for (let subgame of this.games_obj[game]) {
        for (let cube of Object.keys(subgame)) {
          const cube_color = cube as ColorT;
          const cube_val = subgame[cube_color] as number;

          switch (cube_color) {
            case "blue":
              blue.push(cube_val);
              break;
            case "green":
              green.push(cube_val);
              break;
            case "red":
              red.push(cube_val);
              break;

            default:
              break;
          }
        }
      }

      const min_red = Math.max(...red);
      const min_green = Math.max(...green);
      const min_blue = Math.max(...blue);

      this.min_total += min_red * min_blue * min_green;
    }

    console.log(this.min_total);
    return this.min_total;
  }
}
