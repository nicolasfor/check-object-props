# check-object-props
Checks deep object properties and their data types

## Instalation
`npm i check-object-props --save`

## How to use
```
const checker = require('check-object-props');

const simpleObject = { a: 'a', b: 'b' };

console.log(checker(simpleObject, ['a', 'b']))
// Output: true
console.log(checker(simpleObject, ['a', 'b','c']))
// Output: false

const nestedObject = { a: { b: { c: { d: 'd' } } } };

console.log(checker(nestedObject, ['a.b.c.d']))
// Output: true
console.log(checker(nestedObject, ['a.b.c.d.e']))
// Output: false

const dataTypesObject = { a: { b: 1, c: 'c', d: {}, e: true } };

console.log(
    checker(dataTypesObject, [
                { name: 'a', type: 'object' },
                { name: 'a.b', type: 'number' },
                { name: 'a.c', type: 'string' },
                { name: 'a.d', type: 'object' },
                { name: 'a.e', type: 'boolean' },
            ])
)
// Output: true
```