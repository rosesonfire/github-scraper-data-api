'use strict';

var _setup = require('./setup');

var _utils = require('./../main/utils');

var _plainOldStubObject = require('./mocks/others/plainOldStubObject');

var _plainOldStubObject2 = _interopRequireDefault(_plainOldStubObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// unit
(0, _setup.describe)('CreateDefensivePromise', function () {
  var executorFunc = void 0,
      asyncExecutorFunc = void 0,
      resolvedResponse = void 0,
      rejectionError = void 0;

  (0, _setup.before)(function () {
    resolvedResponse = 'positive';
    rejectionError = new Error('error');
  });

  (0, _setup.beforeEach)(function () {
    executorFunc = (0, _plainOldStubObject2.default)();
    asyncExecutorFunc = (0, _plainOldStubObject2.default)();
  });

  (0, _setup.describe)('When passing sync executor', function () {
    (0, _setup.describe)('When successful', function () {
      (0, _setup.beforeEach)(function () {
        return executorFunc.callsFake(function (resolve, reject) {
          return resolve(resolvedResponse);
        });
      });

      (0, _setup.it)('should return a promise', function () {
        return (0, _utils.createDefensivePromise)(executorFunc).should.be.a('promise');
      });

      (0, _setup.it)('should return proper response', function () {
        return (0, _utils.createDefensivePromise)(executorFunc).should.eventually.equal(resolvedResponse);
      });
    });

    (0, _setup.describe)('When unsuccessful', function () {
      (0, _setup.beforeEach)(function () {
        return executorFunc.callsFake(function (resolve, reject) {
          return reject(rejectionError);
        });
      });

      (0, _setup.it)('should return proper error', function () {
        return (0, _utils.createDefensivePromise)(executorFunc).should.eventually.be.rejected.and.should.eventually.equal(rejectionError);
      });
    });

    (0, _setup.describe)('When executor fails', function () {
      (0, _setup.beforeEach)(function () {
        return executorFunc.callsFake(function (resolve, reject) {
          throw rejectionError;
        });
      });

      (0, _setup.it)('should return proper error', function () {
        return (0, _utils.createDefensivePromise)(executorFunc).should.eventually.be.rejected.and.should.eventually.equal(rejectionError);
      });
    });
  });

  (0, _setup.describe)('When passing async executor', function () {
    (0, _setup.describe)('When successful', function () {
      (0, _setup.beforeEach)(function () {
        return asyncExecutorFunc.callsFake(async function (resolve, reject) {
          return resolve(resolvedResponse);
        });
      });

      (0, _setup.it)('should return a promise', function () {
        return (0, _utils.createDefensivePromise)(asyncExecutorFunc).should.be.a('promise');
      });

      (0, _setup.it)('should return proper response', function () {
        return (0, _utils.createDefensivePromise)(asyncExecutorFunc).should.eventually.equal(resolvedResponse);
      });
    });

    (0, _setup.describe)('When unsuccessful', function () {
      (0, _setup.beforeEach)(function () {
        return asyncExecutorFunc.callsFake(async function (resolve, reject) {
          return reject(rejectionError);
        });
      });

      (0, _setup.it)('should return proper error', function () {
        return (0, _utils.createDefensivePromise)(asyncExecutorFunc).should.eventually.be.rejected.and.should.eventually.equal(rejectionError);
      });
    });

    (0, _setup.describe)('When executor fails', function () {
      (0, _setup.beforeEach)(function () {
        return asyncExecutorFunc.callsFake(async function (resolve, reject) {
          throw rejectionError;
        });
      });

      (0, _setup.it)('should return proper error', function () {
        return (0, _utils.createDefensivePromise)(asyncExecutorFunc).should.eventually.be.rejected.and.should.eventually.equal(rejectionError);
      });
    });
  });
});
// mocks
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3V0aWxzLnNwZWMuanMiXSwibmFtZXMiOlsiZXhlY3V0b3JGdW5jIiwiYXN5bmNFeGVjdXRvckZ1bmMiLCJyZXNvbHZlZFJlc3BvbnNlIiwicmVqZWN0aW9uRXJyb3IiLCJFcnJvciIsImNhbGxzRmFrZSIsInJlc29sdmUiLCJyZWplY3QiLCJzaG91bGQiLCJiZSIsImEiLCJldmVudHVhbGx5IiwiZXF1YWwiLCJyZWplY3RlZCIsImFuZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFFQTs7Ozs7O0FBSEE7QUFLQSxxQkFBUyx3QkFBVCxFQUFtQyxZQUFNO0FBQ3ZDLE1BQ0VBLHFCQURGO0FBQUEsTUFFRUMsMEJBRkY7QUFBQSxNQUdFQyx5QkFIRjtBQUFBLE1BSUVDLHVCQUpGOztBQU1BLHFCQUFPLFlBQU07QUFDWEQsdUJBQW1CLFVBQW5CO0FBQ0FDLHFCQUFpQixJQUFJQyxLQUFKLENBQVUsT0FBVixDQUFqQjtBQUNELEdBSEQ7O0FBS0EseUJBQVcsWUFBTTtBQUNmSixtQkFBZSxtQ0FBZjtBQUNBQyx3QkFBb0IsbUNBQXBCO0FBQ0QsR0FIRDs7QUFLQSx1QkFBUyw0QkFBVCxFQUF1QyxZQUFNO0FBQzNDLHlCQUFTLGlCQUFULEVBQTRCLFlBQU07QUFDaEMsNkJBQVc7QUFBQSxlQUNURCxhQUFhSyxTQUFiLENBQXVCLFVBQUNDLE9BQUQsRUFBVUMsTUFBVjtBQUFBLGlCQUFxQkQsUUFBUUosZ0JBQVIsQ0FBckI7QUFBQSxTQUF2QixDQURTO0FBQUEsT0FBWDs7QUFHQSxxQkFBRyx5QkFBSCxFQUE4QjtBQUFBLGVBQzVCLG1DQUF1QkYsWUFBdkIsRUFBcUNRLE1BQXJDLENBQTRDQyxFQUE1QyxDQUErQ0MsQ0FBL0MsQ0FBaUQsU0FBakQsQ0FENEI7QUFBQSxPQUE5Qjs7QUFHQSxxQkFBRywrQkFBSCxFQUFvQztBQUFBLGVBQ2xDLG1DQUF1QlYsWUFBdkIsRUFBcUNRLE1BQXJDLENBQTRDRyxVQUE1QyxDQUNHQyxLQURI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QUEsT0FBakM7QUFHRCxLQVREO0FBVUQsR0FsQ0Q7QUFtQ0QsQ0F0RkQ7QUFIQSIsImZpbGUiOiJ1dGlscy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVzY3JpYmUsIGJlZm9yZSwgYmVmb3JlRWFjaCwgaXQgfSBmcm9tICcuL3NldHVwJ1xuLy8gdW5pdFxuaW1wb3J0IHsgY3JlYXRlRGVmZW5zaXZlUHJvbWlzZSB9IGZyb20gJy4vLi4vbWFpbi91dGlscydcbi8vIG1vY2tzXG5pbXBvcnQgcGxhaW5PbGRTdHViT2JqZWN0IGZyb20gJy4vbW9ja3Mvb3RoZXJzL3BsYWluT2xkU3R1Yk9iamVjdCdcblxuZGVzY3JpYmUoJ0NyZWF0ZURlZmVuc2l2ZVByb21pc2UnLCAoKSA9PiB7XG4gIGxldFxuICAgIGV4ZWN1dG9yRnVuYyxcbiAgICBhc3luY0V4ZWN1dG9yRnVuYyxcbiAgICByZXNvbHZlZFJlc3BvbnNlLFxuICAgIHJlamVjdGlvbkVycm9yXG5cbiAgYmVmb3JlKCgpID0+IHtcbiAgICByZXNvbHZlZFJlc3BvbnNlID0gJ3Bvc2l0aXZlJ1xuICAgIHJlamVjdGlvbkVycm9yID0gbmV3IEVycm9yKCdlcnJvcicpXG4gIH0pXG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgZXhlY3V0b3JGdW5jID0gcGxhaW5PbGRTdHViT2JqZWN0KClcbiAgICBhc3luY0V4ZWN1dG9yRnVuYyA9IHBsYWluT2xkU3R1Yk9iamVjdCgpXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ1doZW4gcGFzc2luZyBzeW5jIGV4ZWN1dG9yJywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCdXaGVuIHN1Y2Nlc3NmdWwnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+XG4gICAgICAgIGV4ZWN1dG9yRnVuYy5jYWxsc0Zha2UoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVzb2x2ZShyZXNvbHZlZFJlc3BvbnNlKSkpXG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcHJvbWlzZScsICgpID0+XG4gICAgICAgIGNyZWF0ZURlZmVuc2l2ZVByb21pc2UoZXhlY3V0b3JGdW5jKS5zaG91bGQuYmUuYSgncHJvbWlzZScpKVxuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBwcm9wZXIgcmVzcG9uc2UnLCAoKSA9PlxuICAgICAgICBjcmVhdGVEZWZlbnNpdmVQcm9taXNlKGV4ZWN1dG9yRnVuYykuc2hvdWxkLmV2ZW50dWFsbHlcbiAgICAgICAgICAuZXF1YWwocmVzb2x2ZWRSZXNwb25zZSkpXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIHVuc3VjY2Vzc2Z1bCcsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT5cbiAgICAgICAgZXhlY3V0b3JGdW5jLmNhbGxzRmFrZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiByZWplY3QocmVqZWN0aW9uRXJyb3IpKSlcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gcHJvcGVyIGVycm9yJywgKCkgPT5cbiAgICAgICAgY3JlYXRlRGVmZW5zaXZlUHJvbWlzZShleGVjdXRvckZ1bmMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkLmFuZFxuICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5lcXVhbChyZWplY3Rpb25FcnJvcikpXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGV4ZWN1dG9yIGZhaWxzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PlxuICAgICAgICBleGVjdXRvckZ1bmMuY2FsbHNGYWtlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICB0aHJvdyByZWplY3Rpb25FcnJvclxuICAgICAgICB9KSlcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gcHJvcGVyIGVycm9yJywgKCkgPT5cbiAgICAgICAgY3JlYXRlRGVmZW5zaXZlUHJvbWlzZShleGVjdXRvckZ1bmMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkLmFuZFxuICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5lcXVhbChyZWplY3Rpb25FcnJvcikpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBwYXNzaW5nIGFzeW5jIGV4ZWN1dG9yJywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCdXaGVuIHN1Y2Nlc3NmdWwnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+XG4gICAgICAgIGFzeW5jRXhlY3V0b3JGdW5jLmNhbGxzRmFrZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgICAgIHJlc29sdmUocmVzb2x2ZWRSZXNwb25zZSkpKVxuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBhIHByb21pc2UnLCAoKSA9PlxuICAgICAgICBjcmVhdGVEZWZlbnNpdmVQcm9taXNlKGFzeW5jRXhlY3V0b3JGdW5jKS5zaG91bGQuYmUuYSgncHJvbWlzZScpKVxuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBwcm9wZXIgcmVzcG9uc2UnLCAoKSA9PlxuICAgICAgICBjcmVhdGVEZWZlbnNpdmVQcm9taXNlKGFzeW5jRXhlY3V0b3JGdW5jKS5zaG91bGQuZXZlbnR1YWxseVxuICAgICAgICAgIC5lcXVhbChyZXNvbHZlZFJlc3BvbnNlKSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gdW5zdWNjZXNzZnVsJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PlxuICAgICAgICBhc3luY0V4ZWN1dG9yRnVuYy5jYWxsc0Zha2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgICAgICByZWplY3QocmVqZWN0aW9uRXJyb3IpKSlcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gcHJvcGVyIGVycm9yJywgKCkgPT5cbiAgICAgICAgY3JlYXRlRGVmZW5zaXZlUHJvbWlzZShhc3luY0V4ZWN1dG9yRnVuYykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRcbiAgICAgICAgICAuYW5kLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKHJlamVjdGlvbkVycm9yKSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gZXhlY3V0b3IgZmFpbHMnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+XG4gICAgICAgIGFzeW5jRXhlY3V0b3JGdW5jLmNhbGxzRmFrZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgdGhyb3cgcmVqZWN0aW9uRXJyb3JcbiAgICAgICAgfSkpXG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHByb3BlciBlcnJvcicsICgpID0+XG4gICAgICAgIGNyZWF0ZURlZmVuc2l2ZVByb21pc2UoYXN5bmNFeGVjdXRvckZ1bmMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkXG4gICAgICAgICAgLmFuZC5zaG91bGQuZXZlbnR1YWxseS5lcXVhbChyZWplY3Rpb25FcnJvcikpXG4gICAgfSlcbiAgfSlcbn0pXG4iXX0=