
const fs = require('fs');
const ohm = require('ohm-js');

const contents = fs.readFileSync('gramatic.ohm');

const myGrammar = ohm.grammar(contents);

const semantic = myGrammar.createSemantics();

const userInput = fs.readFileSync('./input.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    return data
});


const result = myGrammar.match(userInput);
if (result.succeeded()) {
  console.log('Entrada válida');
  const tree = semantic(result);
  console.log(tree)
} else {
  console.log(result.message);
  console.log("Entrada inválida!");
}
