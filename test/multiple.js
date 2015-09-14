import {expect} from 'chai';
import {Type} from '../src';

describe('Single',() => {
    
    it('number', ()=>{
        expect(
            Type(Number, 10, Number, 10)
        ).to.be.true;
    });
    
    it('string', ()=>{
        expect(
            Type(String, 'Hello world!', String, 'Hello world!')
        ).to.be.true;
    });
    
    it('array', ()=>{
        expect(
            Type([Number, String], [10, 'Hello'], [Number, String], [10, 'Hello'])
        ).to.be.true;
    });
    
    it('object', ()=>{
        expect(
            Type({a: Number, b:String}, {a:10, b:'Hello'}, {a: Number, b:String}, {a:10, b:'Hello'})
        ).to.be.true;
    });
    
    it('boolean', ()=>{
        expect(
            Type(Boolean, true, Boolean, true)
        ).to.be.true;
    });
    
    it('function', ()=>{
        expect(
            Type(Function, ()=>{}, Function, ()=>{})
        ).to.be.true;
    });    
    
});
