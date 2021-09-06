
const fs = require('fs');
const ohm = require('ohm-js');

const contents = fs.readFileSync('json-gramatic.ohm');

const myGrammar = ohm.grammar(contents);

const semantic = myGrammar.createSemantics();

const userInput = fs.readFileSync('./input.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    return data
});

const values = [];
const objects = [];
const isObject = new RegExp("{*}");
const isArray = new RegExp("\\[*\\]");

semantic.addOperation('execute', {
  json(element){
    const json = element.execute();
    return objects.join("") + "struct JSON \n" + json 
     + " values = { " + values + " };";
  },

  elements(element){
    return element.execute();
  },

  elements_multipleElements(element, comma, elements){
    return element.execute() + 
    comma.execute() + 
    elements.execute();
  },

  element(leftSpace, value, rightSpace){
    return leftSpace.execute() + value.execute()
  },

  object_space(leftBrace, space, rightBrace){
    return leftBrace.execute() +
    space.execute() +
    rightBrace.execute();
  },

  object_members(leftBrace, members, rightBrace){
    return leftBrace.execute() + "\n" +
    members.execute() + 
    "\n" +
    rightBrace.execute();
  },

  members(member){
    return "    " + member.execute();
  },

  members_multipleMembers(member, comma, members){
    return member.execute() +
    "\n" + //comma.execute() +
    members.execute();
  },

  member(leftSpace, string, rightSpace, colon, element){
    if(!isObject.test(element.sourceString)){
      if(isArray.test(element.sourceString)){
        const arr = element.sourceString.replace(/[\[\]']+/g,'').replace(/\s/g, "");

        if(arr === ""){
          values.push("\"\"");
        }
        else{
          arrr =  arr.split(",")
          arrr.forEach(
            (str, index) => {
              if(!str.includes("\"")){
                arrr[index] = "\"" + str + "\""
              }
            }
          )
          values.push(arrr)
        }
      }
      else{
      values.push(element.sourceString.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim());        
      }
    }

    const variable = string.sourceString.replace(/['"]+/g, '').replace(/[" "]+/g,'_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const type = element.execute();

    if(type.includes("char[")){
      return " char " + variable + type.replace("char", "").trim() + ";"
    }
    else if(isObject.test(type)){
      objects.push("struct " + variable + "\n" + type.trim() + ";\n\n");
      return "struct " + variable + " " + variable + ";";
    }
    else{
    return  type + variable + ";"
    }
  },

  array_space(leftBracket, space, rightBracket){
    return "char[1] "
  },

  array_elements(leftBracket, elements, rightBracket){
    const max_length = elements.sourceString.replace(/\s/g, "").split(",").sort((a, b) => b.length - a.length)[0].length;

    const length = elements.sourceString.replace(/\s/g, "").split(",").length;
    return "char[" + length + "]" + "[" + max_length + "]";
  },

  string(leftQuote, characters, rightQuote){
    const length = characters.numChildren + 1;
    return "char[" + length + "] ";
  },

  characters_nonEscaped(character){
    return character.execute();
  },

  characters_escape(backslash, escape){
   return backslash.execute() +
   escape.execute();
  },
  
  escape_quote(quote){
    return quote.execute();
  },
  escape_backslash(backslash){
    return backslash.execute();
  },  
  escape_slash(slash){
    return slash.execute();
  },
  escape_backspace(backspace){
    return backspace.execute();
  },
  escape_formfeed(formfeed){
    return formfeed.execute();
  },
  escape_newLine(newLine){
    return newLine.execute();
  },
  escape_return(ret){
    return ret.execute();
  },
  escape_tab(tab){
    return tab.execute();
  },

  escape_unicode(unicode, hexdigit0, hexdigit1, hexdigit2, hexdigit3){
    return unicode.execute() +
    hexdigit0.execute() +
    hexdigit1.execute() +
    hexdigit2.execute() +
    hexdigit3.execute();
  },

  number(integer, fraction, exponent){
    if(integer.execute()){
      if(fraction.execute()){
        return "float "
      }
      return "int "
    }
    // return integer.execute() +
    // fraction.execute() +
    // exponent.execute();
  },

  integer_digits(digits){
    return digits.sourceString;
  },

  integer_negativeNumber(signal, digits){
    return signal.execute() + digits.execute();
  },

  digits(digit){
    return digit.sourceString;
  },

  fraction_empty(quotes){
    return quotes.execute();
  },

  fraction_decimal(dot, digits){
    return dot.execute() + digits.execute();
  },

  exponent_empty(quotes){
    return quotes.execute();
  },

  exponent_upper(e, sign, digits){
    return e.execute(), + sign.execute() + digits.execute();
  },
  exponent_lower(e, sign, digits){
    return e.execute(), + sign.execute() + digits.execute();
  },

  boolean(bool){
    return "bool ";
  },

  sign(_){
    return this.sourceString;
  },

  ws(_){
    return this.sourceString;
  },
  _terminal() {
    return this.primitiveValue;
  }
})


const result = myGrammar.match(userInput);
if (result.succeeded()) {
  console.log('Input is Valid');
  const tree = semantic(result).execute();
  console.log(tree)
  

fs.writeFile('output.c', tree, function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
});

} else {
  console.log(result.message);
  console.log("Input is Invalid");
}
