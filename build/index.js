'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _typeCheck = require('type-check');

var _settings = {
    'throw': false,
    stream: null
};

var Typer = {
    Type: function Type(schema, obj) {
        var result = (0, _typeCheck.typeCheck)(schema, obj);

        if (_settings['throw'] && !result) {
            throw new Error('The type test did not pass! Schema:' + schema);
        }

        if (_settings.stream) {
            _settings.stream.emit('typeError', schema);
        }

        return result;
    },
    set: function set(settings) {
        this.Type('object', settings);
        _settings = Object.assign(_settings, settings);
    }
};

exports['default'] = Typer;
module.exports = exports['default'];