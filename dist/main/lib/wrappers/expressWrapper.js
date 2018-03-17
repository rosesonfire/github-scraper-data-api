"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// A wrapper for express customized for our application
exports.default = function (_ref) {
  var express = _ref.express,
      middlewares = _ref.middlewares,
      routes = _ref.routes,
      port = _ref.port;

  var app = express();

  middlewares.forEach(function (middleware) {
    return app.use(middleware);
  });
  Object.entries(routes.get).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        route = _ref3[0],
        controller = _ref3[1];

    return app.get(route, controller);
  });
  Object.entries(routes.post).forEach(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        route = _ref5[0],
        controller = _ref5[1];

    return app.post(route, controller);
  });

  return {
    listen: function listen() {
      return (
        // eslint-disable-next-line no-console
        app.listen(port, function () {
          return console.log("Listening at port " + port);
        })
      );
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL2xpYi93cmFwcGVycy9leHByZXNzV3JhcHBlci5qcyJdLCJuYW1lcyI6WyJleHByZXNzIiwibWlkZGxld2FyZXMiLCJyb3V0ZXMiLCJwb3J0IiwiYXBwIiwiZm9yRWFjaCIsInVzZSIsIm1pZGRsZXdhcmUiLCJPYmplY3QiLCJlbnRyaWVzIiwiZ2V0Iiwicm91dGUiLCJjb250cm9sbGVyIiwicG9zdCIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7a0JBQ2UsZ0JBQTRDO0FBQUEsTUFBekNBLE9BQXlDLFFBQXpDQSxPQUF5QztBQUFBLE1BQWhDQyxXQUFnQyxRQUFoQ0EsV0FBZ0M7QUFBQSxNQUFuQkMsTUFBbUIsUUFBbkJBLE1BQW1CO0FBQUEsTUFBWEMsSUFBVyxRQUFYQSxJQUFXOztBQUN6RCxNQUFNQyxNQUFNSixTQUFaOztBQUVBQyxjQUFZSSxPQUFaLENBQW9CO0FBQUEsV0FBY0QsSUFBSUUsR0FBSixDQUFRQyxVQUFSLENBQWQ7QUFBQSxHQUFwQjtBQUNBQyxTQUFPQyxPQUFQLENBQWVQLE9BQU9RLEdBQXRCLEVBQTJCTCxPQUEzQixDQUFtQztBQUFBO0FBQUEsUUFBRU0sS0FBRjtBQUFBLFFBQVNDLFVBQVQ7O0FBQUEsV0FDakNSLElBQUlNLEdBQUosQ0FBUUMsS0FBUixFQUFlQyxVQUFmLENBRGlDO0FBQUEsR0FBbkM7QUFFQUosU0FBT0MsT0FBUCxDQUFlUCxPQUFPVyxJQUF0QixFQUE0QlIsT0FBNUIsQ0FBb0M7QUFBQTtBQUFBLFFBQUVNLEtBQUY7QUFBQSxRQUFTQyxVQUFUOztBQUFBLFdBQ2xDUixJQUFJUyxJQUFKLENBQVNGLEtBQVQsRUFBZ0JDLFVBQWhCLENBRGtDO0FBQUEsR0FBcEM7O0FBR0EsU0FBTztBQUNMRSxZQUFRO0FBQUE7QUFDTjtBQUNBVixZQUFJVSxNQUFKLENBQVdYLElBQVgsRUFBaUI7QUFBQSxpQkFBTVksUUFBUUMsR0FBUix3QkFBaUNiLElBQWpDLENBQU47QUFBQSxTQUFqQjtBQUZNO0FBQUE7QUFESCxHQUFQO0FBS0QsQyIsImZpbGUiOiJleHByZXNzV3JhcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEEgd3JhcHBlciBmb3IgZXhwcmVzcyBjdXN0b21pemVkIGZvciBvdXIgYXBwbGljYXRpb25cbmV4cG9ydCBkZWZhdWx0ICh7IGV4cHJlc3MsIG1pZGRsZXdhcmVzLCByb3V0ZXMsIHBvcnQgfSkgPT4ge1xuICBjb25zdCBhcHAgPSBleHByZXNzKClcblxuICBtaWRkbGV3YXJlcy5mb3JFYWNoKG1pZGRsZXdhcmUgPT4gYXBwLnVzZShtaWRkbGV3YXJlKSlcbiAgT2JqZWN0LmVudHJpZXMocm91dGVzLmdldCkuZm9yRWFjaCgoW3JvdXRlLCBjb250cm9sbGVyXSkgPT5cbiAgICBhcHAuZ2V0KHJvdXRlLCBjb250cm9sbGVyKSlcbiAgT2JqZWN0LmVudHJpZXMocm91dGVzLnBvc3QpLmZvckVhY2goKFtyb3V0ZSwgY29udHJvbGxlcl0pID0+XG4gICAgYXBwLnBvc3Qocm91dGUsIGNvbnRyb2xsZXIpKVxuXG4gIHJldHVybiB7XG4gICAgbGlzdGVuOiAoKSA9PlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGFwcC5saXN0ZW4ocG9ydCwgKCkgPT4gY29uc29sZS5sb2coYExpc3RlbmluZyBhdCBwb3J0ICR7cG9ydH1gKSlcbiAgfVxufVxuIl19