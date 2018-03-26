'use strict';

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _jsUtils = require('js-utils');

var _redisClientWrapper = require('./../../../main/lib/wrappers/redisClientWrapper');

var _redisClientWrapper2 = _interopRequireDefault(_redisClientWrapper);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = _jsUtils.utils.iocHelper.createNewInstance({
  instanceConstructor: _redisClientWrapper2.default,
  configuration: {
    host: _config2.default.db.host,
    port: _config2.default.db.port
  },
  dependencyInstances: {
    redis: _redis2.default,
    utils: _jsUtils.utils
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pb2MvbGliL3dyYXBwZXJzL3JlZGlzQ2xpZW50V3JhcHBlci5qcyJdLCJuYW1lcyI6WyJleHBvcnRzIiwibW9kdWxlIiwiaW9jSGVscGVyIiwiY3JlYXRlTmV3SW5zdGFuY2UiLCJpbnN0YW5jZUNvbnN0cnVjdG9yIiwiY29uZmlndXJhdGlvbiIsImhvc3QiLCJkYiIsInBvcnQiLCJkZXBlbmRlbmN5SW5zdGFuY2VzIiwicmVkaXMiLCJ1dGlscyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBQSxVQUFVQyxPQUFPRCxPQUFQLEdBQWlCLGVBQU1FLFNBQU4sQ0FBZ0JDLGlCQUFoQixDQUFrQztBQUMzREMsbURBRDJEO0FBRTNEQyxpQkFBZTtBQUNiQyxVQUFNLGlCQUFPQyxFQUFQLENBQVVELElBREg7QUFFYkUsVUFBTSxpQkFBT0QsRUFBUCxDQUFVQztBQUZILEdBRjRDO0FBTTNEQyx1QkFBcUI7QUFDbkJDLDBCQURtQjtBQUVuQkM7QUFGbUI7QUFOc0MsQ0FBbEMsQ0FBM0IiLCJmaWxlIjoicmVkaXNDbGllbnRXcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZGlzIGZyb20gJ3JlZGlzJ1xuaW1wb3J0IHsgdXRpbHMgfSBmcm9tICdqcy11dGlscydcblxuaW1wb3J0IHJlZGlzQ2xpZW50V3JhcHBlciBmcm9tICcuLy4uLy4uLy4uL21haW4vbGliL3dyYXBwZXJzL3JlZGlzQ2xpZW50V3JhcHBlcidcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJ1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB1dGlscy5pb2NIZWxwZXIuY3JlYXRlTmV3SW5zdGFuY2Uoe1xuICBpbnN0YW5jZUNvbnN0cnVjdG9yOiByZWRpc0NsaWVudFdyYXBwZXIsXG4gIGNvbmZpZ3VyYXRpb246IHtcbiAgICBob3N0OiBjb25maWcuZGIuaG9zdCxcbiAgICBwb3J0OiBjb25maWcuZGIucG9ydFxuICB9LFxuICBkZXBlbmRlbmN5SW5zdGFuY2VzOiB7XG4gICAgcmVkaXM6IHJlZGlzLFxuICAgIHV0aWxzXG4gIH1cbn0pXG4iXX0=