> **Disclaimer: This repo is part of my personal project named Suitcase.**  
> It is not meant to be used by other people or in production.    
> You can use it if you want but at your own risk.

# Typer
A wrapper around commonly used type checkers.

## Usage:
```js
import {Type} from 'typer';
```

## Settings
* `throw` - Throw type errors instead of returning `true` or `false`. (default: false)

Example:
```js
{
    throw: true, // Default: false
    event: true, // Default: false
}
```

## Api

```js

// Single elements.
Type(String, 'Hello world!', Number, 10); // true.

// Object
Type({a:String, b:Number}, {a:'Hello', b:10}); // true.

// Array
Type([String, Number], ['Hello', 10]); // true.

```

## Todo

#### Error message
- [ ] Improve the error messages
- [ ] Added length error messages Array
- [ ] Added missing keys/extra keys in Object

#### Features
- [ ] Type maps
- [ ] Convert to type
- [ ] Error events.
- [ ] Throw errors.
- [ ] Added new Error().stack possibility.
