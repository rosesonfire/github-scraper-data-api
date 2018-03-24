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
//   [ 'name', 'abc', 'code', 56, 'meta:location': 'a' ]
//   is mapped to
//   { 'name': 'abc', 'code': 56, 'meta': { 'location': 'a' } }
function unflattenData(flattenData, utils) {
  var data = {};
  var groupedData = utils.groupArrayItems(flattenData, 2);
  var _setPropertyValue = setPropertyValue(data, utils);

  groupedData.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    var propertyChain = key.split(':');

    return _setPropertyValue(propertyChain, value);
  });

  return data;
}

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
      var flattenData = hgetallResponse.slice(1);
      var data = unflattenData(flattenData, utils);

      return _createNewModelObject(key, data);
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL2xpYi9vZG0vcmVkaXNPRE0uanMiXSwibmFtZXMiOlsicmVjdXJzZSIsImZsYXR0ZW5EYXRhIiwiZW50cnkiLCJwcmVTdHJpbmciLCJrZXkiLCJ2YWx1ZSIsImluZGV4T2YiLCJFcnJvciIsIkFycmF5IiwiaXNBcnJheSIsIkRhdGUiLCJuZXdQcmVTdHJpbmciLCJ5IiwiZGF0YSIsImVudHJpZXMiLCJPYmplY3QiLCJpIiwibGVuIiwibGVuZ3RoIiwidmFsaWRhdGVEYXRhIiwic2V0UHJvcGVydHlWYWx1ZSIsIm9iaiIsInV0aWxzIiwicHJvcGVydHlDaGFpbiIsInRhaWxPYmplY3QiLCJmb2xkTGVmdCIsInByb3AiLCJwYXJlbnQiLCJjaGlsZCIsInVuZmxhdHRlbkRhdGEiLCJncm91cGVkRGF0YSIsImdyb3VwQXJyYXlJdGVtcyIsIl9zZXRQcm9wZXJ0eVZhbHVlIiwiZm9yRWFjaCIsInNwbGl0IiwiY3JlYXRlTmV3TW9kZWxPYmplY3QiLCJyZWRpc0NsaWVudCIsInNhdmUiLCJobXNldCIsIl9jcmVhdGVOZXdNb2RlbE9iamVjdCIsImNyZWF0ZSIsImdldCIsImhnZXRhbGxSZXNwb25zZSIsImhnZXRhbGwiLCJzbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O21EQUdXQSxPO29EQStCQUMsVzs7QUFoQ1g7QUFDQSxTQUFXRCxPQUFYLENBQW9CRSxLQUFwQixFQUEyQkMsU0FBM0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNRQyxhQURSLEdBQ2NGLE1BQU0sQ0FBTixDQURkO0FBRVFHLGVBRlIsR0FFZ0JILE1BQU0sQ0FBTixDQUZoQjs7QUFBQSxnQkFJTUUsSUFBSUUsT0FBSixDQUFZLEdBQVosTUFBcUIsQ0FBQyxDQUo1QjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxnQkFNVSxJQUFJQyxLQUFKLENBQVUsMENBQVYsQ0FOVjs7QUFBQTtBQUFBLGVBU01DLE1BQU1DLE9BQU4sQ0FBY0osS0FB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LHdCQUF3QkoscUJBQXFCQyxXQUFyQixDQUE5Qjs7QUFFQSxTQUFPO0FBQ0w7QUFDQUksWUFBUTtBQUFBLFVBQUdwQyxHQUFILFNBQUdBLEdBQUg7QUFBQSxVQUFRUyxJQUFSLFNBQVFBLElBQVI7QUFBQSxhQUFtQjBCLHNCQUFzQm5DLEdBQXRCLEVBQTJCUyxJQUEzQixDQUFuQjtBQUFBLEtBRkg7QUFHTDtBQUNBNEIsU0FBSyxtQkFBTXJDLEdBQU4sRUFBYTtBQUNoQixVQUFNc0Msa0JBQWtCLE1BQU1OLFlBQVlPLE9BQVosQ0FBb0J2QyxHQUFwQixDQUE5QjtBQUNBLFVBQU1ILGNBQWN5QyxnQkFBZ0JFLEtBQWhCLENBQXNCLENBQXRCLENBQXBCO0FBQ0EsVUFBTS9CLE9BQU9nQixjQUFjNUIsV0FBZCxFQUEyQnFCLEtBQTNCLENBQWI7O0FBRUEsYUFBT2lCLHNCQUFzQm5DLEdBQXRCLEVBQTJCUyxJQUEzQixDQUFQO0FBQ0Q7QUFWSSxHQUFQO0FBWUQsQyIsImZpbGUiOiJyZWRpc09ETS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnXG5cbi8vIFJlY3Vyc2l2ZWx5IGZsYXR0ZW5zIHRoZSBkYXRhXG5mdW5jdGlvbiAqIHJlY3Vyc2UgKGVudHJ5LCBwcmVTdHJpbmcpIHtcbiAgY29uc3Qga2V5ID0gZW50cnlbMF1cbiAgY29uc3QgdmFsdWUgPSBlbnRyeVsxXVxuXG4gIGlmIChrZXkuaW5kZXhPZignOicpICE9PSAtMSkge1xuICAgIC8vIFRPRE86IHVzZSBzb21lIGVzY2FwaW5nIG1lY2hhbmlzbSB0byBzdXBwb3J0IHRoaXNcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ09jY3VyZW5jZSBvZiBcIjpcIiBpbiBrZXkgaXMgbm90IHN1cHBvcnRlZCcpXG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5IGFzIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQnKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nIHx8IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHlpZWxkIGAke3ByZVN0cmluZ30ke2tleX1gXG4gICAgeWllbGQgdmFsdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3QgbmV3UHJlU3RyaW5nID0gYCR7cHJlU3RyaW5nfSR7a2V5fTpgXG5cbiAgICBmb3IgKGxldCB5IG9mIGZsYXR0ZW5EYXRhKHZhbHVlLCBuZXdQcmVTdHJpbmcpKSB7XG4gICAgICB5aWVsZCB5XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biB0eXBlJywgdHlwZW9mIHZhbHVlKVxuICB9XG59XG5cbi8vIEdlbmVyYXRlcyBhIGZsYXQgYXJyYXkgb2YgYW4gb2JqZWN0J3Mga2V5IGFuZCB2YWx1ZXNcbi8vIEV4YW1wbGU6XG4vLyAgIHsgJ25hbWUnOiAnYWJjJywgJ2NvZGUnOiA1NiwgJ21ldGEnOiB7ICdsb2NhdGlvbic6ICdhJyB9IH1cbi8vICAgaXMgZmxhdHRlbmVkIHRvXG4vLyAgIFsgJ25hbWUnLCAnYWJjJywgJ2NvZGUnLCA1NiwgJ21ldGE6bG9jYXRpb24nOiAnYScgXVxuZnVuY3Rpb24gKiBmbGF0dGVuRGF0YSAoZGF0YSwgcHJlU3RyaW5nID0gJycpIHtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGRhdGEpXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBlbnRyaWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgZW50cnkgPSBlbnRyaWVzW2ldXG4gICAgZm9yIChsZXQgeSBvZiByZWN1cnNlKGVudHJ5LCBwcmVTdHJpbmcpKSB7XG4gICAgICB5aWVsZCB5XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHZhbGlkYXRlRGF0YSA9IGRhdGEgPT4gWy4uLmZsYXR0ZW5EYXRhKGRhdGEpXVxuXG5jb25zdCBzZXRQcm9wZXJ0eVZhbHVlID0gKG9iaiwgdXRpbHMpID0+IChwcm9wZXJ0eUNoYWluLCB2YWx1ZSkgPT4ge1xuICAvLyBTZXQgdGhlIG9iamVjdCBjaGFpblxuICBjb25zdCB0YWlsT2JqZWN0ID1cbiAgICB1dGlscy5mb2xkTGVmdChwcm9wZXJ0eUNoYWluLCBbbnVsbCwgb2JqXSwgKFtwYXJlbnQsIGNoaWxkXSwgcHJvcCkgPT4ge1xuICAgICAgY2hpbGRbcHJvcF0gPSBjaGlsZFtwcm9wXSB8fCB7fVxuXG4gICAgICByZXR1cm4gW2NoaWxkLCBjaGlsZFtwcm9wXV1cbiAgICB9KVswXVxuXG4gIC8vIFNldCB0aGUgdmFsdWVcbiAgdGFpbE9iamVjdFtwcm9wZXJ0eUNoYWluW3Byb3BlcnR5Q2hhaW4ubGVuZ3RoIC0gMV1dID0gdmFsdWVcbn1cblxuLy8gR2VuZXJhdGVzIGFuIG9iamVjdCBmcm9tIGEgZmxhdHRlbmVkIGFycmF5IG9mIGFuIHRoZSBvYmplY3QncyBrZXkgYW5kIHZhbHVlc1xuLy8gRXhhbXBsZTpcbi8vICAgWyAnbmFtZScsICdhYmMnLCAnY29kZScsIDU2LCAnbWV0YTpsb2NhdGlvbic6ICdhJyBdXG4vLyAgIGlzIG1hcHBlZCB0b1xuLy8gICB7ICduYW1lJzogJ2FiYycsICdjb2RlJzogNTYsICdtZXRhJzogeyAnbG9jYXRpb24nOiAnYScgfSB9XG5mdW5jdGlvbiB1bmZsYXR0ZW5EYXRhIChmbGF0dGVuRGF0YSwgdXRpbHMpIHtcbiAgY29uc3QgZGF0YSA9IHt9XG4gIGNvbnN0IGdyb3VwZWREYXRhID0gdXRpbHMuZ3JvdXBBcnJheUl0ZW1zKGZsYXR0ZW5EYXRhLCAyKVxuICBjb25zdCBfc2V0UHJvcGVydHlWYWx1ZSA9IHNldFByb3BlcnR5VmFsdWUoZGF0YSwgdXRpbHMpXG5cbiAgZ3JvdXBlZERhdGEuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgY29uc3QgcHJvcGVydHlDaGFpbiA9IGtleS5zcGxpdCgnOicpXG5cbiAgICByZXR1cm4gX3NldFByb3BlcnR5VmFsdWUocHJvcGVydHlDaGFpbiwgdmFsdWUpXG4gIH0pXG5cbiAgcmV0dXJuIGRhdGFcbn1cblxuY29uc3QgY3JlYXRlTmV3TW9kZWxPYmplY3QgPSAocmVkaXNDbGllbnQpID0+IChrZXksIGRhdGEpID0+IHtcbiAgdmFsaWRhdGVEYXRhKGRhdGEpXG4gIHJldHVybiB7XG4gICAga2V5LFxuICAgIGRhdGEsXG4gICAgc2F2ZTogYXN5bmMgKCkgPT4gcmVkaXNDbGllbnQuaG1zZXQoa2V5LCAuLi5mbGF0dGVuRGF0YShkYXRhKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoeyByZWRpc0NsaWVudCwgdXRpbHMgfSkgPT4ge1xuICBjb25zdCBfY3JlYXRlTmV3TW9kZWxPYmplY3QgPSBjcmVhdGVOZXdNb2RlbE9iamVjdChyZWRpc0NsaWVudClcblxuICByZXR1cm4ge1xuICAgIC8vIENyZWF0ZXMgYSBuZXcgbW9kZWwgb2JqZWN0XG4gICAgY3JlYXRlOiAoeyBrZXksIGRhdGEgfSkgPT4gX2NyZWF0ZU5ld01vZGVsT2JqZWN0KGtleSwgZGF0YSksXG4gICAgLy8gRmV0Y2hlcyBkYXRhIGZyb20gZGIgYW5kIGNyZWF0ZXMgYSBuZXcgbW9kZWwgb2JqZWN0XG4gICAgZ2V0OiBhc3luYyBrZXkgPT4ge1xuICAgICAgY29uc3QgaGdldGFsbFJlc3BvbnNlID0gYXdhaXQgcmVkaXNDbGllbnQuaGdldGFsbChrZXkpXG4gICAgICBjb25zdCBmbGF0dGVuRGF0YSA9IGhnZXRhbGxSZXNwb25zZS5zbGljZSgxKVxuICAgICAgY29uc3QgZGF0YSA9IHVuZmxhdHRlbkRhdGEoZmxhdHRlbkRhdGEsIHV0aWxzKVxuXG4gICAgICByZXR1cm4gX2NyZWF0ZU5ld01vZGVsT2JqZWN0KGtleSwgZGF0YSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==