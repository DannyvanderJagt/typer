var Schema = {
    generate(){
        let schema = arguments[0];
        schema = schema.replace(/[\s\n]+/g,'');
        
        let lines = this.getLines(schema);
        
        let elements = this.getElements(lines); 

        return elements;
    },
    getValues(parts, type){
        let value = [];
        let key = null;
        
        if(type === 'array' || type === 'object'){
            let closingBracket = type === 'array' ? ']' : '}';
            let openingBracket = type === 'array' ? '[' : '{';
            let key = null;
            let object = type === 'array' ? [] : {};
            
            parts.map((part) => {
                if(part === openingBracket || part === closingBracket || part === ','){
                    return;
                }
                let _key = part.match(/([\w]+)\:/);
                if(_key){
                    key = _key[1];
                }else{
                    if(!key){
                        key = object.length;
                    }
                    if(type === 'array'){
                        object.push({key, type:part});
                    }else{
                        object[key] = part;
                    }
                    key = null;
                }
            });
            value = object;
        }
        
        if(type === 'single'){
            return parts[0];
        }
        
        return value;
    },
    getElements(lines){
        return lines.map((elem) => {
            let parts = elem.match(/(\??([\w]+)?\:)|[\{\[\]\}]+|[\w]+|\,/g);
            let keyParts = parts[0].match(/(\?)?([\w]+)?\:/);
            let key = null;
            let type = null;
            let optional = false;
            
            if(keyParts){
                key = keyParts[2];
                optional = keyParts[1] ? true : false;
            }
    
            let _values = parts.splice(keyParts ? 1 : 0 ,parts.length);

            // Determen the type.
            if(!type && _values[0] === '['){ type = 'array'; }
            else if(!type && _values[0] === '{'){ type = 'object'; }
            else { type = 'single'; }
            
            let value = this.getValues(_values, type);
            
            return {
                key,
                type,
                optional,
                value
            };
        });
    },
    getLines(schema){
        let _elems = schema.match(/(\??([\w]+)?\:)?[\w\{\}\:\[\]\s]+|\,/g);
        _elems.push(','); // Trick to trigger a check for the last element.
        
        let elements = [];
        
        let opening = 0;
        let closing = 0;
        let temp = [];
        
        _elems.forEach((elem) => {
            if(elem === ','){
                if(opening === closing){
                    elements.push(temp.join(','));
                    temp = [];
                    opening = 0;
                    closing = 0;
                }
                return;
            }
            
            let _opening = elem.match(/[\{\[]+/g) || 0;
            let _closing = elem.match(/[\}\]]+/g) || 0;
            
            if(_opening){ opening += _opening.length; }
            if(_closing){ closing += _closing.length; }
            
            temp.push(elem);
        });
        return elements;
    }
};

export default Schema;
