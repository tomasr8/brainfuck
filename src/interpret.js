"use strict";

const readlineSync = require("readline-sync");

module.exports = interpret;

const operations = {
  "+": (data) => {
    data.memory[data.p]++;
  },
  "-": (data) => {
    data.memory[data.p]--;
  },
  ">": (data) => {
    if (++data.p === data.memory.length) {
      data.memory.push(0);
    }
    if (data.memory.length > data.memSize) {
      throw new Error("Maximum memory size exceeded: " + data.memory.length);
    }
  },
  "<": (data) => {
    if (--data.p < 0) {
      throw new Error("Index out of bounds: " + data.p);
    }
  },
  ".": (data) => {
    data.output += String.fromCharCode(data.memory[data.p]);
  },
  ",": (data) => {
    const input = readlineSync.question("Enter number to read at cell " + data.p + ":\n");
    data.memory[data.p] = parseInt(input, 10);
  },
  "[": (data) => {
    if (data.memory[data.p] === 0) {
      let loop = 1;
      while (loop !== 0) {
        data.ic++;
        if (data.program[data.ic] === "[") {
          loop++;
        } else if (data.program[data.ic] === "]") {
          loop--;
        }
      }
    }
  },
  "]": (data) => {
    if (data.memory[data.p] !== 0) {
      let loop = 1;
      while (loop !== 0) {
        data.ic--;
        if (data.program[data.ic] === "]") {
          loop++;
        } else if (data.program[data.ic] === "[") {
          loop--;
        }
      }
    }
  }
};

function interpret(program, memSize, verbose) {
  const data = {
    "memory": [0],
    "p": 0,
    "memSize": memSize,
    "program": program,
    "ic": 0,
    "output": ""
  };

  while (data.ic < program.length) {
    operations[program[data.ic]](data);

    if (verbose) {
      console.log("instruction:", program[data.ic]);
      console.log("pointer: ", data.p);
      console.log("memory: ", data.memory);
      console.log();
    }
    data.ic++;
  }

  console.log("output:", data.output);
}
