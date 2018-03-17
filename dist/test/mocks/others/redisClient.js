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
    quit: _sinon2.default.mock()
  };
};

var redisClientStub = exports.redisClientStub = function redisClientStub() {
  return {
    hmset: _sinon2.default.stub()
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L21vY2tzL290aGVycy9yZWRpc0NsaWVudC5qcyJdLCJuYW1lcyI6WyJyZWRpc0NsaWVudE1vY2siLCJobXNldCIsIm1vY2siLCJxdWl0IiwicmVkaXNDbGllbnRTdHViIiwic3R1YiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxJQUFNQSw0Q0FBa0IsU0FBbEJBLGVBQWtCO0FBQUEsU0FBTztBQUNwQ0MsV0FBTyxnQkFBTUMsSUFBTixFQUQ2QjtBQUVwQ0MsVUFBTSxnQkFBTUQsSUFBTjtBQUY4QixHQUFQO0FBQUEsQ0FBeEI7O0FBS0EsSUFBTUUsNENBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQU87QUFDcENILFdBQU8sZ0JBQU1JLElBQU47QUFENkIsR0FBUDtBQUFBLENBQXhCIiwiZmlsZSI6InJlZGlzQ2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJ1xuXG5leHBvcnQgY29uc3QgcmVkaXNDbGllbnRNb2NrID0gKCkgPT4gKHtcbiAgaG1zZXQ6IHNpbm9uLm1vY2soKSxcbiAgcXVpdDogc2lub24ubW9jaygpXG59KVxuXG5leHBvcnQgY29uc3QgcmVkaXNDbGllbnRTdHViID0gKCkgPT4gKHtcbiAgaG1zZXQ6IHNpbm9uLnN0dWIoKVxufSlcbiJdfQ==