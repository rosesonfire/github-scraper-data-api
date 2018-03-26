'use strict';

var _jsUtils = require('js-utils');

var _iocHelper = require('./../../iocHelper');

var _redisODM = require('./../../../main/lib/odm/redisODM');

var _redisODM2 = _interopRequireDefault(_redisODM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = (0, _iocHelper.createNewInstance)({
  instanceConstructor: _redisODM2.default,
  dependencyConfig: {
    redisClient: 'lib/wrappers/redisClientWrapper'
  },
  dependencyInstances: {
    utils: _jsUtils.utils
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pb2MvbGliL29kbS9yZWRpc09ETS5qcyJdLCJuYW1lcyI6WyJleHBvcnRzIiwibW9kdWxlIiwiaW5zdGFuY2VDb25zdHJ1Y3RvciIsImRlcGVuZGVuY3lDb25maWciLCJyZWRpc0NsaWVudCIsImRlcGVuZGVuY3lJbnN0YW5jZXMiLCJ1dGlscyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFDQTs7Ozs7O0FBRUFBLFVBQVVDLE9BQU9ELE9BQVAsR0FBaUIsa0NBQWtCO0FBQzNDRSx5Q0FEMkM7QUFFM0NDLG9CQUFrQjtBQUNoQkMsaUJBQWE7QUFERyxHQUZ5QjtBQUszQ0MsdUJBQXFCO0FBQ25CQztBQURtQjtBQUxzQixDQUFsQixDQUEzQiIsImZpbGUiOiJyZWRpc09ETS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSAnanMtdXRpbHMnXG5cbmltcG9ydCB7IGNyZWF0ZU5ld0luc3RhbmNlIH0gZnJvbSAnLi8uLi8uLi9pb2NIZWxwZXInXG5pbXBvcnQgcmVkaXNPRE0gZnJvbSAnLi8uLi8uLi8uLi9tYWluL2xpYi9vZG0vcmVkaXNPRE0nXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU5ld0luc3RhbmNlKHtcbiAgaW5zdGFuY2VDb25zdHJ1Y3RvcjogcmVkaXNPRE0sXG4gIGRlcGVuZGVuY3lDb25maWc6IHtcbiAgICByZWRpc0NsaWVudDogJ2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXInXG4gIH0sXG4gIGRlcGVuZGVuY3lJbnN0YW5jZXM6IHtcbiAgICB1dGlsc1xuICB9XG59KVxuIl19