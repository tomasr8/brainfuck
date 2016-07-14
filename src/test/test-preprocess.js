"use strict";

const expect = require("chai").expect;

const preprocess = require("../preprocess.js");

describe("preprocess() test", function() {
  it("should filter out letters", function() {
    expect(preprocess("abc,.+-<>[]abc").to.equal("hello");
  });
});
