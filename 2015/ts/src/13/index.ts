import Bun from "bun";
const filePath = "../../../data/13/ex.txt";

type ActionT = "gain" | "lose";

class Person {
  friends_obj: { person: Person; units: number }[] = [];

  constructor(public name: string) {
    this.name = name;
  }

  addFriend(person: Person, action: ActionT, units: number) {
    switch (action) {
      case "gain":
        {
          this.friends_obj.push({ person, units });
        }
        break;
      case "lose":
        {
          this.friends_obj.push({ person, units: units * -1 });
        }
        break;

      default:
        break;
    }
  }
}

class Persons {
  list: Record<string, Person> = {};

  addToList(name: string) {
    if (!this.list[name]) {
      this.list[name] = new Person(name);
    }
  }
}

function parseInput(_input: string) {
  const p = new Persons();

  _input
    .trim()
    .split("\n")
    .forEach((line) => {
      const splits = line.split(" ");
      const self = splits[0];
      const action = splits[2] as ActionT;
      const friend = splits[10];
      const units = +splits[3];

      p.addToList(self);
      p.addToList(friend);

      p.list[self].addFriend(p.list[friend], action, units);
    });

  console.log("hello");
}

async function main() {
  const input = await Bun.file(filePath).text();
  parseInput(input);
}
main();
