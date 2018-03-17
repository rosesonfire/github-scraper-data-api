'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _iocHelper = require('./../../iocHelper');

var _expressWrapper = require('./../../../main/lib/wrappers/expressWrapper');

var _expressWrapper2 = _interopRequireDefault(_expressWrapper);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = (0, _iocHelper.createNewInstance)({
  instanceConstructor: _expressWrapper2.default,
  configuration: {
    port: _config2.default.scraperDataAPI.port
  },
  dependencyInstances: {
    express: _express2.default
  },
  dependencyConfig: {
    middlewares: 'middlewares',
    routes: 'routes'
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pb2MvbGliL3dyYXBwZXJzL2V4cHJlc3NXcmFwcGVyLmpzIl0sIm5hbWVzIjpbImV4cG9ydHMiLCJtb2R1bGUiLCJpbnN0YW5jZUNvbnN0cnVjdG9yIiwiY29uZmlndXJhdGlvbiIsInBvcnQiLCJzY3JhcGVyRGF0YUFQSSIsImRlcGVuZGVuY3lJbnN0YW5jZXMiLCJleHByZXNzIiwiZGVwZW5kZW5jeUNvbmZpZyIsIm1pZGRsZXdhcmVzIiwicm91dGVzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUFBLFVBQVVDLE9BQU9ELE9BQVAsR0FBaUIsa0NBQWtCO0FBQzNDRSwrQ0FEMkM7QUFFM0NDLGlCQUFlO0FBQ2JDLFVBQU0saUJBQU9DLGNBQVAsQ0FBc0JEO0FBRGYsR0FGNEI7QUFLM0NFLHVCQUFxQjtBQUNuQkM7QUFEbUIsR0FMc0I7QUFRM0NDLG9CQUFrQjtBQUNoQkMsaUJBQWEsYUFERztBQUVoQkMsWUFBUTtBQUZRO0FBUnlCLENBQWxCLENBQTNCIiwiZmlsZSI6ImV4cHJlc3NXcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcblxuaW1wb3J0IHsgY3JlYXRlTmV3SW5zdGFuY2UgfSBmcm9tICcuLy4uLy4uL2lvY0hlbHBlcidcbmltcG9ydCBleHByZXNzV3JhcHBlciBmcm9tICcuLy4uLy4uLy4uL21haW4vbGliL3dyYXBwZXJzL2V4cHJlc3NXcmFwcGVyJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcnXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU5ld0luc3RhbmNlKHtcbiAgaW5zdGFuY2VDb25zdHJ1Y3RvcjogZXhwcmVzc1dyYXBwZXIsXG4gIGNvbmZpZ3VyYXRpb246IHtcbiAgICBwb3J0OiBjb25maWcuc2NyYXBlckRhdGFBUEkucG9ydFxuICB9LFxuICBkZXBlbmRlbmN5SW5zdGFuY2VzOiB7XG4gICAgZXhwcmVzc1xuICB9LFxuICBkZXBlbmRlbmN5Q29uZmlnOiB7XG4gICAgbWlkZGxld2FyZXM6ICdtaWRkbGV3YXJlcycsXG4gICAgcm91dGVzOiAncm91dGVzJ1xuICB9XG59KVxuIl19