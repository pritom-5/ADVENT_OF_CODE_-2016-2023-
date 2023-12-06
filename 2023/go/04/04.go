package four

import (
	"log"
	"os"
	"slices"
	"strings"
)

type Card_t struct {
	Card_no   int
	My_cards  []string
	Winners   []string
	Nos_cards int
}

type Cards_slice_t struct {
	cards []Card_t
}

type Total_t int

const (
	EXAMPLE  = "./02/example"
	ORIGINAL = "./02/input"
)

func takeInput() string {
	file_input := os.Args
	switch true {
	case len(file_input) < 2:
		return EXAMPLE
	case file_input[1] == "1":
		return ORIGINAL
	default:
		return EXAMPLE
	}
}

func (c *Cards_slice_t) ParseCards(input string) {
	for i, v := range strings.Split(input, "\n") {
		card_no := i + 1
		winners := strings.Fields(strings.Split(strings.Split(v, ": ")[1], " | ")[0])
		my_cards := strings.Fields(strings.Split(strings.Split(v, ": ")[1], " | ")[1])

		c.cards = append(c.cards, Card_t{card_no, my_cards, winners, 1})
	}
}

func GrabInput(file_name string) string {
	data_byte, err := os.ReadFile(file_name)
	if err != nil {
		log.Fatal(err.Error())
	}
	return string(data_byte)
}

func (t *Total_t) getTotalPoints(cards Cards_slice_t) {

	for _, card_line := range cards.cards {
		var temp_total int
		for _, my_card := range card_line.My_cards {
			if slices.Contains(card_line.Winners, my_card) {
				switch temp_total {
				case 0:
					temp_total = 1
				default:
					temp_total *= 2
				}
			}
		}
		*t += Total_t(temp_total)
	}

}
func (c *Cards_slice_t) scratchAllCards_02(t *Total_t) {
	for i := range c.cards {
		c.scratchSingleCard_02(i, t)
	}
}

func (c *Cards_slice_t) scratchSingleCard_02(idx int, t *Total_t) {
	*t += Total_t(c.cards[idx].Nos_cards)

	var temp_total int
	for _, my_card := range c.cards[idx].My_cards {
		if slices.Contains(c.cards[idx].Winners, my_card) {
			temp_total++
			if idx+temp_total < len(c.cards) {
				c.cards[idx+temp_total].Nos_cards += c.cards[idx].Nos_cards
			}
		}
	}
}

func GetResult_04_01(total Total_t, cards Cards_slice_t) int {
	total.getTotalPoints(cards)
	return int(total)
}

func GetResult_04_02(cards Cards_slice_t, total *Total_t) int {
	cards.scratchAllCards_02(total)
	return int(*total)
}

func FourMain() {
	filename := takeInput()

	cards := Cards_slice_t{}
	total := Total_t(0)

	cards.ParseCards(GrabInput(filename))

	GetResult_04_01(total, cards)
	GetResult_04_02(cards, &total)
}
