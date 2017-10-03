const Parser = require('../src/parser');
const data = require('../src/data');
const zipmap = require('zipmap');

const Interpreter = function () {

    this.dbFacts = [];
    this.dbRules = [];

    this.parser = new Parser();
    
    this.parseDB = function (params, paramss, paramsss) {
        const facts = [];
        const rules = [];
        for (var i = 0; i < params.length; i++) {
            if (this.formatIsRule(params[i])) {
                rules.push(this.parser.parseRule(params[i]));
            }
            else {
                facts.push(this.parser.parseFact(params[i]));
            }
        }
        this.dbFacts = facts;
        this.dbRules = rules;
    }

    this.checkQuery = function (query) {
        if (this.parser.validQuery(query)) {
            const parsedQuery = this.parser.parseFact(query);
            if (this.isFact(parsedQuery)){
                return true;
            }
            else {
                if (this.isRule(parsedQuery)) {
                    const factsToTest = this.matchRule(parsedQuery);
                    return factsToTest.every(fact => this.isFact(fact));
                }
            }
        }
        return false;
    }

    this.formatIsRule = function (entry) {
        return entry.match(/[(][A-Z]/) !== null;
    }

    this.isFact = function (query) {
        const isFact = this.dbFacts.some(fact => fact.isEqualTo(query));
        return isFact;
    }
    
    this.isRule = function (query) {
        const isRule = this.dbRules.some(rule => rule.name == query.name);
        return isRule;
    }

    this.matchRule = function (query) {
        const rule = this.dbRules.find(rule => rule.name == query.name);
        return rule.factsToTestReplacedParams(query.values);
    }
}

module.exports = Interpreter;