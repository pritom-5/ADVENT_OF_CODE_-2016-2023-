/**
 * couldn't figure out
 * we are finding a path just not the shortest one
 */

function isWall(x, y, fav_no) {
  const no = x * x + 3 * x + 2 * x * y + y + y * y;
  const no_val = no + fav_no;

  const binary = no_val.toString(2);

  const nos_one = binary.split("").reduce((acc, curr) => {
    if (curr === "1") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  return nos_one % 2 !== 0;
}

// const FAV_NO = 10;
const FAV_NO = 1350;

const dir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function walk(x, y, target_x, target_y, seen_arr, path) {
  if (x === target_x && y === target_y) {
    path.push([x, y]);
    return true;
  }

  if (
    isWall(x, y, FAV_NO) ||
    x < 0 ||
    y < 0 ||
    seen_arr.includes(`${x} ${y}`)
  ) {
    return false;
  }

  seen_arr.push(`${x} ${y}`);
  path.push([x, y]);

  for (let i = 0; i < dir.length; i++) {
    if (
      walk(x + dir[i][0], y + dir[i][1], target_x, target_y, seen_arr, path)
    ) {
      return true;
    }
  }

  path.pop();

  return false;
}

function getPath() {
  const path = [];
  walk(1, 1, 31, 39, [], path);

  console.log(path.length);
}
getPath();
