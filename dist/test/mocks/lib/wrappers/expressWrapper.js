'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resMock = undefined;

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resMock = exports.resMock = function resMock() {
  return {
    setBufferedResponse: _sinon2.default.mock()
  };
};

exports.default = function () {
  return {
    listen: _sinon2.default.mock()
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L21vY2tzL2xpYi93cmFwcGVycy9leHByZXNzV3JhcHBlci5qcyJdLCJuYW1lcyI6WyJyZXNNb2NrIiwic2V0QnVmZmVyZWRSZXNwb25zZSIsIm1vY2siLCJsaXN0ZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O0FBRU8sSUFBTUEsNEJBQVUsU0FBVkEsT0FBVTtBQUFBLFNBQU87QUFDNUJDLHlCQUFxQixnQkFBTUMsSUFBTjtBQURPLEdBQVA7QUFBQSxDQUFoQjs7a0JBR1E7QUFBQSxTQUFPO0FBQ3BCQyxZQUFRLGdCQUFNRCxJQUFOO0FBRFksR0FBUDtBQUFBLEMiLCJmaWxlIjoiZXhwcmVzc1dyYXBwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2lub24gZnJvbSAnc2lub24nXG5cbmV4cG9ydCBjb25zdCByZXNNb2NrID0gKCkgPT4gKHtcbiAgc2V0QnVmZmVyZWRSZXNwb25zZTogc2lub24ubW9jaygpXG59KVxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gKHtcbiAgbGlzdGVuOiBzaW5vbi5tb2NrKClcbn0pXG4iXX0=