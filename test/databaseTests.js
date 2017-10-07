var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');
var data = require('../src/data');


describe("Database", function () {

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

    var dbOnlyFacts = [
        "varon(juan).",
        "varon(pepe)."
    ];

    var dbFactsAndRules = [
        "varon(juan).",
        "varon(pepe).",
        "hijo(X, Y) :- varon(X), padre(Y, X)."
    ];

    var dbFactsAndRulesWithInvalidFact = [
        "varon(juan).",
        "varon(pepe)",
        "hijo(X, Y) :- varon(X), padre(Y, X)."
    ];
    
    var dbFactsAndRulesWithInvalidRule = [
        "varon(juan).",
        "varon(pepe).",
        "hijo(X, Y varon(X), padre(Y, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
    });

    afterEach(function () {
        // runs after each test in this block
    });

    describe('Database Parser', function () {

        it('Only database of facts', function () {
            interpreter = new Interpreter();
            interpreter.parseDB(dbOnlyFacts);
            expect(interpreter.dbFacts).to.have.lengthOf(2);
            expect(interpreter.dbRules).to.have.lengthOf(0);
        });

        it('Parse database of facts and rules', function () {
            interpreter = new Interpreter();
            interpreter.parseDB(dbFactsAndRules);
            expect(interpreter.dbFacts).to.have.lengthOf(2);
            expect(interpreter.dbRules).to.have.lengthOf(1);
        });

        it('Parse database of facts and rules with invalid fact', function () {
            interpreter = new Interpreter();
            interpreter.parseDB(dbFactsAndRulesWithInvalidFact);
            expect(interpreter.dbFacts).to.have.lengthOf(1);
            expect(interpreter.dbRules).to.have.lengthOf(1);
        });

        it('Parse database of facts and rules with invalid rule', function () {
            interpreter = new Interpreter();
            interpreter.parseDB(dbFactsAndRulesWithInvalidRule);
            expect(interpreter.dbFacts).to.have.lengthOf(2);
            expect(interpreter.dbRules).to.have.lengthOf(0);
        });
    });

});


