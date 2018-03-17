'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsUtils = require('js-utils');

// Wrapper for the npm package 'redis'
// Replaces the redis client default functions with promise oriented functions
exports.default = function (_ref) {
  var redis = _ref.redis,
      host = _ref.host,
      port = _ref.port;

  var client = redis.createClient({ host: host, port: port });

  return {
    hmset: function hmset() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _jsUtils.createDefensivePromise)(function (resolve, reject) {
        client.hmset.apply(client, args.concat([function (err, replies) {
          if (err) {
            reject(err);
          } else {
            resolve(replies);
          }
        }]));
      });
    },
    quit: async function quit() {
      return client.quit();
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXIuanMiXSwibmFtZXMiOlsicmVkaXMiLCJob3N0IiwicG9ydCIsImNsaWVudCIsImNyZWF0ZUNsaWVudCIsImhtc2V0IiwiYXJncyIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJyZXBsaWVzIiwicXVpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtrQkFDZSxnQkFBMkI7QUFBQSxNQUF4QkEsS0FBd0IsUUFBeEJBLEtBQXdCO0FBQUEsTUFBakJDLElBQWlCLFFBQWpCQSxJQUFpQjtBQUFBLE1BQVhDLElBQVcsUUFBWEEsSUFBVzs7QUFDeEMsTUFBTUMsU0FBU0gsTUFBTUksWUFBTixDQUFtQixFQUFFSCxVQUFGLEVBQVFDLFVBQVIsRUFBbkIsQ0FBZjs7QUFFQSxTQUFPO0FBQ0xHLFdBQU87QUFBQSx3Q0FBSUMsSUFBSjtBQUFJQSxZQUFKO0FBQUE7O0FBQUEsYUFBYSxxQ0FBdUIsVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQzlETCxlQUFPRSxLQUFQLGVBQWdCQyxJQUFoQixTQUFzQixVQUFDRyxHQUFELEVBQU1DLE9BQU4sRUFBa0I7QUFDdEMsY0FBSUQsR0FBSixFQUFTO0FBQ1BELG1CQUFPQyxHQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0xGLG9CQUFRRyxPQUFSO0FBQ0Q7QUFDRixTQU5EO0FBT0QsT0FSbUIsQ0FBYjtBQUFBLEtBREY7QUFVTEMsVUFBTTtBQUFBLGFBQVlSLE9BQU9RLElBQVAsRUFBWjtBQUFBO0FBVkQsR0FBUDtBQVlELEMiLCJmaWxlIjoicmVkaXNDbGllbnRXcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRGVmZW5zaXZlUHJvbWlzZSB9IGZyb20gJ2pzLXV0aWxzJ1xuXG4vLyBXcmFwcGVyIGZvciB0aGUgbnBtIHBhY2thZ2UgJ3JlZGlzJ1xuLy8gUmVwbGFjZXMgdGhlIHJlZGlzIGNsaWVudCBkZWZhdWx0IGZ1bmN0aW9ucyB3aXRoIHByb21pc2Ugb3JpZW50ZWQgZnVuY3Rpb25zXG5leHBvcnQgZGVmYXVsdCAoeyByZWRpcywgaG9zdCwgcG9ydCB9KSA9PiB7XG4gIGNvbnN0IGNsaWVudCA9IHJlZGlzLmNyZWF0ZUNsaWVudCh7IGhvc3QsIHBvcnQgfSlcblxuICByZXR1cm4ge1xuICAgIGhtc2V0OiAoLi4uYXJncykgPT4gY3JlYXRlRGVmZW5zaXZlUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjbGllbnQuaG1zZXQoLi4uYXJncywgKGVyciwgcmVwbGllcykgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlcGxpZXMpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSksXG4gICAgcXVpdDogYXN5bmMgKCkgPT4gY2xpZW50LnF1aXQoKVxuICB9XG59XG4iXX0=