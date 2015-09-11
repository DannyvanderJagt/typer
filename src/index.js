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
        
        // for(let i = 0; i < len; i += 2){
        //     let schema = Schema.generate(arguments[i]);
        //     if(schema.length > 1){
        //         console.log('The schema is not valid!');
        //         return;
        //     }
        //     
        //     args.push({
        //         schema: schema[0],
        //         data: arguments[i+1]
        //     });
        // }
        // 
        // // Type check everything!
        // args.forEach((arg, pos) => {
        //     let valid = this.check(arg);
        //     if(valid !== true){
        //         errors = errors.concat(valid);
        //     }
        // });
        
        // Bundle the schemas to improve speed.
        let _schema = [];
        let data = [];
        for(let i = 0; i < len; i += 2){
            _schema.push(arguments[i]);
            data.push(arguments[i+1]);
        }
        
        // Type check everything!
        _schema.forEach((schema, pos) => {
            let valid = this.check({schema, data:data[pos]});
            if(valid !== true){
                errors = errors.concat(valid);
            }
        });
        
        // console.log(errors.length === 0 ? true : errors);
        return errors.length === 0 ? true : errors; 
    },
    check({schema, data}){
        if(schema.type === 'single'){
            let type = schema.value;
            return this.checkSingle(schema.key, type, data);
        }else if(schema.type === 'array'){
            return this.checkArray(schema, data);
        }else if(schema.type === 'object'){
            return this.checkObject(schema, data);
        }
        return true;
    },
    checkObject(schema, data){
        let errors = [];
        let items = Object.keys(schema.value);
        
        items.forEach((_key) => {
            if(!data[_key]){
                return {
                    key:_key, 
                    type: schema.value[_key].type,
                    data: data[_key],
                    message: 'This element isnt available in your data!'
                };
            }

            let valid = this.checkSingle(_key, schema.value[_key], data[_key]);
            if(valid !== true){
                errors.push(valid);
            }
        });
        return errors.length === 0 ? true : errors; 
    },
    checkArray(schema, data){
        let errors = [];
        data.forEach((elem, pos) => {
            let valid = this.checkSingle(schema.value[pos].key, schema.value[pos].type, data[pos]);
            if(valid !== true){
                errors.push(valid);
            }
        });
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


// Typer.type('Boolean', true);
// Typer.type('String', 'Hello world!');
// Typer.type('Function', ()=>{});
// Typer.type('Number', 102);
// Typer.type('{a:Number, b:String}', {a:'1', b:'a'});

// Typer.type('[Number, String]', [10, 'world!']);

// Custom types.
// Typer.type('Phone', '06-11151622');

// console.time('pre');
// console.log('hi');
// console.timeEnd('pre');
// 
// console.time('typecheck');
// for(let i = 0; i < 100000; i ++){
//     TypeCheck('Number', 10);
//     TypeCheck('{a:Number, b:String}', {a:'1', b:'a'});
// }
// console.timeEnd('typecheck');
// 
// 
// console.time('typer');
// for(let i = 0; i < 100000; i ++){
//     // Typer.type('Number', 10);
//     Typer.type('{a:Number, b:String}', {a:'1', b:'a'}, 'Number', 10);
// }
// console.timeEnd('typer');
























// let _settings = {
//     throw: false,
//     stream: null
// };
// 
// var Typer = {
//     type(){
//         let schema = new Schema(arguments[1]);
//         
//         // console.log(arguments[1].match(/[\w\?]\:?([\w\|]+)|([a-z\?]+\:[\[\{])|[\]\}]/g));
//         
//         // let args = this._getArguments(arguments);
//         // 
//         // let errors = [];
//         // let typeMap = {};
//         // 
//         // console.log(schema.elements);
//         // 
//         // schema.elements.forEach((_schema, pos) => {
//         //     let value = args[pos];
//         // 
//         //     // Check singles.
//         // 
//         // 
//         // });
// 
// 
// 
// 
//         // schema.elements.forEach((_schema, pos) => {
//         //     let value = args[pos];
//         //     
//         //     if(_schema.type === 'single' && !Checks[_schema.value](value)){
//         //         errors.push({
//         //             value: value,
//         //             schema: _schema.value,
//         //             message: "The types don't match!"
//         //         });
//         //         return;
//         //     }
//         //     
//         //     if(_schema.type === 'array'){
//         //         
//         //         if(!Checks[_schema.type](value)){
//         //             errors.push({
//         //                 value: value,
//         //                 schema: _schema.value,
//         //                 message: 'It is supposed to be an Array!'
//         //             });
//         //             return;
//         //         }
//         //         
//         //         if(_schema.value.length !== value.length){
//         //             errors.push({
//         //                 value: value,
//         //                 schema: _schema.value,
//         //                 message: "The array doesn't have the right length!"
//         //             });
//         //             return;
//         //         }
//         //         
//         //         // Check each element.
//         //         _schema.value.forEach((_item, _pos) => {
//         //             if(!Checks[_item.type](value[_pos])){
//         //                 errors.push({
//         //                     value: value[_pos],
//         //                     schema: _item.type,
//         //                     message: "The types don't match!"
//         //                 });
//         //             }
//         //         });
//         //     }
//         //     
//         //     if(_schema.type === 'object'){
//         //         
//         //         if(!Checks[_schema.type](value)){
//         //             errors.push({
//         //                 value: value,
//         //                 schema: _schema.value,
//         //                 message: 'It is supposed to be an Object!'
//         //             });
//         //             return;
//         //         }
//         //         
//         //         // Check each element.
//         //         _schema.value.forEach((_item, _pos) => {
//         //             
//         //             if(!value[_item.key]){
//         //                 errors.push({
//         //                     value: value[_item.key],
//         //                     schema: _item.type,
//         //                     message: "The value "+_item.key+" is missing!"
//         //                 });
//         //                 return;
//         //             }
//         //                 
//         //             if(!Checks[_item.type](value[_item.key])){
//         //                 errors.push({
//         //                     value: value[_item.key],
//         //                     schema: _item.type,
//         //                     message: "The types don't match!"
//         //                 });
//         //                 return;
//         //             }
//         //         });
//         //     }
//         // });
//         // return errors;
//     },
//     _getArguments(args){
//         let _args = [];
//         let _len = args.length;
//           
//         for(let i = 2; i < _len; i++){
//           _args.push(args[i]);
//         }
//         return _args;
//     }
// };
// 
// export default Typer;
// 
// let a = true;
// let b = [1,'world'];
// let c = {f: 10, g: 'string'};
// 
// // Typer.type('doSomething', 'a:String, b:[c:Number, d:String]', a,b);
// // Typer.type('doSomething', 'a:Boolean, e:{f:Number, g:String}', a,c);
// // Typer.type('doSomething', 'a:String, b:[c:Number, d:String],e:{f:Number, g:String}', a,c,b);
// // Typer.type('doSomething', 'a:String, b:{c:Number, d:String}', a,b);
// // Typer.type('doSomething', 'a:String | Number, ?b:String', a,b);
// 
// // Typer.type('doSomething', 'a:String, b:[c:Number, d:String] | {f:Number, g:String}', a,c);
// // Typer.type('doSomething', 'a:String, {f:Number, g:{k:String, i:[String,Number,Boolean]}}', a,c);
// // Typer.type('some', 'k:String, i:[String,y:Number,z:Boolean]');
// // console.time('b');
// // Typer.type('some', 'k:String, a:{k:Number}, i:[z:String,y:Number,z:{z:String, a:Boolean}]');
// // console.timeEnd('b');
// console.time('a');
// // Typer.type('some', 'k:String|Boolean, a:{k:Number}, i:[z:String|Boolean,Number,z:{z:String, a:Boolean}]');
// // Typer.type('some', 'c:Boolean|Number, a:Boolean, k:[Number, Boolean ] |{a:Number, b:Boolean}, b:{a:Number, c:{a:Boolean}}');
// Typer.type('some', 'k:[Number, Boolean ] |{a:Number, b:Boolean}');
// console.timeEnd('a');
// /*
// 
// // var is optional.
// ?a:string
// 
// // var is optional
// // a:string(hoi)|number(10)
// 
// // a:value(number:10)
// 
// 
// 
// 
//  */
// 
// /*
// 'k:String, i:[String,y:Number,z:{s:Boolean}]'
// 
// k:String - single
// 
// 
// 
// i:String, y:Number, z:{s:Boolean}
// 
// z:{s:boolean}
// 
// -------------------
// k - single
// : - ignore
// String - single
// , - end of value.
// -------------------
// 
// i - single
// : - ignore
// [ - array
// collect until last ]
// 
// key: i, value: collecting
// 
// 
// 
// */
