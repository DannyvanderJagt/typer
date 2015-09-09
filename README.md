# Typer
A wrapper around commonly used type checkers.

## Usage:
```js
import Typer, {Type as Type} from 'typer';
```

## Settings
* `throw` - Throw type errors instead of returning `true` or `false`. (default: false)

Example:
```js
{
    throw: true
}
```

## Api

```js

// Single elements.
`a:String, b:Number`

// Object
`c:{a:String, b:Number}`

// Object in Object.
`c:{
    a:{
        b:String,
        c:String
    },
    b:Number
}`

// Array
`a:[String, Number]`


// TODO
// Or statement.
`a:String | Number, b:Boolean | String`
// Output: {a:String, b:Boolean}

// Optional.
`a:String, b:?Boolean`

// Default value.
`a:String{test}, b:Boolean{true}`

// When a isn't a string it will be 'test'
// When b is not a boolean it will be true
```
