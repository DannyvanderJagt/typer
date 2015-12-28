import Checks from './checks';

let Typer = {
    execute(...args){
        let errors = this._type(args);
        if(errors === true){
            return true;
        }
        
        return errors;
    },
    settings(newSettings){
        return Object.assign(this.settings, newSettings);
    },
    _type(args){
        let len = args.length;
        let errors = [];
        
        if(len%2 === 1){
            errors.push('Expected an equale number of arguments!');
            return;
        }
        
        for(let i = 0; i < len; i += 2){
            let valid = this._check(
                args[i],
                args[i+1]
            );
            if(valid !== true){
                errors = errors.concat(valid);
            }
        }
        return errors.length === 0 ? true : errors; 
    },
    _getType(type){
        if(Checks.function(type)){
            return type.name;
        }else if(Checks.string(type)){
            return type;
        }
    },
    _check(schema, data){
        if(Checks.object(schema)){
            return this._checkObject(schema, data);
        }else if(Checks.array(schema)){
            return this._checkArray(schema, data);
        }else{
            return this._checkSingle(null, this._getType(schema), data);
        }
        return true;
    },
    _checkObject(schema, data){
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
                    value: data[_key],
                    message: 'This element isnt available in your data!'
                };
            }
            let valid = this._checkSingle(_key, this._getType(schema[_key]), data[_key]);
            if(valid !== true){
                errors.push(valid);
            }
        }
        return errors.length === 0 ? true : errors; 
    },
    _checkArray(schema, data){
        let errors = [];
        let len = schema.length;
        
        for(let pos = 0; pos < len; pos++){ 
            let valid = this._checkSingle(pos, this._getType(schema[pos]), data[pos]);
            if(valid !== true){
                errors.push(valid);
            }
        }
        return errors.length === 0 ? true : errors; 
    },
    _checkSingle(key, type, data){
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
                'The type should be ',
                type,
                ' instead of ',
                Object.prototype.toString.call(data)
            ].join('');
        }
        // Error message.
        return { key, type, data, message};
    }
};

export default Typer.execute.bind(Typer);