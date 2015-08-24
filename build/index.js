'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _typeCheck = require('type-check');

var _typeCheck2 = _interopRequireDefault(_typeCheck);

var _settings = {
    'throw': false
};

var Typer = {
    Type: function Type(schema, obj) {
        var result = (0, _typeCheck2['default'])(schema, obj);
        return result;
    },
    set: function set(settings) {
        this.Type('Object', settings);
        _settings = Object.assign(_settings, settings);
        console.log(_settings);
    },
    isString: function isString(obj) {
        return _util2['default'].isString(obj);
    },
    isObject: function isObject(obj) {
        return _util2['default'].isObject(obj);
    },
    isArray: function isArray(obj) {
        return _util2['default'].isArray(obj);
    }
};

exports['default'] = Typer;

Typer.set({
    'throw': true
});
module.exports = exports['default'];