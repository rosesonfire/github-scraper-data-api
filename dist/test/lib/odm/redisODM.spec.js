'use strict';

var _jsUtils = require('js-utils');

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
      dataWithColonInAKey = void 0,
      dataWithArray = void 0,
      flattenedData = void 0,
      positiveReply = void 0,
      noColonInKeyErrorMsg = void 0,
      noArrayAsValueErrorMsg = void 0,
      keyNotFoundErrorMsg = void 0,
      redisClientFailErrorMsg = void 0;

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
    dataWithColonInAKey = {
      id: 3,
      'value:withcolon': 'somevalue'
    };
    dataWithArray = {
      id: 3,
      value: ['somevalue']
    };
    flattenedData = [126, 'id', 126, 'name', 'someName', 'entry:id', 78, 'entry:value', 45, 'entry:description:date', new Date(Date.parse('2018-03-01T23:58:35Z')), 'entry:description:location', 'someLocation', 'meta:meta1', 'hello', 'meta:meta2', true];
    positiveReply = 'OK';
    noColonInKeyErrorMsg = 'Occurence of ":" in key is not supported';
    noArrayAsValueErrorMsg = 'Array as value is not supported';
    keyNotFoundErrorMsg = 'Could not find data matching the provided key (' + data.id + ')';
    redisClientFailErrorMsg = 'err';
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
      return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).should.have.all.keys(expectedODMProperties);
    });

    (0, _setup.describe)('When creating a model object', function () {
      (0, _setup.it)('should have expected properties', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: data }).should.have.all.keys(expectedModelObjProperties);
      });

      (0, _setup.it)('should map the data properly', function () {
        var modelObj = (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: data });

        modelObj.key.should.equal(data.id);
        modelObj.data.should.equal(data);
      });
    });

    (0, _setup.describe)('When creating a model object with colon in a key', function () {
      (0, _setup.it)('should fail', function () {
        try {
          (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: dataWithColonInAKey.id, data: dataWithColonInAKey });
          '1'.should.equal('2');
        } catch (e) {
          e.message.should.equal(noColonInKeyErrorMsg);
        }
      });
    });

    (0, _setup.describe)('When creating a model object with array as a value', function () {
      (0, _setup.it)('should fail', function () {
        try {
          (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: dataWithArray });
          '1'.should.equal('2');
        } catch (e) {
          e.message.should.equal(noArrayAsValueErrorMsg);
        }
      });
    });
  });

  (0, _setup.describe)('When getting a model object', function () {
    (0, _setup.beforeEach)(function () {
      mocks = [redisClient.hgetall];
    });

    (0, _setup.describe)('When key exists', function () {
      (0, _setup.beforeEach)(function () {
        redisClient.hgetall.once().withExactArgs(data.id).resolves(flattenedData);
      });

      (0, _setup.it)('should return a promise', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).get(data.id).should.be.a('promise');
      });

      (0, _setup.it)('should have expected properties', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).get(data.id).should.eventually.have.all.keys(expectedModelObjProperties);
      });

      (0, _setup.it)('should map the data properly', async function () {
        var modelObj = await (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).get(data.id);

        modelObj.key.should.equal(data.id);
        JSON.stringify(modelObj.data).should.equal(JSON.stringify(data));
      });
    });

    (0, _setup.describe)('When key does not exist', function () {
      (0, _setup.beforeEach)(function () {
        redisClient.hgetall.once().withExactArgs(data.id).resolves(null);
      });

      (0, _setup.it)('should fail', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).get(data.id).then(function (response) {
          return '1'.should.equal('2');
        }).catch(function (err) {
          return err.message.should.equal(keyNotFoundErrorMsg);
        });
      });
    });

    (0, _setup.describe)('When underlying redisClient fails', function () {
      (0, _setup.beforeEach)(function () {
        redisClient.hgetall.once().withExactArgs(data.id).rejects(new Error(redisClientFailErrorMsg));
      });

      (0, _setup.it)('should fail', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).get(data.id).then(function (response) {
          return '1'.should.equal('2');
        }).catch(function (err) {
          return err.message.should.equal(redisClientFailErrorMsg);
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
      return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: data }).save().should.be.a('promise');
    });

    (0, _setup.it)('should be successful', function () {
      return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: data }).save().should.eventually.equal(positiveReply);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi9vZG0vcmVkaXNPRE0uc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzQ2xpZW50IiwiZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzIiwiZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMiLCJkYXRhIiwiZGF0YVdpdGhDb2xvbkluQUtleSIsImRhdGFXaXRoQXJyYXkiLCJmbGF0dGVuZWREYXRhIiwicG9zaXRpdmVSZXBseSIsIm5vQ29sb25JbktleUVycm9yTXNnIiwibm9BcnJheUFzVmFsdWVFcnJvck1zZyIsImtleU5vdEZvdW5kRXJyb3JNc2ciLCJyZWRpc0NsaWVudEZhaWxFcnJvck1zZyIsImlkIiwibmFtZSIsImVudHJ5IiwidmFsdWUiLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJwYXJzZSIsIm1ldGEiLCJtZXRhMSIsIm1ldGEyIiwiZm9yRWFjaCIsIm1vY2siLCJ2ZXJpZnkiLCJ1dGlscyIsInNob3VsZCIsImhhdmUiLCJhbGwiLCJrZXlzIiwiY3JlYXRlIiwia2V5IiwibW9kZWxPYmoiLCJlcXVhbCIsImUiLCJtZXNzYWdlIiwiaGdldGFsbCIsIm9uY2UiLCJ3aXRoRXhhY3RBcmdzIiwicmVzb2x2ZXMiLCJnZXQiLCJiZSIsImEiLCJldmVudHVhbGx5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJjYXRjaCIsImVyciIsInJlamVjdHMiLCJFcnJvciIsImhtc2V0Iiwic2F2ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFFQTs7OztBQUVBOzs7Ozs7O0FBSEE7O0FBRUE7OztBQUlBLHFCQUFTLFVBQVQsRUFBcUIsWUFBTTtBQUN6QixNQUNFQSxjQURGO0FBQUEsTUFFRUMsb0JBRkY7QUFBQSxNQUdFQyw4QkFIRjtBQUFBLE1BSUVDLG1DQUpGO0FBQUEsTUFLRUMsYUFMRjtBQUFBLE1BTUVDLDRCQU5GO0FBQUEsTUFPRUMsc0JBUEY7QUFBQSxNQVFFQyxzQkFSRjtBQUFBLE1BU0VDLHNC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LEVBQThCO0FBQUEsYUFDNUIsd0JBQVMsRUFBRW5ELHdCQUFGLEVBQWV5QixxQkFBZixFQUFULEVBQ0dLLE1BREgsQ0FDVSxFQUFFQyxLQUFLNUIsS0FBS1MsRUFBWixFQUFnQlQsVUFBaEIsRUFEVixFQUNrQ2lELElBRGxDLEdBQ3lDMUIsTUFEekMsQ0FDZ0RlLEVBRGhELENBQ21EQyxDQURuRCxDQUNxRCxTQURyRCxDQUQ0QjtBQUFBLEtBQTlCOztBQUlBLG1CQUFHLHNCQUFILEVBQTJCO0FBQUEsYUFDekIsd0JBQVMsRUFBRTFDLHdCQUFGLEVBQWV5QixxQkFBZixFQUFULEVBQ0dLLE1BREgsQ0FDVSxFQUFFQyxLQUFLNUIsS0FBS1MsRUFBWixFQUFnQlQsVUFBaEIsRUFEVixFQUNrQ2lELElBRGxDLEdBQ3lDMUIsTUFEekMsQ0FDZ0RpQixVQURoRCxDQUVHVixLQUZILENBRVMxQixhQUZULENBRHlCO0FBQUEsS0FBM0I7QUFJRCxHQWZEO0FBZ0JELENBbExEIiwiZmlsZSI6InJlZGlzT0RNLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gJ2pzLXV0aWxzJ1xuXG5pbXBvcnQgeyBkZXNjcmliZSwgYmVmb3JlLCBiZWZvcmVFYWNoLCBhZnRlckVhY2gsIGl0IH0gZnJvbSAnLi8uLi8uLi9zZXR1cCdcbi8vIHVuaXRcbmltcG9ydCByZWRpc09ETSBmcm9tICcuLy4uLy4uLy4uL21haW4vbGliL29kbS9yZWRpc09ETSdcbi8vIG1vY2tzXG5pbXBvcnQgcmVkaXNDbGllbnRXcmFwcGVyTW9ja1xuICBmcm9tICcuLy4uLy4uL21vY2tzL2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXInXG5cbmRlc2NyaWJlKCdSZWRpc09ETScsICgpID0+IHtcbiAgbGV0XG4gICAgbW9ja3MsXG4gICAgcmVkaXNDbGllbnQsXG4gICAgZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzLFxuICAgIGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzLFxuICAgIGRhdGEsXG4gICAgZGF0YVdpdGhDb2xvbkluQUtleSxcbiAgICBkYXRhV2l0aEFycmF5LFxuICAgIGZsYXR0ZW5lZERhdGEsXG4gICAgcG9zaXRpdmVSZXBseSxcbiAgICBub0NvbG9uSW5LZXlFcnJvck1zZyxcbiAgICBub0FycmF5QXNWYWx1ZUVycm9yTXNnLFxuICAgIGtleU5vdEZvdW5kRXJyb3JNc2csXG4gICAgcmVkaXNDbGllbnRGYWlsRXJyb3JNc2dcblxuICBiZWZvcmUoKCkgPT4ge1xuICAgIGV4cGVjdGVkT0RNUHJvcGVydGllcyA9IFsnY3JlYXRlJywgJ2dldCddXG4gICAgZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMgPSBbJ2tleScsICdkYXRhJywgJ3NhdmUnXVxuICAgIGRhdGEgPSB7XG4gICAgICBpZDogMTI2LFxuICAgICAgbmFtZTogJ3NvbWVOYW1lJyxcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgIGlkOiA3OCxcbiAgICAgICAgdmFsdWU6IDQ1LFxuICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICdkYXRlJzogbmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxOC0wMy0wMVQyMzo1ODozNVonKSksXG4gICAgICAgICAgJ2xvY2F0aW9uJzogJ3NvbWVMb2NhdGlvbidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgbWV0YTE6ICdoZWxsbycsXG4gICAgICAgIG1ldGEyOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIGRhdGFXaXRoQ29sb25JbkFLZXkgPSB7XG4gICAgICBpZDogMyxcbiAgICAgICd2YWx1ZTp3aXRoY29sb24nOiAnc29tZXZhbHVlJ1xuICAgIH1cbiAgICBkYXRhV2l0aEFycmF5ID0ge1xuICAgICAgaWQ6IDMsXG4gICAgICB2YWx1ZTogWydzb21ldmFsdWUnXVxuICAgIH1cbiAgICBmbGF0dGVuZWREYXRhID0gWzEyNiwgJ2lkJywgMTI2LCAnbmFtZScsICdzb21lTmFtZScsICdlbnRyeTppZCcsIDc4LFxuICAgICAgJ2VudHJ5OnZhbHVlJywgNDUsICdlbnRyeTpkZXNjcmlwdGlvbjpkYXRlJyxcbiAgICAgIG5ldyBEYXRlKERhdGUucGFyc2UoJzIwMTgtMDMtMDFUMjM6NTg6MzVaJykpLFxuICAgICAgJ2VudHJ5OmRlc2NyaXB0aW9uOmxvY2F0aW9uJywgJ3NvbWVMb2NhdGlvbicsICdtZXRhOm1ldGExJywgJ2hlbGxvJyxcbiAgICAgICdtZXRhOm1ldGEyJywgdHJ1ZV1cbiAgICBwb3NpdGl2ZVJlcGx5ID0gJ09LJ1xuICAgIG5vQ29sb25JbktleUVycm9yTXNnID0gJ09jY3VyZW5jZSBvZiBcIjpcIiBpbiBrZXkgaXMgbm90IHN1cHBvcnRlZCdcbiAgICBub0FycmF5QXNWYWx1ZUVycm9yTXNnID0gJ0FycmF5IGFzIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQnXG4gICAga2V5Tm90Rm91bmRFcnJvck1zZyA9XG4gICAgICBgQ291bGQgbm90IGZpbmQgZGF0YSBtYXRjaGluZyB0aGUgcHJvdmlkZWQga2V5ICgke2RhdGEuaWR9KWBcbiAgICByZWRpc0NsaWVudEZhaWxFcnJvck1zZyA9ICdlcnInXG4gIH0pXG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcmVkaXNDbGllbnQgPSByZWRpc0NsaWVudFdyYXBwZXJNb2NrKClcbiAgfSlcblxuICBhZnRlckVhY2goKCkgPT4gbW9ja3MuZm9yRWFjaChtb2NrID0+IG1vY2sudmVyaWZ5KCkpKVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIHJlZGlzT0RNJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja3MgPSBbXVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KS5zaG91bGQuaGF2ZS5hbGxcbiAgICAgICAgLmtleXMoZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzKSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGEgbW9kZWwgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBoYXZlIGV4cGVjdGVkIHByb3BlcnRpZXMnLCAoKSA9PlxuICAgICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSkuc2hvdWxkLmhhdmUuYWxsXG4gICAgICAgICAgLmtleXMoZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMpKVxuXG4gICAgICBpdCgnc2hvdWxkIG1hcCB0aGUgZGF0YSBwcm9wZXJseScsICgpID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWxPYmogPSByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSlcblxuICAgICAgICBtb2RlbE9iai5rZXkuc2hvdWxkLmVxdWFsKGRhdGEuaWQpXG4gICAgICAgIG1vZGVsT2JqLmRhdGEuc2hvdWxkLmVxdWFsKGRhdGEpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjcmVhdGluZyBhIG1vZGVsIG9iamVjdCB3aXRoIGNvbG9uIGluIGEga2V5JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pXG4gICAgICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhV2l0aENvbG9uSW5BS2V5LmlkLCBkYXRhOiBkYXRhV2l0aENvbG9uSW5BS2V5IH0pXG4gICAgICAgICAgJzEnLnNob3VsZC5lcXVhbCgnMicpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBlLm1lc3NhZ2Uuc2hvdWxkXG4gICAgICAgICAgICAuZXF1YWwobm9Db2xvbkluS2V5RXJyb3JNc2cpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGEgbW9kZWwgb2JqZWN0IHdpdGggYXJyYXkgYXMgYSB2YWx1ZScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCcsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAgICAgLmNyZWF0ZSh7IGtleTogZGF0YS5pZCwgZGF0YTogZGF0YVdpdGhBcnJheSB9KVxuICAgICAgICAgICcxJy5zaG91bGQuZXF1YWwoJzInKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgZS5tZXNzYWdlLnNob3VsZFxuICAgICAgICAgICAgLmVxdWFsKG5vQXJyYXlBc1ZhbHVlRXJyb3JNc2cpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBnZXR0aW5nIGEgbW9kZWwgb2JqZWN0JywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja3MgPSBbIHJlZGlzQ2xpZW50LmhnZXRhbGwgXVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBrZXkgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHJlZGlzQ2xpZW50LmhnZXRhbGwub25jZSgpLndpdGhFeGFjdEFyZ3MoZGF0YS5pZClcbiAgICAgICAgICAucmVzb2x2ZXMoZmxhdHRlbmVkRGF0YSlcbiAgICAgIH0pXG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcHJvbWlzZScsICgpID0+XG4gICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pLmdldChkYXRhLmlkKS5zaG91bGQuYmUuYSgncHJvbWlzZScpKVxuXG4gICAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pLmdldChkYXRhLmlkKVxuICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmFsbC5rZXlzKGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzKSlcblxuICAgICAgaXQoJ3Nob3VsZCBtYXAgdGhlIGRhdGEgcHJvcGVybHknLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsT2JqID0gYXdhaXQgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSkuZ2V0KGRhdGEuaWQpXG5cbiAgICAgICAgbW9kZWxPYmoua2V5LnNob3VsZC5lcXVhbChkYXRhLmlkKVxuICAgICAgICBKU09OLnN0cmluZ2lmeShtb2RlbE9iai5kYXRhKS5zaG91bGQuZXF1YWwoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBrZXkgZG9lcyBub3QgZXhpc3QnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgcmVkaXNDbGllbnQuaGdldGFsbC5vbmNlKCkud2l0aEV4YWN0QXJncyhkYXRhLmlkKVxuICAgICAgICAgIC5yZXNvbHZlcyhudWxsKVxuICAgICAgfSlcblxuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4gcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSkuZ2V0KGRhdGEuaWQpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+ICcxJy5zaG91bGQuZXF1YWwoJzInKSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiBlcnIubWVzc2FnZS5zaG91bGQuZXF1YWwoa2V5Tm90Rm91bmRFcnJvck1zZykpKVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiB1bmRlcmx5aW5nIHJlZGlzQ2xpZW50IGZhaWxzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHJlZGlzQ2xpZW50LmhnZXRhbGwub25jZSgpLndpdGhFeGFjdEFyZ3MoZGF0YS5pZClcbiAgICAgICAgICAucmVqZWN0cyhuZXcgRXJyb3IocmVkaXNDbGllbnRGYWlsRXJyb3JNc2cpKVxuICAgICAgfSlcblxuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4gcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSkuZ2V0KGRhdGEuaWQpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+ICcxJy5zaG91bGQuZXF1YWwoJzInKSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiBlcnIubWVzc2FnZS5zaG91bGQuZXF1YWwocmVkaXNDbGllbnRGYWlsRXJyb3JNc2cpKSlcbiAgICB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIHNhdmluZyBhIG1vZGVsIG9iamVjdCcsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHJlZGlzQ2xpZW50Lmhtc2V0Lm9uY2UoKS53aXRoRXhhY3RBcmdzKC4uLmZsYXR0ZW5lZERhdGEpXG4gICAgICAgIC5yZXNvbHZlcyhwb3NpdGl2ZVJlcGx5KVxuICAgICAgbW9ja3MgPSBbIHJlZGlzQ2xpZW50Lmhtc2V0IF1cbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYSBwcm9taXNlJywgKCkgPT5cbiAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pXG4gICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSkuc2F2ZSgpLnNob3VsZC5iZS5hKCdwcm9taXNlJykpXG5cbiAgICBpdCgnc2hvdWxkIGJlIHN1Y2Nlc3NmdWwnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSlcbiAgICAgICAgLmNyZWF0ZSh7IGtleTogZGF0YS5pZCwgZGF0YSB9KS5zYXZlKCkuc2hvdWxkLmV2ZW50dWFsbHlcbiAgICAgICAgLmVxdWFsKHBvc2l0aXZlUmVwbHkpKVxuICB9KVxufSlcbiJdfQ==