/**
both 01 and 02 are correct
*/

package two

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func takeFileInput(file_no int) string {
	if file_no == 1 {
		return "example.txt"
	}
	return "data.txt"
}

func takeInput(file_name string) string {

	file_path, _ := filepath.Abs("./example.txt")

	fmt.Println("path", file_path)

	data, err := os.ReadFile("./example.txt")
	if err != nil {
		log.Fatal(err.Error())
	}

	return string(data)
}

func (g *GamesSlice) parseInput(input string) {
	for _, line := range strings.Split(input, "\n") {

		new_game := []SubGameT{}

		for _, subGame := range strings.Split(strings.Split(line, ": ")[1], "; ") {

			new_subgame := SubGameT{}

			for _, cube := range strings.Split(subGame, ", ") {

				color := Color(strings.Split(cube, " ")[1])
				value, err := strconv.Atoi(strings.Split(cube, " ")[0])

				if err != nil {
					fmt.Printf("couldn't print this %d", value)
				}

				new_turn := TurnT{Color: color, Value: value}
				new_subgame = append(new_subgame, new_turn)

			}

			new_game = append(new_game, new_subgame)

		}

		// fmt.Println("new_game", new_game)
		*g = append(*g, new_game)
	}
}

func (g GamesSlice) isGameValid(idx int) bool {
	for _, sub_game := range g[idx] {
		for _, cube := range sub_game {
			if LIMIT[cube.Color] < cube.Value {
				return false
			}
		}
	}
	return true
}

func (g GamesSlice) getMinCubesForSingleGame(idx int) int {
	min_cubes := MinCubes{ColorRed: 0, ColorBlue: 0, ColorGreen: 0}

	for _, sub_game := range g[idx] {
		for _, cube := range sub_game {
			if cube.Value > min_cubes[cube.Color] {
				min_cubes[cube.Color] = cube.Value
			}
		}
	}

	total_min := 1
	for _, v := range min_cubes {
		total_min *= v
	}

	return total_min
}

func (g GamesSlice) checkGames_02() int {
	total_result_to_run_whole_games := 0
	for single_game_idx := range g {
		total_result_to_run_whole_games += g.getMinCubesForSingleGame(single_game_idx)
	}

	return total_result_to_run_whole_games
}

func (g GamesSlice) checkGames() int {
	total_valid_games := 0

	for single_game_idx := range g {
		if g.isGameValid(single_game_idx) {
			// fmt.Println("game no", single_game_idx + 1)
			total_valid_games += single_game_idx + 1
		}
	}

	return total_valid_games
}

var game_obj = GamesSlice{}

func GetResult_02_02() int {

	file_name := takeFileInput(1)
	game_obj.parseInput(takeInput(file_name))

	total_min_cubes := game_obj.checkGames_02()
	fmt.Println("min cubes: ", total_min_cubes)

	return total_min_cubes

}

func GetResult_02_01() int {
	file_name := takeFileInput(1)
	game_obj.parseInput(takeInput(file_name))

	nos_valid_games := game_obj.checkGames()
	fmt.Println("gameObj", nos_valid_games)

	return nos_valid_games
}
