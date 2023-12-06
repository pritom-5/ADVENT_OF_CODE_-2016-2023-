package two

import (
	"testing"
)

func Test_two (t *testing.T) {

	t.Run("test part 01", func(t *testing.T) {
		exp := 8
		result := GetResult_02_01()

		if result != exp {
			t.Error("wrong 01")
		}
	})
}

