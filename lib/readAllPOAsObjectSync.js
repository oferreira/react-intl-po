'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_MAPPER = undefined;

var _glob = require('glob');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _po2jsonHelper = require('./utils/po2jsonHelper');

var _po2jsonHelper2 = _interopRequireDefault(_po2jsonHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MAPPER = exports.DEFAULT_MAPPER = function DEFAULT_MAPPER(filepath) {
  return _path2.default.basename(filepath).match(/([^.]*\.)*([^.]+)\.po$/)[2];
};

/**
 * Read translated .po file synchronized and
 * aggregates translated messages object
 * @param {String} srcPatterns - path to translated .po file
 * @return {Object} po - return aggregates object
 */

var readAllPOAsObjectSync = function readAllPOAsObjectSync(srcPatterns) {
  var localeMapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MAPPER;
  return _ramda2.default.pipe(_glob.sync,
  // 1. Array [filename, ...]
  _ramda2.default.map(_ramda2.default.converge(_ramda2.default.objOf, [localeMapper, _po2jsonHelper2.default.parseFileSync])),
  // 2. Array [{ locale: json }, ...]
  _ramda2.default.mergeAll
  // 3. Object { locale: json }
  )(srcPatterns);
};

exports.default = readAllPOAsObjectSync;