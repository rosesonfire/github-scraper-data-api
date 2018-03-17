'use strict';

var _setup = require('./../../setup');

var _redisODM = require('./../../../main/lib/odm/redisODM');

var _redisODM2 = _interopRequireDefault(_redisODM);

var _redisClientWrapper = require('./../../mocks/lib/wrappers/redisClientWrapper');

var _redisClientWrapper2 = _interopRequireDefault(_redisClientWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// unit

// mocks


(0, _setup.describe)('RedisODM', function () {
  var mocks = void 0,
      redisClient = void 0,
      expectedODMProperties = void 0,
      expectedModelObjProperties = void 0,
      data = void 0,
      flattenedData = void 0,
      positiveReply = void 0;

  (0, _setup.before)(function () {
    expectedODMProperties = ['create'];
    expectedModelObjProperties = ['key', 'data', 'save'];
    data = {
      id: 126,
      name: 'someName',
      entry: {
        id: 78,
        value: 45,
        description: {
          'date': new Date(Date.parse('2018-03-01T23:58:35Z')),
          'location': 'someLocation'
        }
      },
      meta: {
        meta1: 'hello',
        meta2: true
      }
    };
    flattenedData = [126, 'id', '126', 'name', 'someName', 'entry:id', '78', 'entry:value', '45', 'entry:description:date', 'Fri Mar 02 2018 05:58:35 GMT+0600 (+06)', 'entry:description:location', 'someLocation', 'meta:meta1', 'hello', 'meta:meta2', 'true'];
    positiveReply = 'OK';
  });

  (0, _setup.beforeEach)(function () {
    redisClient = (0, _redisClientWrapper2.default)();
  });

  (0, _setup.afterEach)(function () {
    return mocks.forEach(function (mock) {
      return mock.verify();
    });
  });

  (0, _setup.describe)('When creating redisODM', function () {
    (0, _setup.beforeEach)(function () {
      mocks = [];
    });

    (0, _setup.it)('should have expected properties', function () {
      return (0, _redisODM2.default)({ redisClient: redisClient }).should.have.all.keys(expectedODMProperties);
    });

    (0, _setup.describe)('When creating a model object', function () {
      (0, _setup.it)('should have expected properties', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient }).create({ key: data.id, data: data }).should.have.all.keys(expectedModelObjProperties);
      });

      (0, _setup.it)('should map the data properly', function () {
        var modelObj = (0, _redisODM2.default)({ redisClient: redisClient }).create({ key: data.id, data: data });
        var modelObjData = modelObj.data;

        modelObj.key.should.equal(data.id);

        Object.entries(data).forEach(function (entry) {
          var _modelObjData$should$;

          return (_modelObjData$should$ = modelObjData.should.have.own).property.apply(_modelObjData$should$, _toConsumableArray(entry));
        });

        Object.entries(modelObjData).forEach(function (entry) {
          var _data$should$have$own;

          return (_data$should$have$own = data.should.have.own).property.apply(_data$should$have$own, _toConsumableArray(entry));
        });
      });
    });
  });

  (0, _setup.describe)('When saving a model object', function () {
    (0, _setup.beforeEach)(function () {
      var _redisClient$hmset$on;

      (_redisClient$hmset$on = redisClient.hmset.once()).withExactArgs.apply(_redisClient$hmset$on, _toConsumableArray(flattenedData)).resolves(positiveReply);
      mocks = [redisClient.hmset];
    });

    (0, _setup.it)('should return a promise', function () {
      return (0, _redisODM2.default)({ redisClient: redisClient }).create({ key: data.id, data: data }).save().should.be.a('promise');
    });

    (0, _setup.it)('should be successful', function () {
      return (0, _redisODM2.default)({ redisClient: redisClient }).create({ key: data.id, data: data }).save().should.eventually.equal(positiveReply);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi9vZG0vcmVkaXNPRE0uc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzQ2xpZW50IiwiZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzIiwiZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMiLCJkYXRhIiwiZmxhdHRlbmVkRGF0YSIsInBvc2l0aXZlUmVwbHkiLCJpZCIsIm5hbWUiLCJlbnRyeSIsInZhbHVlIiwiZGVzY3JpcHRpb24iLCJEYXRlIiwicGFyc2UiLCJtZXRhIiwibWV0YTEiLCJtZXRhMiIsImZvckVhY2giLCJtb2NrIiwidmVyaWZ5Iiwic2hvdWxkIiwiaGF2ZSIsImFsbCIsImtleXMiLCJjcmVhdGUiLCJrZXkiLCJtb2RlbE9iaiIsIm1vZGVsT2JqRGF0YSIsImVxdWFsIiwiT2JqZWN0IiwiZW50cmllcyIsIm93biIsInByb3BlcnR5IiwiaG1zZXQiLCJvbmNlIiwid2l0aEV4YWN0QXJncyIsInJlc29sdmVzIiwic2F2ZSIsImJlIiwiYSIsImV2ZW50dWFsbHkiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7Ozs7QUFFQTs7Ozs7OztBQUhBOztBQUVBOzs7QUFJQSxxQkFBUyxVQUFULEVBQXFCLFlBQU07QUFDekIsTUFDRUEsY0FERjtBQUFBLE1BRUVDLG9CQUZGO0FBQUEsTUFHRUMsOEJBSEY7QUFBQSxNQUlFQyxtQ0FKRjtBQUFBLE1BS0VDLGFBTEY7QUFBQSxNQU1FQyxzQkFORjtBQUFBLE1BT0VDLHNCQVBGOztBQVNBLHFCQUFPLFlBQU07QUFDWEosNEJBQXdCLENBQUMsUUFBRCxDQUF4QjtBQUNBQyxpQ0FBNkIsQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixNQUFoQixDQUE3QjtBQUNBQyxXQUFPO0FBQ0xHLFVBQUksR0FEQztBQUVMQyxZQUFNLFVBRkQ7QUFHTEMsYUFBTztBQUNMRixZQUFJLEVBREM7QUFFTEcsZUFBTyxFQUZGO0FBR0xDLHFCQUFhO0FBQ1gsa0JBQVEsSUFBSUMsSUFB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QURWLEVBQ3dDaUMsSUFEeEMsR0FDK0NqQixNQUQvQyxDQUNzRGtCLEVBRHRELENBQ3lEQyxDQUR6RCxDQUMyRCxTQUQzRCxDQUQ0QjtBQUFBLEtBQTlCOztBQUlBLG1CQUFHLHNCQUFILEVBQTJCO0FBQUEsYUFDekIsd0JBQVMsRUFBRXRDLHdCQUFGLEVBQVQsRUFDR3VCLE1BREgsQ0FDVSxFQUFFQyxLQUFLckIsS0FBS0csRUFBWixFQUFnQkgsTUFBTUEsSUFBdEIsRUFEVixFQUN3Q2lDLElBRHhDLEdBQytDakIsTUFEL0MsQ0FDc0RvQixVQUR0RCxDQUVHWixLQUZILENBRVN0QixhQUZULENBRHlCO0FBQUEsS0FBM0I7QUFJRCxHQWZEO0FBZ0JELENBekZEIiwiZmlsZSI6InJlZGlzT0RNLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZXNjcmliZSwgYmVmb3JlLCBiZWZvcmVFYWNoLCBhZnRlckVhY2gsIGl0IH0gZnJvbSAnLi8uLi8uLi9zZXR1cCdcbi8vIHVuaXRcbmltcG9ydCByZWRpc09ETSBmcm9tICcuLy4uLy4uLy4uL21haW4vbGliL29kbS9yZWRpc09ETSdcbi8vIG1vY2tzXG5pbXBvcnQgcmVkaXNDbGllbnRXcmFwcGVyTW9ja1xuICBmcm9tICcuLy4uLy4uL21vY2tzL2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXInXG5cbmRlc2NyaWJlKCdSZWRpc09ETScsICgpID0+IHtcbiAgbGV0XG4gICAgbW9ja3MsXG4gICAgcmVkaXNDbGllbnQsXG4gICAgZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzLFxuICAgIGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzLFxuICAgIGRhdGEsXG4gICAgZmxhdHRlbmVkRGF0YSxcbiAgICBwb3NpdGl2ZVJlcGx5XG5cbiAgYmVmb3JlKCgpID0+IHtcbiAgICBleHBlY3RlZE9ETVByb3BlcnRpZXMgPSBbJ2NyZWF0ZSddXG4gICAgZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMgPSBbJ2tleScsICdkYXRhJywgJ3NhdmUnXVxuICAgIGRhdGEgPSB7XG4gICAgICBpZDogMTI2LFxuICAgICAgbmFtZTogJ3NvbWVOYW1lJyxcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgIGlkOiA3OCxcbiAgICAgICAgdmFsdWU6IDQ1LFxuICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICdkYXRlJzogbmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxOC0wMy0wMVQyMzo1ODozNVonKSksXG4gICAgICAgICAgJ2xvY2F0aW9uJzogJ3NvbWVMb2NhdGlvbidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgbWV0YTE6ICdoZWxsbycsXG4gICAgICAgIG1ldGEyOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIGZsYXR0ZW5lZERhdGEgPSBbMTI2LCAnaWQnLCAnMTI2JywgJ25hbWUnLCAnc29tZU5hbWUnLCAnZW50cnk6aWQnLCAnNzgnLFxuICAgICAgJ2VudHJ5OnZhbHVlJywgJzQ1JywgJ2VudHJ5OmRlc2NyaXB0aW9uOmRhdGUnLFxuICAgICAgJ0ZyaSBNYXIgMDIgMjAxOCAwNTo1ODozNSBHTVQrMDYwMCAoKzA2KScsXG4gICAgICAnZW50cnk6ZGVzY3JpcHRpb246bG9jYXRpb24nLCAnc29tZUxvY2F0aW9uJywgJ21ldGE6bWV0YTEnLCAnaGVsbG8nLFxuICAgICAgJ21ldGE6bWV0YTInLCAndHJ1ZSddXG4gICAgcG9zaXRpdmVSZXBseSA9ICdPSydcbiAgfSlcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICByZWRpc0NsaWVudCA9IHJlZGlzQ2xpZW50V3JhcHBlck1vY2soKVxuICB9KVxuXG4gIGFmdGVyRWFjaCgoKSA9PiBtb2Nrcy5mb3JFYWNoKG1vY2sgPT4gbW9jay52ZXJpZnkoKSkpXG5cbiAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgcmVkaXNPRE0nLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrcyA9IFtdXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSkuc2hvdWxkLmhhdmUuYWxsLmtleXMoZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzKSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGEgbW9kZWwgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBoYXZlIGV4cGVjdGVkIHByb3BlcnRpZXMnLCAoKSA9PlxuICAgICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50IH0pXG4gICAgICAgICAgLmNyZWF0ZSh7IGtleTogZGF0YS5pZCwgZGF0YTogZGF0YSB9KS5zaG91bGQuaGF2ZS5hbGxcbiAgICAgICAgICAua2V5cyhleHBlY3RlZE1vZGVsT2JqUHJvcGVydGllcykpXG5cbiAgICAgIGl0KCdzaG91bGQgbWFwIHRoZSBkYXRhIHByb3Blcmx5JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbE9iaiA9IHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSlcbiAgICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhOiBkYXRhIH0pXG4gICAgICAgIGNvbnN0IG1vZGVsT2JqRGF0YSA9IG1vZGVsT2JqLmRhdGFcblxuICAgICAgICBtb2RlbE9iai5rZXkuc2hvdWxkLmVxdWFsKGRhdGEuaWQpXG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZGF0YSlcbiAgICAgICAgICAuZm9yRWFjaChlbnRyeSA9PiBtb2RlbE9iakRhdGEuc2hvdWxkLmhhdmUub3duLnByb3BlcnR5KC4uLmVudHJ5KSlcblxuICAgICAgICBPYmplY3QuZW50cmllcyhtb2RlbE9iakRhdGEpXG4gICAgICAgICAgLmZvckVhY2goZW50cnkgPT4gZGF0YS5zaG91bGQuaGF2ZS5vd24ucHJvcGVydHkoLi4uZW50cnkpKVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIHNhdmluZyBhIG1vZGVsIG9iamVjdCcsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHJlZGlzQ2xpZW50Lmhtc2V0Lm9uY2UoKS53aXRoRXhhY3RBcmdzKC4uLmZsYXR0ZW5lZERhdGEpXG4gICAgICAgIC5yZXNvbHZlcyhwb3NpdGl2ZVJlcGx5KVxuICAgICAgbW9ja3MgPSBbIHJlZGlzQ2xpZW50Lmhtc2V0IF1cbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYSBwcm9taXNlJywgKCkgPT5cbiAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSlcbiAgICAgICAgLmNyZWF0ZSh7IGtleTogZGF0YS5pZCwgZGF0YTogZGF0YSB9KS5zYXZlKCkuc2hvdWxkLmJlLmEoJ3Byb21pc2UnKSlcblxuICAgIGl0KCdzaG91bGQgYmUgc3VjY2Vzc2Z1bCcsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50IH0pXG4gICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGE6IGRhdGEgfSkuc2F2ZSgpLnNob3VsZC5ldmVudHVhbGx5XG4gICAgICAgIC5lcXVhbChwb3NpdGl2ZVJlcGx5KSlcbiAgfSlcbn0pXG4iXX0=