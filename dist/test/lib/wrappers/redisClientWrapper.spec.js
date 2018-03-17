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


(0, _setup.describe)('RedisWrapper', function () {
  var mocks = void 0,
      redis = void 0,
      utils = void 0,
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

  (0, _setup.describe)('When creating redisWrapper', function () {
    (0, _setup.beforeEach)(function () {
      redisClient = (0, _redisClient.redisClientStub)();
      mocks = [redis.createClient];
      redis.createClient.once().withExactArgs({ host: host, port: port }).returns(redisClient);
    });

    (0, _setup.it)('should have expected properties', function () {
      var _redisClientWrapper$s;

      return (_redisClientWrapper$s = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils }).should.have.all).keys.apply(_redisClientWrapper$s, _toConsumableArray(expectedProperties));
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

      (_redisClientWrapper5 = (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils })).hmset.apply(_redisClientWrapper5, _toConsumableArray(hmsetArgs));
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
      (0, _redisClientWrapper7.default)({ redis: redis, host: host, port: port, utils: utils }).quit();
      '1'.should.equal('1');
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXIuc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzIiwidXRpbHMiLCJyZWRpc0NsaWVudCIsImhvc3QiLCJwb3J0IiwiZXhwZWN0ZWRQcm9wZXJ0aWVzIiwiaG1zZXRBcmdzIiwicG9zaXRpdmVSZXBseSIsImNyZWF0ZURlZmVuc2l2ZVByb21pc2UiLCJjYWxsc0Zha2UiLCJQcm9taXNlIiwiZiIsImZvckVhY2giLCJtb2NrIiwidmVyaWZ5IiwiY3JlYXRlQ2xpZW50Iiwib25jZSIsIndpdGhFeGFjdEFyZ3MiLCJyZXR1cm5zIiwic2hvdWxkIiwiaGF2ZSIsImFsbCIsImtleXMiLCJobXNldCIsIm9uRmlyc3RDYWxsIiwiYXJncyIsImxlbmd0aCIsImJlIiwiYSIsImV2ZW50dWFsbHkiLCJlcXVhbCIsIkVycm9yIiwicmVqZWN0ZWQiLCJ3aXRoQXJncyIsInF1aXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOztBQUVBOzs7OztBQU5BOztBQUVBOzs7QUFNQSxxQkFBUyxjQUFULEVBQXlCLFlBQU07QUFDN0IsTUFDRUEsY0FERjtBQUFBLE1BRUVDLGNBRkY7QUFBQSxNQUdFQyxjQUhGO0FBQUEsTUFJRUMsb0JBSkY7QUFBQSxNQUtFQyxhQUxGO0FBQUEsTUFNRUMsYUFORjtBQUFBLE1BT0VDLDJCQVBGO0FBQUEsTUFRRUMsa0JBUkY7QUFBQSxNQVNFQyxzQkFURjs7QUFXQSxxQkFBTyxZQUFNO0FBQ1hKLFdBQU8sV0FBUDtBQUNBQyxXQUFPLElBQVA7QUFDQUMseUJBQXFCLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBckI7QUFDQUMsZ0JBQVksQ0FBQyxDQUFELEVBQUksSUFBSixFQUFVLENBQVYsRUFBYSxPQUFiLEVBQXNCLEdBQXRCLENBQVo7QUFDQUMsb0JBQWdCLElBQWhCO0FBQ0QsR0FORDs7QUFRQSx5QkFBVyxZQUFNO0FBQ2ZQLFlBQVEsc0JBQVI7QUFDQUMsWUFBUSx5QkFBUjtBQUNBQSxVQUFNTyxzQkFBTixDQUE2QkMsU0FBN0IsQ0FBdUM7QUFBQSxhQUFLLElBQUlDLE9BQUosQ0FBWUMsQ0FBWixDQUFMO0FBQUEsS0FBdkM7QUFDRCxHQUpEOztBQU1BLHdCQUFVO0FBQUEsV0FBTVosTUFBTWEsT0FBTixDQUFjO0FBQUEsYUFBUUMsS0FBS0MsTUFBTCxFQUFSO0FBQUEsS0FBZCxDQUFOO0FBQUEsR0FBVjs7QUFFQSx1QkFBUyw0QkFBVCxFQUF1QyxZQUFNO0FBQzNDLDJCQUFXLFlBQU07QUFDZlosb0JBQWMsbUNBQWQ7QUFDQUgsY0FBUSxDQUFFQyxNQUFNZSxZQUFSLENBQVI7QUFDQWYsWUFBTWUsWUFBTixDQUFtQkMsSUFBbkIsR0FBMEJDLGFBQTFCLENBQXdDLEVBQUVkLFVBQUYsRUFBUUMsVUFBUixFQUF4QyxFQUNHYyxPQURILENBQ1doQixXQURYO0FBRUQsS0FMRDs7QUFPQSxtQkFBRyxpQ0FBSCxFQUFzQztBQUFBOztBQUFBLGFBQ3BDLDJEQUFtQixFQUFFRixZQUFGLEVBQVNHLFVBQVQsRUFBZUMsVUFBZixFQUFxQkgsWUFBckIsRUFBbkIsRUFBaURrQixNQUFqRCxDQUF3REMsSUFBeEQsQ0FBNkRDLEdBQTdELEVBQ0dDLElBREgsaURBQ1dqQixrQkFEWCxFQURvQztBQUFBLEtBQXRDOztBQUlBLHlCQUFTLG9DQUFULEVBQStDLFlBQU07QUFDbkQsMkJBQVMsaUJBQVQsRUFBNEIsWUFBTTtBQUNoQywrQkFBVztBQUFBLGlCQUFNSCxZQUFZcUIsS0FBWixDQUFrQkMsV0FBbEIsR0FDZGYsU0FEYyxDQUNKO0FBQUEsOENBQUlnQixJQUFKO0FBQUlBLGtCQUFKO0FBQUE7O0FBQUEsbUJBQWFBLEtBQUtBLEtBQUtDLE1BQUwsR0FBYyxDQUFuQixFQUFzQixJQUF0QixFQUE0Qm5CLGFBQTVCLENBQWI7QUFBQSxXQURJLENBQU47QUFBQSxTQUFYOztBQUdBLHVCQUFHLHlCQUFILEVBQThCO0FBQUE7O0FBQUEsaUJBQzVCLHlEQUFtQixFQUFFUCxZQUFGLEVBQVNHLFVBQVQsRUFBZUMsVUFBZixFQUFxQkgsWUFBckIsRUFBbkIsR0FBaURzQixLQUFqRCwrQ0FBMERqQixTQUExRCxHQUNHYSxNQURILENBQ1VRLEVBRFYsQ0FDYUMsQ0FEYixDQUNlLFNBRGYsQ0FENEI7QUFBQSxTQUE5Qjs7QUFJQSx1QkFBRyxpQ0FBSCxFQUFzQztBQUFBOztBQUFBLGlCQUNwQywwREFBbUIsRUFBRTVCLFlBQUYsRUFBU0csVUFBVCxFQUFlQyxVQUFmLEVBQXFCSCxZQUFyQixFQUFuQixHQUFpRHNCLEtBQWpELGdEQUEwRGpCLFNBQTFELEdBQ0dhLE1BREgsQ0FDVVUsVUFEVixDQUNxQkMsS0FEckIsQ0FDMkJ2QixhQUQzQixDQURvQztBQUFBLFNBQXRDO0FBR0QsT0FYRDs7QUFhQSwyQkFBUyxzQ0FBVCxFQUFpRCxZQUFNO0FBQ3JELCtCQUFXO0FBQUEsaUJBQU1MLFlBQVlxQixLQUFaLENBQ2RkLFNBRGMsQ0FDSjtBQUFBLCtDQUFJZ0IsSUFBSjtBQUFJQSxrQkFBSjtBQUFBOztBQUFBLG1CQUFhQSxLQUFLQSxLQUFLQyxNQUFMLEdBQWMsQ0FBbkIsRUFBc0IsSUFBSUssS0FBSixDQUFVLElBQVYsQ0FBdEIsRUFBdUMsSUFBdkMsQ0FBYjtBQUFBLFdBREksQ0FBTjtBQUFBLFNBQVg7O0FBR0EsdUJBQUcsYUFBSCxFQUFrQjtBQUFBOztBQUFBLGlCQUNoQiwwREFBbUIsRUFBRS9CLFlBQUYsRUFBU0csVUFBVCxFQUFlQyxVQUFmLEVBQXFCSCxZQUFyQixFQUFuQixHQUFpRHNCLEtBQWpELGdEQUEwRGpCLFNBQTFELEdBQ0dhLE1BREgsQ0FDVVUsVUFEVixDQUNxQkYsRUFEckIsQ0FDd0JLLFFBRlI7QUFBQSxTQUFsQjtBQUdELE9BUEQ7O0FBU0EsMkJBQVMsOEJBQVQsRUFBeUMsWUFBTTtBQUM3QywrQkFBVztBQUFBLGlCQUFNOUIsWUFBWXFCLEtBQVosQ0FDZGQsU0FEYyxDQUNKLFlBQWE7QUFBRSxrQkFBTSxJQUFJc0IsS0FBSixDQUFVLElBQVYsQ0FBTjtBQUF1QixXQURsQyxDQUFOO0FBQUEsU0FBWDs7QUFHQSx1QkFBRyxhQUFILEVBQWtCO0FBQUE7O0FBQUEsaUJBQ2hCLDBEQUFtQixFQUFFL0IsWUFBRixFQUFTRyxVQUFULEVBQWVDLFVBQWYsRUFBcUJILFlBQXJCLEVBQW5CLEdBQWlEc0IsS0FBakQsZ0RBQTBEakIsU0FBMUQsR0FDR2EsTUFESCxDQUNVVSxVQURWLENBQ3FCRixFQURyQixDQUN3QkssUUFGUjtBQUFBLFNBQWxCO0FBR0QsT0FQRDtBQVFELEtBL0JEO0FBZ0NELEdBNUNEOztBQThDQSx1QkFBUyxvQ0FBVCxFQUErQyxZQUFNO0FBQ25ELDJCQUFXLFlBQU07QUFBQTs7QUFDZjlCLG9CQUFjLG1DQUFkO0FBQ0FILGNBQVEsQ0FBRUMsTUFBTWUsWUFBUixFQUFzQmIsWUFBWXFCLEtBQWxDLENBQVI7QUFDQXZCLFlBQU1lLFlBQU4sQ0FBbUJDLElBQW5CLEdBQTBCQyxhQUExQixDQUF3QyxFQUFFZCxVQUFGLEVBQVFDLFVBQVIsRUFBeEMsRUFDR2MsT0FESCxDQUNXaEIsV0FEWDtBQUVBLDJDQUFZcUIsS0FBWixDQUFrQlAsSUFBbEIsSUFBeUJpQixRQUF6QixpREFBcUMzQixTQUFyQztBQUNELEtBTkQ7O0FBUUEsbUJBQUcsd0NBQUgsRUFDRSxZQUFNO0FBQUE7O0FBQ0osZ0VBQW1CLEVBQUVOLFlBQUYsRUFBU0csVUFBVCxFQUFlQyxVQUFmLEVBQXFCSCxZQUFyQixFQUFuQixHQUFpRHNCLEtBQWpELGdEQUEwRGpCLFNBQTFEO0FBQ0EsVUFBSWEsTUFBSixDQUFXVyxLQUFYLENBQWlCLEdBQWpCO0FBQ0QsS0FKSDtBQUtELEdBZEQ7O0FBZ0JBLHVCQUFTLG1DQUFULEVBQThDLFlBQU07QUFDbEQsMkJBQVcsWUFBTTtBQUNmNUIsb0JBQWMsbUNBQWQ7QUFDQUgsY0FBUSxDQUFFQyxNQUFNZSxZQUFSLEVBQXNCYixZQUFZZ0MsSUFBbEMsQ0FBUjtBQUNBbEMsWUFBTWUsWUFBTixDQUFtQkMsSUFBbkIsR0FBMEJDLGFBQTFCLENBQXdDLEVBQUVkLFVBQUYsRUFBUUMsVUFBUixFQUF4QyxFQUNHYyxPQURILENBQ1doQixXQURYO0FBRUFBLGtCQUFZZ0MsSUFBWixDQUFpQmxCLElBQWpCLEdBQXdCaUIsUUFBeEI7QUFDRCxLQU5EOztBQVFBLG1CQUFHLGFBQUgsRUFDRSxZQUFNO0FBQ0osd0NBQW1CLEVBQUVqQyxZQUFGLEVBQVNHLFVBQVQsRUFBZUMsVUFBZixFQUFxQkgsWUFBckIsRUFBbkIsRUFBaURpQyxJQUFqRDtBQUNBLFVBQUlmLE1BQUosQ0FBV1csS0FBWCxDQUFpQixHQUFqQjtBQUNELEtBSkg7QUFLRCxHQWREO0FBZUQsQ0F6R0QiLCJmaWxlIjoicmVkaXNDbGllbnRXcmFwcGVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZXNjcmliZSwgYmVmb3JlLCBiZWZvcmVFYWNoLCBhZnRlckVhY2gsIGl0IH0gZnJvbSAnLi8uLi8uLi9zZXR1cCdcbi8vIHVuaXRcbmltcG9ydCByZWRpc0NsaWVudFdyYXBwZXIgZnJvbSAnLi8uLi8uLi8uLi9tYWluL2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXInXG4vLyBtb2Nrc1xuaW1wb3J0IHJlZGlzTW9jayBmcm9tICcuLy4uLy4uL21vY2tzL290aGVycy9yZWRpcydcbmltcG9ydCB7IHJlZGlzQ2xpZW50TW9jaywgcmVkaXNDbGllbnRTdHViIH1cbiAgZnJvbSAnLi8uLi8uLi9tb2Nrcy9vdGhlcnMvcmVkaXNDbGllbnQnXG5pbXBvcnQgeyB1dGlsc1N0dWIgfSBmcm9tICcuLy4uLy4uL21vY2tzL290aGVycy9qc1V0aWxzJ1xuXG5kZXNjcmliZSgnUmVkaXNXcmFwcGVyJywgKCkgPT4ge1xuICBsZXRcbiAgICBtb2NrcyxcbiAgICByZWRpcyxcbiAgICB1dGlscyxcbiAgICByZWRpc0NsaWVudCxcbiAgICBob3N0LFxuICAgIHBvcnQsXG4gICAgZXhwZWN0ZWRQcm9wZXJ0aWVzLFxuICAgIGhtc2V0QXJncyxcbiAgICBwb3NpdGl2ZVJlcGx5XG5cbiAgYmVmb3JlKCgpID0+IHtcbiAgICBob3N0ID0gJ2xvY2FsaG9zdCdcbiAgICBwb3J0ID0gMTIzNFxuICAgIGV4cGVjdGVkUHJvcGVydGllcyA9IFsnaG1zZXQnLCAncXVpdCddXG4gICAgaG1zZXRBcmdzID0gWzEsICdpZCcsIDEsICd2YWx1ZScsICcxJ11cbiAgICBwb3NpdGl2ZVJlcGx5ID0gJ09LJ1xuICB9KVxuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHJlZGlzID0gcmVkaXNNb2NrKClcbiAgICB1dGlscyA9IHV0aWxzU3R1YigpXG4gICAgdXRpbHMuY3JlYXRlRGVmZW5zaXZlUHJvbWlzZS5jYWxsc0Zha2UoZiA9PiBuZXcgUHJvbWlzZShmKSlcbiAgfSlcblxuICBhZnRlckVhY2goKCkgPT4gbW9ja3MuZm9yRWFjaChtb2NrID0+IG1vY2sudmVyaWZ5KCkpKVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIHJlZGlzV3JhcHBlcicsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHJlZGlzQ2xpZW50ID0gcmVkaXNDbGllbnRTdHViKClcbiAgICAgIG1vY2tzID0gWyByZWRpcy5jcmVhdGVDbGllbnQgXVxuICAgICAgcmVkaXMuY3JlYXRlQ2xpZW50Lm9uY2UoKS53aXRoRXhhY3RBcmdzKHsgaG9zdCwgcG9ydCB9KVxuICAgICAgICAucmV0dXJucyhyZWRpc0NsaWVudClcbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGV4cGVjdGVkIHByb3BlcnRpZXMnLCAoKSA9PlxuICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQsIHV0aWxzIH0pLnNob3VsZC5oYXZlLmFsbFxuICAgICAgICAua2V5cyguLi5leHBlY3RlZFByb3BlcnRpZXMpKVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY2FsbGluZyBobXNldCBpbiByZWRpc1dyYXBwZXInLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnV2hlbiBzdWNjZXNzZnVsJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHJlZGlzQ2xpZW50Lmhtc2V0Lm9uRmlyc3RDYWxsKClcbiAgICAgICAgICAuY2FsbHNGYWtlKCguLi5hcmdzKSA9PiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0obnVsbCwgcG9zaXRpdmVSZXBseSkpKVxuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcHJvbWlzZScsICgpID0+XG4gICAgICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQsIHV0aWxzIH0pLmhtc2V0KC4uLmhtc2V0QXJncylcbiAgICAgICAgICAgIC5zaG91bGQuYmUuYSgncHJvbWlzZScpKVxuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHBvc2l0aXZlIHJlc3BvbnNlJywgKCkgPT5cbiAgICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuaG1zZXQoLi4uaG1zZXRBcmdzKVxuICAgICAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKHBvc2l0aXZlUmVwbHkpKVxuICAgICAgfSlcblxuICAgICAgZGVzY3JpYmUoJ1doZW4gY29yZSByZWRpcyBjbGllbnQgcmV0dXJucyBlcnJvcicsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc0NsaWVudC5obXNldFxuICAgICAgICAgIC5jYWxsc0Zha2UoKC4uLmFyZ3MpID0+IGFyZ3NbYXJncy5sZW5ndGggLSAxXShuZXcgRXJyb3IoJ2VyJyksIG51bGwpKSlcblxuICAgICAgICBpdCgnc2hvdWxkIGZhaWwnLCAoKSA9PlxuICAgICAgICAgIHJlZGlzQ2xpZW50V3JhcHBlcih7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KS5obXNldCguLi5obXNldEFyZ3MpXG4gICAgICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQpXG4gICAgICB9KVxuXG4gICAgICBkZXNjcmliZSgnV2hlbiBjb3JlIHJlZGlzIGNsaWVudCBmYWlscycsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiByZWRpc0NsaWVudC5obXNldFxuICAgICAgICAgIC5jYWxsc0Zha2UoKC4uLmFyZ3MpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdlcicpIH0pKVxuXG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCcsICgpID0+XG4gICAgICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQsIHV0aWxzIH0pLmhtc2V0KC4uLmhtc2V0QXJncylcbiAgICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZClcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiBjYWxsaW5nIGhtc2V0IGluIHJlZGlzV3JhcHBlcicsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHJlZGlzQ2xpZW50ID0gcmVkaXNDbGllbnRNb2NrKClcbiAgICAgIG1vY2tzID0gWyByZWRpcy5jcmVhdGVDbGllbnQsIHJlZGlzQ2xpZW50Lmhtc2V0IF1cbiAgICAgIHJlZGlzLmNyZWF0ZUNsaWVudC5vbmNlKCkud2l0aEV4YWN0QXJncyh7IGhvc3QsIHBvcnQgfSlcbiAgICAgICAgLnJldHVybnMocmVkaXNDbGllbnQpXG4gICAgICByZWRpc0NsaWVudC5obXNldC5vbmNlKCkud2l0aEFyZ3MoLi4uaG1zZXRBcmdzKVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGJlIGNhbGxlZCB3aXRoIHByb3BlciBhcmd1bWVudHMnLFxuICAgICAgKCkgPT4ge1xuICAgICAgICByZWRpc0NsaWVudFdyYXBwZXIoeyByZWRpcywgaG9zdCwgcG9ydCwgdXRpbHMgfSkuaG1zZXQoLi4uaG1zZXRBcmdzKVxuICAgICAgICAnMScuc2hvdWxkLmVxdWFsKCcxJylcbiAgICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ1doZW4gY2FsbGluZyBxdWl0IGluIHJlZGlzV3JhcHBlcicsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHJlZGlzQ2xpZW50ID0gcmVkaXNDbGllbnRNb2NrKClcbiAgICAgIG1vY2tzID0gWyByZWRpcy5jcmVhdGVDbGllbnQsIHJlZGlzQ2xpZW50LnF1aXQgXVxuICAgICAgcmVkaXMuY3JlYXRlQ2xpZW50Lm9uY2UoKS53aXRoRXhhY3RBcmdzKHsgaG9zdCwgcG9ydCB9KVxuICAgICAgICAucmV0dXJucyhyZWRpc0NsaWVudClcbiAgICAgIHJlZGlzQ2xpZW50LnF1aXQub25jZSgpLndpdGhBcmdzKClcbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCBxdWl0JyxcbiAgICAgICgpID0+IHtcbiAgICAgICAgcmVkaXNDbGllbnRXcmFwcGVyKHsgcmVkaXMsIGhvc3QsIHBvcnQsIHV0aWxzIH0pLnF1aXQoKVxuICAgICAgICAnMScuc2hvdWxkLmVxdWFsKCcxJylcbiAgICAgIH0pXG4gIH0pXG59KVxuIl19