"use strict";

const readlineSync = require("readline-sync");
const format = require("./format.js");

String.prototype.format = format;

const messages = {
  0: "Maximum memory size exceeded: {}",
  1: "Index out of bounds: {}",
  2: "Enter number to read at cell {}:\n",
  3: "output: {}",
  4: "instruction: {}\npointer: {}\nmemory: {}\n",
};

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
      // add additional cells only when needed
      if (++p === memory.length) {
        memory.push(0);
      }
      if (memory.length > memSize) {
        throw new Error(messages[0].format(memory.length));
      }
    },
    "<": () => {
      // no negative indices
      if (--p < 0) {
        throw new Error(messages[1].format(p));
      }
    },
    ".": () => {
      output += String.fromCharCode(memory[p]);
    },
    ",": () => {
      const input = readlineSync.question(messages[2].format(p));
      memory[p] = parseInt(input, 10);
    },
    "[": () => {
      // find the corresponding closing bracket and skip the whole block
      // if the current cell is zero,
      // otherwise execute instructions as normal
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
      // find the corresponding opening bracket and go back
      // the entire block if the current cell is non-zero,
      // otherwise do nothing
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

    operations[source[ic]]();

    if (verbose) {
      console.log(getComment(data));
    }
    ic++;
  }

  console.log(messages[3].format(output));
}

function getComment(data) {
  return messages[4].format(
    data.source[data.ic],
    data.p,
    data.memory);
}
