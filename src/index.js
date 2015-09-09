import Util from 'util';
import {typeCheck as TypeCheck} from 'type-check';
import Schema from './schema';
import Checks from './checks';

let _settings = {
    throw: false,
    stream: null
};

var Typer = {
    type(){
        let schema = new Schema(arguments[1]);
        let args = this._getArguments(arguments);
        
        let errors = [];

        schema.elements.forEach((_schema, pos) => {
            let value = args[pos];
            
            if(_schema.type === 'single' && !Checks[_schema.value](value)){
                errors.push({
                    value: value,
                    schema: _schema.value,
                    message: "The types don't match!"
                });
                return;
            }
            
            if(_schema.type === 'array'){
                
                if(!Checks[_schema.type](value)){
                    errors.push({
                        value: value,
                        schema: _schema.value,
                        message: 'It is supposed to be an Array!'
                    });
                    return;
                }
                
                if(_schema.value.length !== value.length){
                    errors.push({
                        value: value,
                        schema: _schema.value,
                        message: "The array doesn't have the right length!"
                    });
                    return;
                }
                
                // Check each element.
                _schema.value.forEach((_item, _pos) => {
                    if(!Checks[_item.type](value[_pos])){
                        errors.push({
                            value: value[_pos],
                            schema: _item.type,
                            message: "The types don't match!"
                        });
                    }
                });
            }
            
            if(_schema.type === 'object'){
                
                if(!Checks[_schema.type](value)){
                    errors.push({
                        value: value,
                        schema: _schema.value,
                        message: 'It is supposed to be an Object!'
                    });
                    return;
                }
                
                // Check each element.
                _schema.value.forEach((_item, _pos) => {
                    
                    if(!value[_item.key]){
                        errors.push({
                            value: value[_item.key],
                            schema: _item.type,
                            message: "The value "+_item.key+" is missing!"
                        });
                        return;
                    }
                        
                    if(!Checks[_item.type](value[_item.key])){
                        errors.push({
                            value: value[_item.key],
                            schema: _item.type,
                            message: "The types don't match!"
                        });
                        return;
                    }
                });
            }
        });
        return errors;
    },
    _getArguments(args){
        let _args = [];
        let _len = args.length;
          
        for(let i = 2; i < _len; i++){
          _args.push(args[i]);
        }
        return _args;
    }
};

export default Typer;

let a = true;
let b = [1,'world'];
let c = {f: 10, g: 'string'};

// Typer.type('doSomething', 'a:String, b:[c:Number, d:String]', a,b);
// Typer.type('doSomething', 'a:Boolean, e:{f:Number, g:String}', a,c);
Typer.type('doSomething', 'a:String, b:[c:Number, d:String],e:{f:Number, g:String}', a,c,b);
// Typer.type('doSomething', 'a:String, b:{c:Number, d:String}', a,b);
// Typer.type('doSomething', 'a:String, b:String', a,b);
