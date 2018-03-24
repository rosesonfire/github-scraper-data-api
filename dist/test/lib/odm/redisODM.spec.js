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

    (0, _setup.describe)('When creating a model object with colon in a value', function () {
      (0, _setup.it)('should fail', function () {
        try {
          (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: dataWithColon });
          '1'.should.equal('2');
        } catch (e) {
          e.message.should.equal('Occurence of ":" in string value is not supported');
        }
      });
    });

    (0, _setup.describe)('When creating a model object with array as a value', function () {
      (0, _setup.it)('should fail', function () {
        try {
          (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: dataWithArray });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi9vZG0vcmVkaXNPRE0uc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzQ2xpZW50IiwiZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzIiwiZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMiLCJkYXRhIiwiZGF0YVdpdGhDb2xvbiIsImRhdGFXaXRoQXJyYXkiLCJmbGF0dGVuZWREYXRhIiwicG9zaXRpdmVSZXBseSIsImlkIiwibmFtZSIsImVudHJ5IiwidmFsdWUiLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJwYXJzZSIsIm1ldGEiLCJtZXRhMSIsIm1ldGEyIiwiZm9yRWFjaCIsIm1vY2siLCJ2ZXJpZnkiLCJ1dGlscyIsInNob3VsZCIsImhhdmUiLCJhbGwiLCJrZXlzIiwiY3JlYXRlIiwia2V5IiwibW9kZWxPYmoiLCJlcXVhbCIsImUiLCJtZXNzYWdlIiwiaGdldGFsbCIsIm9uY2UiLCJ3aXRoRXhhY3RBcmdzIiwicmVzb2x2ZXMiLCJnZXQiLCJiZSIsImEiLCJldmVudHVhbGx5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhtc2V0Iiwic2F2ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFFQTs7OztBQUVBOzs7Ozs7O0FBSEE7O0FBRUE7OztBQUlBLHFCQUFTLFVBQVQsRUFBcUIsWUFBTTtBQUN6QixNQUNFQSxjQURGO0FBQUEsTUFFRUMsb0JBRkY7QUFBQSxNQUdFQyw4QkFIRjtBQUFBLE1BSUVDLG1DQUpGO0FBQUEsTUFLRUMsYUFMRjtBQUFBLE1BTUVDLHNCQU5GO0FBQUEsTUFPRUMsc0JBUEY7QUFBQSxNQVFFQyxzQkFSRjtBQUFBLE1BU0VDLHNCQVRGOztBQVdBLHFCQUFPLFlBQU07QUFDWE4sNEJBQXdCLENBQUMsUUFBRCxFQUFXLEtBQVgsQ0FBeEI7QUFDQUMsaUNBQTZCLENBQUMsS0FBRCxFQUFRLE1BQVIsRUFBZ0IsTUFBaEIsQ0FBN0I7QUFDQUMsV0FBTztBQUNMSyxVQUFJLEdBREM7QUFF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Q0FEeUI7QUFBQSxLQUEzQjtBQUlELEdBZkQ7QUFnQkQsQ0E3SUQiLCJmaWxlIjoicmVkaXNPRE0uc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSAnanMtdXRpbHMnXG5cbmltcG9ydCB7IGRlc2NyaWJlLCBiZWZvcmUsIGJlZm9yZUVhY2gsIGFmdGVyRWFjaCwgaXQgfSBmcm9tICcuLy4uLy4uL3NldHVwJ1xuLy8gdW5pdFxuaW1wb3J0IHJlZGlzT0RNIGZyb20gJy4vLi4vLi4vLi4vbWFpbi9saWIvb2RtL3JlZGlzT0RNJ1xuLy8gbW9ja3NcbmltcG9ydCByZWRpc0NsaWVudFdyYXBwZXJNb2NrXG4gIGZyb20gJy4vLi4vLi4vbW9ja3MvbGliL3dyYXBwZXJzL3JlZGlzQ2xpZW50V3JhcHBlcidcblxuZGVzY3JpYmUoJ1JlZGlzT0RNJywgKCkgPT4ge1xuICBsZXRcbiAgICBtb2NrcyxcbiAgICByZWRpc0NsaWVudCxcbiAgICBleHBlY3RlZE9ETVByb3BlcnRpZXMsXG4gICAgZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMsXG4gICAgZGF0YSxcbiAgICBkYXRhV2l0aENvbG9uLFxuICAgIGRhdGFXaXRoQXJyYXksXG4gICAgZmxhdHRlbmVkRGF0YSxcbiAgICBwb3NpdGl2ZVJlcGx5XG5cbiAgYmVmb3JlKCgpID0+IHtcbiAgICBleHBlY3RlZE9ETVByb3BlcnRpZXMgPSBbJ2NyZWF0ZScsICdnZXQnXVxuICAgIGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzID0gWydrZXknLCAnZGF0YScsICdzYXZlJ11cbiAgICBkYXRhID0ge1xuICAgICAgaWQ6IDEyNixcbiAgICAgIG5hbWU6ICdzb21lTmFtZScsXG4gICAgICBlbnRyeToge1xuICAgICAgICBpZDogNzgsXG4gICAgICAgIHZhbHVlOiA0NSxcbiAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAnZGF0ZSc6IG5ldyBEYXRlKERhdGUucGFyc2UoJzIwMTgtMDMtMDFUMjM6NTg6MzVaJykpLFxuICAgICAgICAgICdsb2NhdGlvbic6ICdzb21lTG9jYXRpb24nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtZXRhOiB7XG4gICAgICAgIG1ldGExOiAnaGVsbG8nLFxuICAgICAgICBtZXRhMjogdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhV2l0aENvbG9uID0ge1xuICAgICAgaWQ6IDMsXG4gICAgICB2YWx1ZTogJ3NvbWV2YWx1ZTp3aXRoY29sb24nXG4gICAgfVxuICAgIGRhdGFXaXRoQXJyYXkgPSB7XG4gICAgICBpZDogMyxcbiAgICAgIHZhbHVlOiBbJ3NvbWV2YWx1ZSddXG4gICAgfVxuICAgIGZsYXR0ZW5lZERhdGEgPSBbMTI2LCAnaWQnLCAxMjYsICduYW1lJywgJ3NvbWVOYW1lJywgJ2VudHJ5OmlkJywgNzgsXG4gICAgICAnZW50cnk6dmFsdWUnLCA0NSwgJ2VudHJ5OmRlc2NyaXB0aW9uOmRhdGUnLFxuICAgICAgbmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxOC0wMy0wMVQyMzo1ODozNVonKSksXG4gICAgICAnZW50cnk6ZGVzY3JpcHRpb246bG9jYXRpb24nLCAnc29tZUxvY2F0aW9uJywgJ21ldGE6bWV0YTEnLCAnaGVsbG8nLFxuICAgICAgJ21ldGE6bWV0YTInLCB0cnVlXVxuICAgIHBvc2l0aXZlUmVwbHkgPSAnT0snXG4gIH0pXG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcmVkaXNDbGllbnQgPSByZWRpc0NsaWVudFdyYXBwZXJNb2NrKClcbiAgfSlcblxuICBhZnRlckVhY2goKCkgPT4gbW9ja3MuZm9yRWFjaChtb2NrID0+IG1vY2sudmVyaWZ5KCkpKVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIHJlZGlzT0RNJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja3MgPSBbXVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KS5zaG91bGQuaGF2ZS5hbGxcbiAgICAgICAgLmtleXMoZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzKSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGEgbW9kZWwgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBoYXZlIGV4cGVjdGVkIHByb3BlcnRpZXMnLCAoKSA9PlxuICAgICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSkuc2hvdWxkLmhhdmUuYWxsXG4gICAgICAgICAgLmtleXMoZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMpKVxuXG4gICAgICBpdCgnc2hvdWxkIG1hcCB0aGUgZGF0YSBwcm9wZXJseScsICgpID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWxPYmogPSByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSlcblxuICAgICAgICBtb2RlbE9iai5rZXkuc2hvdWxkLmVxdWFsKGRhdGEuaWQpXG4gICAgICAgIG1vZGVsT2JqLmRhdGEuc2hvdWxkLmVxdWFsKGRhdGEpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjcmVhdGluZyBhIG1vZGVsIG9iamVjdCB3aXRoIGNvbG9uIGluIGEgdmFsdWUnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwnLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSlcbiAgICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGE6IGRhdGFXaXRoQ29sb24gfSlcbiAgICAgICAgICAnMScuc2hvdWxkLmVxdWFsKCcyJylcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGUubWVzc2FnZS5zaG91bGRcbiAgICAgICAgICAgIC5lcXVhbCgnT2NjdXJlbmNlIG9mIFwiOlwiIGluIHN0cmluZyB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgYSBtb2RlbCBvYmplY3Qgd2l0aCBhcnJheSBhcyBhIHZhbHVlJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pXG4gICAgICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhOiBkYXRhV2l0aEFycmF5IH0pXG4gICAgICAgICAgJzEnLnNob3VsZC5lcXVhbCgnMicpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBlLm1lc3NhZ2Uuc2hvdWxkXG4gICAgICAgICAgICAuZXF1YWwoJ0FycmF5IGFzIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ1doZW4gZ2V0dGluZyBhIG1vZGVsIG9iamVjdCcsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHJlZGlzQ2xpZW50LmhnZXRhbGwub25jZSgpLndpdGhFeGFjdEFyZ3MoZGF0YS5pZCkucmVzb2x2ZXMoZmxhdHRlbmVkRGF0YSlcbiAgICAgIG1vY2tzID0gWyByZWRpc0NsaWVudC5oZ2V0YWxsIF1cbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYSBwcm9taXNlJywgKCkgPT5cbiAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pLmdldChkYXRhLmlkKS5zaG91bGQuYmUuYSgncHJvbWlzZScpKVxuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGV4cGVjdGVkIHByb3BlcnRpZXMnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSkuZ2V0KGRhdGEuaWQpXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmFsbC5rZXlzKGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzKSlcblxuICAgIGl0KCdzaG91bGQgbWFwIHRoZSBkYXRhIHByb3Blcmx5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbW9kZWxPYmogPSBhd2FpdCByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KS5nZXQoZGF0YS5pZClcblxuICAgICAgbW9kZWxPYmoua2V5LnNob3VsZC5lcXVhbChkYXRhLmlkKVxuICAgICAgSlNPTi5zdHJpbmdpZnkobW9kZWxPYmouZGF0YSkuc2hvdWxkLmVxdWFsKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ1doZW4gc2F2aW5nIGEgbW9kZWwgb2JqZWN0JywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVkaXNDbGllbnQuaG1zZXQub25jZSgpLndpdGhFeGFjdEFyZ3MoLi4uZmxhdHRlbmVkRGF0YSlcbiAgICAgICAgLnJlc29sdmVzKHBvc2l0aXZlUmVwbHkpXG4gICAgICBtb2NrcyA9IFsgcmVkaXNDbGllbnQuaG1zZXQgXVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhIHByb21pc2UnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSlcbiAgICAgICAgLmNyZWF0ZSh7IGtleTogZGF0YS5pZCwgZGF0YSB9KS5zYXZlKCkuc2hvdWxkLmJlLmEoJ3Byb21pc2UnKSlcblxuICAgIGl0KCdzaG91bGQgYmUgc3VjY2Vzc2Z1bCcsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhIH0pLnNhdmUoKS5zaG91bGQuZXZlbnR1YWxseVxuICAgICAgICAuZXF1YWwocG9zaXRpdmVSZXBseSkpXG4gIH0pXG59KVxuIl19