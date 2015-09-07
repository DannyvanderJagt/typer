import Util from 'util';
import {typeCheck as TypeCheck} from 'type-check';

let _settings = {
    throw: false,
    stream: null
};

var Typer = {
    Type(schema, obj){
        let result = TypeCheck(schema, obj);
        
        if(_settings.throw && !result){
            throw new Error('The type test did not pass! Schema:' + schema);
        }
        
        if(_settings.stream){
            _settings.stream.emit('typeError', schema);
        }
        
        return result;
    },
    set(settings){
        this.Type('object', settings);
        _settings = Object.assign(_settings, settings);
    }
};

export default Typer;
