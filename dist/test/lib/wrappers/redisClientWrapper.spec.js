'use strict';

var _setup = require('./../../setup');

var _redisClientWrapper6 = require('./../../../main/lib/wrappers/redisClientWrapper');

var _redisClientWrapper7 = _interopRequireDefault(_redisClientWrapper6);

var _redis = require('./../../mocks/others/redis');

var _redis2 = _interopRequireDefault(_redis);

var _redisClient = require('./../../mocks/others/redisClient');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// unit

// mocks


(0, _setup.describe)('RedisWrapper', function () {
  var mocks = void 0,
      redis = void 0,
      redisClient = void 0,
      host = void 0,
      port = void 0,
      expectedProperties = void 0,
      hmsetArgs = void 0,
      positiveReply = void 0;

  (0, _setup.before)(function () {
    host = 'localhost';
    port = 1234;
    expectedProperties = ['hmset', 'quit'];
    hmsetArgs = [1, 'id', 1, 'value', '1'];
    positiveReply = 'OK';
  });

  (0, _setup.beforeEach)(function () {
    redis = (0, _redis2.default)();
  });

  (0, _setup.afterEach)(function () {
    return mocks.forEach(function (mock) {
      return mock.verify();
    });
  });

  (0, _setup.describe)('When creating redisWrapper', function () {
    (0, _setup.beforeEach)(function () {
      redisClient = (0, _redisClient.redisClientStub)();
      mocks = [redis.createClient];
      redis.createClient.once().withExactArgs({ host: host, port: port }).returns(redisClient);
    });

    (0, _setup.it)('should have expected properties', function () {
      var _redisClientWrapper$s;

      return (_redisClientWrapper$s = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port }).should.have.all).keys.apply(_redisClientWrapper$s, _toConsumableArray(expectedProperties));
    });

    (0, _setup.describe)('When calling hmset in redisWrapper', function () {
      (0, _setup.describe)('When successful', function () {
        (0, _setup.beforeEach)(function () {
          return redisClient.hmset.onFirstCall().callsFake(function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return args[args.length - 1](null, positiveReply);
          });
        });

        (0, _setup.it)('should return a promise', function () {
          var _redisClientWrapper;

          return (_redisClientWrapper = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port })).hmset.apply(_redisClientWrapper, _toConsumableArray(hmsetArgs)).should.be.a('promise');
        });

        (0, _setup.it)('should return positive response', function () {
          var _redisClientWrapper2;

          return (_redisClientWrapper2 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port })).hmset.apply(_redisClientWrapper2, _toConsumableArray(hmsetArgs)).should.eventually.equal(positiveReply);
        });
      });

      (0, _setup.describe)('When core redis client returns error', function () {
        (0, _setup.beforeEach)(function () {
          return redisClient.hmset.callsFake(function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return args[args.length - 1](new Error('er'), null);
          });
        });

        (0, _setup.it)('should fail', function () {
          var _redisClientWrapper3;

          return (_redisClientWrapper3 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port })).hmset.apply(_redisClientWrapper3, _toConsumableArray(hmsetArgs)).should.eventually.be.rejected;
        });
      });

      (0, _setup.describe)('When core redis client fails', function () {
        (0, _setup.beforeEach)(function () {
          return redisClient.hmset.callsFake(function () {
            throw new Error('er');
          });
        });

        (0, _setup.it)('should fail', function () {
          var _redisClientWrapper4;

          return (_redisClientWrapper4 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port })).hmset.apply(_redisClientWrapper4, _toConsumableArray(hmsetArgs)).should.eventually.be.rejected;
        });
      });
    });
  });

  (0, _setup.describe)('When calling hmset in redisWrapper', function () {
    (0, _setup.beforeEach)(function () {
      var _redisClient$hmset$on;

      redisClient = (0, _redisClient.redisClientMock)();
      mocks = [redis.createClient, redisClient.hmset];
      redis.createClient.once().withExactArgs({ host: host, port: port }).returns(redisClient);
      (_redisClient$hmset$on = redisClient.hmset.once()).withArgs.apply(_redisClient$hmset$on, _toConsumableArray(hmsetArgs));
    });

    (0, _setup.it)('should be called with proper arguments', function () {
      var _redisClientWrapper5;

      (_redisClientWrapper5 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port })).hmset.apply(_redisClientWrapper5, _toConsumableArray(hmsetArgs));
      '1'.should.equal('1');
    });
  });

  (0, _setup.describe)('When calling quit in redisWrapper', function () {
    (0, _setup.beforeEach)(function () {
      redisClient = (0, _redisClient.redisClientMock)();
      mocks = [redis.createClient, redisClient.quit];
      redis.createClient.once().withExactArgs({ host: host, port: port }).returns(redisClient);
      redisClient.quit.once().withArgs();
    });

    (0, _setup.it)('should quit', function () {
      (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port }).quit();
      '1'.should.equal('1');
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXIuc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzIiwicmVkaXNDbGllbnQiLCJob3N0IiwicG9ydCIsImV4cGVjdGVkUHJvcGVydGllcyIsImhtc2V0QXJncyIsInBvc2l0aXZlUmVwbHkiLCJmb3JFYWNoIiwibW9jayIsInZlcmlmeSIsImNyZWF0ZUNsaWVudCIsIm9uY2UiLCJ3aXRoRXhhY3RBcmdzIiwicmV0dXJucyIsInNob3VsZCIsImhhdmUiLCJhbGwiLCJrZXlzIiwiaG1zZXQiLCJvbkZpcnN0Q2FsbCIsImNhbGxzRmFrZSIsImFyZ3MiLCJsZW5ndGgiLCJiZSIsImEiLCJldmVudHVhbGx5IiwiZXF1YWwiLCJFcnJvciIsInJlamVjdGVkIiwid2l0aEFyZ3MiLCJxdWl0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7QUFKQTs7QUFFQTs7O0FBS0EscUJBQVMsY0FBVCxFQUF5QixZQUFNO0FBQzdCLE1BQ0VBLGNBREY7QUFBQSxNQUVFQyxjQUZGO0FBQUEsTUFHRUMsb0JBSEY7QUFBQSxNQUlFQyxhQUpGO0FBQUEsTUFLRUMsYUFMRjtBQUFBLE1BTUVDLDJCQU5GO0FBQUEsTUFPRUMsa0JBUEY7QUFBQSxNQVFFQyxzQkFSRjs7QUFVQSxxQkFBTyxZQUFNO0FBQ1hKLFdBQU8sV0FBUDtBQUNBQyxXQUFPLElBQVA7QUFDQUMseUJBQXFCLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBckI7QUFDQUMsZ0JBQVksQ0FBQyxDQUFELEVBQUksSUFBSixFQUFVLENBQVYsRUFBYSxPQUFiLEVBQXNCLEdBQXRCLENBQVo7QUFDQUMsb0JBQWdCLElBQWhCO0FBQ0QsR0FORDs7QUFRQSx5QkFBVyxZQUFNO0FBQ2ZOLFlBQVEsc0JBQVI7QUFDRCxHQUZEOztBQUlBLHdCQUFVO0FBQUEsV0FBTUQsTUFBTVEsT0FBTixDQUFjO0FB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QUFLRCxHQWREO0FBZUQsQ0F0R0QiLCJmaWxlIjoicmVkaXNDbGllbnRXcmFwcGVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZXNjcmliZSwgYmVmb3JlLCBiZWZvcmVFYWNoLCBhZnRlckVhY2gsIGl0IH0gZnJvbSAnLi8uLi8uLi9zZXR1cCdcbi8vIHVuaXRcbmltcG9ydCByZWRpc0NsaWVudFdyYXBwZXIgZnJvbSAnLi8uLi8uLi8uLi9tYWluL2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXInXG4vLyBtb2Nrc1xuaW1wb3J0IHJlZGlzTW9jayBmcm9tICcuLy4uLy4uL21vY2tzL290aGVycy9yZWRpcydcbmltcG9ydCB7IHJlZGlzQ2xpZW50TW9jaywgcmVkaXNDbGllbnRTdHViIH1cbiAgZnJvbSAnLi8uLi8uLi9tb2Nrcy9vdGhlcnMvcmVkaXNDbGllbnQnXG5cbmRlc2NyaWJlKCdSZWRpc1dyYXBwZXInLCAoKSA9PiB7XG4gIGxldFxuICAgIG1vY2tzLFxuICAgIHJlZGlzLFxuICAgIHJlZGlzQ2xpZW50LFxuICAgIGhvc3QsXG4gICAgcG9ydCxcbiAgICBleHBlY3RlZFByb3BlcnRpZXMsXG4gICAgaG1zZXRBcmdzLFxuICAgIHBvc2l0aXZlUmVwbHlcblxuICBiZWZvcmUoKCkgPT4ge1xuICAgIGhvc3QgPSAnbG9jYWxob3N0J1xuICAgIHBvcnQgPSAxMjM0XG4gICAgZXhwZWN0ZWRQcm9wZXJ0aWVzID0gWydobXNldCcsICdxdWl0J11cbiAgICBobXNldEFyZ3MgPSBbMSwgJ2lkJywgMSwgJ3ZhbHVlJywgJzEnXVxuICAgIHBvc2l0aXZlUmVwbHkgPSAnT0snXG4gIH0pXG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcmVkaXMgPSByZWRpc01vY2soKVxuICB9KVxuXG4gIGFmdGVyRWFjaCgoKSA9PiBtb2Nrcy5mb3JFYWNoKG1vY2sgPT4gbW9jay52ZXJpZnkoKSkpXG5cbiAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgcmVkaXNXcmFwcGVyJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVkaXNDbGllbnQgPSByZWRpc0NsaWVudFN0dWIoKVxuICAgICAgbW9ja3MgPSBbIHJlZGlzLmNyZWF0ZUNsaWVudCBdXG4gICAgICByZWRpcy5jcmVhdGVDbGllbnQub25jZSgpLndpdGhFeGFjdEFyZ3MoeyBob3N0LCBwb3J0IH0pXG4gICAgICAgIC5yZXR1cm5zKHJlZGlzQ2xpZW50KVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCB9KS5zaG91bGQuaGF2ZS5hbGxcbiAgICAgICAgLmtleXMoLi4uZXhwZWN0ZWRQcm9wZXJ0aWVzKSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGNhbGxpbmcgaG1zZXQgaW4gcmVkaXNXcmFwcGVyJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ1doZW4gc3VjY2Vzc2Z1bCcsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc0NsaWVudC5obXNldC5vbkZpcnN0Q2FsbCgpXG4gICAgICAgICAgLmNhbGxzRmFrZSgoLi4uYXJncykgPT4gYXJnc1thcmdzLmxlbmd0aCAtIDFdKG51bGwsIHBvc2l0aXZlUmVwbHkpKSlcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhIHByb21pc2UnLCAoKSA9PlxuICAgICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0IH0pLmhtc2V0KC4uLmhtc2V0QXJncylcbiAgICAgICAgICAgIC5zaG91bGQuYmUuYSgncHJvbWlzZScpKVxuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHBvc2l0aXZlIHJlc3BvbnNlJywgKCkgPT5cbiAgICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCB9KS5obXNldCguLi5obXNldEFyZ3MpXG4gICAgICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwocG9zaXRpdmVSZXBseSkpXG4gICAgICB9KVxuXG4gICAgICBkZXNjcmliZSgnV2hlbiBjb3JlIHJlZGlzIGNsaWVudCByZXR1cm5zIGVycm9yJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHJlZGlzQ2xpZW50Lmhtc2V0XG4gICAgICAgICAgLmNhbGxzRmFrZSgoLi4uYXJncykgPT4gYXJnc1thcmdzLmxlbmd0aCAtIDFdKG5ldyBFcnJvcignZXInKSwgbnVsbCkpKVxuXG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCcsICgpID0+XG4gICAgICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQgfSkuaG1zZXQoLi4uaG1zZXRBcmdzKVxuICAgICAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkKVxuICAgICAgfSlcblxuICAgICAgZGVzY3JpYmUoJ1doZW4gY29yZSByZWRpcyBjbGllbnQgZmFpbHMnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4gcmVkaXNDbGllbnQuaG1zZXRcbiAgICAgICAgICAuY2FsbHNGYWtlKCguLi5hcmdzKSA9PiB7IHRocm93IG5ldyBFcnJvcignZXInKSB9KSlcblxuICAgICAgICBpdCgnc2hvdWxkIGZhaWwnLCAoKSA9PlxuICAgICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0IH0pLmhtc2V0KC4uLmhtc2V0QXJncylcbiAgICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZClcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBjYWxsaW5nIGhtc2V0IGluIHJlZGlzV3JhcHBlcicsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHJlZGlzQ2xpZW50ID0gcmVkaXNDbGllbnRNb2NrKClcbiAgICAgIG1vY2tzID0gWyByZWRpcy5jcmVhdGVDbGllbnQsIHJlZGlzQ2xpZW50Lmhtc2V0IF1cbiAgICAgIHJlZGlzLmNyZWF0ZUNsaWVudC5vbmNlKCkud2l0aEV4YWN0QXJncyh7IGhvc3QsIHBvcnQgfSlcbiAgICAgICAgLnJldHVybnMocmVkaXNDbGllbnQpXG4gICAgICByZWRpc0NsaWVudC5obXNldC5vbmNlKCkud2l0aEFyZ3MoLi4uaG1zZXRBcmdzKVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGJlIGNhbGxlZCB3aXRoIHByb3BlciBhcmd1bWVudHMnLFxuICAgICAgKCkgPT4ge1xuICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCB9KS5obXNldCguLi5obXNldEFyZ3MpXG4gICAgICAgICcxJy5zaG91bGQuZXF1YWwoJzEnKVxuICAgICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBjYWxsaW5nIHF1aXQgaW4gcmVkaXNXcmFwcGVyJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVkaXNDbGllbnQgPSByZWRpc0NsaWVudE1vY2soKVxuICAgICAgbW9ja3MgPSBbIHJlZGlzLmNyZWF0ZUNsaWVudCwgcmVkaXNDbGllbnQucXVpdCBdXG4gICAgICByZWRpcy5jcmVhdGVDbGllbnQub25jZSgpLndpdGhFeGFjdEFyZ3MoeyBob3N0LCBwb3J0IH0pXG4gICAgICAgIC5yZXR1cm5zKHJlZGlzQ2xpZW50KVxuICAgICAgcmVkaXNDbGllbnQucXVpdC5vbmNlKCkud2l0aEFyZ3MoKVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIHF1aXQnLFxuICAgICAgKCkgPT4ge1xuICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCB9KS5xdWl0KClcbiAgICAgICAgJzEnLnNob3VsZC5lcXVhbCgnMScpXG4gICAgICB9KVxuICB9KVxufSlcbiJdfQ==