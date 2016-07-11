"use strict";

const readlineSync = require("readline-sync");

module.exports = interpret;

function interpret(program, memSize, verbose) {
  const memory = [0];
  let output = "";
  let p = 0;
  let ic = 0;

  while (ic < program.length) {
    switch (program[ic]) {
      case "+":
        memory[p]++;
        break;

      case "-":
        memory[p]--;
        break;

      case ">":
        if (++p === memory.length) {
          memory.push(0);
        }
        if(memory.length > memSize) {
          throw new Error("Maximum memory size exceeded: " + memory.length);
        }
        break;

      case "<":
        if (--p < 0) {
          throw new Error("Index out of bounds: " + p);
        }
        break;

      case ".":
        output += String.fromCharCode(memory[p]);
        break;

      case ",":
        const data = readlineSync.question("Enter number to read at cell " + p + ":\n");
        memory[p] = parseInt(data, 10);
        break;

      case "[":
        if (memory[p] === 0) {
          let loop = 1;
          while (loop !== 0) {
            ic++;
            if (program[ic] === "[") {
              loop++;
            } else if (program[ic] === "]") {
              loop--;
            }
          }
        }
        break;

      case "]":
        if (memory[p] !== 0) {
          let loop = 1;
          while (loop !== 0) {
            ic--;
            if (program[ic] === "]") {
              loop++;
            } else if (program[ic] === "[") {
              loop--;
            }
          }
        }
    }

    if (verbose) {
      console.log("instruction:", program[ic]);
      console.log("pointer: ", p);
      console.log("memory: ", memory);
      console.log();
    }
    ic++;
  }

  console.log("output:", output);
}
