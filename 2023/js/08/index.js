const fs = require("fs");
const path = require("path");
const { lcm } = require("./find_lcm");

// const FILE_NAME = "../../data/08/ex2.txt";
// const FILE_NAME = "../../data/08/ex.txt";
const FILE_NAME = "../../data/08/data.txt";

const abs_path = path.resolve(FILE_NAME);
const INPUT = fs.readFileSync(abs_path, "ascii").trim();

const REPEAT_PATTERN = INPUT.split("\n")[0].trim();

class Node {
  constructor(name, left, right) {
    this.name = name;
    this.left = left;
    this.right = right;
  }
}

class Graph {
  nodes = {};

  addNewNode(name, left, right) {
    this.nodes[name] = new Node(name, left, right);
  }

  // dfs of graph
  findItem(start, destination, walk_pattern) {
    let pattern_index = 0;
    let steps = 0;

    const walk = (node, step) => {
      if (!node || node.name === destination) {
        return;
      }

      steps++;

      pattern_index = (pattern_index + 1) % walk_pattern.length;
      switch (step) {
        case "L":
          return walk(this.nodes[node.left], walk_pattern[pattern_index]);

        case "R":
          return walk(this.nodes[node.right], walk_pattern[pattern_index]);
      }
    };

    walk(this.nodes[start], walk_pattern[pattern_index]);
    return steps;
  }

  // dfs and get step for every single node
  // returning individual steps arr
  findItem_03(start_nodes, destination, walk_pattern) {
    const nodes_arr = this.getGraphNodes(start_nodes);
    const steps_arr = [];

    let pattern_index = 0;

    const walk = (node, step, step_count) => {
      if (!node || node.name[2] === destination) {
        return step_count;
      }

      step_count++;

      pattern_index = (pattern_index + 1) % walk_pattern.length;
      switch (step) {
        case "L":
          return walk(
            this.nodes[node.left],
            walk_pattern[pattern_index],
            step_count
          );

        case "R":
          return walk(
            this.nodes[node.right],
            walk_pattern[pattern_index],
            step_count
          );
      }
    };

    for (let item of nodes_arr) {
      const c = walk(item, walk_pattern[pattern_index], 0);
      console.log(c);
      steps_arr.push(c);
    }

    return steps_arr;
  }

  getGraphNodes(node_names) {
    let nodes_arr = [];

    for (let item of node_names) {
      nodes_arr.push(this.nodes[item]);
    }

    return nodes_arr;
  }

  getAllNodesArrBasedOnDirection(nodes_arr_arg, direction) {
    let node_arr = [];

    switch (direction) {
      case "L":
        for (let item of nodes_arr_arg) {
          node_arr.push(this.nodes[item.left]);
        }
        break;
      case "R":
        for (let item of nodes_arr_arg) {
          node_arr.push(this.nodes[item.right]);
        }
        break;
    }

    return node_arr;
  }

  logger(n) {
    for (let item of n) {
      console.log(item.name, item.left, item.right);
    }

    console.log("=============");
  }

  isEveryNodeNameEndWithDestination(n, des) {
    let x = true;
    for (let item of n) {
      if (item.name[2] !== des) {
        x = false;
        break;
      }
    }

    return x;
  }

  //
  findItem_02(start_nodes, destination, walk_pattern) {
    const nodes_arr = this.getGraphNodes(start_nodes);

    let pattern_index = 0;
    let steps = 0;

    const walk = (nodes, step) => {
      // this.logger(nodes);

      if (this.isEveryNodeNameEndWithDestination(nodes, destination)) {
        return;
      }

      steps++;

      pattern_index = (pattern_index + 1) % walk_pattern.length;

      switch (step) {
        case "L":
          return walk(
            this.getAllNodesArrBasedOnDirection(nodes, "L"),
            walk_pattern[pattern_index]
          );

        case "R":
          return walk(
            this.getAllNodesArrBasedOnDirection(nodes, "R"),
            walk_pattern[pattern_index]
          );
      }
    };

    walk(nodes_arr, walk_pattern[pattern_index]);

    return steps;
  }
}

// ===============================================

const start_node_names = [];

function parseInput(input) {
  let graph = new Graph();
  input
    .split("\n\n")[1]
    .trim()
    .split("\n")
    .forEach((line, idx) => {
      const node_name = line.split(" = ")[0];

      if (node_name[2] === "A") {
        start_node_names.push(node_name);
      }

      const left_node = line
        .split(" = ")[1]
        .trim()
        .split(", ")[0]
        .trim()
        .slice(1);
      const right_node = line
        .split(" = ")[1]
        .trim()
        .split(", ")[1]
        .trim()
        .slice(0, 3);

      graph.addNewNode(node_name, left_node, right_node);
    });

  return graph;
}

function part_1(input) {
  const g = parseInput(input);
  const result = g.findItem("AAA", "ZZZ", REPEAT_PATTERN);
  console.log(result);
}

function part_2(input) {
  const g = parseInput(input);
  const steps_arr = g.findItem_03(start_node_names, "Z", REPEAT_PATTERN);
  // running lcm runs forever...
  const result = lcm(steps_arr);
  console.log(result);
}

// part_1(INPUT);
// part_2(INPUT);
