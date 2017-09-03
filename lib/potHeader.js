'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a POT header string
 * @param {Object} options
 * @param {String|String[]} [options.comments]
 * @param {Date} [options.potCreationDate] used for POT-Creation-Date
 * @param {String} [options.projectIdVersion] Project-Id-Version
 * @param {String} [options.charset]
 * @param {String} [options.encoding]
 * @return {String} potSource
 *
 * example: see tests
 *
 * @see https://www.gnu.org/software/trans-coord/manual/gnun/html_node/PO-Header.html
 * @author Guillaume Boddaert
 */

var potHeader = function potHeader() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var o = _ramda2.default.evolve({
    comments: _ramda2.default.pipe(_ramda2.default.cond([[_ramda2.default.is(Array), _ramda2.default.identity], [_ramda2.default.is(String), _ramda2.default.of]]), _ramda2.default.map(_ramda2.default.split('\n')), _ramda2.default.flatten, _ramda2.default.map(function (e) {
      return '# ' + e;
    }), _ramda2.default.join('\n')),
    projectIdVersion: function projectIdVersion(e) {
      return '"Project-Id-Version: ' + e + '\\n"';
    },
    potCreationDate: function potCreationDate(e) {
      return '"POT-Creation-Date: ' + e.toISOString() + '\\n"';
    },
    charset: function charset(e) {
      return '"Content-Type: text/plain; charset=' + e + '\\n"';
    },
    encoding: function encoding(e) {
      return '"Content-Transfer-Encoding: ' + e + '\\n"';
    }
  })(options);

  return (o.comments + '\nmsgid ""\nmsgstr ""\n' + o.projectIdVersion + '\n' + o.potCreationDate + '\n' + o.charset + '\n' + o.encoding + '\n"MIME-Version: 1.0\\n"\n"X-Generator: react-intl-po\\n"\n\n\n').replace(/undefined\r?\n|\r/g, '');
};

exports.default = potHeader;
module.exports = exports['default'];