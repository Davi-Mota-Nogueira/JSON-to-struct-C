const fs = require('fs');
const ohm = require('ohm-js');

const contents = fs.readFileSync('json-gramatic.ohm');

const myGrammar = ohm.grammar(contents);

const semantic = myGrammar.createSemantics();

const userInput = fs.readFileSync('./inputs.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    return data
});