var expect = require('chai').expect;
var types = require('../src/checks');

describe('types', function(){
    
    it('number', function(){
        expect(
            types.number(1)
        ).to.be.true;
    });

    it('string', function(){
        expect(
            types.string('string')
        ).to.be.true;
    });
    
    it('array', function(){
        expect(
            types.array([])
        ).to.be.true;
    });
    
    it('object', function(){
        expect(
            types.object({})
        ).to.be.true;
    });
    
    it('boolean', function(){
        expect(
            types.boolean(true)
        ).to.be.true;
    });

});
