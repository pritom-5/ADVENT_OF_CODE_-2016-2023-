/**
 * try out dijkstra
 */
class City {
  constructor(public name: string) {
    this.name = name;
  }
}

class Cities {
  cities_list: Set<string> = new Set();
  cities_obj: Record<
    string,
    { city: City; neighbors: { city: City; distance: number }[] }
  > = {};

  distances: number[] = [];

  addCity(city: City) {
    this.cities_list.add(city.name);
    if (!this.cities_obj[city.name]) {
      this.cities_obj[city.name] = { city, neighbors: [] };
    }
  }

  addNeighbor(city: City, neighbor: City, distance: number) {
    if (this.cities_obj[city.name]) {
      this.cities_obj[city.name].neighbors.push({ city: neighbor, distance });
    }
  }

  walk(curr: City, visited: string[], distance: number, curr_dis: number) {}

  getMinDistance(city_name: string) {
    let min_dis = Infinity;

    for (let city of this.cities_list) {
      const c = this.walk(this.cities_obj[city].city, [], 0, 0);
      console.log("distance: ", c);
      min_dis = Math.min(min_dis, c);
    }
    console.log(min_dis);
  }
}

function parse(_input: string) {
  const c = new Cities();

  _input
    .trim()
    .split("\n")
    .forEach((line) => {
      const distance = +line.split(" = ")[1];
      const cities = line.split(" = ")[0].split(" to ");

      for (const city of cities) {
        const a = new City(city);
        c.addCity(a);

        for (const city_0 of cities) {
          if (city === city_0) {
            continue;
          }

          const x = new City(city_0);
          c.addNeighbor(a, x, distance);
        }
      }
    });

  c.getMinDistance("London");

  // console.log(c);
}

import Bun from "bun";
async function main() {
  const input = await Bun.file("../../../data/09/ex.txt").text();
  //   const input = await Bun.file("../../../data/09/data.txt").text();
  parse(input);
}
main();
