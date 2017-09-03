'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _po2json = require('po2json');

var _po2json2 = _interopRequireDefault(_po2json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseFileSync = _ramda2.default.pipe(
// 1. Convert po to json format
function (filename) {
  return _po2json2.default.parseFileSync(filename);
},
// 2. Omit pot epmty head above
_ramda2.default.omit(['']),
// 3. Omit plural
_ramda2.default.mapObjIndexed(_ramda2.default.nth(1)));

exports.default = {
  parseFileSync: parseFileSync
};
module.exports = exports['default'];