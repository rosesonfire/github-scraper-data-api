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
      noArrayAsValueErrorMsg = void 0;

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
      redisClient.hgetall.once().withExactArgs(data.id).resolves(flattenedData);
      mocks = [redisClient.hgetall];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi9vZG0vcmVkaXNPRE0uc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzQ2xpZW50IiwiZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzIiwiZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMiLCJkYXRhIiwiZGF0YVdpdGhDb2xvbkluQUtleSIsImRhdGFXaXRoQXJyYXkiLCJmbGF0dGVuZWREYXRhIiwicG9zaXRpdmVSZXBseSIsIm5vQ29sb25JbktleUVycm9yTXNnIiwibm9BcnJheUFzVmFsdWVFcnJvck1zZyIsImlkIiwibmFtZSIsImVudHJ5IiwidmFsdWUiLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJwYXJzZSIsIm1ldGEiLCJtZXRhMSIsIm1ldGEyIiwiZm9yRWFjaCIsIm1vY2siLCJ2ZXJpZnkiLCJ1dGlscyIsInNob3VsZCIsImhhdmUiLCJhbGwiLCJrZXlzIiwiY3JlYXRlIiwia2V5IiwibW9kZWxPYmoiLCJlcXVhbCIsImUiLCJtZXNzYWdlIiwiaGdldGFsbCIsIm9uY2UiLCJ3aXRoRXhhY3RBcmdzIiwicmVzb2x2ZXMiLCJnZXQiLCJiZSIsImEiLCJldmVudHVhbGx5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhtc2V0Iiwic2F2ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFFQTs7OztBQUVBOzs7Ozs7O0FBSEE7O0FBRUE7OztBQUlBLHFCQUFTLFVBQVQsRUFBcUIsWUFBTTtBQUN6QixNQUNFQSxjQURGO0FBQUEsTUFFRUMsb0JBRkY7QUFBQSxNQUdFQyw4QkFIRjtBQUFBLE1BSUVDLG1DQUpGO0FBQUEsTUFLRUMsYUFMRjtBQUFBLE1BTUVDLDRCQU5GO0FBQUEsTUFPRUMsc0JBUEY7QUFBQSxNQVFFQyxzQkFSRjtBQUFBLE1BU0VDLHNCQVRGO0FBQUEsTUFVRUMsNkJBVkY7QUFBQSxNQVdFQywrQkFYRjs7QUFhQSxxQkFBTyxZQUFNO0FBQ1hSLDRCQUF3QixDQUFDLFFBQUQsRUFBVyxLQUFY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ZXVCLHFCQUFmLEVBQVQsRUFDR0ssTUFESCxDQUNVLEVBQUVDLEtBQUsxQixLQUFLTyxFQUFaLEVBQWdCUCxVQUFoQixFQURWLEVBQ2tDMEMsSUFEbEMsR0FDeUNyQixNQUR6QyxDQUNnRGlCLFVBRGhELENBRUdWLEtBRkgsQ0FFU3hCLGFBRlQsQ0FEeUI7QUFBQSxLQUEzQjtBQUlELEdBZkQ7QUFnQkQsQ0FqSkQiLCJmaWxlIjoicmVkaXNPRE0uc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSAnanMtdXRpbHMnXG5cbmltcG9ydCB7IGRlc2NyaWJlLCBiZWZvcmUsIGJlZm9yZUVhY2gsIGFmdGVyRWFjaCwgaXQgfSBmcm9tICcuLy4uLy4uL3NldHVwJ1xuLy8gdW5pdFxuaW1wb3J0IHJlZGlzT0RNIGZyb20gJy4vLi4vLi4vLi4vbWFpbi9saWIvb2RtL3JlZGlzT0RNJ1xuLy8gbW9ja3NcbmltcG9ydCByZWRpc0NsaWVudFdyYXBwZXJNb2NrXG4gIGZyb20gJy4vLi4vLi4vbW9ja3MvbGliL3dyYXBwZXJzL3JlZGlzQ2xpZW50V3JhcHBlcidcblxuZGVzY3JpYmUoJ1JlZGlzT0RNJywgKCkgPT4ge1xuICBsZXRcbiAgICBtb2NrcyxcbiAgICByZWRpc0NsaWVudCxcbiAgICBleHBlY3RlZE9ETVByb3BlcnRpZXMsXG4gICAgZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMsXG4gICAgZGF0YSxcbiAgICBkYXRhV2l0aENvbG9uSW5BS2V5LFxuICAgIGRhdGFXaXRoQXJyYXksXG4gICAgZmxhdHRlbmVkRGF0YSxcbiAgICBwb3NpdGl2ZVJlcGx5LFxuICAgIG5vQ29sb25JbktleUVycm9yTXNnLFxuICAgIG5vQXJyYXlBc1ZhbHVlRXJyb3JNc2dcblxuICBiZWZvcmUoKCkgPT4ge1xuICAgIGV4cGVjdGVkT0RNUHJvcGVydGllcyA9IFsnY3JlYXRlJywgJ2dldCddXG4gICAgZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMgPSBbJ2tleScsICdkYXRhJywgJ3NhdmUnXVxuICAgIGRhdGEgPSB7XG4gICAgICBpZDogMTI2LFxuICAgICAgbmFtZTogJ3NvbWVOYW1lJyxcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgIGlkOiA3OCxcbiAgICAgICAgdmFsdWU6IDQ1LFxuICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICdkYXRlJzogbmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxOC0wMy0wMVQyMzo1ODozNVonKSksXG4gICAgICAgICAgJ2xvY2F0aW9uJzogJ3NvbWVMb2NhdGlvbidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgbWV0YTE6ICdoZWxsbycsXG4gICAgICAgIG1ldGEyOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIGRhdGFXaXRoQ29sb25JbkFLZXkgPSB7XG4gICAgICBpZDogMyxcbiAgICAgICd2YWx1ZTp3aXRoY29sb24nOiAnc29tZXZhbHVlJ1xuICAgIH1cbiAgICBkYXRhV2l0aEFycmF5ID0ge1xuICAgICAgaWQ6IDMsXG4gICAgICB2YWx1ZTogWydzb21ldmFsdWUnXVxuICAgIH1cbiAgICBmbGF0dGVuZWREYXRhID0gWzEyNiwgJ2lkJywgMTI2LCAnbmFtZScsICdzb21lTmFtZScsICdlbnRyeTppZCcsIDc4LFxuICAgICAgJ2VudHJ5OnZhbHVlJywgNDUsICdlbnRyeTpkZXNjcmlwdGlvbjpkYXRlJyxcbiAgICAgIG5ldyBEYXRlKERhdGUucGFyc2UoJzIwMTgtMDMtMDFUMjM6NTg6MzVaJykpLFxuICAgICAgJ2VudHJ5OmRlc2NyaXB0aW9uOmxvY2F0aW9uJywgJ3NvbWVMb2NhdGlvbicsICdtZXRhOm1ldGExJywgJ2hlbGxvJyxcbiAgICAgICdtZXRhOm1ldGEyJywgdHJ1ZV1cbiAgICBwb3NpdGl2ZVJlcGx5ID0gJ09LJ1xuICAgIG5vQ29sb25JbktleUVycm9yTXNnID0gJ09jY3VyZW5jZSBvZiBcIjpcIiBpbiBrZXkgaXMgbm90IHN1cHBvcnRlZCdcbiAgICBub0FycmF5QXNWYWx1ZUVycm9yTXNnID0gJ0FycmF5IGFzIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQnXG4gIH0pXG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcmVkaXNDbGllbnQgPSByZWRpc0NsaWVudFdyYXBwZXJNb2NrKClcbiAgfSlcblxuICBhZnRlckVhY2goKCkgPT4gbW9ja3MuZm9yRWFjaChtb2NrID0+IG1vY2sudmVyaWZ5KCkpKVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIHJlZGlzT0RNJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja3MgPSBbXVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KS5zaG91bGQuaGF2ZS5hbGxcbiAgICAgICAgLmtleXMoZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzKSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGEgbW9kZWwgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBoYXZlIGV4cGVjdGVkIHByb3BlcnRpZXMnLCAoKSA9PlxuICAgICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSkuc2hvdWxkLmhhdmUuYWxsXG4gICAgICAgICAgLmtleXMoZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMpKVxuXG4gICAgICBpdCgnc2hvdWxkIG1hcCB0aGUgZGF0YSBwcm9wZXJseScsICgpID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWxPYmogPSByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSlcblxuICAgICAgICBtb2RlbE9iai5rZXkuc2hvdWxkLmVxdWFsKGRhdGEuaWQpXG4gICAgICAgIG1vZGVsT2JqLmRhdGEuc2hvdWxkLmVxdWFsKGRhdGEpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjcmVhdGluZyBhIG1vZGVsIG9iamVjdCB3aXRoIGNvbG9uIGluIGEga2V5JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pXG4gICAgICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhV2l0aENvbG9uSW5BS2V5LmlkLCBkYXRhOiBkYXRhV2l0aENvbG9uSW5BS2V5IH0pXG4gICAgICAgICAgJzEnLnNob3VsZC5lcXVhbCgnMicpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBlLm1lc3NhZ2Uuc2hvdWxkXG4gICAgICAgICAgICAuZXF1YWwobm9Db2xvbkluS2V5RXJyb3JNc2cpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGEgbW9kZWwgb2JqZWN0IHdpdGggYXJyYXkgYXMgYSB2YWx1ZScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCcsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAgICAgLmNyZWF0ZSh7IGtleTogZGF0YS5pZCwgZGF0YTogZGF0YVdpdGhBcnJheSB9KVxuICAgICAgICAgICcxJy5zaG91bGQuZXF1YWwoJzInKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgZS5tZXNzYWdlLnNob3VsZFxuICAgICAgICAgICAgLmVxdWFsKG5vQXJyYXlBc1ZhbHVlRXJyb3JNc2cpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBnZXR0aW5nIGEgbW9kZWwgb2JqZWN0JywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVkaXNDbGllbnQuaGdldGFsbC5vbmNlKCkud2l0aEV4YWN0QXJncyhkYXRhLmlkKS5yZXNvbHZlcyhmbGF0dGVuZWREYXRhKVxuICAgICAgbW9ja3MgPSBbIHJlZGlzQ2xpZW50LmhnZXRhbGwgXVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhIHByb21pc2UnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSkuZ2V0KGRhdGEuaWQpLnNob3VsZC5iZS5hKCdwcm9taXNlJykpXG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KS5nZXQoZGF0YS5pZClcbiAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUuYWxsLmtleXMoZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMpKVxuXG4gICAgaXQoJ3Nob3VsZCBtYXAgdGhlIGRhdGEgcHJvcGVybHknLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBtb2RlbE9iaiA9IGF3YWl0IHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pLmdldChkYXRhLmlkKVxuXG4gICAgICBtb2RlbE9iai5rZXkuc2hvdWxkLmVxdWFsKGRhdGEuaWQpXG4gICAgICBKU09OLnN0cmluZ2lmeShtb2RlbE9iai5kYXRhKS5zaG91bGQuZXF1YWwoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBzYXZpbmcgYSBtb2RlbCBvYmplY3QnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZWRpc0NsaWVudC5obXNldC5vbmNlKCkud2l0aEV4YWN0QXJncyguLi5mbGF0dGVuZWREYXRhKVxuICAgICAgICAucmVzb2x2ZXMocG9zaXRpdmVSZXBseSlcbiAgICAgIG1vY2tzID0gWyByZWRpc0NsaWVudC5obXNldCBdXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcHJvbWlzZScsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhIH0pLnNhdmUoKS5zaG91bGQuYmUuYSgncHJvbWlzZScpKVxuXG4gICAgaXQoJ3Nob3VsZCBiZSBzdWNjZXNzZnVsJywgKCkgPT5cbiAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pXG4gICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSkuc2F2ZSgpLnNob3VsZC5ldmVudHVhbGx5XG4gICAgICAgIC5lcXVhbChwb3NpdGl2ZVJlcGx5KSlcbiAgfSlcbn0pXG4iXX0=