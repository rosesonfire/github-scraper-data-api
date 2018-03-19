'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

require('babel-polyfill');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(recurse),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(flattenData);

// Recursively flattens the data
function recurse(entry, preString) {
  var key, value, newPreString, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, y;

  return regeneratorRuntime.wrap(function recurse$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          key = entry[0];
          value = entry[1];

          if (!Array.isArray(value)) {
            _context.next = 6;
            break;
          }

          throw new Error('Currently arrays are not supported');

        case 6:
          if (!(typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value instanceof Date)) {
            _context.next = 13;
            break;
          }

          _context.next = 9;
          return '' + preString + key;

        case 9:
          _context.next = 11;
          return value;

        case 11:
          _context.next = 44;
          break;

        case 13:
          if (!((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object')) {
            _context.next = 43;
            break;
          }

          newPreString = '' + preString + key + ':';
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 18;
          _iterator = flattenData(value, newPreString)[Symbol.iterator]();

        case 20:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 27;
            break;
          }

          y = _step.value;
          _context.next = 24;
          return y;

        case 24:
          _iteratorNormalCompletion = true;
          _context.next = 20;
          break;

        case 27:
          _context.next = 33;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context['catch'](18);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 33:
          _context.prev = 33;
          _context.prev = 34;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 36:
          _context.prev = 36;

          if (!_didIteratorError) {
            _context.next = 39;
            break;
          }

          throw _iteratorError;

        case 39:
          return _context.finish(36);

        case 40:
          return _context.finish(33);

        case 41:
          _context.next = 44;
          break;

        case 43:
          throw new Error('unknown type', typeof value === 'undefined' ? 'undefined' : _typeof(value));

        case 44:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[18, 29, 33, 41], [34,, 36, 40]]);
}

// Generates a flat array of an object's key and values
// Example:
//   { 'name': 'abc', 'code': 56, 'meta': { 'location': 'a' } }
//   is flattened to
//   [ 'name', 'abc', 'code', 56, 'meta:location': 'a' ]
function flattenData(data) {
  var preString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var entries, i, len, entry, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, y;

  return regeneratorRuntime.wrap(function flattenData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          entries = Object.entries(data);
          i = 0, len = entries.length;

        case 2:
          if (!(i < len)) {
            _context2.next = 33;
            break;
          }

          entry = entries[i];
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 7;
          _iterator2 = recurse(entry, preString)[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context2.next = 16;
            break;
          }

          y = _step2.value;
          _context2.next = 13;
          return y;

        case 13:
          _iteratorNormalCompletion2 = true;
          _context2.next = 9;
          break;

        case 16:
          _context2.next = 22;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2['catch'](7);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t0;

        case 22:
          _context2.prev = 22;
          _context2.prev = 23;

          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }

        case 25:
          _context2.prev = 25;

          if (!_didIteratorError2) {
            _context2.next = 28;
            break;
          }

          throw _iteratorError2;

        case 28:
          return _context2.finish(25);

        case 29:
          return _context2.finish(22);

        case 30:
          i++;
          _context2.next = 2;
          break;

        case 33:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[7, 18, 22, 30], [23,, 25, 29]]);
}

// Maps data and persits it to a redis server
// Data has to be a json array
// Example:
//   [
//     { 'name': 'abc', 'code': 56 },
//     { 'name': 'efg', 'code': 84 }
//   ]

exports.default = function (_ref) {
  var redisClient = _ref.redisClient;
  return {
    // data is the data
    // idKey is the key in the data which will be used as the id in the redis
    //   hash object
    create: function create(_ref2) {
      var key = _ref2.key,
          data = _ref2.data;
      return {
        key: key,
        data: data,
        save: async function save() {
          return redisClient.hmset.apply(redisClient, [key].concat(_toConsumableArray(flattenData(data))));
        }
      };
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL2xpYi9vZG0vcmVkaXNPRE0uanMiXSwibmFtZXMiOlsicmVjdXJzZSIsImZsYXR0ZW5EYXRhIiwiZW50cnkiLCJwcmVTdHJpbmciLCJrZXkiLCJ2YWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsIkVycm9yIiwiRGF0ZSIsInRvU3RyaW5nIiwibmV3UHJlU3RyaW5nIiwieSIsImRhdGEiLCJlbnRyaWVzIiwiT2JqZWN0IiwiaSIsImxlbiIsImxlbmd0aCIsInJlZGlzQ2xpZW50IiwiY3JlYXRlIiwic2F2ZSIsImhtc2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O21EQUdXQSxPO29EQTBCQUMsVzs7QUEzQlg7QUFDQSxTQUFXRCxPQUFYLENBQW9CRSxLQUFwQixFQUEyQkMsU0FBM0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNRQyxhQURSLEdBQ2NGLE1BQU0sQ0FBTixDQURkO0FBRVFHLGVBRlIsR0FFZ0JILE1BQU0sQ0FBTixDQUZoQjs7QUFBQSxlQUlNSSxNQUFNQyxPQUFOLENBQWNGLEtBQWQsQ0FKTjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxnQkFLVSxJQUFJRyxLQUFKLENBQVUsb0NBQVYsQ0FMVjs7QUFBQTtBQUFBLGdCQU1hLE9BQU9ILEtBQVAsS0FBaUIsUUFBakIsSUFBNkIsT0FBT0EsS0FBUCxLQUFpQixRQUE5QyxJQUNULE9BQU9BLEtBQVAsS0FBaUIsU0FEUixJQUNxQkEsaUJBQWlCSSxJQVBuRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHNCQVFhTixTQVJiLEdBUXlCQyxHQVJ6Qjs7QUFBQTtBQUFBO0FBQUEsaUJBU1VDLE1BQU1LLFFBQU4sRUFUVjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxnQkFVYSxRQUFPTCxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBVjlCO0FBQUE7QUFBQTtBQUFBOztBQVdVTSxzQkFYVixRQVc0QlIsU0FYNUIsR0FXd0NDLEdBWHhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFha0JILFlBQVlJLEtBQVosRUFBbUJNLFlBQW5CLENBYmxCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYWFDLFdBYmI7QUFBQTtBQUFBLGlCQWNZQSxDQWRaOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsZ0JBaUJVLElBQUlKLEtBQUosQ0FBVSxjQUFWLFNBQWlDSCxLQUFqQyx5Q0FBaUNBLEtBQWpDLEVBakJWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBV0osV0FBWCxDQUF3QlksSUFBeEI7QUFBQSxNQUE4QlYsU0FBOUIsdUVBQTBDLEVBQTFDOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1FXLGlCQURSLEdBQ2tCQyxPQUFPRCxPQUFQLENBQWVELElBQWYsQ0FEbEI7QUFFV0csV0FGWCxHQUVlLENBRmYsRUFFa0JDLEdBRmxCLEdBRXdCSCxRQUFRSSxNQUZoQzs7QUFBQTtBQUFBLGdCQUV3Q0YsSUFBSUMsR0FGNUM7QUFBQTtBQUFBO0FBQUE7O0FBR1VmLGVBSFYsR0FHa0JZLFFBQVFFLENBQVIsQ0FIbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUlrQmhCLFFBQVFFLEtBQVIsRUFBZUMsU0FBZixDQUpsQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUlhUyxXQUpiO0FBQUE7QUFBQSxpQkFLWUEsQ0FMWjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBRWlESSxhQUZqRDtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O2tCQUNlO0FBQUEsTUFBR0csV0FBSCxRQUFHQSxXQUFIO0FBQUEsU0FBc0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0FDLFlBQVE7QUFBQSxVQUFHaEIsR0FBSCxTQUFHQSxHQUFIO0FBQUEsVUFBUVMsSUFBUixTQUFRQSxJQUFSO0FBQUEsYUFBb0I7QUFDMUJULGdCQUQwQjtBQUUxQlMsa0JBRjBCO0FBRzFCUSxjQUFNO0FBQUEsaUJBQVlGLFlBQVlHLEtBQVoscUJBQWtCbEIsR0FBbEIsNEJBQTBCSCxZQUFZWSxJQUFaLENBQTFCLEdBQVo7QUFBQTtBQUhvQixPQUFwQjtBQUFBO0FBSjJCLEdBQXRCO0FBQUEsQyIsImZpbGUiOiJyZWRpc09ETS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnXG5cbi8vIFJlY3Vyc2l2ZWx5IGZsYXR0ZW5zIHRoZSBkYXRhXG5mdW5jdGlvbiAqIHJlY3Vyc2UgKGVudHJ5LCBwcmVTdHJpbmcpIHtcbiAgY29uc3Qga2V5ID0gZW50cnlbMF1cbiAgY29uc3QgdmFsdWUgPSBlbnRyeVsxXVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ3VycmVudGx5IGFycmF5cyBhcmUgbm90IHN1cHBvcnRlZCcpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8XG4gICAgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgfHwgdmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgeWllbGQgYCR7cHJlU3RyaW5nfSR7a2V5fWBcbiAgICB5aWVsZCB2YWx1ZS50b1N0cmluZygpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnN0IG5ld1ByZVN0cmluZyA9IGAke3ByZVN0cmluZ30ke2tleX06YFxuXG4gICAgZm9yIChsZXQgeSBvZiBmbGF0dGVuRGF0YSh2YWx1ZSwgbmV3UHJlU3RyaW5nKSkge1xuICAgICAgeWllbGQgeVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gdHlwZScsIHR5cGVvZiB2YWx1ZSlcbiAgfVxufVxuXG4vLyBHZW5lcmF0ZXMgYSBmbGF0IGFycmF5IG9mIGFuIG9iamVjdCdzIGtleSBhbmQgdmFsdWVzXG4vLyBFeGFtcGxlOlxuLy8gICB7ICduYW1lJzogJ2FiYycsICdjb2RlJzogNTYsICdtZXRhJzogeyAnbG9jYXRpb24nOiAnYScgfSB9XG4vLyAgIGlzIGdlbmVyYXRlZCBhc1xuLy8gICBbICduYW1lJywgJ2FiYycsICdjb2RlJywgNTYsICdtZXRhOmxvY2F0aW9uJzogJ2EnIF1cbmZ1bmN0aW9uICogZmxhdHRlbkRhdGEgKGRhdGEsIHByZVN0cmluZyA9ICcnKSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhkYXRhKVxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gZW50cmllcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGVudHJ5ID0gZW50cmllc1tpXVxuICAgIGZvciAobGV0IHkgb2YgcmVjdXJzZShlbnRyeSwgcHJlU3RyaW5nKSkge1xuICAgICAgeWllbGQgeVxuICAgIH1cbiAgfVxufVxuXG4vLyBNYXBzIGRhdGEgYW5kIHBlcnNpdHMgaXQgdG8gYSByZWRpcyBzZXJ2ZXJcbi8vIERhdGEgaGFzIHRvIGJlIGEganNvbiBhcnJheVxuLy8gRXhhbXBsZTpcbi8vICAgW1xuLy8gICAgIHsgJ25hbWUnOiAnYWJjJywgJ2NvZGUnOiA1NiB9LFxuLy8gICAgIHsgJ25hbWUnOiAnZWZnJywgJ2NvZGUnOiA4NCB9XG4vLyAgIF1cbmV4cG9ydCBkZWZhdWx0ICh7IHJlZGlzQ2xpZW50IH0pID0+ICh7XG4gIC8vIGRhdGEgaXMgdGhlIGRhdGFcbiAgLy8gaWRLZXkgaXMgdGhlIGtleSBpbiB0aGUgZGF0YSB3aGljaCB3aWxsIGJlIHVzZWQgYXMgdGhlIGlkIGluIHRoZSByZWRpc1xuICAvLyAgIGhhc2ggb2JqZWN0XG4gIGNyZWF0ZTogKHsga2V5LCBkYXRhIH0pID0+ICh7XG4gICAga2V5LFxuICAgIGRhdGEsXG4gICAgc2F2ZTogYXN5bmMgKCkgPT4gcmVkaXNDbGllbnQuaG1zZXQoa2V5LCAuLi5mbGF0dGVuRGF0YShkYXRhKSlcbiAgfSlcbn0pXG4iXX0=