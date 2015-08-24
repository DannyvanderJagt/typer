'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _typeCheck = require('type-check');

var _typeCheck2 = _interopRequireDefault(_typeCheck);

var Typer = {
    Type: function Type() {
        var result = (0, _typeCheck2['default'])(schema, obj);
        return result;
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