"use strict";

const fs = require("fs");
const preprocess = require("./preprocess.js");
const interpret = require("./interpret.js");

const args = process.argv.slice(2);

const settings = {
  "memSize": 30000,
  "verbose": false
};

let file;

if (args.length === 1) {
  file = args[0];
} else if (args.length >= 2) {
  settings.verbose = (args[0] === "-v");
  file = args[1];
}

fs.readFile(file, "utf-8", function(err, rawSource) {
  if (err) {
    throw err;
  }
  execute(rawSource);
});

function execute(rawSource) {
  const data = {
    "memory": [0],
    "p": 0,
    "source": preprocess(rawSource),
    "ic": 0,
  };

  interpret(data, settings);
}
