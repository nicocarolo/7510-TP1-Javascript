const data = require('../src/data');

const Parser = function () {
    
        this.parseFact = function (entryFact) {
            //Split entry:  in first position of the result will have fact name
            //              in second position of the result will have the params
            const splittedEntry = entryFact.split(/\(|\)|\./);
            return new data.Fact(splittedEntry[0], splittedEntry[1].split(/, /));
        }
        
        this.parseRule = function (entryRule) {
            //Split entry:  in first position of the result will have fact name
            //              in second position of the result will have the params
            const splittedEntry = entryRule.split(/\(|\), |\) :- |\.|\)/);
            const factsOfRule = [];
            for (var i = 2; i < splittedEntry.length; i = i + 2) {
                if (splittedEntry[i] !== "") {
                    factsOfRule.push(new data.Fact(splittedEntry[i], splittedEntry[i+1].split(/, /)));
                }
            }
            return new data.Rule(splittedEntry[0], splittedEntry[1].split(/, /), factsOfRule);
        }

        this.validQuery = function (query) {
            return /^[a-z]+\(([a-z]+, )*[a-z]+\)/.test(query);
        }
        
        this.validRule = function (entry) {
            return /^[a-z]+\(([A-Z]+, )*[A-Z]+\) :- (([a-z]+\(([A-Z]+, )*[A-Z]+\)), )*([a-z]+\(([A-Z]+, )*[A-Z]+\))\./.test(entry);
        }
    
        this.validFact = function (entry) {
            return /^[a-z]+\(([a-z]+, )*[a-z]+\)\./.test(entry);
        }
    }

module.exports = Parser;
