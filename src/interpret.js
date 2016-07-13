"use strict";

const readlineSync = require("readline-sync");

module.exports = interpret;

function interpret(data, settings) {
  let {
    memory,
    p,
    source,
    ic,
  } = data;

  const {
    memSize,
    verbose
  } = settings;
  
  let output = "";

  const operations = {
    "+": () => {
      memory[p]++;
    },
    "-": () => {
      memory[p]--;
    },
    ">": () => {
      if (++p === memory.length) {
        memory.push(0);
      }
      if (memory.length > memSize) {
        throw new Error("Maximum memory size exceeded: " + memory.length);
      }
    },
    "<": () => {
      if (--p < 0) {
        throw new Error("Index out of bounds: " + p);
      }
    },
    ".": () => {
      output += String.fromCharCode(memory[p]);
    },
    ",": () => {
      const input = readlineSync.question("Enter number to read at cell " + p + ":\n");
      memory[p] = parseInt(input, 10);
    },
    "[": () => {
      if (memory[p] === 0) {
        let loop = 1;
        while (loop !== 0) {
          ic++;
          if (source[ic] === "[") {
            loop++;
          } else if (source[ic] === "]") {
            loop--;
          }
        }
      }
    },
    "]": () => {
      if (memory[p] !== 0) {
        let loop = 1;
        while (loop !== 0) {
          ic--;
          if (source[ic] === "]") {
            loop++;
          } else if (source[ic] === "[") {
            loop--;
          }
        }
      }
    }
  };

  while (ic < source.length) {

    operations[source[ic]](data);

    if (verbose) {
      commentExecution(data);
    }
    ic++;
  }

  console.log("output:", output);
}

function commentExecution(data) {
  let {
    memory,
    p,
    source,
    ic
  } = data;

  console.log("instruction:", source[ic]);
  console.log("pointer: ", p);
  console.log("memory: ", memory);
  console.log();
}
