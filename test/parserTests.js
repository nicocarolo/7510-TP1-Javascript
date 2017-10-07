var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Parser = require('../src/parser');
var data = require('../src/data');


describe("Parser", function () {

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

    describe('Parse Fact', function() {
        it('should return true when a single argument fact is parsed', function() {
            var expectedFact = new data.Fact('varon', ['juan']);
            var parsedFact = parser.parseFact('varon(juan).');
            assert(parsedFact.isEqualTo(expectedFact));
        });

        it('should return a valid Fact when a, multiple argument, valid raw fact is parsed', function() {
            var expectedFact = new data.Fact('hijo', ['juan', 'pepe']);
            var parsedFact = parser.parseFact('hijo(juan, pepe).');
            assert(parsedFact.isEqualTo(expectedFact));
        });
    });
   
    describe('Parse Rule', function() {
        it('should return true when a single argument and single fact rule is parsed', function() {
            var expectedRule = new data.Rule('hijo', ['X'], [new data.Fact('varon', ['X'])]);
            var parsedRule = parser.parseRule('hijo(X) :- varon(X).');
            assert(parsedRule.toString() === expectedRule.toString());
        });

        it('should return true when a multiple argument and single fact rule is parsed', function() {
            var expectedRule = new data.Rule('hijo', ['X', 'Y'], [new data.Fact('varon', ['X', 'Y'])]);
            var parsedRule = parser.parseRule('hijo(X, Y) :- varon(X, Y).');
            assert(parsedRule.toString() === expectedRule.toString());
        });

        it('should return true when a single argument and multiple fact rule is parsed', function() {
            var expectedRule = new data.Rule('hijo', ['X'], [new data.Fact('varon', ['X']), new data.Fact('padre', ['Y', 'X'])]);
            var parsedRule = parser.parseRule('hijo(X) :- varon(X), padre(Y, X).');
            assert(parsedRule.toString() === expectedRule.toString());
        });

        it('should return true when a multiple argument and multiple fact rule is parsed', function() {
            var expectedRule = new data.Rule('hijo', ['X', 'Y'], [new data.Fact('varon', ['X', 'Y']), new data.Fact('padre', ['Y', 'X'])]);
            var parsedRule = parser.parseRule('hijo(X, Y) :- varon(X, Y), padre(Y, X).');
            assert(parsedRule.toString() === expectedRule.toString());
        });
    });

    describe('Valid Query', function () {
        
        it('should return true when a valid fact is evaluated', function () {
            assert(parser.validQuery('varon(juan)') === true);
            assert(parser.validQuery('mujer(juan).') === true);
            assert(parser.validQuery('hijo(juan, julio).') === true);
        });

        it('should return false when an invalid fact is evaluated', function() {
            assert(parser.validQuery('mujer(maria.') === false);
            assert(parser.validQuery('mujer((maria).') === false);
            assert(parser.validQuery('hermanos(maria,).') === false);
        });
    });
});


