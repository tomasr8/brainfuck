"use strict";

const expect = require("chai").expect;

const preprocess = require("../src/preprocess.js");

describe("preprocess() test", function() {
  it("should filter out letters", function() {
    expect(preprocess("abc,.+-<>[]abc")).to.deep.equal(",.+-<>[]".split(""));
  });
  it("should filter out special characters", function() {
    expect(preprocess("\t,.+-<>[]\n")).to.deep.equal(",.+-<>[]".split(""));
  });
});
