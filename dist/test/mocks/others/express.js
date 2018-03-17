'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expressAppMockWithListenStub = exports.expressAppMock = undefined;

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expressAppMock = exports.expressAppMock = function expressAppMock() {
  return {
    use: _sinon2.default.mock(),
    get: _sinon2.default.mock(),
    post: _sinon2.default.mock(),
    listen: _sinon2.default.mock()
  };
};
var expressAppMockWithListenStub = exports.expressAppMockWithListenStub = function expressAppMockWithListenStub() {
  return {
    use: _sinon2.default.mock(),
    get: _sinon2.default.mock(),
    post: _sinon2.default.mock(),
    listen: _sinon2.default.stub()
  };
};

exports.default = function () {
  return _sinon2.default.mock();
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L21vY2tzL290aGVycy9leHByZXNzLmpzIl0sIm5hbWVzIjpbImV4cHJlc3NBcHBNb2NrIiwidXNlIiwibW9jayIsImdldCIsInBvc3QiLCJsaXN0ZW4iLCJleHByZXNzQXBwTW9ja1dpdGhMaXN0ZW5TdHViIiwic3R1YiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxJQUFNQSwwQ0FBaUIsU0FBakJBLGNBQWlCO0FBQUEsU0FBTztBQUNuQ0MsU0FBSyxnQkFBTUMsSUFBTixFQUQ4QjtBQUVuQ0MsU0FBSyxnQkFBTUQsSUFBTixFQUY4QjtBQUduQ0UsVUFBTSxnQkFBTUYsSUFBTixFQUg2QjtBQUluQ0csWUFBUSxnQkFBTUgsSUFBTjtBQUoyQixHQUFQO0FBQUEsQ0FBdkI7QUFNQSxJQUFNSSxzRUFBK0IsU0FBL0JBLDRCQUErQjtBQUFBLFNBQU87QUFDakRMLFNBQUssZ0JBQU1DLElBQU4sRUFENEM7QUFFakRDLFNBQUssZ0JBQU1ELElBQU4sRUFGNEM7QUFHakRFLFVBQU0sZ0JBQU1GLElBQU4sRUFIMkM7QUFJakRHLFlBQVEsZ0JBQU1FLElBQU47QUFKeUMsR0FBUDtBQUFBLENBQXJDOztrQkFNUTtBQUFBLFNBQU0sZ0JBQU1MLElBQU4sRUFBTjtBQUFBLEMiLCJmaWxlIjoiZXhwcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaW5vbiBmcm9tICdzaW5vbidcblxuZXhwb3J0IGNvbnN0IGV4cHJlc3NBcHBNb2NrID0gKCkgPT4gKHtcbiAgdXNlOiBzaW5vbi5tb2NrKCksXG4gIGdldDogc2lub24ubW9jaygpLFxuICBwb3N0OiBzaW5vbi5tb2NrKCksXG4gIGxpc3Rlbjogc2lub24ubW9jaygpXG59KVxuZXhwb3J0IGNvbnN0IGV4cHJlc3NBcHBNb2NrV2l0aExpc3RlblN0dWIgPSAoKSA9PiAoe1xuICB1c2U6IHNpbm9uLm1vY2soKSxcbiAgZ2V0OiBzaW5vbi5tb2NrKCksXG4gIHBvc3Q6IHNpbm9uLm1vY2soKSxcbiAgbGlzdGVuOiBzaW5vbi5zdHViKClcbn0pXG5leHBvcnQgZGVmYXVsdCAoKSA9PiBzaW5vbi5tb2NrKClcbiJdfQ==