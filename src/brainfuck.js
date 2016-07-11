"use strict";

const fs = require("fs");
const preprocess = require("./preprocess.js");
const interpret = require("./interpret.js");

const args = process.argv.slice(2);
const memSize = 30000;
let verbose;
let file;

if(args.length === 1) {
  verbose = false;
  file = args[0];
} else if( args.length >= 2){
  verbose = (args[0] === "-v");
  file = args[1];
}

fs.readFile(file, "utf-8", function(err, data) {
  if (err) {
    throw err;
  }
  interpret(preprocess(data), memSize, verbose);
});
