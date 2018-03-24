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
    expectedProperties = ['writeData', 'readData'];
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

  (0, _setup.describe)('When reading data', function () {
    (0, _setup.beforeEach)(function () {
      mocks = [redisODM.get];
    });

    (0, _setup.describe)('When successful', function () {
      (0, _setup.beforeEach)(function () {
        return redisODM.get.once().withExactArgs(singleDataList[0].author.uri).returns(Promise.resolve(redisModelObject));
      });

      (0, _setup.it)('should read data successfully', function () {
        return (0, _dataService2.default)({ odm: redisODM }).readData(singleDataList[0].author.uri).should.eventually.equal(redisModelObject);
      });
    });

    (0, _setup.describe)('When fails', function () {
      (0, _setup.beforeEach)(function () {
        return redisODM.get.once().withExactArgs(singleDataList[0].author.uri).returns(Promise.reject(new Error('err')));
      });

      (0, _setup.it)('should fail to read data', function () {
        return (0, _dataService2.default)({ odm: redisODM }).readData(singleDataList[0].author.uri).should.be.rejected;
      });
    });
  });
});
// mocks
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L3NlcnZpY2VzL2RhdGFTZXJ2aWNlLnNwZWMuanMiXSwibmFtZXMiOlsibW9ja3MiLCJyZWRpc09ETSIsInJlZGlzTW9kZWxPYmplY3QiLCJzaW5nbGVEYXRhTGlzdCIsIm11bHRpRGF0YUxpc3QiLCJleHBlY3RlZFByb3BlcnRpZXMiLCJwb3NpdGl2ZVJlcGx5IiwiYXV0aG9yIiwidXJpIiwibmFtZSIsImxvY2F0aW9uIiwiY291bnRyeSIsImNpdHkiLCJwb3N0Q29kZSIsInJlc2lkZW50IiwiYXJ0aWNsZSIsImZvckVhY2giLCJtb2NrIiwidmVyaWZ5Iiwib2RtIiwic2hvdWxkIiwiaGF2ZSIsImFsbCIsImtleXMiLCJjcmVhdGUiLCJvbmNlIiwid2l0aEV4YWN0QXJncyIsImtleSIsImRhdGEiLCJyZXR1cm5zIiwic2F2ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwid3JpdGVEYXRhIiwiYmUiLCJhIiwiZXZlbnR1YWxseSIsImVxdWFsVG8iLCJyZWplY3QiLCJFcnJvciIsInJlamVjdGVkIiwiZXhhY3RseSIsImxlbmd0aCIsIm1hcCIsImdldCIsInJlYWREYXRhIiwiZXF1YWwiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7Ozs7QUFFQTs7Ozs7O0FBSEE7QUFLQSxxQkFBUyxhQUFULEVBQXdCLFlBQU07QUFDNUIsTUFDRUEsY0FERjtBQUFBLE1BRUVDLGlCQUZGO0FBQUEsTUFHRUMseUJBSEY7QUFBQSxNQUlFQyx1QkFKRjtBQUFBLE1BS0VDLHNCQUxGO0FBQUEsTUFNRUMsMkJBTkY7QUFBQSxNQU9FQyxzQkFQRjs7QUFTQSxxQkFBTyxZQUFNO0FBQ1hILHFCQUFpQixDQUNmO0FBQ0VJLGNBQVE7QUFDTkMsYUFBSyxTQURDO0FBRU5DLGNBQU0sVUFGQTtBQUdOQyxrQkFBVTtBQUNSQyxtQkFBUyxhQUREO0FBRVJDLGdCQUFNLFVBRkU7QUFHUkMsb0JBQVUsSUFIRjtBQUlSQyxvQkFBVTtBQUpGO0FBSEosT0FEVjtBQVdF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WSxFQUFFcEIsS0FBS2xCLFFBQVAsRUFBWixFQUErQjRDLFFBQS9CLENBQXdDMUMsZUFBZSxDQUFmLEVBQWtCSSxNQUFsQixDQUF5QkMsR0FBakUsRUFDR1ksTUFESCxDQUNVYyxFQURWLENBQ2FNLFFBRmdCO0FBQUEsT0FBL0I7QUFHRCxLQVJEO0FBU0QsR0F4QkQ7QUF5QkQsQ0ExSkQ7QUFIQSIsImZpbGUiOiJkYXRhU2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVzY3JpYmUsIGJlZm9yZSwgYmVmb3JlRWFjaCwgYWZ0ZXJFYWNoLCBpdCB9IGZyb20gJy4vLi4vc2V0dXAnXG4vLyB1bml0XG5pbXBvcnQgZGF0YVNlcnZpY2UgZnJvbSAnLi8uLi8uLi9tYWluL3NlcnZpY2VzL2RhdGFTZXJ2aWNlJ1xuLy8gbW9ja3NcbmltcG9ydCByZWRpc09ETU1vY2ssIHsgcmVkaXNNb2RlbE9iamVjdE1vY2sgfSBmcm9tICcuLy4uL21vY2tzL2xpYi9vZG0vcmVkaXNPRE0nXG5cbmRlc2NyaWJlKCdEYXRhU2VydmljZScsICgpID0+IHtcbiAgbGV0XG4gICAgbW9ja3MsXG4gICAgcmVkaXNPRE0sXG4gICAgcmVkaXNNb2RlbE9iamVjdCxcbiAgICBzaW5nbGVEYXRhTGlzdCxcbiAgICBtdWx0aURhdGFMaXN0LFxuICAgIGV4cGVjdGVkUHJvcGVydGllcyxcbiAgICBwb3NpdGl2ZVJlcGx5XG5cbiAgYmVmb3JlKCgpID0+IHtcbiAgICBzaW5nbGVEYXRhTGlzdCA9IFtcbiAgICAgIHtcbiAgICAgICAgYXV0aG9yOiB7XG4gICAgICAgICAgdXJpOiAnc29tZVVSSScsXG4gICAgICAgICAgbmFtZTogJ3NvbWVOYW1lJyxcbiAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgY291bnRyeTogJ3NvbWVDb3VudHJ5JyxcbiAgICAgICAgICAgIGNpdHk6ICdzb21lQ2l0eScsXG4gICAgICAgICAgICBwb3N0Q29kZTogMTIzNCxcbiAgICAgICAgICAgIHJlc2lkZW50OiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhcnRpY2xlOiAnc29tZUFydGljbGUnXG4gICAgICB9XG4gICAgXVxuICAgIG11bHRpRGF0YUxpc3QgPSBbXG4gICAgICB7XG4gICAgICAgIGF1dGhvcjoge1xuICAgICAgICAgIHVyaTogJ3NvbWVVUkknLFxuICAgICAgICAgIG5hbWU6ICdzb21lTmFtZScsXG4gICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgIGNvdW50cnk6ICdzb21lQ291bnRyeScsXG4gICAgICAgICAgICBjaXR5OiAnc29tZUNpdHknLFxuICAgICAgICAgICAgcG9zdENvZGU6IDEyMzQsXG4gICAgICAgICAgICByZXNpZGVudDogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYXJ0aWNsZTogJ3NvbWVBcnRpY2xlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXV0aG9yOiB7XG4gICAgICAgICAgdXJpOiAnc29tZVVSSTInLFxuICAgICAgICAgIG5hbWU6ICdzb21lTmFtZTInLFxuICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICBjb3VudHJ5OiAnc29tZUNvdW50cnkyJyxcbiAgICAgICAgICAgIGNpdHk6ICdzb21lQ2l0eTInLFxuICAgICAgICAgICAgcG9zdENvZGU6IDEyMzQ1LFxuICAgICAgICAgICAgcmVzaWRlbnQ6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhcnRpY2xlOiAnc29tZUFydGljbGUyJ1xuICAgICAgfVxuICAgIF1cbiAgICBleHBlY3RlZFByb3BlcnRpZXMgPSBbJ3dyaXRlRGF0YScsICdyZWFkRGF0YSddXG4gICAgcG9zaXRpdmVSZXBseSA9ICdPSydcbiAgfSlcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICByZWRpc09ETSA9IHJlZGlzT0RNTW9jaygpXG4gICAgcmVkaXNNb2RlbE9iamVjdCA9IHJlZGlzTW9kZWxPYmplY3RNb2NrKClcbiAgfSlcblxuICBhZnRlckVhY2goKCkgPT4gbW9ja3MuZm9yRWFjaChtb2NrID0+IG1vY2sudmVyaWZ5KCkpKVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGRhdGFTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja3MgPSBbXVxuICAgIH0pXG4gICAgaXQoJ3Nob3VsZCBoYXZlIHRoZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgIGRhdGFTZXJ2aWNlKHsgb2RtOiByZWRpc09ETSB9KS5zaG91bGQuaGF2ZS5hbGwua2V5cyhleHBlY3RlZFByb3BlcnRpZXMpKVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIHdyaXRpbmcgc2luZ2xlIGRhdGEnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZWRpc09ETS5jcmVhdGUub25jZSgpLndpdGhFeGFjdEFyZ3MoXG4gICAgICAgIHsga2V5OiBzaW5nbGVEYXRhTGlzdFswXS5hdXRob3IudXJpLCBkYXRhOiBzaW5nbGVEYXRhTGlzdFswXSB9KVxuICAgICAgICAucmV0dXJucyhyZWRpc01vZGVsT2JqZWN0KVxuICAgICAgbW9ja3MgPSBbcmVkaXNPRE0uY3JlYXRlLCByZWRpc01vZGVsT2JqZWN0LnNhdmVdXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIHN1Y2Nlc3NmdWwnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHJlZGlzTW9kZWxPYmplY3Quc2F2ZS5vbmNlKCkud2l0aEV4YWN0QXJncygpXG4gICAgICAgIC5yZXR1cm5zKFByb21pc2UucmVzb2x2ZShwb3NpdGl2ZVJlcGx5KSkpXG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcHJvbWlzZScsICgpID0+XG4gICAgICAgIGRhdGFTZXJ2aWNlKHsgb2RtOiByZWRpc09ETSB9KS53cml0ZURhdGEoc2luZ2xlRGF0YUxpc3QpLnNob3VsZC5iZVxuICAgICAgICAgIC5hKCdwcm9taXNlJykpXG5cbiAgICAgIGl0KCdzaG91bGQgd3JpdGUgZGF0YSBzdWNjZXNzZnVsbHknLCAoKSA9PlxuICAgICAgICBkYXRhU2VydmljZSh7IG9kbTogcmVkaXNPRE0gfSkud3JpdGVEYXRhKHNpbmdsZURhdGFMaXN0KS5zaG91bGRcbiAgICAgICAgICAuZXZlbnR1YWxseS5lcXVhbFRvKFtwb3NpdGl2ZVJlcGx5XSkpXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGZhaWxzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc01vZGVsT2JqZWN0LnNhdmUub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxuICAgICAgICAucmV0dXJucyhQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ2VycicpKSkpXG5cbiAgICAgIGl0KCdzaG91bGQgZmFpbCB0byB3cml0ZSBkYXRhJywgKCkgPT5cbiAgICAgICAgZGF0YVNlcnZpY2UoeyBvZG06IHJlZGlzT0RNIH0pLndyaXRlRGF0YShzaW5nbGVEYXRhTGlzdCkuc2hvdWxkLmJlXG4gICAgICAgICAgLnJlamVjdGVkKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ1doZW4gd3JpdGluZyBtdWx0aXBsZSBkYXRhJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVkaXNPRE0uY3JlYXRlLmV4YWN0bHkobXVsdGlEYXRhTGlzdC5sZW5ndGgpLnJldHVybnMocmVkaXNNb2RlbE9iamVjdClcbiAgICAgIG1vY2tzID0gW3JlZGlzT0RNLmNyZWF0ZSwgcmVkaXNNb2RlbE9iamVjdC5zYXZlXVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBzdWNjZXNzZnVsJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc01vZGVsT2JqZWN0LnNhdmUuZXhhY3RseShtdWx0aURhdGFMaXN0Lmxlbmd0aClcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoKS5yZXR1cm5zKFByb21pc2UucmVzb2x2ZShwb3NpdGl2ZVJlcGx5KSkpXG5cbiAgICAgIGl0KCdzaG91bGQgd3JpdGUgZGF0YSBzdWNjZXNzZnVsbHknLCAoKSA9PlxuICAgICAgICBkYXRhU2VydmljZSh7IG9kbTogcmVkaXNPRE0gfSkud3JpdGVEYXRhKG11bHRpRGF0YUxpc3QpLnNob3VsZFxuICAgICAgICAgIC5ldmVudHVhbGx5LmVxdWFsVG8obXVsdGlEYXRhTGlzdC5tYXAoXyA9PiBwb3NpdGl2ZVJlcGx5KSkpXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGZhaWxzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc01vZGVsT2JqZWN0LnNhdmUuZXhhY3RseShtdWx0aURhdGFMaXN0Lmxlbmd0aClcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoKS5yZXR1cm5zKFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignZXJyJykpKSlcblxuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHRvIHdyaXRlIGRhdGEnLCAoKSA9PlxuICAgICAgICBkYXRhU2VydmljZSh7IG9kbTogcmVkaXNPRE0gfSkud3JpdGVEYXRhKG11bHRpRGF0YUxpc3QpLnNob3VsZC5iZVxuICAgICAgICAgIC5yZWplY3RlZClcbiAgICB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIHJlYWRpbmcgZGF0YScsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tzID0gW3JlZGlzT0RNLmdldF1cbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gc3VjY2Vzc2Z1bCcsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4gcmVkaXNPRE0uZ2V0Lm9uY2UoKVxuICAgICAgICAud2l0aEV4YWN0QXJncyhzaW5nbGVEYXRhTGlzdFswXS5hdXRob3IudXJpKVxuICAgICAgICAucmV0dXJucyhQcm9taXNlLnJlc29sdmUocmVkaXNNb2RlbE9iamVjdCkpKVxuXG4gICAgICBpdCgnc2hvdWxkIHJlYWQgZGF0YSBzdWNjZXNzZnVsbHknLCAoKSA9PlxuICAgICAgICBkYXRhU2VydmljZSh7IG9kbTogcmVkaXNPRE0gfSkucmVhZERhdGEoc2luZ2xlRGF0YUxpc3RbMF0uYXV0aG9yLnVyaSlcbiAgICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwocmVkaXNNb2RlbE9iamVjdCkpXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGZhaWxzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc09ETS5nZXQub25jZSgpXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKHNpbmdsZURhdGFMaXN0WzBdLmF1dGhvci51cmkpXG4gICAgICAgIC5yZXR1cm5zKFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignZXJyJykpKSlcblxuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHRvIHJlYWQgZGF0YScsICgpID0+XG4gICAgICAgIGRhdGFTZXJ2aWNlKHsgb2RtOiByZWRpc09ETSB9KS5yZWFkRGF0YShzaW5nbGVEYXRhTGlzdFswXS5hdXRob3IudXJpKVxuICAgICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWQpXG4gICAgfSlcbiAgfSlcbn0pXG4iXX0=