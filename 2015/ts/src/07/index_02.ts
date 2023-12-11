const input = `x LSHIFT 2 -> f
x AND y -> d
123 -> x
y RSHIFT 2 -> g
456 -> y
NOT x -> h
x OR y -> e
NOT y -> i`;

function walk(item) {}

function parseInput(input_arg) {
  input_arg.split("\n").forEach((item) => {
    walk(item);
  });
}
