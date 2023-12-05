/*
*
this version is correct
match string_number with startsWith / HasPrefix
*/
package one

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

const FILE_PATH = "./01/data.txt"

const INPUT = `
two1three4
one1one
one1two
5heloo
20`

// 11
// 12
// 24
// 55
// 122

type Total struct {
	total int
}
type Val int

var Numbers = []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
var NumbersMap = map[string]string{}

func parseFull(input string) []string {
	return strings.Split(input, "\n")
}

func (t *Total) parseSingle(input string) {
	var first, last string
	var last_idx int

	for i := 0; i < len(input); i++ {
		_, err := strconv.Atoi(string(input[i]))

		if err != nil {
			for _, v := range Numbers {
				if strings.HasPrefix(input[i:], v) {

					if first == "" {
						first = NumbersMap[v]
						break
					} else if i > last_idx {
						last = NumbersMap[v]
						last_idx = i
						break
					}
				}

			}

			continue
		}

		if first == "" && last == "" {
			first = string(input[i])
		} else if first != "" && (last == "" || last_idx < i) {
			last = string(input[i])
			last_idx = i
		}

	}

	var combined string
	if first != "" && last != "" {
		combined = first + last
	} else if last == "" {
		combined = first + first
	}

	combined_int, err := strconv.Atoi(combined)
	if err != nil {
		t.total += 0
	}

	t.total += combined_int
}

func fillMap() {
	for i, v := range Numbers {
		NumbersMap[v] = strconv.Itoa(i + 1)
	}
}

func readData() string {
	data_byte, err := os.ReadFile(FILE_PATH)
	if err != nil {
		fmt.Fprint(os.Stderr, err.Error())
		os.Exit(1)
	}
	return string(data_byte)
}

func Main_01() {
	data := readData()

	fillMap()

	total := Total{0}
	for _, v := range parseFull(data) {
		total.parseSingle(v)
	}

	fmt.Println("total", total.total)
}
