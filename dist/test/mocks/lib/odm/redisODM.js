'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisModelObjectMock = undefined;

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redisModelObjectMock = exports.redisModelObjectMock = function redisModelObjectMock() {
  return {
    save: _sinon2.default.mock()
  };
};

exports.default = function () {
  return {
    create: _sinon2.default.mock(),
    get: _sinon2.default.mock()
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L21vY2tzL2xpYi9vZG0vcmVkaXNPRE0uanMiXSwibmFtZXMiOlsicmVkaXNNb2RlbE9iamVjdE1vY2siLCJzYXZlIiwibW9jayIsImNyZWF0ZSIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxJQUFNQSxzREFBdUIsU0FBdkJBLG9CQUF1QjtBQUFBLFNBQU87QUFDekNDLFVBQU0sZ0JBQU1DLElBQU47QUFEbUMsR0FBUDtBQUFBLENBQTdCOztrQkFJUTtBQUFBLFNBQU87QUFDcEJDLFlBQVEsZ0JBQU1ELElBQU4sRUFEWTtBQUVwQkUsU0FBSyxnQkFBTUYsSUFBTjtBQUZlLEdBQVA7QUFBQSxDIiwiZmlsZSI6InJlZGlzT0RNLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJ1xuXG5leHBvcnQgY29uc3QgcmVkaXNNb2RlbE9iamVjdE1vY2sgPSAoKSA9PiAoe1xuICBzYXZlOiBzaW5vbi5tb2NrKClcbn0pXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+ICh7XG4gIGNyZWF0ZTogc2lub24ubW9jaygpLFxuICBnZXQ6IHNpbm9uLm1vY2soKVxufSlcbiJdfQ==