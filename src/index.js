import Util from 'util';
import {typeCheck as TypeCheck} from 'type-check';

let _settings = {
    throw: false
};

var Typer = {
    Type(schema, obj){
        let result = TypeCheck(schema, obj);
        if(!_settings.throw){
            throw new Error('The type test did not pass! Schema:' + schema);
        }
        return result;
    },
    set(settings){
        this.Type('object', settings);
        _settings = Object.assign(_settings, settings);
    },
    isString(obj){
        return Util.isString(obj);
    },
    isObject(obj){
        return Util.isObject(obj);
    },
    isArray(obj){
        return Util.isArray(obj);
    }
};

export default Typer;
