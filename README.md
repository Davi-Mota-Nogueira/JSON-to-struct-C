# **JSON-to-struct-C**

## I) Grupo de Desenvolvimento


* [Davi da Mota Nogueira](https://github.com/Davi-Mota-Nogueira)

* [Matheus Albert Oliveira dos Santos](https://github.com/AltheusV)

Foi utilizado a linguagem JavaScript junto da biblioteca ohm.js
A linguagem é chamada de JStruct C.

Link para o projeto no [repl.it](https://replit.com/@AltheusV/JSON-to-struct-C)

## II) Motivação

A linguagem de programação C foi desenvolvida sob o paradigma imperativo de programação em 1972. Neste contexto, ainda estava sendo construido os principais conceitos do paradigma de orientação a objetos.

Apesar de não possuir objetos, a linguagem C possui um tipo de dado composto de variaveis de outros tipos de dados, denominada Struct. Esses tipos de estruturas eram as que mais se assemelhavam ao conceito de um objeto, em C.

Nos tempos atuais, é amplamente utilizado a notação de objetos da linguagem JavaScript, ou JSON (JavaScript Object Notation), devido principalmente a sua facilidade de leitura e escrita, além de ser um formato leve e intercambiável entre as linguagens, combinando perfeitamente com a velocidade de processamento da linguagem C.

Pensando em uma maneira de integrar projetos mais atuais para linguagens mais antigas, mas que possuam um alto poder de processamento, o grupo propôs uma forma alternativa de se representar um objeto JSON na linguagem C, projetando uma DSL que realize a conversão dos principais dados de um objeto JSON, para o formato de uma Struct em C.




## III) Elementos da Linguagem

Um objeto JSON é uma estrutura que engloba vários tipos de dados, desde um int até outro objeto. Ela é formada basicamente por uma string e uma atribuição value ("string" : value). E no objeto JSON também tem a atribuição de Arrays, que podem ter vários valores de tipos diferentes, assim sendo uma estrutura muito versátil. Segundo o próprio site oficial do JSON:
"JSON está constituído em duas estruturas:
- Uma coleção de pares nome/valor. Em várias linguagens, isto é caracterizado como um object, record, struct, dicionário, hash table, keyed list, ou arrays associativas.
- Uma lista ordenada de valores. Na maioria das linguagens, isto é caracterizado como uma array, vetor, lista ou sequência."

Funcionamento Geral de um Objeto JSON:

![alt text](https://www.json.org/img/object.png "Funcionamento geral de um Objeto JSON")

Na imagem percebe-se que é possível identificar que o objeto começa e termina com chaves, ele começa com um espaço(whitespace), e daí tem duas oportunidades, ser vazio e ter valor, como dito anteriormente, ter uma string, que significa o nome de uma variável, um espaço, dois pontos e o valor dessa variável, e pode terminar o objeto fechando com a chave, ou pode ter outras variáveis com outros valores, em um laço, até terminar com as chaves de fechamento.


## IV) Exemplos de Códigos Fontes

Alguns exemplos de códigos fontes que a linguagem suporta são:

```javascript
{
    "nome": "Luis Gama",
    "idade": 32, 
    "profissão": "adêvógado"
}
```
```javascript
{
  "Tierney": {
    "age": 69
  },
  "Gabi": {
    "age": 74
  },
  "Gwenneth": {
    "age": 40
  }
}
```
```javascript
{
   "min_position": 8,
   "has_more_items": false,
   "items_html": "Car",
   "new_latent_count": 1,
   "data": {
      "length": 23,
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
   }
}
```
```javascript
{
   "data": {
      "name": "Luis",
      "values": [
        10,
        10,
        9,
        10,
        9.5,
        10
      ]
   }
}
```
```javascript
{
"name":"John",
"age":30,
"value": 30.32,
"cars":["Ford", "BMW", "Fiat"]
}
```
```javascript

```
```javascript
{
    "random": 32,
    "random float": 66.648,
    "boolean": true,
    "date": "1992-04-19",
    "regEx": "hellooooooooooooooooooooooooooooooooooooooooooooo world",
    "e": "json",
    "firstname": "Kirbee",
    "lastname": "Deny",
    "city": "Lubumbashi",
    "country": "Angola",
    "countryCode": "CG",
    "email uses current data": "Kirbee.Deny@gmail.com",
    "email from expression": "Kirbee.Deny@yopmail.com",
    "array": [
        "Fawne",
        "Binny",
        "Larine",
        "Jan",
        "Libbie"
    ],
    "Danika": {
        "age": 88
    }
}
```


## V) Comportamento do Compilador

A nossa linguagem já facilita o trabalho manual de traduzir todo o objeto JSON para uma Struct em C, há casos que são muitos dados para serem traduzidos, e o trabalho envolvido é muito grande, pois diferente da sintaxe de JSON, onde há uma "string" : value, a Struct funciona de maneira inversa, colocando o tipo da variável primeiro, depois o nome da variável, e por final é adicionado o valor da variável. Com a nossa linguagem englobando todas as possibilidades que ocorrem no objeto JSON, e interpretando na árvore semântica, irá automatizar esse trabalho, poupando horas de trabalho de conversão de uma linguagem para outra.
No exemplo a seguir há uma estrutura em JSON:

```javascript
{
   "min_position": 8,
   "has_more_items": false,
   "items_html": "Car",
   "new_latent_count": 1,
   "data": {
      "length": 23,
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
   }
}
```
O resultado em Struct C da estrutura acima será:

```c
struct data
{
     int length;
     char text[124];
};

struct JSON 
{
     int min_position;
     bool has_more_items;
     char items_html[4];
     int new_latent_count;
    struct data data;
} values = { 8,false,"Car",1,23,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." };
```
Percebe-se também que quando há um objeto dentro da estrutura, é preciso fazer uma struct antes de rodar o struct da estrutura JSON, pois a linguagem C funciona de maneira top-down.

A linguagem tem limitações ainda, ela tem problemas com o Array e null, ela não consegue identificar Array de Objetos e Array de Arrays junta todos os Arrays em um só.

Array de Array em JSON:
```javascript
{
  "pontos":[
    [10,20,30,40],
    [50,60,70,80.5,95.5],
    [90,100]
  ]
}
```
Resultado passando pela linguagem:
```c
struct JSON 
{
     char pontos[11][5];
} values = { "10","20","30","40","50","60","70","80.5","95.5","90","100" };
```
Mas os outros tipos consegue identificar. O null, é mais difícil de organizar, por esse motivo, tiramos da gramática, logo, não aceita o valor null, mas se for uma string chamada null, funcionará. Como na linguagem em C não há Arrays de tipos diferentes, ele voltará os Arrays aceitáveis como um array de strings.


## VI) Manual

Atualmente, o que deverá ser feito, é copiar os exemplos individualmente do capítulo IV e trocar pelo exemplo já colocado no arquivo [input.json](https://github.com/Davi-Mota-Nogueira/JSON-to-struct-C/blob/main/input.json), e rodar o código do arquivo [index.js](https://github.com/Davi-Mota-Nogueira/JSON-to-struct-C/blob/main/index.js), ele vai interpretar a estrutura JSON, se estiver errada, avisará no console que a entrada é inválida, mas se estiver correta, irá gerar um código de struct já do tipo C [output.c](https://github.com/Davi-Mota-Nogueira/JSON-to-struct-C/blob/main/output.c), nesse código, a struct principal, chamará "strct JSON", já que não há um título ou nome especificando o arquivo.


## VII) Informações adicionais

Como a gramática é extensa, o projeto ficou dividido em 3 arquivos principais, o arquivo da gramática, que tem uma extensão .ohm(json-gramatic.ohm), um arquivo de "index.js" sendo o motor do projeto, já que é nele que há a árvore semântica, e um arquivo de entrada em .json (inputs.json). O resultado gerado (se o input for correto) será um arquivo em C(output.c), contendo o Struct pronto para uso. 

Referencias utilizadas no desenvolvimento do projeto:

1. [Site oficial do JSON](https://www.json.org/json-en.html)

2. [Gnu C Manual](https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.pdf)

3. [Repositorio Oficial do Ohm](https://github.com/harc/ohm)

4. [Link do Ohm no npmjs](https://www.npmjs.com/package/ohm-js)
