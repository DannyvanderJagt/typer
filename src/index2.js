import Util from 'util';
import {typeCheck as TypeCheck} from 'type-check';
import Schema from './schema';
import Checks from './checks';

var Typer = {
    type(){
        let args = [];
        let len = arguments.length;
        let errors = [];
        
        if(len%2 === 1){
            console.log('Expected an equale number of arguments!');
            return;
        }
        
        for(let i = 0; i < len; i += 2){
            let valid = this.check(
                arguments[i],
                arguments[i+1]
            );
            if(valid !== true){
                errors = errors.concat(valid);
            }
        }
        return errors.length === 0 ? true : errors; 
    },
    getType(type){
        if(Checks.function(type)){
            return type.name;
        }else if(Checks.string(type)){
            return type;
        }
    },
    check(schema, data){
        if(Checks.object(schema)){
            return this.checkObject(schema, data);
        }else if(Checks.array(schema)){
            return this.checkArray(schema, data);
        }else{
            return this.checkSingle(null, this.getType(schema), data);
        }
        return true;
    },
    checkObject(schema, data){
        let errors = [];
        let items = Object.keys(schema);
        let len = items.length;
        let _key = null;
        
        for(let i = 0; i < len; i++){
            _key = items[i];
    
            if(!data[_key]){
                return {
                    key:_key, 
                    type: schema.value[_key].type,
                    data: data[_key],
                    message: 'This element isnt available in your data!'
                };
            }
            let valid = this.checkSingle(_key, this.getType(schema[_key]), data[_key]);
            if(valid !== true){
                errors.push(valid);
            }
        }
        return errors.length === 0 ? true : errors; 
    },
    checkArray(schema, data){
        let errors = [];
        let len = schema.length;
        
        for(let pos = 0; pos < len; pos++){ 
            let valid = this.checkSingle(pos, this.getType(schema[pos]), data[pos]);
            if(valid !== true){
                errors.push(valid);
            }
        }
        return errors.length === 0 ? true : errors; 
    },
    checkSingle(key, type, data){
        type = type.toLowerCase();
        let message, valid;
        
        if(!Checks[type]){
            message = 'There is not check available for type: ' + type;
        }else{
            valid = Checks[type](data);
            
            if(valid === true){
                return true;
            }
            
            message = [
                'It has the type of ',
                Object.prototype.toString.call(data),
                ' but is should be ',
                type
            ].join('');
        }
        // Error message.
        return { key, type, data, message};
    }
};

export default Typer;
