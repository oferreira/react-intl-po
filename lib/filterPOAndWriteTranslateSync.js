'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _readAllMessageAsObjectSync = require('./readAllMessageAsObjectSync');

var _readAllMessageAsObjectSync2 = _interopRequireDefault(_readAllMessageAsObjectSync);

var _readAllPOAsObjectSync = require('./readAllPOAsObjectSync');

var _readAllPOAsObjectSync2 = _interopRequireDefault(_readAllPOAsObjectSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* eslint-disable no-console */

var isAJSONFile = function isAJSONFile(string) {
  return (/.json/.test(string)
  );
};

var getContext = function getContext(messageContext) {
  return function (message) {
    return messageContext ? message[messageContext] + '\x04' : '';
  };
};

function filterPOAndWriteTranslateSync(srcPatterns, _ref) {
  var _ref$messageKey = _ref.messageKey,
      messageKey = _ref$messageKey === undefined ? 'defaultMessage' : _ref$messageKey,
      _ref$messageContext = _ref.messageContext,
      messageContext = _ref$messageContext === undefined ? '' : _ref$messageContext,
      messagesPattern = _ref.messagesPattern,
      output = _ref.output;

  var placeholder = _ramda2.default.pipe(_readAllMessageAsObjectSync2.default,
  // 1. Object { messagekey: { messageContext: [[] , []] } }
  _ramda2.default.values,
  // 2. Array [{ messageContext: [[], []] }]
  _ramda2.default.map(_ramda2.default.values),
  // 3. Array [[], []]
  _ramda2.default.flatten,
  // 4. Array []
  _ramda2.default.indexBy(_ramda2.default.prop('id')),
  // 5. Object { id: [] }
  _ramda2.default.mapObjIndexed(_ramda2.default.converge(_ramda2.default.concat, [getContext(messageContext), _ramda2.default.prop(messageKey)]))
  // 6. Object { id: key }, key = (messageContext + messagekey)
  )(messagesPattern, messageKey, messageContext);

  var result = _ramda2.default.pipe(_readAllPOAsObjectSync2.default,
  // 1. Object { locale: { key: '' } }
  function (translation) {
    return Object.keys(translation).map(function (locale) {
      return _defineProperty({}, locale, _ramda2.default.mapObjIndexed(function (k) {
        return translation[locale][k] || '';
      })(placeholder));
    });
  },
  // 2. Array [{ locale: { id: '' } }], replace key to translated string
  _ramda2.default.mergeAll
  // 3. Object { locale: { id: '' } }
  )(srcPatterns);

  // Output
  if (isAJSONFile(output)) {
    _mkdirp2.default.sync(_path2.default.dirname(output)); // ensure the output folder exists
    _fs2.default.writeFileSync(output, JSON.stringify(result, null, 0));
    console.log(_chalk2.default.green('> [react-intl-po] write file -> ' + output + ' \u2714\uFE0F\n'));
  } else {
    _mkdirp2.default.sync(output); // ensure the output folder exists

    Object.keys(result).forEach(function (lang) {
      _fs2.default.writeFileSync(_path2.default.join(output, lang + '.json'), JSON.stringify(result[lang], null, 0));
      console.log(_chalk2.default.green('> [react-intl-po] write file -> ' + _path2.default.join(output, lang + '.json') + ' \u2714\uFE0F'));
    });
  }
}

exports.default = filterPOAndWriteTranslateSync;
module.exports = exports['default'];