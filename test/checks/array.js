import {expect} from 'chai';
import checks from '../../src/checks';
    
describe('Array', ()=>{
    let value = [];
    
    it('number', ()=>{
        expect(
            checks.number(value)
        ).to.be.false;
    });

    it('string', ()=>{
        expect(
            checks.string(value)
        ).to.be.false;
    });
    
    it('array', ()=>{
        expect(
            checks.array(value)
        ).to.be.true;
    });
    
    it('object', ()=>{
        expect(
            checks.object(value)
        ).to.be.false;
    });
    
    it('boolean', ()=>{
        expect(
            checks.boolean(value)
        ).to.be.false;
    });
    
    it('function', ()=>{
        expect(
            checks.function(value)
        ).to.be.false;
    });
});
