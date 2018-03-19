'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var makeQuery = function makeQuery(utils, client) {
  return function (operation) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return utils.createDefensivePromise(function (resolve, reject) {
        client[operation].apply(client, args.concat([function (err, replies) {
          if (err) {
            reject(err);
          } else {
            resolve(replies);
          }
        }]));
      });
    };
  };
};
// Wrapper for the npm package 'redis'
// Replaces the redis client default functions with promise oriented functions

exports.default = function (_ref) {
  var redis = _ref.redis,
      host = _ref.host,
      port = _ref.port,
      utils = _ref.utils;

  var client = redis.createClient({ host: host, port: port });
  var _makeQuery = makeQuery(utils, client);

  return {
    hmset: _makeQuery('hmset'),
    hgetall: _makeQuery('hgetall'),
    quit: async function quit() {
      return client.quit();
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXIuanMiXSwibmFtZXMiOlsibWFrZVF1ZXJ5IiwidXRpbHMiLCJjbGllbnQiLCJvcGVyYXRpb24iLCJhcmdzIiwiY3JlYXRlRGVmZW5zaXZlUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJyZXBsaWVzIiwicmVkaXMiLCJob3N0IiwicG9ydCIsImNyZWF0ZUNsaWVudCIsIl9tYWtlUXVlcnkiLCJobXNldCIsImhnZXRhbGwiLCJxdWl0Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLFlBQVksU0FBWkEsU0FBWSxDQUFDQyxLQUFELEVBQVFDLE1BQVI7QUFBQSxTQUFtQixVQUFDQyxTQUFEO0FBQUEsV0FBZTtBQUFBLHdDQUFJQyxJQUFKO0FBQUlBLFlBQUo7QUFBQTs7QUFBQSxhQUNsREgsTUFBTUksc0JBQU4sQ0FBNkIsVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ2hETCxlQUFPQyxTQUFQLGdCQUFxQkMsSUFBckIsU0FBMkIsVUFBQ0ksR0FBRCxFQUFNQyxPQUFOLEVBQWtCO0FBQzNDLGNBQUlELEdBQUosRUFBUztBQUNQRCxtQkFBT0MsR0FBUDtBQUNELFdBRkQsTUFFTztBQUNMRixvQkFBUUcsT0FBUjtBQUNEO0FBQ0YsU0FORDtBQU9ELE9BUkQsQ0FEa0Q7QUFBQSxLQUFmO0FBQUEsR0FBbkI7QUFBQSxDQUFsQjtBQVVBO0FBQ0E7O2tCQUNlLGdCQUFrQztBQUFBLE1BQS9CQyxLQUErQixRQUEvQkEsS0FBK0I7QUFBQSxNQUF4QkMsSUFBd0IsUUFBeEJBLElBQXdCO0FBQUEsTUFBbEJDLElBQWtCLFFBQWxCQSxJQUFrQjtBQUFBLE1BQVpYLEtBQVksUUFBWkEsS0FBWTs7QUFDL0MsTUFBTUMsU0FBU1EsTUFBTUcsWUFBTixDQUFtQixFQUFFRixVQUFGLEVBQVFDLFVBQVIsRUFBbkIsQ0FBZjtBQUNBLE1BQU1FLGFBQWFkLFVBQVVDLEtBQVYsRUFBaUJDLE1BQWpCLENBQW5COztBQUVBLFNBQU87QUFDTGEsV0FBT0QsV0FBVyxPQUFYLENBREY7QUFFTEUsYUFBU0YsV0FBVyxTQUFYLENBRko7QUFHTEcsVUFBTTtBQUFBLGFBQVlmLE9BQU9lLElBQVAsRUFBWjtBQUFBO0FBSEQsR0FBUDtBQUtELEMiLCJmaWxlIjoicmVkaXNDbGllbnRXcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWFrZVF1ZXJ5ID0gKHV0aWxzLCBjbGllbnQpID0+IChvcGVyYXRpb24pID0+ICguLi5hcmdzKSA9PlxuICB1dGlscy5jcmVhdGVEZWZlbnNpdmVQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjbGllbnRbb3BlcmF0aW9uXSguLi5hcmdzLCAoZXJyLCByZXBsaWVzKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHJlcGxpZXMpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbi8vIFdyYXBwZXIgZm9yIHRoZSBucG0gcGFja2FnZSAncmVkaXMnXG4vLyBSZXBsYWNlcyB0aGUgcmVkaXMgY2xpZW50IGRlZmF1bHQgZnVuY3Rpb25zIHdpdGggcHJvbWlzZSBvcmllbnRlZCBmdW5jdGlvbnNcbmV4cG9ydCBkZWZhdWx0ICh7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KSA9PiB7XG4gIGNvbnN0IGNsaWVudCA9IHJlZGlzLmNyZWF0ZUNsaWVudCh7IGhvc3QsIHBvcnQgfSlcbiAgY29uc3QgX21ha2VRdWVyeSA9IG1ha2VRdWVyeSh1dGlscywgY2xpZW50KVxuXG4gIHJldHVybiB7XG4gICAgaG1zZXQ6IF9tYWtlUXVlcnkoJ2htc2V0JyksXG4gICAgaGdldGFsbDogX21ha2VRdWVyeSgnaGdldGFsbCcpLFxuICAgIHF1aXQ6IGFzeW5jICgpID0+IGNsaWVudC5xdWl0KClcbiAgfVxufVxuIl19