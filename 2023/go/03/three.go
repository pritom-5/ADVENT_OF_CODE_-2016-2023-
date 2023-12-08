package three

import (
	"errors"
	"fmt"
	"log"
	"os"
	"slices"
	"strconv"
	"strings"
)

const FILE_PATH = "../data/03/ex.txt"
// const FILE_PATH = "../data/03/data.txt"
type TOTAL int
var CHECKED = map[int][]int{}


func GetInputData(file_path string) string {
	data, err := os.ReadFile(file_path)
	if err != nil {
		log.Fatal(err.Error())
	}

	return string(data)
}


func isValidSymbol(ch string) bool {
	if ch == "." {
		return false
	}

	_, err := strconv.Atoi(ch)

	// not number return true
	// else return false
	return err != nil
}

func isValidSymbol_02(ch string) bool {
	return ch == "*"
}

func isValidNumber(ch string) bool {
	if ch == "." {
		return false
	}
	_, err := strconv.Atoi(ch)
	
	return err == nil
}



func isNextChNumber(col_idx int, line string) bool {
	if col_idx < len(line) - 1 && isValidNumber(string(line[col_idx + 1])){
		return true
	}
	return false
}
func isPrevChNumber(col_idx int, line string) bool {
	if col_idx > 0 && isValidNumber(string(line[col_idx - 1])){
		return true
	}
	return false
}

func grabTheWholeNumber(row_idx, col_idx int, input string) (int, error) {
	if slices.Contains(CHECKED[row_idx], col_idx) {
		return 0, errors.New("can't get number")
	}
	// check if right and left is symbol
	line := strings.Split(input, "\n")[row_idx]
	left := true
	right := true

	left_id := col_idx
	right_id := col_idx

	for left || right {

		if left && isPrevChNumber(left_id, line) {
			left_id--
		} else {
			left = false
		}

		if isNextChNumber(right_id, line) {
			right_id++
		} else {
			right = false
		}
	}

	// grabbed_number := line[left_id:right_id]
	grabbed_number_string := strings.Join(strings.Split(line, "")[left_id : right_id + 1], "")

	// fmt.Println("grabbed_number", grabbed_number_string)

	// convert to number
	grabbed_number, err :=	strconv.Atoi(grabbed_number_string)
	if err != nil {
		log.Fatal("wrong grabbed_number")
	}


	// add visited points
	for i := left_id; i <= right_id; i++ {
		CHECKED[row_idx] = append(CHECKED[row_idx], i)
	}

	return grabbed_number, nil
}

func (t *TOTAL) addValueToTotal_01 (temp_total_slice []int) {
	for _, v := range temp_total_slice {
		*t += TOTAL(v)	
	}
}
func (t *TOTAL) addValueToTotal_02 (temp_total_slice []int) {
	fmt.Println("temp_slice: ", temp_total_slice)
	if len(temp_total_slice) == 2{
		temp_total := 1

		for _, v := range temp_total_slice {
				temp_total *= v	
		}
		*t += TOTAL(temp_total)
	}
}

func checkGridForNumber(col_idx, row_idx int, input string)[]int {
	// updated
	temp_totals := []int{}

	// walk table
	for _, row := range []int{row_idx - 1, row_idx, row_idx + 1} {
		// walk line
		for _, col := range []int{col_idx - 1, col_idx, col_idx + 1} {
			// row col
			// self point
			if row == row_idx && col == col_idx {
				continue
			}

			ch := string(strings.Split(input, "\n")[row][col])

			// is number
			if ch != "." && !isValidSymbol(ch) {
				// grab the whole number
				// updated
				number, err := grabTheWholeNumber(row, col, input)
				if err != nil {
					continue
				}
				
				temp_totals = append(temp_totals, number) 
			}
		}
	}

	// update
	return temp_totals

}

func (t *TOTAL) ParseInput_01(input string, is_valid_symbol func(string)bool) {
	for line_idx, line := range strings.Split(input, "\n") {
		for ch_idx, ch := range strings.Split(line, "") {
			if is_valid_symbol(ch) {
				// check 3 x 3 grid for number
				temp_slice := checkGridForNumber(ch_idx, line_idx, input)
				t.addValueToTotal_01(temp_slice)
			}
		}
	}
}

func (t *TOTAL) ParseInput_02(input string, is_valid_symbol func(string)bool) {
	for line_idx, line := range strings.Split(input, "\n") {
		for ch_idx, ch := range strings.Split(line, "") {
			if is_valid_symbol(ch) {
				// check 3 x 3 grid for number
				temp_slice := checkGridForNumber(ch_idx, line_idx, input)
				fmt.Println("tmep_slice", temp_slice)
				t.addValueToTotal_02(temp_slice)
			}
		}
	}
}

func GetResult_03_01(input string) {
	total := TOTAL(0)
	total.ParseInput_01(input, isValidSymbol)
	

	fmt.Println("total: ", total)
}

func GetResult_03_02(input string) {
	total := TOTAL(0)
	total.ParseInput_02(input, isValidSymbol_02)

	fmt.Println("total: ", total)
}

func Main_03() {
	input := GetInputData(FILE_PATH)

	GetResult_03_01(input)
	// GetResult_03_02(input)
}
