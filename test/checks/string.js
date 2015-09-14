import {expect} from 'chai';
import checks from '../../src/checks';
    
describe('String', ()=>{
    let value = 'hello world!';
    
    it('number', ()=>{
        expect(
            checks.number(value)
        ).to.be.false;
    });

    it('string', ()=>{
        expect(
            checks.string(value)
        ).to.be.true;
    });
    
    it('array', ()=>{
        expect(
            checks.array(value)
        ).to.be.false;
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
