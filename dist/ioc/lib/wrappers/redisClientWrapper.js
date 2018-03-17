'use strict';

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _iocHelper = require('./../../iocHelper');

var _redisClientWrapper = require('./../../../main/lib/wrappers/redisClientWrapper');

var _redisClientWrapper2 = _interopRequireDefault(_redisClientWrapper);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = (0, _iocHelper.createNewInstance)({
  instanceConstructor: _redisClientWrapper2.default,
  configuration: {
    host: _config2.default.db.host,
    port: _config2.default.db.port
  },
  dependencyInstances: {
    redis: _redis2.default
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pb2MvbGliL3dyYXBwZXJzL3JlZGlzQ2xpZW50V3JhcHBlci5qcyJdLCJuYW1lcyI6WyJleHBvcnRzIiwibW9kdWxlIiwiaW5zdGFuY2VDb25zdHJ1Y3RvciIsImNvbmZpZ3VyYXRpb24iLCJob3N0IiwiZGIiLCJwb3J0IiwiZGVwZW5kZW5jeUluc3RhbmNlcyIsInJlZGlzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUFBLFVBQVVDLE9BQU9ELE9BQVAsR0FBaUIsa0NBQWtCO0FBQzNDRSxtREFEMkM7QUFFM0NDLGlCQUFlO0FBQ2JDLFVBQU0saUJBQU9DLEVBQVAsQ0FBVUQsSUFESDtBQUViRSxVQUFNLGlCQUFPRCxFQUFQLENBQVVDO0FBRkgsR0FGNEI7QUFNM0NDLHVCQUFxQjtBQUNuQkM7QUFEbUI7QUFOc0IsQ0FBbEIsQ0FBM0IiLCJmaWxlIjoicmVkaXNDbGllbnRXcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZGlzIGZyb20gJ3JlZGlzJ1xuXG5pbXBvcnQgeyBjcmVhdGVOZXdJbnN0YW5jZSB9IGZyb20gJy4vLi4vLi4vaW9jSGVscGVyJ1xuaW1wb3J0IHJlZGlzQ2xpZW50V3JhcHBlciBmcm9tICcuLy4uLy4uLy4uL21haW4vbGliL3dyYXBwZXJzL3JlZGlzQ2xpZW50V3JhcHBlcidcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJ1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVOZXdJbnN0YW5jZSh7XG4gIGluc3RhbmNlQ29uc3RydWN0b3I6IHJlZGlzQ2xpZW50V3JhcHBlcixcbiAgY29uZmlndXJhdGlvbjoge1xuICAgIGhvc3Q6IGNvbmZpZy5kYi5ob3N0LFxuICAgIHBvcnQ6IGNvbmZpZy5kYi5wb3J0XG4gIH0sXG4gIGRlcGVuZGVuY3lJbnN0YW5jZXM6IHtcbiAgICByZWRpczogcmVkaXNcbiAgfVxufSlcbiJdfQ==