'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

          if (!(key.indexOf(':') !== -1)) {
            _context.next = 4;
            break;
          }

          throw new Error('Occurence of ":" in key is not supported');

        case 4:
          if (!Array.isArray(value)) {
            _context.next = 8;
            break;
          }

          throw new Error('Array as value is not supported');

        case 8:
          if (!(typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value instanceof Date)) {
            _context.next = 15;
            break;
          }

          _context.next = 11;
          return '' + preString + key;

        case 11:
          _context.next = 13;
          return value;

        case 13:
          _context.next = 46;
          break;

        case 15:
          if (!((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object')) {
            _context.next = 45;
            break;
          }

          newPreString = '' + preString + key + ':';
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 20;
          _iterator = flattenData(value, newPreString)[Symbol.iterator]();

        case 22:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 29;
            break;
          }

          y = _step.value;
          _context.next = 26;
          return y;

        case 26:
          _iteratorNormalCompletion = true;
          _context.next = 22;
          break;

        case 29:
          _context.next = 35;
          break;

        case 31:
          _context.prev = 31;
          _context.t0 = _context['catch'](20);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 35:
          _context.prev = 35;
          _context.prev = 36;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 38:
          _context.prev = 38;

          if (!_didIteratorError) {
            _context.next = 41;
            break;
          }

          throw _iteratorError;

        case 41:
          return _context.finish(38);

        case 42:
          return _context.finish(35);

        case 43:
          _context.next = 46;
          break;

        case 45:
          throw new Error('unknown type', typeof value === 'undefined' ? 'undefined' : _typeof(value));

        case 46:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[20, 31, 35, 43], [36,, 38, 42]]);
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

var validateData = function validateData(data) {
  return [].concat(_toConsumableArray(flattenData(data)));
};

var setPropertyValue = function setPropertyValue(obj, utils) {
  return function (propertyChain, value) {
    // Set the object chain
    var tailObject = utils.foldLeft(propertyChain, [null, obj], function (_ref, prop) {
      var _ref2 = _slicedToArray(_ref, 2),
          parent = _ref2[0],
          child = _ref2[1];

      child[prop] = child[prop] || {};

      return [child, child[prop]];
    })[0];

    // Set the value
    tailObject[propertyChain[propertyChain.length - 1]] = value;
  };
};

// Generates an object from a flattened array of an the object's key and values
// Example:
//   { 'name': 'abc', 'code': 56, 'meta:location': 'a' }
//   is mapped to
//   { 'name': 'abc', 'code': 56, 'meta': { 'location': 'a' } }
var unflattenData = function unflattenData(utils) {
  return function (hgetallResponse) {
    var data = {};
    var _setPropertyValue = setPropertyValue(data, utils);

    Object.entries(hgetallResponse).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      var propertyChain = key.split(':');

      return _setPropertyValue(propertyChain, value);
    });

    return data;
  };
};

var createNewModelObject = function createNewModelObject(redisClient) {
  return function (key, data) {
    validateData(data);
    return {
      key: key,
      data: data,
      save: async function save() {
        return redisClient.hmset.apply(redisClient, [key].concat(_toConsumableArray(flattenData(data))));
      }
    };
  };
};

exports.default = function (_ref5) {
  var redisClient = _ref5.redisClient,
      utils = _ref5.utils;

  var _createNewModelObject = createNewModelObject(redisClient);
  var _unflattenData = unflattenData(utils);

  return {
    // Creates a new model object
    create: function create(_ref6) {
      var key = _ref6.key,
          data = _ref6.data;
      return _createNewModelObject(key, data);
    },
    // Fetches data from db and creates a new model object
    get: async function get(key) {
      var hgetallResponse = await redisClient.hgetall(key);

      if (hgetallResponse === null) {
        throw new Error('Could not find data matching the provided key (' + key + ')');
      } else {
        var data = _unflattenData(hgetallResponse);

        return _createNewModelObject(key, data);
      }
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL2xpYi9vZG0vcmVkaXNPRE0uanMiXSwibmFtZXMiOlsicmVjdXJzZSIsImZsYXR0ZW5EYXRhIiwiZW50cnkiLCJwcmVTdHJpbmciLCJrZXkiLCJ2YWx1ZSIsImluZGV4T2YiLCJFcnJvciIsIkFycmF5IiwiaXNBcnJheSIsIkRhdGUiLCJuZXdQcmVTdHJpbmciLCJ5IiwiZGF0YSIsImVudHJpZXMiLCJPYmplY3QiLCJpIiwibGVuIiwibGVuZ3RoIiwidmFsaWRhdGVEYXRhIiwic2V0UHJvcGVydHlWYWx1ZSIsIm9iaiIsInV0aWxzIiwicHJvcGVydHlDaGFpbiIsInRhaWxPYmplY3QiLCJmb2xkTGVmdCIsInByb3AiLCJwYXJlbnQiLCJjaGlsZCIsInVuZmxhdHRlbkRhdGEiLCJfc2V0UHJvcGVydHlWYWx1ZSIsImhnZXRhbGxSZXNwb25zZSIsImZvckVhY2giLCJzcGxpdCIsImNyZWF0ZU5ld01vZGVsT2JqZWN0Iiwic2F2ZSIsInJlZGlzQ2xpZW50IiwiaG1zZXQiLCJfY3JlYXRlTmV3TW9kZWxPYmplY3QiLCJfdW5mbGF0dGVuRGF0YSIsImNyZWF0ZSIsImdldCIsImhnZXRhbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OzttREFHV0EsTztvREErQkFDLFc7O0FBaENYO0FBQ0EsU0FBV0QsT0FBWCxDQUFvQkUsS0FBcEIsRUFBMkJDLFNBQTNCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUUMsYUFEUixHQUNjRixNQUFNLENBQU4sQ0FEZDtBQUVRRyxlQUZSLEdBRWdCSCxNQUFNLENBQU4sQ0FGaEI7O0FBQUEsZ0JBSU1FLElBQUlFLE9BQUosQ0FBWSxHQUFaLE1BQXFCLENBQUMsQ0FKNUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0JBTVUsSUFBSUMsS0FBSixDQUFVLDBDQUFWLENBTlY7O0FBQUE7QUFBQSxlQVNNQyxNQUFNQyxPQUFOLENBQWNKLEtBQWQsQ0FUTjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxnQkFVVSxJQUFJRSxLQUFKLENBQVUsaUNBQVYsQ0FWVjs7QUFBQTtBQUFBLGdCQVdhLE9BQU9GLEtBQVAsS0FBaUIsUUFBakIsSUFBNkIsT0FBT0EsS0FBUCxLQUFpQixRQUE5QyxJQUNULE9BQU9BLEtBQVAsS0FBaUIsU0FEUixJQUNxQkEsaUJBQWlCSyxJQVpuRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHNCQWFhUCxTQWJiLEdBYXlCQyxHQWJ6Qjs7QUFBQTtBQUFBO0FBQUEsaUJBY1VDLEtBZFY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsZ0JBZWEsUUFBT0EsS0FBUCx5Q0FBT0EsS0FBUCxPQUFpQixRQWY5QjtBQUFBO0FBQUE7QUFBQTs7QUFnQlVNLHNCQWhCVixRQWdCNEJSLFNBaEI1QixHQWdCd0NDLEdBaEJ4QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBa0JrQkgsWUFBWUksS0FBWixFQUFtQk0sWUFBbkIsQ0FsQmxCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBa0JhQyxXQWxCYjtBQUFBO0FBQUEsaUJBbUJZQSxDQW5CWjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGdCQXNCVSxJQUFJTCxLQUFKLENBQVUsY0FBVixTQUFpQ0YsS0FBakMseUNBQWlDQSxLQUFqQyxFQXRCVjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUEwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVdKLFdBQVgsQ0FBd0JZLElBQXhCO0FBQUEsTUFBOEJWLFNBQTlCLHVFQUEwQyxFQUExQzs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNRVyxpQkFEUixHQUNrQkMsT0FBT0QsT0FBUCxDQUFlRCxJQUFmLENBRGxCO0FBRVdHLFdBRlgsR0FFZSxDQUZmLEVBRWtCQyxHQUZsQixHQUV3QkgsUUFBUUksTUFGaEM7O0FBQUE7QUFBQSxnQkFFd0NGLElBQUlDLEdBRjVDO0FBQUE7QUFBQTtBQUFBOztBQUdVZixlQUhWLEdBR2tCWSxRQUFRRSxDQUFSLENBSGxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFJa0JoQixRQUFRRSxLQUFSLEVBQWVDLFNBQWYsQ0FKbEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFJYVMsV0FKYjtBQUFBO0FBQUEsaUJBS1lBLENBTFo7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUVpREksYUFGakQ7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVBLElBQU1HLGVBQWUsU0FBZkEsWUFBZTtBQUFBLHNDQUFZbEIsWUFBWVksSUFBWixDQUFaO0FBQUEsQ0FBckI7O0FBRUEsSUFBTU8sbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOO0FBQUEsU0FBZ0IsVUFBQ0MsYUFBRCxFQUFnQmxCLEtBQWhCLEVBQTBCO0FBQ2pFO0FBQ0EsUUFBTW1CLGFBQ0pGLE1BQU1HLFFBQU4sQ0FBZUYsYUFBZixFQUE4QixDQUFDLElBQUQsRUFBT0YsR0FBUCxDQUE5QixFQUEyQyxnQkFBa0JLLElBQWxCLEVBQTJCO0FBQUE7QUFBQSxVQUF6QkMsTUFBeUI7QUFBQSxVQUFqQkMsS0FBaUI7O0FBQ3BFQSxZQUFNRixJQUFOLElBQWNFLE1BQU1GLElBQU4sS0FBZSxFQUE3Qjs7QUFFQSxhQUFPLENBQUNFLEtBQUQsRUFBUUEsTUFBTUYsSUFBTixDQUFSLENBQVA7QUFDRCxLQUpELEVBSUcsQ0FKSCxDQURGOztBQU9BO0FBQ0FGLGVBQVdELGNBQWNBLGNBQWNMLE1BQWQsR0FBdUIsQ0FBckMsQ0FBWCxJQUFzRGIsS0FBdEQ7QUFDRCxHQVh3QjtBQUFBLENBQXpCOztBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNd0IsZ0JBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLFNBQVMsMkJBQW1CO0FBQ2hELFFBQU1oQixPQUFPLEVBQWI7QUFDQSxRQUFNaUIsb0JBQW9CVixpQkFBaUJQLElBQWpCLEVBQXVCUyxLQUF2QixDQUExQjs7QUFFQVAsV0FBT0QsT0FBUCxDQUFlaUIsZUFBZixFQUFnQ0MsT0FBaEMsQ0FBd0MsaUJBQWtCO0FBQUE7QUFBQSxVQUFoQjVCLEdBQWdCO0FBQUEsVUFBWEMsS0FBVzs7QUFDeEQsVUFBTWtCLGdCQUFnQm5CLElBQUk2QixLQUFKLENBQVUsR0FBVixDQUF0Qjs7QUFFQSxhQUFPSCxrQkFBa0JQLGFBQWxCLEVBQWlDbEIsS0FBakMsQ0FBUDtBQUNELEtBSkQ7O0FBTUEsV0FBT1EsSUFBUDtBQUNELEdBWHFCO0FBQUEsQ0FBdEI7O0FBYUEsSUFBTXFCLHVCQUF1QixTQUF2QkEsb0JBQXVCO0FBQUEsU0FBZSxVQUFDOUIsR0FBRCxFQUFNUyxJQUFOLEVBQWU7QUFDekRNLGlCQUFhTixJQUFiO0FBQ0EsV0FBTztBQUNMVCxjQURLO0FBRUxTLGdCQUZLO0FBR0xzQixZQUFNO0FBQUEsZUFBWUMsWUFBWUMsS0FBWixxQkFBa0JqQyxHQUFsQiw0QkFBMEJILFlBQVlZLElBQVosQ0FBMUIsR0FBWjtBQUFBO0FBSEQsS0FBUDtBQUtELEdBUDRCO0FBQUEsQ0FBN0I7O2tCQVNlLGlCQUE0QjtBQUFBLE1BQXpCdUIsV0FBeUIsU0FBekJBLFdBQXlCO0FBQUEsTUFBWmQsS0FBWSxTQUFaQSxLQUFZOztBQUN6QyxNQUFNZ0Isd0JBQXdCSixxQkFBcUJFLFdBQXJCLENBQTlCO0FBQ0EsTUFBTUcsaUJBQWlCVixjQUFjUCxLQUFkLENBQXZCOztBQUVBLFNBQU87QUFDTDtBQUNBa0IsWUFBUTtBQUFBLFVBQUdwQyxHQUFILFNBQUdBLEdBQUg7QUFBQSxVQUFRUyxJQUFSLFNBQVFBLElBQVI7QUFBQSxhQUFtQnlCLHNCQUFzQmxDLEdBQXRCLEVBQTJCUyxJQUEzQixDQUFuQjtBQUFBLEtBRkg7QUFHTDtBQUNBNEIsU0FBSyxtQkFBTXJDLEdBQU4sRUFBYTtBQUNoQixVQUFNMkIsa0JBQWtCLE1BQU1LLFlBQVlNLE9BQVosQ0FBb0J0QyxHQUFwQixDQUE5Qjs7QUFFQSxVQUFJMkIsb0JBQW9CLElBQXhCLEVBQThCO0FBQzVCLGNBQU0sSUFBSXhCLEtBQUoscURBQzhDSCxHQUQ5QyxPQUFOO0FBRUQsT0FIRCxNQUdPO0FBQ0wsWUFBTVMsT0FBTzBCLGVBQWVSLGVBQWYsQ0FBYjs7QUFFQSxlQUFPTyxzQkFBc0JsQyxHQUF0QixFQUEyQlMsSUFBM0IsQ0FBUDtBQUNEO0FBQ0Y7QUFmSSxHQUFQO0FBaUJELEMiLCJmaWxlIjoicmVkaXNPRE0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG4vLyBSZWN1cnNpdmVseSBmbGF0dGVucyB0aGUgZGF0YVxuZnVuY3Rpb24gKiByZWN1cnNlIChlbnRyeSwgcHJlU3RyaW5nKSB7XG4gIGNvbnN0IGtleSA9IGVudHJ5WzBdXG4gIGNvbnN0IHZhbHVlID0gZW50cnlbMV1cblxuICBpZiAoa2V5LmluZGV4T2YoJzonKSAhPT0gLTEpIHtcbiAgICAvLyBUT0RPOiB1c2Ugc29tZSBlc2NhcGluZyBtZWNoYW5pc20gdG8gc3VwcG9ydCB0aGlzXG4gICAgdGhyb3cgbmV3IEVycm9yKCdPY2N1cmVuY2Ugb2YgXCI6XCIgaW4ga2V5IGlzIG5vdCBzdXBwb3J0ZWQnKVxuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBcnJheSBhcyB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkJylcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHxcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICB5aWVsZCBgJHtwcmVTdHJpbmd9JHtrZXl9YFxuICAgIHlpZWxkIHZhbHVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnN0IG5ld1ByZVN0cmluZyA9IGAke3ByZVN0cmluZ30ke2tleX06YFxuXG4gICAgZm9yIChsZXQgeSBvZiBmbGF0dGVuRGF0YSh2YWx1ZSwgbmV3UHJlU3RyaW5nKSkge1xuICAgICAgeWllbGQgeVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gdHlwZScsIHR5cGVvZiB2YWx1ZSlcbiAgfVxufVxuXG4vLyBHZW5lcmF0ZXMgYSBmbGF0IGFycmF5IG9mIGFuIG9iamVjdCdzIGtleSBhbmQgdmFsdWVzXG4vLyBFeGFtcGxlOlxuLy8gICB7ICduYW1lJzogJ2FiYycsICdjb2RlJzogNTYsICdtZXRhJzogeyAnbG9jYXRpb24nOiAnYScgfSB9XG4vLyAgIGlzIGZsYXR0ZW5lZCB0b1xuLy8gICBbICduYW1lJywgJ2FiYycsICdjb2RlJywgNTYsICdtZXRhOmxvY2F0aW9uJzogJ2EnIF1cbmZ1bmN0aW9uICogZmxhdHRlbkRhdGEgKGRhdGEsIHByZVN0cmluZyA9ICcnKSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhkYXRhKVxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gZW50cmllcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGVudHJ5ID0gZW50cmllc1tpXVxuICAgIGZvciAobGV0IHkgb2YgcmVjdXJzZShlbnRyeSwgcHJlU3RyaW5nKSkge1xuICAgICAgeWllbGQgeVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCB2YWxpZGF0ZURhdGEgPSBkYXRhID0+IFsuLi5mbGF0dGVuRGF0YShkYXRhKV1cblxuY29uc3Qgc2V0UHJvcGVydHlWYWx1ZSA9IChvYmosIHV0aWxzKSA9PiAocHJvcGVydHlDaGFpbiwgdmFsdWUpID0+IHtcbiAgLy8gU2V0IHRoZSBvYmplY3QgY2hhaW5cbiAgY29uc3QgdGFpbE9iamVjdCA9XG4gICAgdXRpbHMuZm9sZExlZnQocHJvcGVydHlDaGFpbiwgW251bGwsIG9ial0sIChbcGFyZW50LCBjaGlsZF0sIHByb3ApID0+IHtcbiAgICAgIGNoaWxkW3Byb3BdID0gY2hpbGRbcHJvcF0gfHwge31cblxuICAgICAgcmV0dXJuIFtjaGlsZCwgY2hpbGRbcHJvcF1dXG4gICAgfSlbMF1cblxuICAvLyBTZXQgdGhlIHZhbHVlXG4gIHRhaWxPYmplY3RbcHJvcGVydHlDaGFpbltwcm9wZXJ0eUNoYWluLmxlbmd0aCAtIDFdXSA9IHZhbHVlXG59XG5cbi8vIEdlbmVyYXRlcyBhbiBvYmplY3QgZnJvbSBhIGZsYXR0ZW5lZCBhcnJheSBvZiBhbiB0aGUgb2JqZWN0J3Mga2V5IGFuZCB2YWx1ZXNcbi8vIEV4YW1wbGU6XG4vLyAgIHsgJ25hbWUnOiAnYWJjJywgJ2NvZGUnOiA1NiwgJ21ldGE6bG9jYXRpb24nOiAnYScgfVxuLy8gICBpcyBtYXBwZWQgdG9cbi8vICAgeyAnbmFtZSc6ICdhYmMnLCAnY29kZSc6IDU2LCAnbWV0YSc6IHsgJ2xvY2F0aW9uJzogJ2EnIH0gfVxuY29uc3QgdW5mbGF0dGVuRGF0YSA9IHV0aWxzID0+IGhnZXRhbGxSZXNwb25zZSA9PiB7XG4gIGNvbnN0IGRhdGEgPSB7fVxuICBjb25zdCBfc2V0UHJvcGVydHlWYWx1ZSA9IHNldFByb3BlcnR5VmFsdWUoZGF0YSwgdXRpbHMpXG5cbiAgT2JqZWN0LmVudHJpZXMoaGdldGFsbFJlc3BvbnNlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBjb25zdCBwcm9wZXJ0eUNoYWluID0ga2V5LnNwbGl0KCc6JylcblxuICAgIHJldHVybiBfc2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eUNoYWluLCB2YWx1ZSlcbiAgfSlcblxuICByZXR1cm4gZGF0YVxufVxuXG5jb25zdCBjcmVhdGVOZXdNb2RlbE9iamVjdCA9IHJlZGlzQ2xpZW50ID0+IChrZXksIGRhdGEpID0+IHtcbiAgdmFsaWRhdGVEYXRhKGRhdGEpXG4gIHJldHVybiB7XG4gICAga2V5LFxuICAgIGRhdGEsXG4gICAgc2F2ZTogYXN5bmMgKCkgPT4gcmVkaXNDbGllbnQuaG1zZXQoa2V5LCAuLi5mbGF0dGVuRGF0YShkYXRhKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoeyByZWRpc0NsaWVudCwgdXRpbHMgfSkgPT4ge1xuICBjb25zdCBfY3JlYXRlTmV3TW9kZWxPYmplY3QgPSBjcmVhdGVOZXdNb2RlbE9iamVjdChyZWRpc0NsaWVudClcbiAgY29uc3QgX3VuZmxhdHRlbkRhdGEgPSB1bmZsYXR0ZW5EYXRhKHV0aWxzKVxuXG4gIHJldHVybiB7XG4gICAgLy8gQ3JlYXRlcyBhIG5ldyBtb2RlbCBvYmplY3RcbiAgICBjcmVhdGU6ICh7IGtleSwgZGF0YSB9KSA9PiBfY3JlYXRlTmV3TW9kZWxPYmplY3Qoa2V5LCBkYXRhKSxcbiAgICAvLyBGZXRjaGVzIGRhdGEgZnJvbSBkYiBhbmQgY3JlYXRlcyBhIG5ldyBtb2RlbCBvYmplY3RcbiAgICBnZXQ6IGFzeW5jIGtleSA9PiB7XG4gICAgICBjb25zdCBoZ2V0YWxsUmVzcG9uc2UgPSBhd2FpdCByZWRpc0NsaWVudC5oZ2V0YWxsKGtleSlcblxuICAgICAgaWYgKGhnZXRhbGxSZXNwb25zZSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYENvdWxkIG5vdCBmaW5kIGRhdGEgbWF0Y2hpbmcgdGhlIHByb3ZpZGVkIGtleSAoJHtrZXl9KWApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkYXRhID0gX3VuZmxhdHRlbkRhdGEoaGdldGFsbFJlc3BvbnNlKVxuXG4gICAgICAgIHJldHVybiBfY3JlYXRlTmV3TW9kZWxPYmplY3Qoa2V5LCBkYXRhKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19