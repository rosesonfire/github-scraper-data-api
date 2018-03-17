'use strict';

var _iocHelper = require('./../iocHelper');

var _dataService = require('./../../main/services/dataService');

var _dataService2 = _interopRequireDefault(_dataService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = (0, _iocHelper.createNewInstance)({
  instanceConstructor: _dataService2.default,
  dependencyConfig: {
    odm: 'lib/odm/redisODM'
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pb2Mvc2VydmljZXMvZGF0YVNlcnZpY2UuanMiXSwibmFtZXMiOlsiZXhwb3J0cyIsIm1vZHVsZSIsImluc3RhbmNlQ29uc3RydWN0b3IiLCJkZXBlbmRlbmN5Q29uZmlnIiwib2RtIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7Ozs7QUFFQUEsVUFBVUMsT0FBT0QsT0FBUCxHQUFpQixrQ0FBa0I7QUFDM0NFLDRDQUQyQztBQUUzQ0Msb0JBQWtCO0FBQ2hCQyxTQUFLO0FBRFc7QUFGeUIsQ0FBbEIsQ0FBM0IiLCJmaWxlIjoiZGF0YVNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVOZXdJbnN0YW5jZSB9IGZyb20gJy4vLi4vaW9jSGVscGVyJ1xuaW1wb3J0IGRhdGFTZXJ2aWNlIGZyb20gJy4vLi4vLi4vbWFpbi9zZXJ2aWNlcy9kYXRhU2VydmljZSdcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmV3SW5zdGFuY2Uoe1xuICBpbnN0YW5jZUNvbnN0cnVjdG9yOiBkYXRhU2VydmljZSxcbiAgZGVwZW5kZW5jeUNvbmZpZzoge1xuICAgIG9kbTogJ2xpYi9vZG0vcmVkaXNPRE0nXG4gIH1cbn0pXG4iXX0=