
var Schema = {
    generate(){
        let schema = arguments[0].replace(/[\s\n]+/g,'');
        return this.getElements(schema); 
    },
    getElements(line){            
        let parts = line.split(/([\{\}\[\]\,])/g);
        
        if(parts.length === 1){
            return {
                key:null,
                type:'single',
                value: parts[0]
            };
        }

        let keyParts = parts[0].split(':');
        let key = null;
        let type = null;
        if(keyParts.length === 2){
            key = keyParts[0];
        }
        let _values = parts.splice(keyParts ? 1 : 0 ,parts.length);
        
        // Determen the type.
        if(_values[0] === '['){ type = 'array'; }
        else if(_values[0] === '{'){ type = 'object'; }
        else { type = 'single'; }
        
        let values;
        
        if(type === 'object'){
            values = {};
            let len = _values.length;
            for(let i = 1; i < len; i+=2){
                let val = _values[i];
                let _vals  = val.split(':');
                let _key = _vals.length === 2 ? _vals[0] : values.length;
                values[_key] = _vals.length === 2 ? _vals[1] : _vals[0];
            }
        }else if(type === 'array'){
            values = [];
            let len = _values.length;
            for(let i = 1; i < len; i+=2){
                let val = _values[i];
                let _vals  = val.split(':');
                let _key = _vals.length === 2 ? _vals[0] : values.length;
                values.push({
                    key: _key,
                    type: _vals.length === 2 ? _vals[1] : _vals[0],
                });
            }
        }
    
        return {
            key,
            type,
            value:values
        };
    }
};

export default Schema;
