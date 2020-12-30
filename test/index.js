// Dependencies
const assert = require('assert')
const checker = require('../lib');

describe('main', function () {

    const simpleObject = { a: 'a', b: 'b' };
    const nestedObject = { a: { b: { c: { d: 'd' } } } };
    const dataTypesObject = { a: { b: 1, c: 'c', d: {}, e: true } };

    it('Simple Object Validation Success', function () {
        assert.equal(true, checker(simpleObject, ['a', 'b']));
    });

    it('Simple Object Validation Fail', function () {
        assert.equal(false, checker(simpleObject, ['d']));
    });

    it('Nested Property Object Validation Success', function () {
        assert.equal(true, checker(nestedObject, ['a.b.c.d']));
    });

    it('Nested Property Object Validation Fail', function () {
        assert.equal(false, checker(nestedObject, ['a.b.c.d.e']));
    });

    it('Data Type Object Validation Success', function () {
        assert.equal(true,
            checker(dataTypesObject, [
                { name: 'a', type: 'object' },
                { name: 'a.b', type: 'number' },
                { name: 'a.c', type: 'string' },
                { name: 'a.d', type: 'object' },
                { name: 'a.e', type: 'boolean' },
            ])
        );
    });

    it('Data Type Object Validation Fail', function () {
        assert.equal(false,
            checker(dataTypesObject, [
                { name: 'a', type: 'object' },
                { name: 'a.b', type: 'number' },
                { name: 'a.c', type: 'string' },
                { name: 'a.d', type: 'object' },
                { name: 'a.e', type: 'string' },
            ])
        );
    });
});