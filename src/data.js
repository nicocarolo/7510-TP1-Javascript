const Fact = function (description, params) {
    
    this.name = description;
    this.values = params;

    this.isEqualTo = function (factToCompare) {
        if (this.name == factToCompare.name 
            && this.values.toString() == factToCompare.values.toString()) return true;
        return false;
    }

    this.toString = function () {
        let factString = this.name + "(";
        for (var j = 0; j < this.values.length; j++) {  //loop params
            factString += this.values[j] + ", ";
        }
        factString = factString.substring(0, factString.length - 2);
        factString += ").";
        return factString;
    }

}

const Rule = function (description, params, factsToTest) {
    
    this.name = description;
    this.params = params;
    this.factsToTest = factsToTest;

    this.factsToTestReplacedParams = function (params) {
        const factsOfRule = [];
        for (var i = 0; i < this.factsToTest.length; i++) { //loop facts to test
            const fact = new Fact(this.factsToTest[i].name, this.factsToTest[i].values);
            for (var j = 0; j < this.params.length; j++) {  //loop params
                const index = fact.values.indexOf(this.params[j]);
                if (index !== -1) {
                    fact.values[index] = params[j];
                }
            }
            factsOfRule.push(fact);
        }
        return factsToTest;
    }

    this.toString = function () {
        let ruleString = this.name + "(";
        for (var j = 0; j < this.params.length; j++) {  //loop params
            ruleString += this.params[j] + ", ";
        }
        ruleString = ruleString.substring(0, ruleString.length - 2);
        ruleString += ") :- ";
        for (var j = 0; j < this.factsToTest.length; j++) {  //loop params
            ruleString += this.factsToTest[j].toString() + "\n";
        }
        ruleString = ruleString.substring(0, ruleString.length - 1);
        return ruleString;
    }
}

exports.Fact = Fact
exports.Rule = Rule