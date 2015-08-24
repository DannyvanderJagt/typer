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

### `set`
Set Typer settings.
`Typer.set(settings);`

### `Type`
See docs from [type-check](https://github.com/gkz/type-check)

### `isString`
A check to see if it is a string or not. ([util](https://nodejs.org/api/util.html))   
`Typer.isString(data)`   

### `isArray`
A check to see if it is a array or not. ([util](https://nodejs.org/api/util.html))  
`Typer.isArray(data)`

### `isObject`
A check to see if it is a object or not. ([util](https://nodejs.org/api/util.html))  
`Typer.isObject(data)`
