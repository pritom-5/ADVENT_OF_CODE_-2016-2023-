// const INPUT = 34_000_000;
// const INPUT = 130;
const INPUT = 34_000_000;

function findNosPresents(house_no) {
  let total = 0;

  let elf = house_no;

  while (elf > 0) {
    if (total > INPUT) {
      break;
    }
    if (house_no % elf === 0) {
      total += elf * 10;
    }
    elf--;
  }

  console.log(total);
  return total;
}

// findNosPresents(1_200_000);

function findHouse() {
  let house_no = 2_000_000;
  while (true) {
    if (findNosPresents(house_no) === INPUT) {
      break;
    }

    house_no++;
  }
  console.log(house_no);
}

findHouse();
