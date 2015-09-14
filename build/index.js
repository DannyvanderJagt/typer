'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _checks = require('./checks');

var _checks2 = _interopRequireDefault(_checks);

var Typer = {
    type: function type() {
        var args = [];
        var len = arguments.length;
        var errors = [];

        if (len % 2 === 1) {
            console.log('Expected an equale number of arguments!');
            return;
        }

        for (var i = 0; i < len; i += 2) {
            var valid = this.check(arguments[i], arguments[i + 1]);
            if (valid !== true) {
                errors = errors.concat(valid);
            }
        }
        return errors.length === 0 ? true : errors;
    },
    getType: function getType(type) {
        if (_checks2['default']['function'](type)) {
            return type.name;
        } else if (_checks2['default'].string(type)) {
            return type;
        }
    },
    check: function check(schema, data) {
        if (_checks2['default'].object(schema)) {
            return this.checkObject(schema, data);
        } else if (_checks2['default'].array(schema)) {
            return this.checkArray(schema, data);
        } else {
            return this.checkSingle(null, this.getType(schema), data);
        }
        return true;
    },
    checkObject: function checkObject(schema, data) {
        var errors = [];
        var items = Object.keys(schema);
        var len = items.length;
        var _key = null;

        for (var i = 0; i < len; i++) {
            _key = items[i];

            if (!data[_key]) {
                return {
                    key: _key,
                    type: schema.value[_key].type,
                    data: data[_key],
                    message: 'This element isnt available in your data!'
                };
            }
            var valid = this.checkSingle(_key, this.getType(schema[_key]), data[_key]);
            if (valid !== true) {
                errors.push(valid);
            }
        }
        return errors.length === 0 ? true : errors;
    },
    checkArray: function checkArray(schema, data) {
        var errors = [];
        var len = schema.length;

        for (var pos = 0; pos < len; pos++) {
            var valid = this.checkSingle(pos, this.getType(schema[pos]), data[pos]);
            if (valid !== true) {
                errors.push(valid);
            }
        }
        return errors.length === 0 ? true : errors;
    },
    checkSingle: function checkSingle(key, type, data) {
        type = type.toLowerCase();
        var message = undefined,
            valid = undefined;

        if (!_checks2['default'][type]) {
            message = 'There is not check available for type: ' + type;
        } else {
            valid = _checks2['default'][type](data);

            if (valid === true) {
                return true;
            }

            message = ['It has the type of ', Object.prototype.toString.call(data), ' but is should be ', type].join('');
        }
        // Error message.
        return { key: key, type: type, data: data, message: message };
    }
};

exports['default'] = Typer;
module.exports = exports['default'];