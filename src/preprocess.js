"use strict";

const symbols = {
  "+": 1,
  "-": 1,
  ">": 1,
  "<": 1,
  ".": 1,
  ",": 1,
  "[": 1,
  "]": 1
};

module.exports = preprocess;

function preprocess(input) {
  return input.split("").filter(c => {
    return symbols[c];
  });
}
