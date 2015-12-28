'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _checks = require('./checks');

var _checks2 = _interopRequireDefault(_checks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Typer = {
    execute: function execute() {
        for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var errors = this._type(args);
        if (errors === true) {
            return true;
        }

        return errors;
    },
    settings: function settings(newSettings) {
        return Object.assign(this.settings, newSettings);
    },
    _type: function _type(args) {
        var len = args.length;
        var errors = [];

        if (len % 2 === 1) {
            errors.push('Expected an equale number of arguments!');
            return;
        }

        for (var i = 0; i < len; i += 2) {
            var valid = this._check(args[i], args[i + 1]);
            if (valid !== true) {
                errors = errors.concat(valid);
            }
        }
        return errors.length === 0 ? true : errors;
    },
    _getType: function _getType(type) {
        if (_checks2.default.function(type)) {
            return type.name;
        } else if (_checks2.default.string(type)) {
            return type;
        }
    },
    _check: function _check(schema, data) {
        if (_checks2.default.object(schema)) {
            return this._checkObject(schema, data);
        } else if (_checks2.default.array(schema)) {
            return this._checkArray(schema, data);
        } else {
            return this._checkSingle(null, this._getType(schema), data);
        }
        return true;
    },
    _checkObject: function _checkObject(schema, data) {
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
            var valid = this._checkSingle(_key, this._getType(schema[_key]), data[_key]);
            if (valid !== true) {
                errors.push(valid);
            }
        }
        return errors.length === 0 ? true : errors;
    },
    _checkArray: function _checkArray(schema, data) {
        var errors = [];
        var len = schema.length;

        for (var pos = 0; pos < len; pos++) {
            var valid = this._checkSingle(pos, this._getType(schema[pos]), data[pos]);
            if (valid !== true) {
                errors.push(valid);
            }
        }
        return errors.length === 0 ? true : errors;
    },
    _checkSingle: function _checkSingle(key, type, data) {
        type = type.toLowerCase();
        var message = undefined,
            valid = undefined;

        if (!_checks2.default[type]) {
            message = 'There is not check available for type: ' + type;
        } else {
            valid = _checks2.default[type](data);

            if (valid === true) {
                return true;
            }

            message = ['It has the type of ', Object.prototype.toString.call(data), ' but is should be ', type].join('');
        }
        // Error message.
        return { key: key, type: type, data: data, message: message };
    }
};

exports.default = Typer.execute.bind(Typer);