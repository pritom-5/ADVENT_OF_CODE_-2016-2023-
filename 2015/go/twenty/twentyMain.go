package twenty

import "fmt"

const INPUT = 34_000_000
// const INPUT = 130


func findTotalPresents (house_no int) int {
	total := 0
	elf := house_no

	for elf > 0 {
		if total > INPUT / 10 {
			break
		}
		if house_no % elf == 0 {
			total += elf
		}
		elf--
	}
	fmt.Println(total)
	return total
}

func TwentyMain()  {
	house_no:= 1

	for {
		if INPUT / 10 == findTotalPresents(house_no) {
			fmt.Println("house_no", house_no)
			break
		}

		house_no++
	}
}