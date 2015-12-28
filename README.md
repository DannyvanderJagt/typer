> **Disclaimer: This repo is part of my personal project named Suitcase.**  
> It is not meant to be used by other people or in production.    
> You can use it if you want but at your own risk.

# Typer
A wrapper around commonly used type checkers.

## Usage:
```js
import Typer from 'typer';
```

## Api

```js

// Single elements.
var result = Typer(String, 'Hello world!', Number, 10); // result: true

// Object
var result = Typer({a:String, b:Number}, {a:'Hello', b:10}); // result: true

// Array
var result = Typer([String, Number], ['Hello', '10']); // result: true

// Error
var result = Typer({a:String, b:Number}, {a:'Hello', b:'10'}); // result: [Error]

```

## Error
```js
  [
    // One error.
    {
      key: 'b',
      type: Number,
      value: '10',
      message: 'The type should be Number instead of [Object String]'
    }
  ]
```

## Todo

#### Error message
- [ ] Improve the error messages
- [ ] Added length error messages Array
- [ ] Added missing keys/extra keys in Object

#### Features
- [ ] Type maps
- [ ] Convert to type
- [x] Error events.
- [x] Throw errors.
- [ ] Added new Error().stack possibility.
