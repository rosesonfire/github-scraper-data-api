"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// Wrapper for the npm package 'redis'
// Replaces the redis client default functions with promise oriented functions
exports.default = function (_ref) {
  var redis = _ref.redis,
      host = _ref.host,
      port = _ref.port,
      utils = _ref.utils;

  var client = redis.createClient({ host: host, port: port });

  return {
    hmset: function hmset() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return utils.createDefensivePromise(function (resolve, reject) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL2xpYi93cmFwcGVycy9yZWRpc0NsaWVudFdyYXBwZXIuanMiXSwibmFtZXMiOlsicmVkaXMiLCJob3N0IiwicG9ydCIsInV0aWxzIiwiY2xpZW50IiwiY3JlYXRlQ2xpZW50IiwiaG1zZXQiLCJhcmdzIiwiY3JlYXRlRGVmZW5zaXZlUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJyZXBsaWVzIiwicXVpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtrQkFDZSxnQkFBa0M7QUFBQSxNQUEvQkEsS0FBK0IsUUFBL0JBLEtBQStCO0FBQUEsTUFBeEJDLElBQXdCLFFBQXhCQSxJQUF3QjtBQUFBLE1BQWxCQyxJQUFrQixRQUFsQkEsSUFBa0I7QUFBQSxNQUFaQyxLQUFZLFFBQVpBLEtBQVk7O0FBQy9DLE1BQU1DLFNBQVNKLE1BQU1LLFlBQU4sQ0FBbUIsRUFBRUosVUFBRixFQUFRQyxVQUFSLEVBQW5CLENBQWY7O0FBRUEsU0FBTztBQUNMSSxXQUFPO0FBQUEsd0NBQUlDLElBQUo7QUFBSUEsWUFBSjtBQUFBOztBQUFBLGFBQWFKLE1BQU1LLHNCQUFOLENBQTZCLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwRU4sZUFBT0UsS0FBUCxlQUFnQkMsSUFBaEIsU0FBc0IsVUFBQ0ksR0FBRCxFQUFNQyxPQUFOLEVBQWtCO0FBQ3RDLGNBQUlELEdBQUosRUFBUztBQUNQRCxtQkFBT0MsR0FBUDtBQUNELFdBRkQsTUFFTztBQUNMRixvQkFBUUcsT0FBUjtBQUNEO0FBQ0YsU0FORDtBQU9ELE9BUm1CLENBQWI7QUFBQSxLQURGO0FBVUxDLFVBQU07QUFBQSxhQUFZVCxPQUFPUyxJQUFQLEVBQVo7QUFBQTtBQVZELEdBQVA7QUFZRCxDIiwiZmlsZSI6InJlZGlzQ2xpZW50V3JhcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFdyYXBwZXIgZm9yIHRoZSBucG0gcGFja2FnZSAncmVkaXMnXG4vLyBSZXBsYWNlcyB0aGUgcmVkaXMgY2xpZW50IGRlZmF1bHQgZnVuY3Rpb25zIHdpdGggcHJvbWlzZSBvcmllbnRlZCBmdW5jdGlvbnNcbmV4cG9ydCBkZWZhdWx0ICh7IHJlZGlzLCBob3N0LCBwb3J0LCB1dGlscyB9KSA9PiB7XG4gIGNvbnN0IGNsaWVudCA9IHJlZGlzLmNyZWF0ZUNsaWVudCh7IGhvc3QsIHBvcnQgfSlcblxuICByZXR1cm4ge1xuICAgIGhtc2V0OiAoLi4uYXJncykgPT4gdXRpbHMuY3JlYXRlRGVmZW5zaXZlUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjbGllbnQuaG1zZXQoLi4uYXJncywgKGVyciwgcmVwbGllcykgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlcGxpZXMpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSksXG4gICAgcXVpdDogYXN5bmMgKCkgPT4gY2xpZW50LnF1aXQoKVxuICB9XG59XG4iXX0=