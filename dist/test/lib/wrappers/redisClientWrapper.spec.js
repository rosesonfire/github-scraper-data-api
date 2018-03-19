'use strict';

var _setup = require('./../../setup');

var _redisClientWrapper6 = require('./../../../main/lib/wrappers/redisClientWrapper');

var _redisClientWrapper7 = _interopRequireDefault(_redisClientWrapper6);

var _redis = require('./../../mocks/others/redis');

var _redis2 = _interopRequireDefault(_redis);

var _redisClient = require('./../../mocks/others/redisClient');

var _jsUtils = require('./../../mocks/others/jsUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// unit

// mocks


(0, _setup.describe)('RedisClientWrapper', function () {
  var mocks = void 0,
      redis = void 0,
      utils = void 0,
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
    utils = (0, _jsUtils.utilsStub)();
    utils.createDefensivePromise.callsFake(function (f) {
      return new Promise(f);
    });
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

      return (_redisClientWrapper$s = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils }).should.have.all).keys.apply(_redisClientWrapper$s, _toConsumableArray(expectedProperties));
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

          return (_redisClientWrapper = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils })).hmset.apply(_redisClientWrapper, _toConsumableArray(hmsetArgs)).should.be.a('promise');
        });

        (0, _setup.it)('should return positive response', function () {
          var _redisClientWrapper2;

          return (_redisClientWrapper2 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils })).hmset.apply(_redisClientWrapper2, _toConsumableArray(hmsetArgs)).should.eventually.equal(positiveReply);
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

          return (_redisClientWrapper3 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils })).hmset.apply(_redisClientWrapper3, _toConsumableArray(hmsetArgs)).should.eventually.be.rejected;
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

          return (_redisClientWrapper4 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils })).hmset.apply(_redisClientWrapper4, _toConsumableArray(hmsetArgs)).should.eventually.be.rejected;
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
          return (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils }).hgetall(hgetAllArg).should.be.a('promise');
        });

        (0, _setup.it)('should return positive response', function () {
          return (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils }).hgetall(hgetAllArg).should.eventually.equal(positiveReply);
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
          return (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils }).hgetall(hgetAllArg).should.eventually.be.rejected;
        });
      });

      (0, _setup.describe)('When core redis client fails', function () {
        (0, _setup.beforeEach)(function () {
          return redisClient.hgetall.callsFake(function () {
            throw new Error('er');
          });
        });

        (0, _setup.it)('should fail', function () {
          return (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils }).hgetall(hgetAllArg).should.eventually.be.rejected;
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

        (_redisClientWrapper5 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils })).hmset.apply(_redisClientWrapper5, _toConsumableArray(hmsetArgs));
        '1'.should.equal('1');
      });
    });

    (0, _setup.describe)('When calling hgetall', function () {
      (0, _setup.beforeEach)(function () {
        mocks = [redis.createClient, redisClient.hgetall];
        redisClient.hgetall.once().withArgs(hgetAllArg);
      });

      (0, _setup.it)('should be called with proper arguments', function () {
        (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils }).hgetall(hgetAllArg);
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
      (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils }).quit();
      '1'.should.equal('1');
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXIuc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzIiwidXRpbHMiLCJyZWRpc0NsaWVudCIsImhvc3QiLCJwb3J0IiwiZXhwZWN0ZWRQcm9wZXJ0aWVzIiwiaG1zZXRBcmdzIiwiaGdldEFsbEFyZyIsInBvc2l0aXZlUmVwbHkiLCJjcmVhdGVEZWZlbnNpdmVQcm9taXNlIiwiY2FsbHNGYWtlIiwiUHJvbWlzZSIsImYiLCJmb3JFYWNoIiwibW9jayIsInZlcmlmeSIsImNyZWF0ZUNsaWVudCIsIm9uY2UiLCJ3aXRoRXhhY3RBcmdzIiwicmV0dXJucyIsInNob3VsZCIsImhhdmUiLCJhbGwiLCJrZXlzIiwiaG1zZXQiLCJvbkZpcnN0Q2FsbCIsImFyZ3MiLCJsZW5ndGgiLCJiZSIsImEiLCJldmVudHVhbGx5IiwiZXF1YWwiLCJFcnJvciIsInJlamVjdGVkIiwiaGdldGFsbCIsIndpdGhBcmdzIiwicXVpdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7O0FBRUE7Ozs7O0FBTkE7O0FBRUE7OztBQU1BLHFCQUFTLG9CQUFULEVBQStCLFlBQU07QUFDbkMsTUFDRUEsY0FERjtBQUFBLE1BRUVDLGNBRkY7QUFBQSxNQUdFQyxjQUhGO0FBQUEsTUFJRUMsb0JBSkY7QUFBQSxNQUtFQyxhQUxGO0FBQUEsTUFNRUMsYUFORjtBQUFBLE1BT0VDLDJCQVBGO0FBQUEsTUFRRUMsa0JBUkY7QUFBQSxNQVNFQyxtQkFURjtBQUFBLE1BVUVDLHNCQVZGOztBQVlBLHFCQUFPLFlBQU07QUFDWEwsV0FBTyxXQUFQO0FBQ0FDLFdBQU8sSUFBUDtBQUNBQyx5QkFBcUIsQ0FBQyxPQUFELEVBQVUsU0FBVixFQUFxQixNQUFyQixDQUFyQjtBQUNBQyxnQkFBWSxDQUFDLENBQUQsRUFBSSxJQUFKLEVBQVUsQ0FBVixFQUFhLE9BQWIsRUFBc0IsR0FB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VyxZQUFNO0FBQ2Y3QixvQkFBYyxtQ0FBZDtBQUNBSCxjQUFRLENBQUVDLE1BQU1nQixZQUFSLEVBQXNCZCxZQUFZa0MsSUFBbEMsQ0FBUjtBQUNBcEMsWUFBTWdCLFlBQU4sQ0FBbUJDLElBQW5CLEdBQTBCQyxhQUExQixDQUF3QyxFQUFFZixVQUFGLEVBQVFDLFVBQVIsRUFBeEMsRUFDR2UsT0FESCxDQUNXakIsV0FEWDtBQUVBQSxrQkFBWWtDLElBQVosQ0FBaUJuQixJQUFqQixHQUF3QmtCLFFBQXhCO0FBQ0QsS0FORDs7QUFRQSxtQkFBRyxhQUFILEVBQ0UsWUFBTTtBQUNKLHdDQUFtQixFQUFFbkMsWUFBRixFQUFTRyxVQUFULEVBQWVDLFVBQWYsRUFBcUJILFlBQXJCLEVBQW5CLEVBQWlEbUMsSUFBakQ7QUFDQSxVQUFJaEIsTUFBSixDQUFXVyxLQUFYLENBQWlCLEdBQWpCO0FBQ0QsS0FKSDtBQUtELEdBZEQ7QUFlRCxDQTlKRCIsImZpbGUiOiJyZWRpc0NsaWVudFdyYXBwZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlc2NyaWJlLCBiZWZvcmUsIGJlZm9yZUVhY2gsIGFmdGVyRWFjaCwgaXQgfSBmcm9tICcuLy4uLy4uL3NldHVwJ1xuLy8gdW5pdFxuaW1wb3J0IHJlZGlzQ2xpZW50V3JhcHBlciBmcm9tICcuLy4uLy4uLy4uL21haW4vbGliL3dyYXBwZXJzL3JlZGlzQ2xpZW50V3JhcHBlcidcbi8vIG1vY2tzXG5pbXBvcnQgcmVkaXNNb2NrIGZyb20gJy4vLi4vLi4vbW9ja3Mvb3RoZXJzL3JlZGlzJ1xuaW1wb3J0IHsgcmVkaXNDbGllbnRNb2NrLCByZWRpc0NsaWVudFN0dWIgfVxuICBmcm9tICcuLy4uLy4uL21vY2tzL290aGVycy9yZWRpc0NsaWVudCdcbmltcG9ydCB7IHV0aWxzU3R1YiB9IGZyb20gJy4vLi4vLi4vbW9ja3Mvb3RoZXJzL2pzVXRpbHMnXG5cbmRlc2NyaWJlKCdSZWRpc0NsaWVudFdyYXBwZXInLCAoKSA9PiB7XG4gIGxldFxuICAgIG1vY2tzLFxuICAgIHJlZGlzLFxuICAgIHV0aWxzLFxuICAgIHJlZGlzQ2xpZW50LFxuICAgIGhvc3QsXG4gICAgcG9ydCxcbiAgICBleHBlY3RlZFByb3BlcnRpZXMsXG4gICAgaG1zZXRBcmdzLFxuICAgIGhnZXRBbGxBcmcsXG4gICAgcG9zaXRpdmVSZXBseVxuXG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgaG9zdCA9ICdsb2NhbGhvc3QnXG4gICAgcG9ydCA9IDEyMzRcbiAgICBleHBlY3RlZFByb3BlcnRpZXMgPSBbJ2htc2V0JywgJ2hnZXRhbGwnLCAncXVpdCddXG4gICAgaG1zZXRBcmdzID0gWzEsICdpZCcsIDEsICd2YWx1ZScsICcxJ11cbiAgICBoZ2V0QWxsQXJnID0gMVxuICAgIHBvc2l0aXZlUmVwbHkgPSAnT0snXG4gIH0pXG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcmVkaXMgPSByZWRpc01vY2soKVxuICAgIHV0aWxzID0gdXRpbHNTdHViKClcbiAgICB1dGlscy5jcmVhdGVEZWZlbnNpdmVQcm9taXNlLmNhbGxzRmFrZShmID0+IG5ldyBQcm9taXNlKGYpKVxuICB9KVxuXG4gIGFmdGVyRWFjaCgoKSA9PiBtb2Nrcy5mb3JFYWNoKG1vY2sgPT4gbW9jay52ZXJpZnkoKSkpXG5cbiAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgcmVkaXNDbGllbnRXcmFwcGVyJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVkaXNDbGllbnQgPSByZWRpc0NsaWVudFN0dWIoKVxuICAgICAgbW9ja3MgPSBbIHJlZGlzLmNyZWF0ZUNsaWVudCBdXG4gICAgICByZWRpcy5jcmVhdGVDbGllbnQub25jZSgpLndpdGhFeGFjdEFyZ3MoeyBob3N0LCBwb3J0IH0pXG4gICAgICAgIC5yZXR1cm5zKHJlZGlzQ2xpZW50KVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuc2hvdWxkLmhhdmUuYWxsXG4gICAgICAgIC5rZXlzKC4uLmV4cGVjdGVkUHJvcGVydGllcykpXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjYWxsaW5nIGhtc2V0IGluIHJlZGlzQ2xpZW50V3JhcHBlcicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdXaGVuIHN1Y2Nlc3NmdWwnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4gcmVkaXNDbGllbnQuaG1zZXQub25GaXJzdENhbGwoKVxuICAgICAgICAgIC5jYWxsc0Zha2UoKC4uLmFyZ3MpID0+IGFyZ3NbYXJncy5sZW5ndGggLSAxXShudWxsLCBwb3NpdGl2ZVJlcGx5KSkpXG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYSBwcm9taXNlJywgKCkgPT5cbiAgICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuaG1zZXQoLi4uaG1zZXRBcmdzKVxuICAgICAgICAgICAgLnNob3VsZC5iZS5hKCdwcm9taXNlJykpXG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gcG9zaXRpdmUgcmVzcG9uc2UnLCAoKSA9PlxuICAgICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KS5obXNldCguLi5obXNldEFyZ3MpXG4gICAgICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwocG9zaXRpdmVSZXBseSkpXG4gICAgICB9KVxuXG4gICAgICBkZXNjcmliZSgnV2hlbiBjb3JlIHJlZGlzIGNsaWVudCByZXR1cm5zIGVycm9yJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHJlZGlzQ2xpZW50Lmhtc2V0XG4gICAgICAgICAgLmNhbGxzRmFrZSgoLi4uYXJncykgPT4gYXJnc1thcmdzLmxlbmd0aCAtIDFdKG5ldyBFcnJvcignZXInKSwgbnVsbCkpKVxuXG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCcsICgpID0+XG4gICAgICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQsIHV0aWxzIH0pLmhtc2V0KC4uLmhtc2V0QXJncylcbiAgICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZClcbiAgICAgIH0pXG5cbiAgICAgIGRlc2NyaWJlKCdXaGVuIGNvcmUgcmVkaXMgY2xpZW50IGZhaWxzJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHJlZGlzQ2xpZW50Lmhtc2V0XG4gICAgICAgICAgLmNhbGxzRmFrZSgoLi4uYXJncykgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ2VyJykgfSkpXG5cbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT5cbiAgICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuaG1zZXQoLi4uaG1zZXRBcmdzKVxuICAgICAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY2FsbGluZyBoZ2V0YWxsIGluIHJlZGlzQ2xpZW50V3JhcHBlcicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdXaGVuIHN1Y2Nlc3NmdWwnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4gcmVkaXNDbGllbnQuaGdldGFsbC5vbkZpcnN0Q2FsbCgpXG4gICAgICAgICAgLmNhbGxzRmFrZSgoLi4uYXJncykgPT4gYXJnc1thcmdzLmxlbmd0aCAtIDFdKG51bGwsIHBvc2l0aXZlUmVwbHkpKSlcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhIHByb21pc2UnLCAoKSA9PlxuICAgICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KS5oZ2V0YWxsKGhnZXRBbGxBcmcpXG4gICAgICAgICAgICAuc2hvdWxkLmJlLmEoJ3Byb21pc2UnKSlcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBwb3NpdGl2ZSByZXNwb25zZScsICgpID0+XG4gICAgICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQsIHV0aWxzIH0pLmhnZXRhbGwoaGdldEFsbEFyZylcbiAgICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5lcXVhbChwb3NpdGl2ZVJlcGx5KSlcbiAgICAgIH0pXG5cbiAgICAgIGRlc2NyaWJlKCdXaGVuIGNvcmUgcmVkaXMgY2xpZW50IHJldHVybnMgZXJyb3InLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4gcmVkaXNDbGllbnQuaGdldGFsbFxuICAgICAgICAgIC5jYWxsc0Zha2UoKC4uLmFyZ3MpID0+IGFyZ3NbYXJncy5sZW5ndGggLSAxXShuZXcgRXJyb3IoJ2VyJyksIG51bGwpKSlcblxuICAgICAgICBpdCgnc2hvdWxkIGZhaWwnLCAoKSA9PlxuICAgICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KS5oZ2V0YWxsKGhnZXRBbGxBcmcpXG4gICAgICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQpXG4gICAgICB9KVxuXG4gICAgICBkZXNjcmliZSgnV2hlbiBjb3JlIHJlZGlzIGNsaWVudCBmYWlscycsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc0NsaWVudC5oZ2V0YWxsXG4gICAgICAgICAgLmNhbGxzRmFrZSgoLi4uYXJncykgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ2VyJykgfSkpXG5cbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT5cbiAgICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuaGdldGFsbChoZ2V0QWxsQXJnKVxuICAgICAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkKVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNhbGxpbmcgb3BlcmF0aW9ucyBpbiByZWRpc0NsaWVudFdyYXBwZXInLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZWRpc0NsaWVudCA9IHJlZGlzQ2xpZW50TW9jaygpXG4gICAgICByZWRpcy5jcmVhdGVDbGllbnQub25jZSgpLndpdGhFeGFjdEFyZ3MoeyBob3N0LCBwb3J0IH0pXG4gICAgICAgIC5yZXR1cm5zKHJlZGlzQ2xpZW50KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjYWxsaW5nIGhtc2V0JywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tzID0gWyByZWRpcy5jcmVhdGVDbGllbnQsIHJlZGlzQ2xpZW50Lmhtc2V0IF1cbiAgICAgICAgcmVkaXNDbGllbnQuaG1zZXQub25jZSgpLndpdGhBcmdzKC4uLmhtc2V0QXJncylcbiAgICAgIH0pXG5cbiAgICAgIGl0KCdzaG91bGQgYmUgY2FsbGVkIHdpdGggcHJvcGVyIGFyZ3VtZW50cycsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuaG1zZXQoLi4uaG1zZXRBcmdzKVxuICAgICAgICAgICcxJy5zaG91bGQuZXF1YWwoJzEnKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjYWxsaW5nIGhnZXRhbGwnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja3MgPSBbIHJlZGlzLmNyZWF0ZUNsaWVudCwgcmVkaXNDbGllbnQuaGdldGFsbCBdXG4gICAgICAgIHJlZGlzQ2xpZW50LmhnZXRhbGwub25jZSgpLndpdGhBcmdzKGhnZXRBbGxBcmcpXG4gICAgICB9KVxuXG4gICAgICBpdCgnc2hvdWxkIGJlIGNhbGxlZCB3aXRoIHByb3BlciBhcmd1bWVudHMnLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQsIHV0aWxzIH0pLmhnZXRhbGwoaGdldEFsbEFyZylcbiAgICAgICAgICAnMScuc2hvdWxkLmVxdWFsKCcxJylcbiAgICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNhbGxpbmcgcXVpdCBpbiByZWRpc0NsaWVudFdyYXBwZXInLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZWRpc0NsaWVudCA9IHJlZGlzQ2xpZW50TW9jaygpXG4gICAgICBtb2NrcyA9IFsgcmVkaXMuY3JlYXRlQ2xpZW50LCByZWRpc0NsaWVudC5xdWl0IF1cbiAgICAgIHJlZGlzLmNyZWF0ZUNsaWVudC5vbmNlKCkud2l0aEV4YWN0QXJncyh7IGhvc3QsIHBvcnQgfSlcbiAgICAgICAgLnJldHVybnMocmVkaXNDbGllbnQpXG4gICAgICByZWRpc0NsaWVudC5xdWl0Lm9uY2UoKS53aXRoQXJncygpXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgcXVpdCcsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KS5xdWl0KClcbiAgICAgICAgJzEnLnNob3VsZC5lcXVhbCgnMScpXG4gICAgICB9KVxuICB9KVxufSlcbiJdfQ==