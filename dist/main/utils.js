"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Creates a new promise object
var createDefensivePromise = exports.createDefensivePromise = function createDefensivePromise(executorFunc) {
  return new Promise(function (resolve, reject) {
    try {
      Promise.resolve(executorFunc(resolve, reject)).catch(function (err) {
        return reject(err);
      });
    } catch (e) {
      reject(e);
    }
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluL3V0aWxzLmpzIl0sIm5hbWVzIjpbImNyZWF0ZURlZmVuc2l2ZVByb21pc2UiLCJleGVjdXRvckZ1bmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNhdGNoIiwiZXJyIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNPLElBQU1BLDBEQUF5QixTQUF6QkEsc0JBQXlCLENBQUNDLFlBQUQ7QUFBQSxTQUNwQyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQy9CLFFBQUk7QUFDRkYsY0FBUUMsT0FBUixDQUFnQkYsYUFBYUUsT0FBYixFQUFzQkMsTUFBdEIsQ0FBaEIsRUFBK0NDLEtBQS9DLENBQXFEO0FBQUEsZUFBT0QsT0FBT0UsR0FBUCxDQUFQO0FBQUEsT0FBckQ7QUFDRCxLQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1ZILGFBQU9HLENBQVA7QUFDRDtBQUNGLEdBTkQsQ0FEb0M7QUFBQSxDQUEvQiIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENyZWF0ZXMgYSBuZXcgcHJvbWlzZSBvYmplY3RcbmV4cG9ydCBjb25zdCBjcmVhdGVEZWZlbnNpdmVQcm9taXNlID0gKGV4ZWN1dG9yRnVuYykgPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoZXhlY3V0b3JGdW5jKHJlc29sdmUsIHJlamVjdCkpLmNhdGNoKGVyciA9PiByZWplY3QoZXJyKSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZWplY3QoZSlcbiAgICB9XG4gIH0pXG4iXX0=