'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisClientStub = exports.redisClientMock = undefined;

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redisClientMock = exports.redisClientMock = function redisClientMock() {
  return {
    hmset: _sinon2.default.mock(),
    hgetall: _sinon2.default.mock(),
    quit: _sinon2.default.mock()
  };
};

var redisClientStub = exports.redisClientStub = function redisClientStub() {
  return {
    hmset: _sinon2.default.stub(),
    hgetall: _sinon2.default.stub()
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L21vY2tzL290aGVycy9yZWRpc0NsaWVudC5qcyJdLCJuYW1lcyI6WyJyZWRpc0NsaWVudE1vY2siLCJobXNldCIsIm1vY2siLCJoZ2V0YWxsIiwicXVpdCIsInJlZGlzQ2xpZW50U3R1YiIsInN0dWIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O0FBRU8sSUFBTUEsNENBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQU87QUFDcENDLFdBQU8sZ0JBQU1DLElBQU4sRUFENkI7QUFFcENDLGFBQVMsZ0JBQU1ELElBQU4sRUFGMkI7QUFHcENFLFVBQU0sZ0JBQU1GLElBQU47QUFIOEIsR0FBUDtBQUFBLENBQXhCOztBQU1BLElBQU1HLDRDQUFrQixTQUFsQkEsZUFBa0I7QUFBQSxTQUFPO0FBQ3BDSixXQUFPLGdCQUFNSyxJQUFOLEVBRDZCO0FBRXBDSCxhQUFTLGdCQUFNRyxJQUFOO0FBRjJCLEdBQVA7QUFBQSxDQUF4QiIsImZpbGUiOiJyZWRpc0NsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaW5vbiBmcm9tICdzaW5vbidcblxuZXhwb3J0IGNvbnN0IHJlZGlzQ2xpZW50TW9jayA9ICgpID0+ICh7XG4gIGhtc2V0OiBzaW5vbi5tb2NrKCksXG4gIGhnZXRhbGw6IHNpbm9uLm1vY2soKSxcbiAgcXVpdDogc2lub24ubW9jaygpXG59KVxuXG5leHBvcnQgY29uc3QgcmVkaXNDbGllbnRTdHViID0gKCkgPT4gKHtcbiAgaG1zZXQ6IHNpbm9uLnN0dWIoKSxcbiAgaGdldGFsbDogc2lub24uc3R1YigpXG59KVxuIl19