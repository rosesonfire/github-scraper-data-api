'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./../../utils');

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

      return (0, _utils.createDefensivePromise)(function (resolve, reject) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXIuanMiXSwibmFtZXMiOlsicmVkaXMiLCJob3N0IiwicG9ydCIsImNsaWVudCIsImNyZWF0ZUNsaWVudCIsImhtc2V0IiwiYXJncyIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJyZXBsaWVzIiwicXVpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtrQkFDZSxnQkFBMkI7QUFBQSxNQUF4QkEsS0FBd0IsUUFBeEJBLEtBQXdCO0FBQUEsTUFBakJDLElBQWlCLFFBQWpCQSxJQUFpQjtBQUFBLE1BQVhDLElBQVcsUUFBWEEsSUFBVzs7QUFDeEMsTUFBTUMsU0FBU0gsTUFBTUksWUFBTixDQUFtQixFQUFFSCxVQUFGLEVBQVFDLFVBQVIsRUFBbkIsQ0FBZjs7QUFFQSxTQUFPO0FBQ0xHLFdBQU87QUFBQSx3Q0FBSUMsSUFBSjtBQUFJQSxZQUFKO0FBQUE7O0FBQUEsYUFBYSxtQ0FBdUIsVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQzlETCxlQUFPRSxLQUFQLGVBQWdCQyxJQUFoQixTQUFzQixVQUFDRyxHQUFELEVBQU1DLE9BQU4sRUFBa0I7QUFDdEMsY0FBSUQsR0FBSixFQUFTO0FBQ1BELG1CQUFPQyxHQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0xGLG9CQUFRRyxPQUFSO0FBQ0Q7QUFDRixTQU5EO0FBT0QsT0FSbUIsQ0FBYjtBQUFBLEtBREY7QUFVTEMsVUFBTTtBQUFBLGFBQVlSLE9BQU9RLElBQVAsRUFBWjtBQUFBO0FBVkQsR0FBUDtBQVlELEMiLCJmaWxlIjoicmVkaXNDbGllbnRXcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRGVmZW5zaXZlUHJvbWlzZSB9IGZyb20gJy4vLi4vLi4vdXRpbHMnXG5cbi8vIFdyYXBwZXIgZm9yIHRoZSBucG0gcGFja2FnZSAncmVkaXMnXG4vLyBSZXBsYWNlcyB0aGUgcmVkaXMgY2xpZW50IGRlZmF1bHQgZnVuY3Rpb25zIHdpdGggcHJvbWlzZSBvcmllbnRlZCBmdW5jdGlvbnNcbmV4cG9ydCBkZWZhdWx0ICh7IHJlZGlzLCBob3N0LCBwb3J0IH0pID0+IHtcbiAgY29uc3QgY2xpZW50ID0gcmVkaXMuY3JlYXRlQ2xpZW50KHsgaG9zdCwgcG9ydCB9KVxuXG4gIHJldHVybiB7XG4gICAgaG1zZXQ6ICguLi5hcmdzKSA9PiBjcmVhdGVEZWZlbnNpdmVQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNsaWVudC5obXNldCguLi5hcmdzLCAoZXJyLCByZXBsaWVzKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbGllcylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KSxcbiAgICBxdWl0OiBhc3luYyAoKSA9PiBjbGllbnQucXVpdCgpXG4gIH1cbn1cbiJdfQ==