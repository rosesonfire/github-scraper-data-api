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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi9vZG0vcmVkaXNPRE0uc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzQ2xpZW50IiwiZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzIiwiZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMiLCJkYXRhIiwiZmxhdHRlbmVkRGF0YSIsInBvc2l0aXZlUmVwbHkiLCJpZCIsIm5hbWUiLCJlbnRyeSIsInZhbHVlIiwiZGVzY3JpcHRpb24iLCJEYXRlIiwicGFyc2UiLCJtZXRhIiwibWV0YTEiLCJtZXRhMiIsImZvckVhY2giLCJtb2NrIiwidmVyaWZ5Iiwic2hvdWxkIiwiaGF2ZSIsImFsbCIsImtleXMiLCJjcmVhdGUiLCJrZXkiLCJtb2RlbE9iaiIsImVxdWFsIiwiSlNPTiIsInN0cmluZ2lmeSIsImhtc2V0Iiwib25jZSIsIndpdGhFeGFjdEFyZ3MiLCJyZXNvbHZlcyIsInNhdmUiLCJiZSIsImEiLCJldmVudHVhbGx5Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOzs7O0FBRUE7Ozs7Ozs7QUFIQTs7QUFFQTs7O0FBSUEscUJBQVMsVUFBVCxFQUFxQixZQUFNO0FBQ3pCLE1BQ0VBLGNBREY7QUFBQSxNQUVFQyxvQkFGRjtBQUFBLE1BR0VDLDhCQUhGO0FBQUEsTUFJRUMsbUNBSkY7QUFBQSxNQUtFQyxhQUxGO0FBQUEsTUFNRUMsc0JBTkY7QUFBQSxNQU9FQyxzQkFQRjs7QUFTQSxxQkFBTyxZQUFNO0FBQ1hKLDRCQUF3QixDQUFDLFFBQUQsRUFBVyxLQUFYLENBQXhCO0FBQ0FDLGlDQUE2QixDQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLE1BQWhCLENBQTdCO0FBQ0FDLFdBQU87QUFDTEcsVUFBSSxHQURDO0FBRUxDLFlBQU0sVUFGRDtBQUdMQyxhQUFPO0FBQ0xGLFlBQUksRUFEQztBQUVMRyxlQUFPLEVBRkY7QUFHTEMscUJBQWE7QUFDWCxrQkFBUSxJQUFJQyxJQUFKLENBQVNBLEtBQUtDLEtBQUwsQ0FB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aUIsVUFEdEQsQ0FFR1YsS0FGSCxDQUVTckIsYUFGVCxDQUR5QjtBQUFBLEtBQTNCO0FBSUQsR0FmRDtBQWdCRCxDQW5GRCIsImZpbGUiOiJyZWRpc09ETS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVzY3JpYmUsIGJlZm9yZSwgYmVmb3JlRWFjaCwgYWZ0ZXJFYWNoLCBpdCB9IGZyb20gJy4vLi4vLi4vc2V0dXAnXG4vLyB1bml0XG5pbXBvcnQgcmVkaXNPRE0gZnJvbSAnLi8uLi8uLi8uLi9tYWluL2xpYi9vZG0vcmVkaXNPRE0nXG4vLyBtb2Nrc1xuaW1wb3J0IHJlZGlzQ2xpZW50V3JhcHBlck1vY2tcbiAgZnJvbSAnLi8uLi8uLi9tb2Nrcy9saWIvd3JhcHBlcnMvcmVkaXNDbGllbnRXcmFwcGVyJ1xuXG5kZXNjcmliZSgnUmVkaXNPRE0nLCAoKSA9PiB7XG4gIGxldFxuICAgIG1vY2tzLFxuICAgIHJlZGlzQ2xpZW50LFxuICAgIGV4cGVjdGVkT0RNUHJvcGVydGllcyxcbiAgICBleHBlY3RlZE1vZGVsT2JqUHJvcGVydGllcyxcbiAgICBkYXRhLFxuICAgIGZsYXR0ZW5lZERhdGEsXG4gICAgcG9zaXRpdmVSZXBseVxuXG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzID0gWydjcmVhdGUnLCAnZ2V0J11cbiAgICBleHBlY3RlZE1vZGVsT2JqUHJvcGVydGllcyA9IFsna2V5JywgJ2RhdGEnLCAnc2F2ZSddXG4gICAgZGF0YSA9IHtcbiAgICAgIGlkOiAxMjYsXG4gICAgICBuYW1lOiAnc29tZU5hbWUnLFxuICAgICAgZW50cnk6IHtcbiAgICAgICAgaWQ6IDc4LFxuICAgICAgICB2YWx1ZTogNDUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgICAgJ2RhdGUnOiBuZXcgRGF0ZShEYXRlLnBhcnNlKCcyMDE4LTAzLTAxVDIzOjU4OjM1WicpKSxcbiAgICAgICAgICAnbG9jYXRpb24nOiAnc29tZUxvY2F0aW9uJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWV0YToge1xuICAgICAgICBtZXRhMTogJ2hlbGxvJyxcbiAgICAgICAgbWV0YTI6IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgZmxhdHRlbmVkRGF0YSA9IFsxMjYsICdpZCcsICcxMjYnLCAnbmFtZScsICdzb21lTmFtZScsICdlbnRyeTppZCcsICc3OCcsXG4gICAgICAnZW50cnk6dmFsdWUnLCAnNDUnLCAnZW50cnk6ZGVzY3JpcHRpb246ZGF0ZScsXG4gICAgICAnRnJpIE1hciAwMiAyMDE4IDA1OjU4OjM1IEdNVCswNjAwICgrMDYpJyxcbiAgICAgICdlbnRyeTpkZXNjcmlwdGlvbjpsb2NhdGlvbicsICdzb21lTG9jYXRpb24nLCAnbWV0YTptZXRhMScsICdoZWxsbycsXG4gICAgICAnbWV0YTptZXRhMicsICd0cnVlJ11cbiAgICBwb3NpdGl2ZVJlcGx5ID0gJ09LJ1xuICB9KVxuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHJlZGlzQ2xpZW50ID0gcmVkaXNDbGllbnRXcmFwcGVyTW9jaygpXG4gIH0pXG5cbiAgYWZ0ZXJFYWNoKCgpID0+IG1vY2tzLmZvckVhY2gobW9jayA9PiBtb2NrLnZlcmlmeSgpKSlcblxuICBkZXNjcmliZSgnV2hlbiBjcmVhdGluZyByZWRpc09ETScsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tzID0gW11cbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGV4cGVjdGVkIHByb3BlcnRpZXMnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCB9KS5zaG91bGQuaGF2ZS5hbGwua2V5cyhleHBlY3RlZE9ETVByb3BlcnRpZXMpKVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgYSBtb2RlbCBvYmplY3QnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQgfSlcbiAgICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhOiBkYXRhIH0pLnNob3VsZC5oYXZlLmFsbFxuICAgICAgICAgIC5rZXlzKGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzKSlcblxuICAgICAgaXQoJ3Nob3VsZCBtYXAgdGhlIGRhdGEgcHJvcGVybHknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsT2JqID0gcmVkaXNPRE0oeyByZWRpc0NsaWVudCB9KVxuICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGE6IGRhdGEgfSlcblxuICAgICAgICBtb2RlbE9iai5rZXkuc2hvdWxkLmVxdWFsKGRhdGEuaWQpXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KG1vZGVsT2JqLmRhdGEpLnNob3VsZC5lcXVhbChKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBzYXZpbmcgYSBtb2RlbCBvYmplY3QnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZWRpc0NsaWVudC5obXNldC5vbmNlKCkud2l0aEV4YWN0QXJncyguLi5mbGF0dGVuZWREYXRhKVxuICAgICAgICAucmVzb2x2ZXMocG9zaXRpdmVSZXBseSlcbiAgICAgIG1vY2tzID0gWyByZWRpc0NsaWVudC5obXNldCBdXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcHJvbWlzZScsICgpID0+XG4gICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50IH0pXG4gICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGE6IGRhdGEgfSkuc2F2ZSgpLnNob3VsZC5iZS5hKCdwcm9taXNlJykpXG5cbiAgICBpdCgnc2hvdWxkIGJlIHN1Y2Nlc3NmdWwnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCB9KVxuICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhOiBkYXRhIH0pLnNhdmUoKS5zaG91bGQuZXZlbnR1YWxseVxuICAgICAgICAuZXF1YWwocG9zaXRpdmVSZXBseSkpXG4gIH0pXG59KVxuIl19