'use strict';

var _setup = require('./../setup');

var _dataService = require('./../../main/services/dataService');

var _dataService2 = _interopRequireDefault(_dataService);

var _redisODM = require('./../mocks/lib/odm/redisODM');

var _redisODM2 = _interopRequireDefault(_redisODM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// unit
(0, _setup.describe)('DataService', function () {
  var mocks = void 0,
      redisODM = void 0,
      redisModelObject = void 0,
      singleDataList = void 0,
      multiDataList = void 0,
      expectedProperties = void 0,
      positiveReply = void 0;

  (0, _setup.before)(function () {
    singleDataList = [{
      author: {
        uri: 'someURI',
        name: 'someName',
        location: {
          country: 'someCountry',
          city: 'someCity',
          postCode: 1234,
          resident: true
        }
      },
      article: 'someArticle'
    }];
    multiDataList = [{
      author: {
        uri: 'someURI',
        name: 'someName',
        location: {
          country: 'someCountry',
          city: 'someCity',
          postCode: 1234,
          resident: true
        }
      },
      article: 'someArticle'
    }, {
      author: {
        uri: 'someURI2',
        name: 'someName2',
        location: {
          country: 'someCountry2',
          city: 'someCity2',
          postCode: 12345,
          resident: false
        }
      },
      article: 'someArticle2'
    }];
    expectedProperties = ['writeData'];
    positiveReply = 'OK';
  });

  (0, _setup.beforeEach)(function () {
    redisODM = (0, _redisODM2.default)();
    redisModelObject = (0, _redisODM.redisModelObjectMock)();
  });

  (0, _setup.afterEach)(function () {
    return mocks.forEach(function (mock) {
      return mock.verify();
    });
  });

  (0, _setup.describe)('When creating dataService', function () {
    (0, _setup.beforeEach)(function () {
      mocks = [];
    });
    (0, _setup.it)('should have the expected properties', function () {
      return (0, _dataService2.default)({ odm: redisODM }).should.have.all.keys(expectedProperties);
    });
  });

  (0, _setup.describe)('When writing single data', function () {
    (0, _setup.beforeEach)(function () {
      redisODM.create.once().withExactArgs({ key: singleDataList[0].author.uri, data: singleDataList[0] }).returns(redisModelObject);
      mocks = [redisODM.create, redisModelObject.save];
    });

    (0, _setup.describe)('When successful', function () {
      (0, _setup.beforeEach)(function () {
        return redisModelObject.save.once().withExactArgs().returns(Promise.resolve(positiveReply));
      });

      (0, _setup.it)('should return a promise', function () {
        return (0, _dataService2.default)({ odm: redisODM }).writeData(singleDataList).should.be.a('promise');
      });

      (0, _setup.it)('should write data successfully', function () {
        return (0, _dataService2.default)({ odm: redisODM }).writeData(singleDataList).should.eventually.equalTo([positiveReply]);
      });
    });

    (0, _setup.describe)('When fails', function () {
      (0, _setup.beforeEach)(function () {
        return redisModelObject.save.once().withExactArgs().returns(Promise.reject(new Error('err')));
      });

      (0, _setup.it)('should fail to write data', function () {
        return (0, _dataService2.default)({ odm: redisODM }).writeData(singleDataList).should.be.rejected;
      });
    });
  });

  (0, _setup.describe)('When writing multiple data', function () {
    (0, _setup.beforeEach)(function () {
      redisODM.create.exactly(multiDataList.length).returns(redisModelObject);
      mocks = [redisODM.create, redisModelObject.save];
    });

    (0, _setup.describe)('When successful', function () {
      (0, _setup.beforeEach)(function () {
        return redisModelObject.save.exactly(multiDataList.length).withExactArgs().returns(Promise.resolve(positiveReply));
      });

      (0, _setup.it)('should write data successfully', function () {
        return (0, _dataService2.default)({ odm: redisODM }).writeData(multiDataList).should.eventually.equalTo(multiDataList.map(function (_) {
          return positiveReply;
        }));
      });
    });

    (0, _setup.describe)('When fails', function () {
      (0, _setup.beforeEach)(function () {
        return redisModelObject.save.exactly(multiDataList.length).withExactArgs().returns(Promise.reject(new Error('err')));
      });

      (0, _setup.it)('should fail to write data', function () {
        return (0, _dataService2.default)({ odm: redisODM }).writeData(multiDataList).should.be.rejected;
      });
    });
  });
});
// mocks
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L3NlcnZpY2VzL2RhdGFTZXJ2aWNlLnNwZWMuanMiXSwibmFtZXMiOlsibW9ja3MiLCJyZWRpc09ETSIsInJlZGlzTW9kZWxPYmplY3QiLCJzaW5nbGVEYXRhTGlzdCIsIm11bHRpRGF0YUxpc3QiLCJleHBlY3RlZFByb3BlcnRpZXMiLCJwb3NpdGl2ZVJlcGx5IiwiYXV0aG9yIiwidXJpIiwibmFtZSIsImxvY2F0aW9uIiwiY291bnRyeSIsImNpdHkiLCJwb3N0Q29kZSIsInJlc2lkZW50IiwiYXJ0aWNsZSIsImZvckVhY2giLCJtb2NrIiwidmVyaWZ5Iiwib2RtIiwic2hvdWxkIiwiaGF2ZSIsImFsbCIsImtleXMiLCJjcmVhdGUiLCJvbmNlIiwid2l0aEV4YWN0QXJncyIsImtleSIsImRhdGEiLCJyZXR1cm5zIiwic2F2ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwid3JpdGVEYXRhIiwiYmUiLCJhIiwiZXZlbnR1YWxseSIsImVxdWFsVG8iLCJyZWplY3QiLCJFcnJvciIsInJlamVjdGVkIiwiZXhhY3RseSIsImxlbmd0aCIsIm1hcCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7OztBQUVBOzs7Ozs7QUFIQTtBQUtBLHFCQUFTLGFBQVQsRUFBd0IsWUFBTTtBQUM1QixNQUNFQSxjQURGO0FBQUEsTUFFRUMsaUJBRkY7QUFBQSxNQUdFQyx5QkFIRjtBQUFBLE1BSUVDLHVCQUpGO0FBQUEsTUFLRUMsc0JBTEY7QUFBQSxNQU1FQywyQkFORjtBQUFBLE1BT0VDLHNCQVBGOztBQVNBLHFCQUFPLFlBQU07QUFDWEgscUJBQWlCLENBQ2Y7QUFDRUksY0FBUTtBQUNOQyxhQUFLLFNBREM7QUFFTkMsY0FBTSxVQUZBO0FBR05DLGtCQUFVO0FBQ1JDLG1CQUFTLGFBREQ7QUFFUkMsZ0JBQU0sVUFGRTtBQUdSQyxvQkFBVSxJQUhGO0FBSVJDLG9CQUFVO0FBSkY7QUFISixPQURWO0FBV0VDLGVBQVM7QUFYWCxLQURlLENBQWpCO0FB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MkJBQVksRUFBRXBCLEtBQUtsQixRQUFQLEVBQVosRUFBK0JnQyxTQUEvQixDQUF5QzdCLGFBQXpDLEVBQXdEZ0IsTUFBeEQsQ0FBK0RjLEVBQS9ELENBQ0dNLFFBRjJCO0FBQUEsT0FBaEM7QUFHRCxLQVBEO0FBUUQsR0F2QkQ7QUF3QkQsQ0FoSUQ7QUFIQSIsImZpbGUiOiJkYXRhU2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVzY3JpYmUsIGJlZm9yZSwgYmVmb3JlRWFjaCwgYWZ0ZXJFYWNoLCBpdCB9IGZyb20gJy4vLi4vc2V0dXAnXG4vLyB1bml0XG5pbXBvcnQgZGF0YVNlcnZpY2UgZnJvbSAnLi8uLi8uLi9tYWluL3NlcnZpY2VzL2RhdGFTZXJ2aWNlJ1xuLy8gbW9ja3NcbmltcG9ydCByZWRpc09ETU1vY2ssIHsgcmVkaXNNb2RlbE9iamVjdE1vY2sgfSBmcm9tICcuLy4uL21vY2tzL2xpYi9vZG0vcmVkaXNPRE0nXG5cbmRlc2NyaWJlKCdEYXRhU2VydmljZScsICgpID0+IHtcbiAgbGV0XG4gICAgbW9ja3MsXG4gICAgcmVkaXNPRE0sXG4gICAgcmVkaXNNb2RlbE9iamVjdCxcbiAgICBzaW5nbGVEYXRhTGlzdCxcbiAgICBtdWx0aURhdGFMaXN0LFxuICAgIGV4cGVjdGVkUHJvcGVydGllcyxcbiAgICBwb3NpdGl2ZVJlcGx5XG5cbiAgYmVmb3JlKCgpID0+IHtcbiAgICBzaW5nbGVEYXRhTGlzdCA9IFtcbiAgICAgIHtcbiAgICAgICAgYXV0aG9yOiB7XG4gICAgICAgICAgdXJpOiAnc29tZVVSSScsXG4gICAgICAgICAgbmFtZTogJ3NvbWVOYW1lJyxcbiAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgY291bnRyeTogJ3NvbWVDb3VudHJ5JyxcbiAgICAgICAgICAgIGNpdHk6ICdzb21lQ2l0eScsXG4gICAgICAgICAgICBwb3N0Q29kZTogMTIzNCxcbiAgICAgICAgICAgIHJlc2lkZW50OiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhcnRpY2xlOiAnc29tZUFydGljbGUnXG4gICAgICB9XG4gICAgXVxuICAgIG11bHRpRGF0YUxpc3QgPSBbXG4gICAgICB7XG4gICAgICAgIGF1dGhvcjoge1xuICAgICAgICAgIHVyaTogJ3NvbWVVUkknLFxuICAgICAgICAgIG5hbWU6ICdzb21lTmFtZScsXG4gICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgIGNvdW50cnk6ICdzb21lQ291bnRyeScsXG4gICAgICAgICAgICBjaXR5OiAnc29tZUNpdHknLFxuICAgICAgICAgICAgcG9zdENvZGU6IDEyMzQsXG4gICAgICAgICAgICByZXNpZGVudDogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYXJ0aWNsZTogJ3NvbWVBcnRpY2xlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXV0aG9yOiB7XG4gICAgICAgICAgdXJpOiAnc29tZVVSSTInLFxuICAgICAgICAgIG5hbWU6ICdzb21lTmFtZTInLFxuICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICBjb3VudHJ5OiAnc29tZUNvdW50cnkyJyxcbiAgICAgICAgICAgIGNpdHk6ICdzb21lQ2l0eTInLFxuICAgICAgICAgICAgcG9zdENvZGU6IDEyMzQ1LFxuICAgICAgICAgICAgcmVzaWRlbnQ6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhcnRpY2xlOiAnc29tZUFydGljbGUyJ1xuICAgICAgfVxuICAgIF1cbiAgICBleHBlY3RlZFByb3BlcnRpZXMgPSBbJ3dyaXRlRGF0YSddXG4gICAgcG9zaXRpdmVSZXBseSA9ICdPSydcbiAgfSlcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICByZWRpc09ETSA9IHJlZGlzT0RNTW9jaygpXG4gICAgcmVkaXNNb2RlbE9iamVjdCA9IHJlZGlzTW9kZWxPYmplY3RNb2NrKClcbiAgfSlcblxuICBhZnRlckVhY2goKCkgPT4gbW9ja3MuZm9yRWFjaChtb2NrID0+IG1vY2sudmVyaWZ5KCkpKVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGRhdGFTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja3MgPSBbXVxuICAgIH0pXG4gICAgaXQoJ3Nob3VsZCBoYXZlIHRoZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgIGRhdGFTZXJ2aWNlKHsgb2RtOiByZWRpc09ETSB9KS5zaG91bGQuaGF2ZS5hbGwua2V5cyhleHBlY3RlZFByb3BlcnRpZXMpKVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIHdyaXRpbmcgc2luZ2xlIGRhdGEnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZWRpc09ETS5jcmVhdGUub25jZSgpLndpdGhFeGFjdEFyZ3MoXG4gICAgICAgIHsga2V5OiBzaW5nbGVEYXRhTGlzdFswXS5hdXRob3IudXJpLCBkYXRhOiBzaW5nbGVEYXRhTGlzdFswXSB9KVxuICAgICAgICAucmV0dXJucyhyZWRpc01vZGVsT2JqZWN0KVxuICAgICAgbW9ja3MgPSBbcmVkaXNPRE0uY3JlYXRlLCByZWRpc01vZGVsT2JqZWN0LnNhdmVdXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIHN1Y2Nlc3NmdWwnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHJlZGlzTW9kZWxPYmplY3Quc2F2ZS5vbmNlKCkud2l0aEV4YWN0QXJncygpXG4gICAgICAgIC5yZXR1cm5zKFByb21pc2UucmVzb2x2ZShwb3NpdGl2ZVJlcGx5KSkpXG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcHJvbWlzZScsICgpID0+XG4gICAgICAgIGRhdGFTZXJ2aWNlKHsgb2RtOiByZWRpc09ETSB9KS53cml0ZURhdGEoc2luZ2xlRGF0YUxpc3QpLnNob3VsZC5iZVxuICAgICAgICAgIC5hKCdwcm9taXNlJykpXG5cbiAgICAgIGl0KCdzaG91bGQgd3JpdGUgZGF0YSBzdWNjZXNzZnVsbHknLCAoKSA9PlxuICAgICAgICBkYXRhU2VydmljZSh7IG9kbTogcmVkaXNPRE0gfSkud3JpdGVEYXRhKHNpbmdsZURhdGFMaXN0KS5zaG91bGRcbiAgICAgICAgICAuZXZlbnR1YWxseS5lcXVhbFRvKFtwb3NpdGl2ZVJlcGx5XSkpXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGZhaWxzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc01vZGVsT2JqZWN0LnNhdmUub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxuICAgICAgICAucmV0dXJucyhQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ2VycicpKSkpXG5cbiAgICAgIGl0KCdzaG91bGQgZmFpbCB0byB3cml0ZSBkYXRhJywgKCkgPT5cbiAgICAgICAgZGF0YVNlcnZpY2UoeyBvZG06IHJlZGlzT0RNIH0pLndyaXRlRGF0YShzaW5nbGVEYXRhTGlzdCkuc2hvdWxkLmJlXG4gICAgICAgICAgLnJlamVjdGVkKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ1doZW4gd3JpdGluZyBtdWx0aXBsZSBkYXRhJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVkaXNPRE0uY3JlYXRlLmV4YWN0bHkobXVsdGlEYXRhTGlzdC5sZW5ndGgpLnJldHVybnMocmVkaXNNb2RlbE9iamVjdClcbiAgICAgIG1vY2tzID0gW3JlZGlzT0RNLmNyZWF0ZSwgcmVkaXNNb2RlbE9iamVjdC5zYXZlXVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBzdWNjZXNzZnVsJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc01vZGVsT2JqZWN0LnNhdmUuZXhhY3RseShtdWx0aURhdGFMaXN0Lmxlbmd0aClcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoKS5yZXR1cm5zKFByb21pc2UucmVzb2x2ZShwb3NpdGl2ZVJlcGx5KSkpXG5cbiAgICAgIGl0KCdzaG91bGQgd3JpdGUgZGF0YSBzdWNjZXNzZnVsbHknLCAoKSA9PlxuICAgICAgICBkYXRhU2VydmljZSh7IG9kbTogcmVkaXNPRE0gfSkud3JpdGVEYXRhKG11bHRpRGF0YUxpc3QpLnNob3VsZFxuICAgICAgICAgIC5ldmVudHVhbGx5LmVxdWFsVG8obXVsdGlEYXRhTGlzdC5tYXAoXyA9PiBwb3NpdGl2ZVJlcGx5KSkpXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGZhaWxzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc01vZGVsT2JqZWN0LnNhdmUuZXhhY3RseShtdWx0aURhdGFMaXN0Lmxlbmd0aClcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoKS5yZXR1cm5zKFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignZXJyJykpKSlcblxuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHRvIHdyaXRlIGRhdGEnLCAoKSA9PlxuICAgICAgICBkYXRhU2VydmljZSh7IG9kbTogcmVkaXNPRE0gfSkud3JpdGVEYXRhKG11bHRpRGF0YUxpc3QpLnNob3VsZC5iZVxuICAgICAgICAgIC5yZWplY3RlZClcbiAgICB9KVxuICB9KVxufSlcbiJdfQ==