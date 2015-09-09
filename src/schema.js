class Schema{
    constructor(string){
        this.string = string;
        this.values = [];
        this.elements = [];
        
        // Convert the string into values.
        this.values = this.toValues(this.string);
        
        // Convert the values into elements.
        this.elements = this.compose(this.values);
    }
    toValues(string){
        return string.match(/([\{\}\[\]]{1})|(\w+)/g);
    }
    compose(values){
        let mode = 'single';
        let temp = null;
        let tempKey = null;
        let key = null;
        
        let elements = [];
        
        values.forEach((value) => {
            value = value.toLowerCase();
            
            // Single mode.
            if(mode === 'single' && !key){
                mode = 'single';
                key = value;
                return;
            }
            
            if(value === '{' || value === '['){
                mode = value === '{' ? 'object' : 'array';
                temp = [];
                return;
            }
            
            if(value === '}' || value === ']'){
                elements.push({
                    key: key,
                    type: mode,
                    value: temp
                });
                mode = 'single';
                key = null;
                tempKey = null;
                temp = null;
                return;
            }
            
            if((mode === 'array' || mode === 'object') && !tempKey){
                tempKey = value;
                return;
            }
            if((mode === 'array' || mode === 'object')  && temp){
                temp.push({
                    key: tempKey,
                    type: value
                });
                tempKey = null;
                return;
            }
            
            // Single mode.
            if(mode === 'single' && key){
                elements.push({
                    key: key,
                    type: value,
                });
                
                key = null;
                return;
            }
        });
        return elements;
    }
}

export default Schema;
