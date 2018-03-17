'use strict';

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _jsUtils = require('js-utils');

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
    redis: _redis2.default,
    utils: _jsUtils.utils
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pb2MvbGliL3dyYXBwZXJzL3JlZGlzQ2xpZW50V3JhcHBlci5qcyJdLCJuYW1lcyI6WyJleHBvcnRzIiwibW9kdWxlIiwiaW5zdGFuY2VDb25zdHJ1Y3RvciIsImNvbmZpZ3VyYXRpb24iLCJob3N0IiwiZGIiLCJwb3J0IiwiZGVwZW5kZW5jeUluc3RhbmNlcyIsInJlZGlzIiwidXRpbHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQUEsVUFBVUMsT0FBT0QsT0FBUCxHQUFpQixrQ0FBa0I7QUFDM0NFLG1EQUQyQztBQUUzQ0MsaUJBQWU7QUFDYkMsVUFBTSxpQkFBT0MsRUFBUCxDQUFVRCxJQURIO0FBRWJFLFVBQU0saUJBQU9ELEVBQVAsQ0FBVUM7QUFGSCxHQUY0QjtBQU0zQ0MsdUJBQXFCO0FBQ25CQywwQkFEbUI7QUFFbkJDO0FBRm1CO0FBTnNCLENBQWxCLENBQTNCIiwiZmlsZSI6InJlZGlzQ2xpZW50V3JhcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWRpcyBmcm9tICdyZWRpcydcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSAnanMtdXRpbHMnXG5cbmltcG9ydCB7IGNyZWF0ZU5ld0luc3RhbmNlIH0gZnJvbSAnLi8uLi8uLi9pb2NIZWxwZXInXG5pbXBvcnQgcmVkaXNDbGllbnRXcmFwcGVyIGZyb20gJy4vLi4vLi4vLi4vbWFpbi9saWIvd3JhcHBlcnMvcmVkaXNDbGllbnRXcmFwcGVyJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcnXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU5ld0luc3RhbmNlKHtcbiAgaW5zdGFuY2VDb25zdHJ1Y3RvcjogcmVkaXNDbGllbnRXcmFwcGVyLFxuICBjb25maWd1cmF0aW9uOiB7XG4gICAgaG9zdDogY29uZmlnLmRiLmhvc3QsXG4gICAgcG9ydDogY29uZmlnLmRiLnBvcnRcbiAgfSxcbiAgZGVwZW5kZW5jeUluc3RhbmNlczoge1xuICAgIHJlZGlzOiByZWRpcyxcbiAgICB1dGlsc1xuICB9XG59KVxuIl19