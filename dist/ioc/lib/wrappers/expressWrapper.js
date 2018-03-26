'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsUtils = require('js-utils');

var _expressWrapper = require('./../../../main/lib/wrappers/expressWrapper');

var _expressWrapper2 = _interopRequireDefault(_expressWrapper);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = _jsUtils.utils.iocHelper.createNewInstance({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pb2MvbGliL3dyYXBwZXJzL2V4cHJlc3NXcmFwcGVyLmpzIl0sIm5hbWVzIjpbImV4cG9ydHMiLCJtb2R1bGUiLCJpb2NIZWxwZXIiLCJjcmVhdGVOZXdJbnN0YW5jZSIsImluc3RhbmNlQ29uc3RydWN0b3IiLCJjb25maWd1cmF0aW9uIiwicG9ydCIsInNjcmFwZXJEYXRhQVBJIiwiZGVwZW5kZW5jeUluc3RhbmNlcyIsImV4cHJlc3MiLCJkZXBlbmRlbmN5Q29uZmlnIiwibWlkZGxld2FyZXMiLCJyb3V0ZXMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQUEsVUFBVUMsT0FBT0QsT0FBUCxHQUFpQixlQUFNRSxTQUFOLENBQWdCQyxpQkFBaEIsQ0FBa0M7QUFDM0RDLCtDQUQyRDtBQUUzREMsaUJBQWU7QUFDYkMsVUFBTSxpQkFBT0MsY0FBUCxDQUFzQkQ7QUFEZixHQUY0QztBQUszREUsdUJBQXFCO0FBQ25CQztBQURtQixHQUxzQztBQVEzREMsb0JBQWtCO0FBQ2hCQyxpQkFBYSxhQURHO0FBRWhCQyxZQUFRO0FBRlE7QUFSeUMsQ0FBbEMsQ0FBM0IiLCJmaWxlIjoiZXhwcmVzc1dyYXBwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IHsgdXRpbHMgfSBmcm9tICdqcy11dGlscydcblxuaW1wb3J0IGV4cHJlc3NXcmFwcGVyIGZyb20gJy4vLi4vLi4vLi4vbWFpbi9saWIvd3JhcHBlcnMvZXhwcmVzc1dyYXBwZXInXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL2NvbmZpZydcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdXRpbHMuaW9jSGVscGVyLmNyZWF0ZU5ld0luc3RhbmNlKHtcbiAgaW5zdGFuY2VDb25zdHJ1Y3RvcjogZXhwcmVzc1dyYXBwZXIsXG4gIGNvbmZpZ3VyYXRpb246IHtcbiAgICBwb3J0OiBjb25maWcuc2NyYXBlckRhdGFBUEkucG9ydFxuICB9LFxuICBkZXBlbmRlbmN5SW5zdGFuY2VzOiB7XG4gICAgZXhwcmVzc1xuICB9LFxuICBkZXBlbmRlbmN5Q29uZmlnOiB7XG4gICAgbWlkZGxld2FyZXM6ICdtaWRkbGV3YXJlcycsXG4gICAgcm91dGVzOiAncm91dGVzJ1xuICB9XG59KVxuIl19