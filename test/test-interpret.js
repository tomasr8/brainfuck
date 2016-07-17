"use strict";

const expect = require("chai").expect;

const interpret = require("../src/interpret.js");

describe("preprocess() test", function() {
  it("should throw an error after reaching memsize", function() {
    const settings = {
      memSize: 5,
      verbose: false
    };
    const data = {
      memory: [0],
      p: 0,
      source: ">>>>>",
      ic: 0,
    };

    expect(() => { interpret(data, settings); }).to.throw(Error);
  });

  it("should throw an error when accessing negative cell index", function() {
    const settings = {
      memSize: 5,
      verbose: false
    };
    const data = {
      memory: [0],
      p: 0,
      source: "<",
      ic: 0,
    };

    expect(() => { interpret(data, settings); }).to.throw(Error);
  });
});
