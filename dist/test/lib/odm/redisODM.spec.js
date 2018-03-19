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
        JSON.stringify(modelObj.data).should.equal(JSON.stringify(data));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi9vZG0vcmVkaXNPRE0uc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzQ2xpZW50IiwiZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzIiwiZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMiLCJkYXRhIiwiZGF0YVdpdGhDb2xvbiIsImRhdGFXaXRoQXJyYXkiLCJmbGF0dGVuZWREYXRhIiwicG9zaXRpdmVSZXBseSIsImlkIiwibmFtZSIsImVudHJ5IiwidmFsdWUiLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJwYXJzZSIsIm1ldGEiLCJtZXRhMSIsIm1ldGEyIiwiZm9yRWFjaCIsIm1vY2siLCJ2ZXJpZnkiLCJzaG91bGQiLCJoYXZlIiwiYWxsIiwia2V5cyIsImNyZWF0ZSIsImtleSIsIm1vZGVsT2JqIiwiZXF1YWwiLCJKU09OIiwic3RyaW5naWZ5IiwiZSIsIm1lc3NhZ2UiLCJoZ2V0YWxsIiwib25jZSIsIndpdGhFeGFjdEFyZ3MiLCJyZXNvbHZlcyIsImdldCIsImJlIiwiYSIsImV2ZW50dWFsbHkiLCJobXNldCIsInNhdmUiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7Ozs7QUFFQTs7Ozs7OztBQUhBOztBQUVBOzs7QUFJQSxxQkFBUyxVQUFULEVBQXFCLFlBQU07QUFDekIsTUFDRUEsY0FERjtBQUFBLE1BRUVDLG9CQUZGO0FBQUEsTUFHRUMsOEJBSEY7QUFBQSxNQUlFQyxtQ0FKRjtBQUFBLE1BS0VDLGFBTEY7QUFBQSxNQU1FQyxzQkFORjtBQUFBLE1BT0VDLHNCQVBGO0FBQUEsTUFRRUMsc0JBUkY7QUFBQSxNQVNFQyxzQkFURjs7QUFXQSxxQkFBTyxZQUFNO0FBQ1hOLDRCQUF3QixDQUFDLFFBQUQsRUFBVyxLQUFYLENBQXhCO0FBQ0FDLGlDQUE2QixDQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLE1BQWhCLENBQTdCO0FBQ0FDLFdBQU87QUFDTEssVUFBSSxHQURDO0FBRUxDLFlBQU0sVUFGRDtB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cG9ydCB7IGRlc2NyaWJlLCBiZWZvcmUsIGJlZm9yZUVhY2gsIGFmdGVyRWFjaCwgaXQgfSBmcm9tICcuLy4uLy4uL3NldHVwJ1xuLy8gdW5pdFxuaW1wb3J0IHJlZGlzT0RNIGZyb20gJy4vLi4vLi4vLi4vbWFpbi9saWIvb2RtL3JlZGlzT0RNJ1xuLy8gbW9ja3NcbmltcG9ydCByZWRpc0NsaWVudFdyYXBwZXJNb2NrXG4gIGZyb20gJy4vLi4vLi4vbW9ja3MvbGliL3dyYXBwZXJzL3JlZGlzQ2xpZW50V3JhcHBlcidcblxuZGVzY3JpYmUoJ1JlZGlzT0RNJywgKCkgPT4ge1xuICBsZXRcbiAgICBtb2NrcyxcbiAgICByZWRpc0NsaWVudCxcbiAgICBleHBlY3RlZE9ETVByb3BlcnRpZXMsXG4gICAgZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMsXG4gICAgZGF0YSxcbiAgICBkYXRhV2l0aENvbG9uLFxuICAgIGRhdGFXaXRoQXJyYXksXG4gICAgZmxhdHRlbmVkRGF0YSxcbiAgICBwb3NpdGl2ZVJlcGx5XG5cbiAgYmVmb3JlKCgpID0+IHtcbiAgICBleHBlY3RlZE9ETVByb3BlcnRpZXMgPSBbJ2NyZWF0ZScsICdnZXQnXVxuICAgIGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzID0gWydrZXknLCAnZGF0YScsICdzYXZlJ11cbiAgICBkYXRhID0ge1xuICAgICAgaWQ6IDEyNixcbiAgICAgIG5hbWU6ICdzb21lTmFtZScsXG4gICAgICBlbnRyeToge1xuICAgICAgICBpZDogNzgsXG4gICAgICAgIHZhbHVlOiA0NSxcbiAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAnZGF0ZSc6IG5ldyBEYXRlKERhdGUucGFyc2UoJzIwMTgtMDMtMDFUMjM6NTg6MzVaJykpLFxuICAgICAgICAgICdsb2NhdGlvbic6ICdzb21lTG9jYXRpb24nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtZXRhOiB7XG4gICAgICAgIG1ldGExOiAnaGVsbG8nLFxuICAgICAgICBtZXRhMjogdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhV2l0aENvbG9uID0ge1xuICAgICAgaWQ6IDMsXG4gICAgICB2YWx1ZTogJ3NvbWV2YWx1ZTp3aXRoY29sb24nXG4gICAgfVxuICAgIGRhdGFXaXRoQXJyYXkgPSB7XG4gICAgICBpZDogMyxcbiAgICAgIHZhbHVlOiBbJ3NvbWV2YWx1ZSddXG4gICAgfVxuICAgIGZsYXR0ZW5lZERhdGEgPSBbMTI2LCAnaWQnLCAxMjYsICduYW1lJywgJ3NvbWVOYW1lJywgJ2VudHJ5OmlkJywgNzgsXG4gICAgICAnZW50cnk6dmFsdWUnLCA0NSwgJ2VudHJ5OmRlc2NyaXB0aW9uOmRhdGUnLFxuICAgICAgbmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxOC0wMy0wMVQyMzo1ODozNVonKSksXG4gICAgICAnZW50cnk6ZGVzY3JpcHRpb246bG9jYXRpb24nLCAnc29tZUxvY2F0aW9uJywgJ21ldGE6bWV0YTEnLCAnaGVsbG8nLFxuICAgICAgJ21ldGE6bWV0YTInLCB0cnVlXVxuICAgIHBvc2l0aXZlUmVwbHkgPSAnT0snXG4gIH0pXG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcmVkaXNDbGllbnQgPSByZWRpc0NsaWVudFdyYXBwZXJNb2NrKClcbiAgfSlcblxuICBhZnRlckVhY2goKCkgPT4gbW9ja3MuZm9yRWFjaChtb2NrID0+IG1vY2sudmVyaWZ5KCkpKVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIHJlZGlzT0RNJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja3MgPSBbXVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50IH0pLnNob3VsZC5oYXZlLmFsbC5rZXlzKGV4cGVjdGVkT0RNUHJvcGVydGllcykpXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjcmVhdGluZyBhIG1vZGVsIG9iamVjdCcsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgaGF2ZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCB9KVxuICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSkuc2hvdWxkLmhhdmUuYWxsXG4gICAgICAgICAgLmtleXMoZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMpKVxuXG4gICAgICBpdCgnc2hvdWxkIG1hcCB0aGUgZGF0YSBwcm9wZXJseScsICgpID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWxPYmogPSByZWRpc09ETSh7IHJlZGlzQ2xpZW50IH0pXG4gICAgICAgICAgLmNyZWF0ZSh7IGtleTogZGF0YS5pZCwgZGF0YSB9KVxuXG4gICAgICAgIG1vZGVsT2JqLmtleS5zaG91bGQuZXF1YWwoZGF0YS5pZClcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkobW9kZWxPYmouZGF0YSkuc2hvdWxkLmVxdWFsKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgYSBtb2RlbCBvYmplY3Qgd2l0aCBjb2xvbiBpbiBhIHZhbHVlJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSlcbiAgICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGE6IGRhdGFXaXRoQ29sb24gfSlcbiAgICAgICAgICAnMScuc2hvdWxkLmVxdWFsKCcyJylcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGUubWVzc2FnZS5zaG91bGRcbiAgICAgICAgICAgIC5lcXVhbCgnT2NjdXJlbmNlIG9mIFwiOlwiIGluIHN0cmluZyB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgYSBtb2RlbCBvYmplY3Qgd2l0aCBhcnJheSBhcyBhIHZhbHVlJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSlcbiAgICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGE6IGRhdGFXaXRoQXJyYXkgfSlcbiAgICAgICAgICAnMScuc2hvdWxkLmVxdWFsKCcyJylcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGUubWVzc2FnZS5zaG91bGRcbiAgICAgICAgICAgIC5lcXVhbCgnQXJyYXkgYXMgdmFsdWUgaXMgbm90IHN1cHBvcnRlZCcpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBnZXR0aW5nIGEgbW9kZWwgb2JqZWN0JywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVkaXNDbGllbnQuaGdldGFsbC5vbmNlKCkud2l0aEV4YWN0QXJncyhkYXRhLmlkKS5yZXNvbHZlcyhmbGF0dGVuZWREYXRhKVxuICAgICAgbW9ja3MgPSBbIHJlZGlzQ2xpZW50LmhnZXRhbGwgXVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhIHByb21pc2UnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCB9KS5nZXQoZGF0YS5pZCkuc2hvdWxkLmJlLmEoJ3Byb21pc2UnKSlcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSkuZ2V0KGRhdGEuaWQpXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmFsbC5rZXlzKGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzKSlcblxuICAgIGl0KCdzaG91bGQgbWFwIHRoZSBkYXRhIHByb3Blcmx5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbW9kZWxPYmogPSBhd2FpdCByZWRpc09ETSh7IHJlZGlzQ2xpZW50IH0pLmdldChkYXRhLmlkKVxuXG4gICAgICBtb2RlbE9iai5rZXkuc2hvdWxkLmVxdWFsKGRhdGEuaWQpXG4gICAgICBKU09OLnN0cmluZ2lmeShtb2RlbE9iai5kYXRhKS5zaG91bGQuZXF1YWwoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBzYXZpbmcgYSBtb2RlbCBvYmplY3QnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZWRpc0NsaWVudC5obXNldC5vbmNlKCkud2l0aEV4YWN0QXJncyguLi5mbGF0dGVuZWREYXRhKVxuICAgICAgICAucmVzb2x2ZXMocG9zaXRpdmVSZXBseSlcbiAgICAgIG1vY2tzID0gWyByZWRpc0NsaWVudC5obXNldCBdXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcHJvbWlzZScsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50IH0pXG4gICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSkuc2F2ZSgpLnNob3VsZC5iZS5hKCdwcm9taXNlJykpXG5cbiAgICBpdCgnc2hvdWxkIGJlIHN1Y2Nlc3NmdWwnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCB9KVxuICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhIH0pLnNhdmUoKS5zaG91bGQuZXZlbnR1YWxseVxuICAgICAgICAuZXF1YWwocG9zaXRpdmVSZXBseSkpXG4gIH0pXG59KVxuIl19