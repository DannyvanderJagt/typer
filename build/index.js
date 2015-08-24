'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _typeCheck = require('type-check');

var _settings = {
    'throw': false
};

var Typer = {
    Type: function Type(schema, obj) {
        var result = (0, _typeCheck.typeCheck)(schema, obj);
        if (_settings['throw'] && !result) {
            throw new Error('The type test did not pass! Schema:' + schema);
        }
        return result;
    },
    set: function set(settings) {
        this.Type('object', settings);
        _settings = Object.assign(_settings, settings);
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
module.exports = exports['default'];