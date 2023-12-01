import { expect, it } from "bun:test";

const test_arr = [
	[1, 2, 3],
	[2, 3, 5],
	[5, 2, 7],
];

const sum = (a: number, b: number) => {
	return a + b;
};

it.each(test_arr)("%d, %d", (a, b, c) => {
	expect(sum(a, b)).toBe(c);
});
