"use strict";

const readlineSync = require("readline-sync");
const format = require("./format.js");

String.prototype.format = format;

const messages = {
  "oomError": "Maximum memory size exceeded: {}",
  "iobError": "Index out of bounds: {}",
  "readMessage": "Enter number to read at cell {}:\n",
  "outputMessage": "output: {}",
  "executionComment": "instruction: {}\npointer: {}\nmemory: {}\n",
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
        throw new Error(messages.oomError.format(memory.length));
      }
    },
    "<": () => {
      // no negative indices
      if (--p < 0) {
        throw new Error(messages.iobError.format(p));
      }
    },
    ".": () => {
      output += String.fromCharCode(memory[p]);
    },
    ",": () => {
      const input = readlineSync.question(messages.readMessage.format(p));
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

    operations[source[ic]]();

    if (verbose) {
      console.log(getComment(data));
    }
    ic++;
  }

  console.log(messages.outputMessage.format(output));
}

function getComment(data) {
  return messages.commentExecution.format(
    data.source[data.ic],
    data.p,
    data.memory);
}
