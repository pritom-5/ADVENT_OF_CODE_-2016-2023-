package two

type Color string

const (
	ColorBlue  Color = "blue"
	ColorRed   Color = "red"
	ColorGreen Color = "green"
)

type TurnT struct {
	Color Color
	Value int
}

type MinCubes map[Color]int

type SubGameT []TurnT

type SingleGame []SubGameT
type GamesSlice []SingleGame

var LIMIT = map[Color]int{
	ColorBlue:  14,
	ColorRed:   12,
	ColorGreen: 13,
}
