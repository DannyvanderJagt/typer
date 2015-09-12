var expect = require('chai').expect;
var Schema = require('../src/schema');

var schemas = [
    'a:string',
    'a:?string',
];


describe('Single schemas', function(){


    it('string', function(){
        expect(
            new Schema(schemas[0]).elements.length === 1
        ).to.be.true;
    });
    
    it('optional', function(){
        let schema = new Schema(schemas[1]);
        expect(
            schema.elements.length === 1
        ).to.be.true;
        
        expect(
            schema.elements[0].optional
        ).to.be.true;
    });


});
