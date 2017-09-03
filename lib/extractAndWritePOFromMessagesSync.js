'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _readAllMessageAsObjectSync = require('./readAllMessageAsObjectSync');

var _readAllMessageAsObjectSync2 = _interopRequireDefault(_readAllMessageAsObjectSync);

var _poFormater = require('./poFormater');

var _poFormater2 = _interopRequireDefault(_poFormater);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractAndWritePOFromMessagesSync(srcPatterns, _ref) {
  var _ref$messageKey = _ref.messageKey,
      messageKey = _ref$messageKey === undefined ? 'id' : _ref$messageKey,
      _ref$messageContext = _ref.messageContext,
      messageContext = _ref$messageContext === undefined ? 'defaultMessage' : _ref$messageContext,
      output = _ref.output,
      headerOptions = _ref.headerOptions;

  var result = _ramda2.default.pipe(_readAllMessageAsObjectSync2.default,
  // 1. Object { messagekey: { messageContext: [[] , []] } }
  _poFormater2.default
  // 2. String: pot formated
  )(srcPatterns, messageKey, messageContext);

  // Output
  _fs2.default.writeFileSync(output, result);
  console.log(_chalk2.default.green('> [react-intl-po] write file -> ' + output + ' \u2714\uFE0F\n'));
} /* eslint-disable no-console */

exports.default = extractAndWritePOFromMessagesSync;
module.exports = exports['default'];