const Fact = function (description, params) {
    
    this.name = description;
    this.values = params;

    this.isEqualTo = function (factToCompare) {
        if (this.name == factToCompare.name 
            && this.values.toString() == factToCompare.values.toString()) return true;
        return false;
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

}

exports.Fact = Fact
exports.Rule = Rule