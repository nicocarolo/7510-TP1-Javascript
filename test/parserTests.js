var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Parser = require('../src/parser');
var data = require('../src/data');


describe("Parser", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var dbTestShortVersion = [
        "varon(juan).",
        "varon(pepe)."
    ];

    var parser = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        parser = new Parser();
    });

    afterEach(function () {
        // runs after each test in this block
    });

    describe('Parser Test', function () {
        it('nombre(juan) should be true', function () {
            var inputFact = parser.parseFact('varon(juan)');
            assert(inputFact.isEqualTo(new data.Fact("varon", ["juan"])));
        });
    });

});


