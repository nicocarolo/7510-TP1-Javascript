var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Parser = require('../src/parser');
var data = require('../src/data');


describe("Facts and Rules", function () {

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

    describe('Fact Tests', function() {
        it('should create a fact with name and single param', function() {
            var fact = new data.Fact('varon', ['juan']);
            assert(fact.name === 'varon' && fact.values.toString() === 'juan');
        });

        it('should create a fact with name and multiple params', function() {
            var fact = new data.Fact('varon', ['juan', 'hose']);
            assert(fact.name === 'varon' && fact.values.toString() === 'juan,hose');
        });

        it('should return a fact as string description', function() {
            var fact = new data.Fact('varon', ['juan', 'hose']);
            assert(fact.toString() === 'varon(juan, hose).');
        });

        it('should be true when compare two equals facts with single params', function() {
            var fact = new data.Fact('varon', ['juan']);
            var eFact = new data.Fact('varon', ['juan']);
            assert(fact.isEqualTo(eFact));
        });

        it('should be true when compare two equals facts with multiple params', function() {
            var fact = new data.Fact('varon', ['juan', 'hose']);
            var eFact = new data.Fact('varon', ['juan', 'hose']);
            assert(fact.isEqualTo(eFact));
        });

        it('should be false when compare two differents facts with multiple params', function() {
            var fact = new data.Fact('hija', ['lucia', 'mariana']);
            var eFact = new data.Fact('hija', ['lucia', 'mario']);
            assert(fact.isEqualTo(eFact) === false);
        });

        it('should be false when compare two differents facts with multiple params (different name)', function() {
            var fact = new data.Fact('hija', ['lucia', 'mariana']);
            var eFact = new data.Fact('hijo', ['lucia', 'mariana']);
            assert(fact.isEqualTo(eFact) === false);
        });
    });
   
    describe('Rule Tests', function() {
        it('should create a rule with name, params accepted and single fact to test the rule', function() {
            var rule = new data.Rule('hijo', ['X'], [new data.Fact('varon', ['X'])]);
            var factsInRule = '';
            for (var i = 0; i < rule.factsToTest.length; i++){
                factsInRule += rule.factsToTest[i].toString();
            }
            assert(rule.name === 'hijo' && rule.params.toString() === 'X' && factsInRule === 'varon(X).');
        });

        it('should create a rule with name, params accepted and multiple facts to test the rule', function() {
            var rule = new data.Rule('hijo', ['X'], [new data.Fact('varon', ['X']), new data.Fact('padre', ['Y', 'X'])]);
            var factsInRule = '';
            for (var i = 0; i < rule.factsToTest.length; i++){
                factsInRule += rule.factsToTest[i].toString() + '\n';
            }
            factsInRule = factsInRule.substring(0, factsInRule.length - 1);
            assert(rule.name === 'hijo' && rule.params.toString() === 'X' && factsInRule === 'varon(X).\npadre(Y, X).');
        });

        it('should return a rule as string description', function() {
            var rule = new data.Rule('hijo', ['X'], [new data.Fact('varon', ['X']), new data.Fact('padre', ['Y', 'X'])]);
            assert(rule.toString() === 'hijo(X) :- varon(X).\npadre(Y, X).');
        });
    });
});


