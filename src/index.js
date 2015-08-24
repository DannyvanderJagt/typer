import Util from 'util';
import TypeCheck from 'type-check';

var Typer = {
    Type(){
        let result = TypeCheck(schema, obj);
        return result;
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
