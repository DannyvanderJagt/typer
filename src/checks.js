import Util from 'util';

let Check = {
    number(arg){
        return Util.isNumber(arg);
    },
    string(arg){
        return Util.isString(arg);
    },
    array(arg){
        return Util.isArray(arg);
    },
    object(arg){
        return Util.isObject(arg);
    },
    boolean(arg){
        return Util.isBoolean(arg);
    },
    'function'(arg){
        return Util.isFunction(arg);
    },
    phone(arg){
        return arg.match(/[0-9]{2}\-[0-9]{8}/) ? true : false;
    }
};


export default Check;
