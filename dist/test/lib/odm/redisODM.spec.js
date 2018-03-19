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
      dataWithColon = void 0,
      dataWithArray = void 0,
      flattenedData = void 0,
      positiveReply = void 0;

  (0, _setup.before)(function () {
    expectedODMProperties = ['create', 'get'];
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
    dataWithColon = {
      id: 3,
      value: 'somevalue:withcolon'
    };
    dataWithArray = {
      id: 3,
      value: ['somevalue']
    };
    flattenedData = [126, 'id', 126, 'name', 'someName', 'entry:id', 78, 'entry:value', 45, 'entry:description:date', new Date(Date.parse('2018-03-01T23:58:35Z')), 'entry:description:location', 'someLocation', 'meta:meta1', 'hello', 'meta:meta2', true];
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

        modelObj.key.should.equal(data.id);
        modelObj.data.should.equal(data);
      });
    });

    (0, _setup.describe)('When creating a model object with colon in a value', function () {
      (0, _setup.it)('should fail', function () {
        try {
          (0, _redisODM2.default)({ redisClient: redisClient }).create({ key: data.id, data: dataWithColon });
          '1'.should.equal('2');
        } catch (e) {
          e.message.should.equal('Occurence of ":" in string value is not supported');
        }
      });
    });

    (0, _setup.describe)('When creating a model object with array as a value', function () {
      (0, _setup.it)('should fail', function () {
        try {
          (0, _redisODM2.default)({ redisClient: redisClient }).create({ key: data.id, data: dataWithArray });
          '1'.should.equal('2');
        } catch (e) {
          e.message.should.equal('Array as value is not supported');
        }
      });
    });
  });

  (0, _setup.describe)('When getting a model object', function () {
    (0, _setup.beforeEach)(function () {
      redisClient.hgetall.once().withExactArgs(data.id).resolves(flattenedData);
      mocks = [redisClient.hgetall];
    });

    (0, _setup.it)('should return a promise', function () {
      return (0, _redisODM2.default)({ redisClient: redisClient }).get(data.id).should.be.a('promise');
    });

    (0, _setup.it)('should have expected properties', function () {
      return (0, _redisODM2.default)({ redisClient: redisClient }).get(data.id).should.eventually.have.all.keys(expectedModelObjProperties);
    });

    (0, _setup.it)('should map the data properly', async function () {
      var modelObj = await (0, _redisODM2.default)({ redisClient: redisClient }).get(data.id);

      modelObj.key.should.equal(data.id);
      JSON.stringify(modelObj.data).should.equal(JSON.stringify(data));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi9vZG0vcmVkaXNPRE0uc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzQ2xpZW50IiwiZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzIiwiZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMiLCJkYXRhIiwiZGF0YVdpdGhDb2xvbiIsImRhdGFXaXRoQXJyYXkiLCJmbGF0dGVuZWREYXRhIiwicG9zaXRpdmVSZXBseSIsImlkIiwibmFtZSIsImVudHJ5IiwidmFsdWUiLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJwYXJzZSIsIm1ldGEiLCJtZXRhMSIsIm1ldGEyIiwiZm9yRWFjaCIsIm1vY2siLCJ2ZXJpZnkiLCJzaG91bGQiLCJoYXZlIiwiYWxsIiwia2V5cyIsImNyZWF0ZSIsImtleSIsIm1vZGVsT2JqIiwiZXF1YWwiLCJlIiwibWVzc2FnZSIsImhnZXRhbGwiLCJvbmNlIiwid2l0aEV4YWN0QXJncyIsInJlc29sdmVzIiwiZ2V0IiwiYmUiLCJhIiwiZXZlbnR1YWxseSIsIkpTT04iLCJzdHJpbmdpZnkiLCJobXNldCIsInNhdmUiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7Ozs7QUFFQTs7Ozs7OztBQUhBOztBQUVBOzs7QUFJQSxxQkFBUyxVQUFULEVBQXFCLFlBQU07QUFDekIsTUFDRUEsY0FERjtBQUFBLE1BRUVDLG9CQUZGO0FBQUEsTUFHRUMsOEJBSEY7QUFBQSxNQUlFQyxtQ0FKRjtBQUFBLE1BS0VDLGFBTEY7QUFBQSxNQU1FQyxzQkFORjtBQUFBLE1BT0VDLHNCQVBGO0FBQUEsTUFRRUMsc0JBUkY7QUFBQSxNQVNFQyxzQkFURjs7QUFXQSxxQkFBTyxZQUFNO0FBQ1hOLDRCQUF3QixDQUFDLFFBQUQsRUFBVyxLQUFYLENBQXhCO0FBQ0FDLGlDQUE2QixDQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLE1BQWhCLENBQTdCO0FBQ0FDLFdBQU87QUFDTEssVUFBSSxHQURDO0FBRUxDLFlBQU0sVUFGRDtB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QmhDLEtBQUtLLEVBQW5DLENBQXZCOztBQUVBbUIsZUFBU0QsR0FBVCxDQUFhTCxNQUFiLENBQW9CTyxLQUFwQixDQUEwQnpCLEtBQUtLLEVBQS9CO0FBQ0ErQixXQUFLQyxTQUFMLENBQWViLFNBQVN4QixJQUF4QixFQUE4QmtCLE1BQTlCLENBQXFDTyxLQUFyQyxDQUEyQ1csS0FBS0MsU0FBTCxDQUFlckMsSUFBZixDQUEzQztBQUNELEtBTEQ7QUFNRCxHQW5CRDs7QUFxQkEsdUJBQVMsNEJBQVQsRUFBdUMsWUFBTTtBQUMzQywyQkFBVyxZQUFNO0FBQUE7O0FBQ2YsMkNBQVlzQyxLQUFaLENBQWtCVCxJQUFsQixJQUF5QkMsYUFBekIsaURBQTBDM0IsYUFBMUMsR0FDRzRCLFFBREgsQ0FDWTNCLGFBRFo7QUFFQVIsY0FBUSxDQUFFQyxZQUFZeUMsS0FBZCxDQUFSO0FBQ0QsS0FKRDs7QUFNQSxtQkFBRyx5QkFBSCxFQUE4QjtBQUFBLGFBQzVCLHdCQUFTLEVBQUV6Qyx3QkFBRixFQUFULEVBQ0d5QixNQURILENBQ1UsRUFBRUMsS0FBS3ZCLEtBQUtLLEVBQVosRUFBZ0JMLFVBQWhCLEVBRFYsRUFDa0N1QyxJQURsQyxHQUN5Q3JCLE1BRHpDLENBQ2dEZSxFQURoRCxDQUNtREMsQ0FEbkQsQ0FDcUQsU0FEckQsQ0FENEI7QUFBQSxLQUE5Qjs7QUFJQSxtQkFBRyxzQkFBSCxFQUEyQjtBQUFBLGFBQ3pCLHdCQUFTLEVBQUVyQyx3QkFBRixFQUFULEVBQ0d5QixNQURILENBQ1UsRUFBRUMsS0FBS3ZCLEtBQUtLLEVBQVosRUFBZ0JMLFVBQWhCLEVBRFYsRUFDa0N1QyxJQURsQyxHQUN5Q3JCLE1BRHpDLENBQ2dEaUIsVUFEaEQsQ0FFR1YsS0FGSCxDQUVTckIsYUFGVCxDQUR5QjtBQUFBLEtBQTNCO0FBSUQsR0FmRDtBQWdCRCxDQTVJRCIsImZpbGUiOiJyZWRpc09ETS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVzY3JpYmUsIGJlZm9yZSwgYmVmb3JlRWFjaCwgYWZ0ZXJFYWNoLCBpdCB9IGZyb20gJy4vLi4vLi4vc2V0dXAnXG4vLyB1bml0XG5pbXBvcnQgcmVkaXNPRE0gZnJvbSAnLi8uLi8uLi8uLi9tYWluL2xpYi9vZG0vcmVkaXNPRE0nXG4vLyBtb2Nrc1xuaW1wb3J0IHJlZGlzQ2xpZW50V3JhcHBlck1vY2tcbiAgZnJvbSAnLi8uLi8uLi9tb2Nrcy9saWIvd3JhcHBlcnMvcmVkaXNDbGllbnRXcmFwcGVyJ1xuXG5kZXNjcmliZSgnUmVkaXNPRE0nLCAoKSA9PiB7XG4gIGxldFxuICAgIG1vY2tzLFxuICAgIHJlZGlzQ2xpZW50LFxuICAgIGV4cGVjdGVkT0RNUHJvcGVydGllcyxcbiAgICBleHBlY3RlZE1vZGVsT2JqUHJvcGVydGllcyxcbiAgICBkYXRhLFxuICAgIGRhdGFXaXRoQ29sb24sXG4gICAgZGF0YVdpdGhBcnJheSxcbiAgICBmbGF0dGVuZWREYXRhLFxuICAgIHBvc2l0aXZlUmVwbHlcblxuICBiZWZvcmUoKCkgPT4ge1xuICAgIGV4cGVjdGVkT0RNUHJvcGVydGllcyA9IFsnY3JlYXRlJywgJ2dldCddXG4gICAgZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMgPSBbJ2tleScsICdkYXRhJywgJ3NhdmUnXVxuICAgIGRhdGEgPSB7XG4gICAgICBpZDogMTI2LFxuICAgICAgbmFtZTogJ3NvbWVOYW1lJyxcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgIGlkOiA3OCxcbiAgICAgICAgdmFsdWU6IDQ1LFxuICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICdkYXRlJzogbmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxOC0wMy0wMVQyMzo1ODozNVonKSksXG4gICAgICAgICAgJ2xvY2F0aW9uJzogJ3NvbWVMb2NhdGlvbidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgbWV0YTE6ICdoZWxsbycsXG4gICAgICAgIG1ldGEyOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIGRhdGFXaXRoQ29sb24gPSB7XG4gICAgICBpZDogMyxcbiAgICAgIHZhbHVlOiAnc29tZXZhbHVlOndpdGhjb2xvbidcbiAgICB9XG4gICAgZGF0YVdpdGhBcnJheSA9IHtcbiAgICAgIGlkOiAzLFxuICAgICAgdmFsdWU6IFsnc29tZXZhbHVlJ11cbiAgICB9XG4gICAgZmxhdHRlbmVkRGF0YSA9IFsxMjYsICdpZCcsIDEyNiwgJ25hbWUnLCAnc29tZU5hbWUnLCAnZW50cnk6aWQnLCA3OCxcbiAgICAgICdlbnRyeTp2YWx1ZScsIDQ1LCAnZW50cnk6ZGVzY3JpcHRpb246ZGF0ZScsXG4gICAgICBuZXcgRGF0ZShEYXRlLnBhcnNlKCcyMDE4LTAzLTAxVDIzOjU4OjM1WicpKSxcbiAgICAgICdlbnRyeTpkZXNjcmlwdGlvbjpsb2NhdGlvbicsICdzb21lTG9jYXRpb24nLCAnbWV0YTptZXRhMScsICdoZWxsbycsXG4gICAgICAnbWV0YTptZXRhMicsIHRydWVdXG4gICAgcG9zaXRpdmVSZXBseSA9ICdPSydcbiAgfSlcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICByZWRpc0NsaWVudCA9IHJlZGlzQ2xpZW50V3JhcHBlck1vY2soKVxuICB9KVxuXG4gIGFmdGVyRWFjaCgoKSA9PiBtb2Nrcy5mb3JFYWNoKG1vY2sgPT4gbW9jay52ZXJpZnkoKSkpXG5cbiAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgcmVkaXNPRE0nLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrcyA9IFtdXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSkuc2hvdWxkLmhhdmUuYWxsLmtleXMoZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzKSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGEgbW9kZWwgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBoYXZlIGV4cGVjdGVkIHByb3BlcnRpZXMnLCAoKSA9PlxuICAgICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50IH0pXG4gICAgICAgICAgLmNyZWF0ZSh7IGtleTogZGF0YS5pZCwgZGF0YSB9KS5zaG91bGQuaGF2ZS5hbGxcbiAgICAgICAgICAua2V5cyhleHBlY3RlZE1vZGVsT2JqUHJvcGVydGllcykpXG5cbiAgICAgIGl0KCdzaG91bGQgbWFwIHRoZSBkYXRhIHByb3Blcmx5JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbE9iaiA9IHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSlcbiAgICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhIH0pXG5cbiAgICAgICAgbW9kZWxPYmoua2V5LnNob3VsZC5lcXVhbChkYXRhLmlkKVxuICAgICAgICBtb2RlbE9iai5kYXRhLnNob3VsZC5lcXVhbChkYXRhKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgYSBtb2RlbCBvYmplY3Qgd2l0aCBjb2xvbiBpbiBhIHZhbHVlJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSlcbiAgICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGE6IGRhdGFXaXRoQ29sb24gfSlcbiAgICAgICAgICAnMScuc2hvdWxkLmVxdWFsKCcyJylcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGUubWVzc2FnZS5zaG91bGRcbiAgICAgICAgICAgIC5lcXVhbCgnT2NjdXJlbmNlIG9mIFwiOlwiIGluIHN0cmluZyB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgYSBtb2RlbCBvYmplY3Qgd2l0aCBhcnJheSBhcyBhIHZhbHVlJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSlcbiAgICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGE6IGRhdGFXaXRoQXJyYXkgfSlcbiAgICAgICAgICAnMScuc2hvdWxkLmVxdWFsKCcyJylcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGUubWVzc2FnZS5zaG91bGRcbiAgICAgICAgICAgIC5lcXVhbCgnQXJyYXkgYXMgdmFsdWUgaXMgbm90IHN1cHBvcnRlZCcpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBnZXR0aW5nIGEgbW9kZWwgb2JqZWN0JywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVkaXNDbGllbnQuaGdldGFsbC5vbmNlKCkud2l0aEV4YWN0QXJncyhkYXRhLmlkKS5yZXNvbHZlcyhmbGF0dGVuZWREYXRhKVxuICAgICAgbW9ja3MgPSBbIHJlZGlzQ2xpZW50LmhnZXRhbGwgXVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhIHByb21pc2UnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCB9KS5nZXQoZGF0YS5pZCkuc2hvdWxkLmJlLmEoJ3Byb21pc2UnKSlcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSkuZ2V0KGRhdGEuaWQpXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmFsbC5rZXlzKGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzKSlcblxuICAgIGl0KCdzaG91bGQgbWFwIHRoZSBkYXRhIHByb3Blcmx5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbW9kZWxPYmogPSBhd2FpdCByZWRpc09ETSh7IHJlZGlzQ2xpZW50IH0pLmdldChkYXRhLmlkKVxuXG4gICAgICBtb2RlbE9iai5rZXkuc2hvdWxkLmVxdWFsKGRhdGEuaWQpXG4gICAgICBKU09OLnN0cmluZ2lmeShtb2RlbE9iai5kYXRhKS5zaG91bGQuZXF1YWwoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBzYXZpbmcgYSBtb2RlbCBvYmplY3QnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZWRpc0NsaWVudC5obXNldC5vbmNlKCkud2l0aEV4YWN0QXJncyguLi5mbGF0dGVuZWREYXRhKVxuICAgICAgICAucmVzb2x2ZXMocG9zaXRpdmVSZXBseSlcbiAgICAgIG1vY2tzID0gWyByZWRpc0NsaWVudC5obXNldCBdXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcHJvbWlzZScsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50IH0pXG4gICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSkuc2F2ZSgpLnNob3VsZC5iZS5hKCdwcm9taXNlJykpXG5cbiAgICBpdCgnc2hvdWxkIGJlIHN1Y2Nlc3NmdWwnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCB9KVxuICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhIH0pLnNhdmUoKS5zaG91bGQuZXZlbnR1YWxseVxuICAgICAgICAuZXF1YWwocG9zaXRpdmVSZXBseSkpXG4gIH0pXG59KVxuIl19