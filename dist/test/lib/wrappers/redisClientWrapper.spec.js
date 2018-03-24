'use strict';

var _jsUtils = require('js-utils');

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


(0, _setup.describe)('RedisClientWrapper', function () {
  var mocks = void 0,
      redis = void 0,
      redisClient = void 0,
      host = void 0,
      port = void 0,
      expectedProperties = void 0,
      hmsetArgs = void 0,
      hgetAllArg = void 0,
      positiveReply = void 0;

  (0, _setup.before)(function () {
    host = 'localhost';
    port = 1234;
    expectedProperties = ['hmset', 'hgetall', 'quit'];
    hmsetArgs = [1, 'id', 1, 'value', '1'];
    hgetAllArg = 1;
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

  (0, _setup.describe)('When creating redisClientWrapper', function () {
    (0, _setup.beforeEach)(function () {
      redisClient = (0, _redisClient.redisClientStub)();
      mocks = [redis.createClient];
      redis.createClient.once().withExactArgs({ host: host, port: port }).returns(redisClient);
    });

    (0, _setup.it)('should have expected properties', function () {
      var _redisClientWrapper$s;

      return (_redisClientWrapper$s = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils }).should.have.all).keys.apply(_redisClientWrapper$s, _toConsumableArray(expectedProperties));
    });

    (0, _setup.describe)('When calling hmset in redisClientWrapper', function () {
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

          return (_redisClientWrapper = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils })).hmset.apply(_redisClientWrapper, _toConsumableArray(hmsetArgs)).should.be.a('promise');
        });

        (0, _setup.it)('should return positive response', function () {
          var _redisClientWrapper2;

          return (_redisClientWrapper2 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils })).hmset.apply(_redisClientWrapper2, _toConsumableArray(hmsetArgs)).should.eventually.equal(positiveReply);
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

          return (_redisClientWrapper3 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils })).hmset.apply(_redisClientWrapper3, _toConsumableArray(hmsetArgs)).should.eventually.be.rejected;
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

          return (_redisClientWrapper4 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils })).hmset.apply(_redisClientWrapper4, _toConsumableArray(hmsetArgs)).should.eventually.be.rejected;
        });
      });
    });

    (0, _setup.describe)('When calling hgetall in redisClientWrapper', function () {
      (0, _setup.describe)('When successful', function () {
        (0, _setup.beforeEach)(function () {
          return redisClient.hgetall.onFirstCall().callsFake(function () {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            return args[args.length - 1](null, positiveReply);
          });
        });

        (0, _setup.it)('should return a promise', function () {
          return (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils }).hgetall(hgetAllArg).should.be.a('promise');
        });

        (0, _setup.it)('should return positive response', function () {
          return (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils }).hgetall(hgetAllArg).should.eventually.equal(positiveReply);
        });
      });

      (0, _setup.describe)('When core redis client returns error', function () {
        (0, _setup.beforeEach)(function () {
          return redisClient.hgetall.callsFake(function () {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            return args[args.length - 1](new Error('er'), null);
          });
        });

        (0, _setup.it)('should fail', function () {
          return (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils }).hgetall(hgetAllArg).should.eventually.be.rejected;
        });
      });

      (0, _setup.describe)('When core redis client fails', function () {
        (0, _setup.beforeEach)(function () {
          return redisClient.hgetall.callsFake(function () {
            throw new Error('er');
          });
        });

        (0, _setup.it)('should fail', function () {
          return (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils }).hgetall(hgetAllArg).should.eventually.be.rejected;
        });
      });
    });
  });

  (0, _setup.describe)('When calling operations in redisClientWrapper', function () {
    (0, _setup.beforeEach)(function () {
      redisClient = (0, _redisClient.redisClientMock)();
      redis.createClient.once().withExactArgs({ host: host, port: port }).returns(redisClient);
    });

    (0, _setup.describe)('When calling hmset', function () {
      (0, _setup.beforeEach)(function () {
        var _redisClient$hmset$on;

        mocks = [redis.createClient, redisClient.hmset];
        (_redisClient$hmset$on = redisClient.hmset.once()).withArgs.apply(_redisClient$hmset$on, _toConsumableArray(hmsetArgs));
      });

      (0, _setup.it)('should be called with proper arguments', function () {
        var _redisClientWrapper5;

        (_redisClientWrapper5 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils })).hmset.apply(_redisClientWrapper5, _toConsumableArray(hmsetArgs));
        '1'.should.equal('1');
      });
    });

    (0, _setup.describe)('When calling hgetall', function () {
      (0, _setup.beforeEach)(function () {
        mocks = [redis.createClient, redisClient.hgetall];
        redisClient.hgetall.once().withArgs(hgetAllArg);
      });

      (0, _setup.it)('should be called with proper arguments', function () {
        (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils }).hgetall(hgetAllArg);
        '1'.should.equal('1');
      });
    });
  });

  (0, _setup.describe)('When calling quit in redisClientWrapper', function () {
    (0, _setup.beforeEach)(function () {
      redisClient = (0, _redisClient.redisClientMock)();
      mocks = [redis.createClient, redisClient.quit];
      redis.createClient.once().withExactArgs({ host: host, port: port }).returns(redisClient);
      redisClient.quit.once().withArgs();
    });

    (0, _setup.it)('should quit', function () {
      (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: _jsUtils.utils }).quit();
      '1'.should.equal('1');
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXIuc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzIiwicmVkaXNDbGllbnQiLCJob3N0IiwicG9ydCIsImV4cGVjdGVkUHJvcGVydGllcyIsImhtc2V0QXJncyIsImhnZXRBbGxBcmciLCJwb3NpdGl2ZVJlcGx5IiwiZm9yRWFjaCIsIm1vY2siLCJ2ZXJpZnkiLCJjcmVhdGVDbGllbnQiLCJvbmNlIiwid2l0aEV4YWN0QXJncyIsInJldHVybnMiLCJ1dGlscyIsInNob3VsZCIsImhhdmUiLCJhbGwiLCJrZXlzIiwiaG1zZXQiLCJvbkZpcnN0Q2FsbCIsImNhbGxzRmFrZSIsImFyZ3MiLCJsZW5ndGgiLCJiZSIsImEiLCJldmVudHVhbGx5IiwiZXF1YWwiLCJFcnJvciIsInJlamVjdGVkIiwiaGdldGFsbCIsIndpdGhBcmdzIiwicXVpdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7O0FBSkE7O0FBRUE7OztBQUtBLHFCQUFTLG9CQUFULEVBQStCLFlBQU07QUFDbkMsTUFDRUEsY0FERjtBQUFBLE1BRUVDLGNBRkY7QUFBQSxNQUdFQyxvQkFIRjtBQUFBLE1BSUVDLGFBSkY7QUFBQSxNQUtFQyxhQUxGO0FBQUEsTUFNRUMsMkJBTkY7QUFBQSxNQU9FQyxrQkFQRjtBQUFBLE1BUUVDLG1CQVJGO0FBQUEsTUFTRUMsc0JBVEY7O0FBV0EscUJBQU8sWUFBTTtBQUNYTCxXQUFPLFdBQVA7QUFDQUMsV0FBTyxJQUFQO0FBQ0FDLHlCQUFxQixDQUFDLE9BQUQsRUFBVSxTQUFWLEVBQXFCLE1BQXJCLENBQXJCO0FBQ0FDLGdCQUFZLENBQUMsQ0FBRCxFQUFJLElBQUosRUFBVSxDQUFWLEVBQWEsT0FBYixFQUFzQixHQUF0QixDQUFaO0FBQ0FDLGlCQUFhLENBQWI7QUFDQUMsb0JBQWdCLElBQWhCO0FBQ0QsR0FQRDs7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V0FEWDtBQUVBQSxrQkFBWWdDLElBQVosQ0FBaUJyQixJQUFqQixHQUF3Qm9CLFFBQXhCO0FBQ0QsS0FORDs7QUFRQSxtQkFBRyxhQUFILEVBQ0UsWUFBTTtBQUNKLHdDQUFtQixFQUFFaEMsWUFBRixFQUFTRSxVQUFULEVBQWVDLFVBQWYsRUFBcUJZLHFCQUFyQixFQUFuQixFQUFpRGtCLElBQWpEO0FBQ0EsVUFBSWpCLE1BQUosQ0FBV1ksS0FBWCxDQUFpQixHQUFqQjtBQUNELEtBSkg7QUFLRCxHQWREO0FBZUQsQ0EzSkQiLCJmaWxlIjoicmVkaXNDbGllbnRXcmFwcGVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlscyB9IGZyb20gJ2pzLXV0aWxzJ1xuXG5pbXBvcnQgeyBkZXNjcmliZSwgYmVmb3JlLCBiZWZvcmVFYWNoLCBhZnRlckVhY2gsIGl0IH0gZnJvbSAnLi8uLi8uLi9zZXR1cCdcbi8vIHVuaXRcbmltcG9ydCByZWRpc0NsaWVudFdyYXBwZXIgZnJvbSAnLi8uLi8uLi8uLi9tYWluL2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXInXG4vLyBtb2Nrc1xuaW1wb3J0IHJlZGlzTW9jayBmcm9tICcuLy4uLy4uL21vY2tzL290aGVycy9yZWRpcydcbmltcG9ydCB7IHJlZGlzQ2xpZW50TW9jaywgcmVkaXNDbGllbnRTdHViIH1cbiAgZnJvbSAnLi8uLi8uLi9tb2Nrcy9vdGhlcnMvcmVkaXNDbGllbnQnXG5cbmRlc2NyaWJlKCdSZWRpc0NsaWVudFdyYXBwZXInLCAoKSA9PiB7XG4gIGxldFxuICAgIG1vY2tzLFxuICAgIHJlZGlzLFxuICAgIHJlZGlzQ2xpZW50LFxuICAgIGhvc3QsXG4gICAgcG9ydCxcbiAgICBleHBlY3RlZFByb3BlcnRpZXMsXG4gICAgaG1zZXRBcmdzLFxuICAgIGhnZXRBbGxBcmcsXG4gICAgcG9zaXRpdmVSZXBseVxuXG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgaG9zdCA9ICdsb2NhbGhvc3QnXG4gICAgcG9ydCA9IDEyMzRcbiAgICBleHBlY3RlZFByb3BlcnRpZXMgPSBbJ2htc2V0JywgJ2hnZXRhbGwnLCAncXVpdCddXG4gICAgaG1zZXRBcmdzID0gWzEsICdpZCcsIDEsICd2YWx1ZScsICcxJ11cbiAgICBoZ2V0QWxsQXJnID0gMVxuICAgIHBvc2l0aXZlUmVwbHkgPSAnT0snXG4gIH0pXG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcmVkaXMgPSByZWRpc01vY2soKVxuICB9KVxuXG4gIGFmdGVyRWFjaCgoKSA9PiBtb2Nrcy5mb3JFYWNoKG1vY2sgPT4gbW9jay52ZXJpZnkoKSkpXG5cbiAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgcmVkaXNDbGllbnRXcmFwcGVyJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVkaXNDbGllbnQgPSByZWRpc0NsaWVudFN0dWIoKVxuICAgICAgbW9ja3MgPSBbIHJlZGlzLmNyZWF0ZUNsaWVudCBdXG4gICAgICByZWRpcy5jcmVhdGVDbGllbnQub25jZSgpLndpdGhFeGFjdEFyZ3MoeyBob3N0LCBwb3J0IH0pXG4gICAgICAgIC5yZXR1cm5zKHJlZGlzQ2xpZW50KVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuc2hvdWxkLmhhdmUuYWxsXG4gICAgICAgIC5rZXlzKC4uLmV4cGVjdGVkUHJvcGVydGllcykpXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjYWxsaW5nIGhtc2V0IGluIHJlZGlzQ2xpZW50V3JhcHBlcicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdXaGVuIHN1Y2Nlc3NmdWwnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4gcmVkaXNDbGllbnQuaG1zZXQub25GaXJzdENhbGwoKVxuICAgICAgICAgIC5jYWxsc0Zha2UoKC4uLmFyZ3MpID0+IGFyZ3NbYXJncy5sZW5ndGggLSAxXShudWxsLCBwb3NpdGl2ZVJlcGx5KSkpXG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYSBwcm9taXNlJywgKCkgPT5cbiAgICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuaG1zZXQoLi4uaG1zZXRBcmdzKVxuICAgICAgICAgICAgLnNob3VsZC5iZS5hKCdwcm9taXNlJykpXG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gcG9zaXRpdmUgcmVzcG9uc2UnLCAoKSA9PlxuICAgICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KS5obXNldCguLi5obXNldEFyZ3MpXG4gICAgICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwocG9zaXRpdmVSZXBseSkpXG4gICAgICB9KVxuXG4gICAgICBkZXNjcmliZSgnV2hlbiBjb3JlIHJlZGlzIGNsaWVudCByZXR1cm5zIGVycm9yJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHJlZGlzQ2xpZW50Lmhtc2V0XG4gICAgICAgICAgLmNhbGxzRmFrZSgoLi4uYXJncykgPT4gYXJnc1thcmdzLmxlbmd0aCAtIDFdKG5ldyBFcnJvcignZXInKSwgbnVsbCkpKVxuXG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCcsICgpID0+XG4gICAgICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQsIHV0aWxzIH0pLmhtc2V0KC4uLmhtc2V0QXJncylcbiAgICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZClcbiAgICAgIH0pXG5cbiAgICAgIGRlc2NyaWJlKCdXaGVuIGNvcmUgcmVkaXMgY2xpZW50IGZhaWxzJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHJlZGlzQ2xpZW50Lmhtc2V0XG4gICAgICAgICAgLmNhbGxzRmFrZSgoLi4uYXJncykgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ2VyJykgfSkpXG5cbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT5cbiAgICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuaG1zZXQoLi4uaG1zZXRBcmdzKVxuICAgICAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY2FsbGluZyBoZ2V0YWxsIGluIHJlZGlzQ2xpZW50V3JhcHBlcicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdXaGVuIHN1Y2Nlc3NmdWwnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4gcmVkaXNDbGllbnQuaGdldGFsbC5vbkZpcnN0Q2FsbCgpXG4gICAgICAgICAgLmNhbGxzRmFrZSgoLi4uYXJncykgPT4gYXJnc1thcmdzLmxlbmd0aCAtIDFdKG51bGwsIHBvc2l0aXZlUmVwbHkpKSlcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhIHByb21pc2UnLCAoKSA9PlxuICAgICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KS5oZ2V0YWxsKGhnZXRBbGxBcmcpXG4gICAgICAgICAgICAuc2hvdWxkLmJlLmEoJ3Byb21pc2UnKSlcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBwb3NpdGl2ZSByZXNwb25zZScsICgpID0+XG4gICAgICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQsIHV0aWxzIH0pLmhnZXRhbGwoaGdldEFsbEFyZylcbiAgICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5lcXVhbChwb3NpdGl2ZVJlcGx5KSlcbiAgICAgIH0pXG5cbiAgICAgIGRlc2NyaWJlKCdXaGVuIGNvcmUgcmVkaXMgY2xpZW50IHJldHVybnMgZXJyb3InLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4gcmVkaXNDbGllbnQuaGdldGFsbFxuICAgICAgICAgIC5jYWxsc0Zha2UoKC4uLmFyZ3MpID0+IGFyZ3NbYXJncy5sZW5ndGggLSAxXShuZXcgRXJyb3IoJ2VyJyksIG51bGwpKSlcblxuICAgICAgICBpdCgnc2hvdWxkIGZhaWwnLCAoKSA9PlxuICAgICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KS5oZ2V0YWxsKGhnZXRBbGxBcmcpXG4gICAgICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQpXG4gICAgICB9KVxuXG4gICAgICBkZXNjcmliZSgnV2hlbiBjb3JlIHJlZGlzIGNsaWVudCBmYWlscycsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc0NsaWVudC5oZ2V0YWxsXG4gICAgICAgICAgLmNhbGxzRmFrZSgoLi4uYXJncykgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ2VyJykgfSkpXG5cbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT5cbiAgICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuaGdldGFsbChoZ2V0QWxsQXJnKVxuICAgICAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkKVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNhbGxpbmcgb3BlcmF0aW9ucyBpbiByZWRpc0NsaWVudFdyYXBwZXInLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZWRpc0NsaWVudCA9IHJlZGlzQ2xpZW50TW9jaygpXG4gICAgICByZWRpcy5jcmVhdGVDbGllbnQub25jZSgpLndpdGhFeGFjdEFyZ3MoeyBob3N0LCBwb3J0IH0pXG4gICAgICAgIC5yZXR1cm5zKHJlZGlzQ2xpZW50KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjYWxsaW5nIGhtc2V0JywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tzID0gWyByZWRpcy5jcmVhdGVDbGllbnQsIHJlZGlzQ2xpZW50Lmhtc2V0IF1cbiAgICAgICAgcmVkaXNDbGllbnQuaG1zZXQub25jZSgpLndpdGhBcmdzKC4uLmhtc2V0QXJncylcbiAgICAgIH0pXG5cbiAgICAgIGl0KCdzaG91bGQgYmUgY2FsbGVkIHdpdGggcHJvcGVyIGFyZ3VtZW50cycsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuaG1zZXQoLi4uaG1zZXRBcmdzKVxuICAgICAgICAgICcxJy5zaG91bGQuZXF1YWwoJzEnKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjYWxsaW5nIGhnZXRhbGwnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja3MgPSBbIHJlZGlzLmNyZWF0ZUNsaWVudCwgcmVkaXNDbGllbnQuaGdldGFsbCBdXG4gICAgICAgIHJlZGlzQ2xpZW50LmhnZXRhbGwub25jZSgpLndpdGhBcmdzKGhnZXRBbGxBcmcpXG4gICAgICB9KVxuXG4gICAgICBpdCgnc2hvdWxkIGJlIGNhbGxlZCB3aXRoIHByb3BlciBhcmd1bWVudHMnLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQsIHV0aWxzIH0pLmhnZXRhbGwoaGdldEFsbEFyZylcbiAgICAgICAgICAnMScuc2hvdWxkLmVxdWFsKCcxJylcbiAgICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNhbGxpbmcgcXVpdCBpbiByZWRpc0NsaWVudFdyYXBwZXInLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZWRpc0NsaWVudCA9IHJlZGlzQ2xpZW50TW9jaygpXG4gICAgICBtb2NrcyA9IFsgcmVkaXMuY3JlYXRlQ2xpZW50LCByZWRpc0NsaWVudC5xdWl0IF1cbiAgICAgIHJlZGlzLmNyZWF0ZUNsaWVudC5vbmNlKCkud2l0aEV4YWN0QXJncyh7IGhvc3QsIHBvcnQgfSlcbiAgICAgICAgLnJldHVybnMocmVkaXNDbGllbnQpXG4gICAgICByZWRpc0NsaWVudC5xdWl0Lm9uY2UoKS53aXRoQXJncygpXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgcXVpdCcsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KS5xdWl0KClcbiAgICAgICAgJzEnLnNob3VsZC5lcXVhbCgnMScpXG4gICAgICB9KVxuICB9KVxufSlcbiJdfQ==