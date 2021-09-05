# **JSON-to-struct-C**

## I) Grupo de Desenvolvimento


* [Davi Nogueira](https://github.com/Davi-Mota-Nogueira)

* [Matheus Albert](https://github.com/AltheusV)

Foi utilizado a linguagem JavaScript junto da biblioteca ohm.js
A linguagem é chamada de JStruct C.

Link para o projeto no [repl.it](https://replit.com/@AltheusV/Projeto)

## II) Motivação

A linguagem de programação C foi desenvolvida sob o paradigma imperativo de programação em 1972. Neste contexto, ainda estava sendo construido os principais conceitos do paradigma de orientação a objetos.

Apesar de não possuir objetos, a linguagem C possui um tipo de dado composto de variaveis de outros tipos de dados, denominada Struct. Esses tipos de estruturas eram as que mais se assemelhavam ao conceito de um objeto, em C.

Nos tempos atuais, é amplamente utilizado a notação de objetos da linguagem JavaScript, ou JSON (JavaScript Object Notation), devido principalmente a sua facilidade de leitura e escrita, além de ser um formato leve e intercambiável entre as linguagens, combinando perfeitamente com a velocidade de processamento da linguagem C.

Pensando em uma maneira de integrar projetos mais atuais para linguagens mais antigas, mas que possuam um alto poder de processamento, o grupo propôs uma forma alternativa de se representar um objeto JSON na linguagem C, projetando uma DSL que realize a conversão dos principais dados de um objeto JSON, para o formato de uma Struct em C.




## III) Elementos da Linguagem

Um objeto JSON é uma estrutura que engloba vários tipos de dados, desde um int até outro objeto. Ela é formada básicamente por uma string e uma atribuição value ("string" : value).
Explique a sintaxe da linguagem e o significado dos elementos
sintáticos


## IV) Exemplos de Códigos Fontes


Muitos exemplos de programas que ilustrem as 
características da linguagems


## V) Comportamento do Compilador

A nossa linguagem já facilita o trabalho manual de traduzir todo o objeto JSON para uma Struct em C, há casos que são muitos dados para serem traduzidos, e o trabalho envolvido é muito grande, pois diferente da sintaxe de JSON, onde há uma "string" : value, a Struct funciona de maneira inversa, colocando o tipo da variável primeiro, depois o nome da variável, e por final é adicionado o valor da variável. Com a nossa linguagem englobando todas as possibilidades que ocorrem no objeto JSON, e interpretando na árvore semântica, irá automatizar esse trabalho, poupando horas de trabalho de conversão de uma linguagem para outra.
Que ações o compilador deve executar quando os Exemplos mostrados forem processados. É importante que os exemplos e o comportamento mostrem o quão
melhor é usar a sua linguagem proposta do que codificar diretamente em uma
Linguagem tradicional


## VI) Manual

Como utilizar a implementação para rodar os exemplos do Capítulo IV


## VII) Informações adicionais

Como a gramática é extensa, o projeto ficou dividido em 3 arquivos principais, o arquivo da gramática, que tem uma extensão .ohm(json-gramatic.ohm), um arquivo de "index.js" sendo o motor do projeto, já que é nele que há a árvore semântica, e um arquivo de entrada em .json (inputs.json). O resultado gerado (se o input for correto) será um arquivo em C(output.c), contendo o Struct pronto para uso. 

Referencias utilizadas no desenvolvimento do projeto:

1. [Site oficial do JSON](https://www.json.org/json-en.html)

2. [Gnu C Manual](https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.pdf)

3. [Repositorio Oficial do Ohm](https://github.com/harc/ohm)

4. [Link do Ohm no npmjs](https://www.npmjs.com/package/ohm-js)
