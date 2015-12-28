'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Check = {
    number: function number(arg) {
        return _util2.default.isNumber(arg);
    },
    string: function string(arg) {
        return _util2.default.isString(arg);
    },
    array: function array(arg) {
        return _util2.default.isArray(arg);
    },
    object: function object(arg) {
        return _util2.default.isObject(arg) && !_util2.default.isArray(arg);
    },
    boolean: function boolean(arg) {
        return _util2.default.isBoolean(arg);
    },
    'function': function _function(arg) {
        return _util2.default.isFunction(arg);
    },
    phone: function phone(arg) {
        return arg.match(/[0-9]{2}\-[0-9]{8}/) ? true : false;
    }
};

exports.default = Check;