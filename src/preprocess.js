"use strict";

const symbols = {
  "+": "+",
  "-": "-",
  ">": ">",
  "<": "<",
  ".": ".",
  ",": ",",
  "[": "[",
  "]": "]"
};

module.exports = preprocess;

function preprocess(input) {
  return input.split("").filter(c => {
    return symbols[c];
  });
}
