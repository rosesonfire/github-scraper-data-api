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

          if (!Array.isArray(value)) {
            _context.next = 6;
            break;
          }

          throw new Error('Array as value is not supported');

        case 6:
          if (!(typeof value === 'string')) {
            _context.next = 17;
            break;
          }

          if (!(value.indexOf(':') === -1)) {
            _context.next = 14;
            break;
          }

          _context.next = 10;
          return '' + preString + key;

        case 10:
          _context.next = 12;
          return value;

        case 12:
          _context.next = 15;
          break;

        case 14:
          throw new Error('Occurence of ":" in string value is not supported');

        case 15:
          _context.next = 55;
          break;

        case 17:
          if (!(typeof value === 'number' || typeof value === 'boolean' || value instanceof Date)) {
            _context.next = 24;
            break;
          }

          _context.next = 20;
          return '' + preString + key;

        case 20:
          _context.next = 22;
          return value;

        case 22:
          _context.next = 55;
          break;

        case 24:
          if (!((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object')) {
            _context.next = 54;
            break;
          }

          newPreString = '' + preString + key + ':';
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 29;
          _iterator = flattenData(value, newPreString)[Symbol.iterator]();

        case 31:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 38;
            break;
          }

          y = _step.value;
          _context.next = 35;
          return y;

        case 35:
          _iteratorNormalCompletion = true;
          _context.next = 31;
          break;

        case 38:
          _context.next = 44;
          break;

        case 40:
          _context.prev = 40;
          _context.t0 = _context['catch'](29);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 44:
          _context.prev = 44;
          _context.prev = 45;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 47:
          _context.prev = 47;

          if (!_didIteratorError) {
            _context.next = 50;
            break;
          }

          throw _iteratorError;

        case 50:
          return _context.finish(47);

        case 51:
          return _context.finish(44);

        case 52:
          _context.next = 55;
          break;

        case 54:
          throw new Error('unknown type', typeof value === 'undefined' ? 'undefined' : _typeof(value));

        case 55:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[29, 40, 44, 52], [45,, 47, 51]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL2xpYi9vZG0vcmVkaXNPRE0uanMiXSwibmFtZXMiOlsicmVjdXJzZSIsImZsYXR0ZW5EYXRhIiwiZW50cnkiLCJwcmVTdHJpbmciLCJrZXkiLCJ2YWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsIkVycm9yIiwiaW5kZXhPZiIsIkRhdGUiLCJuZXdQcmVTdHJpbmciLCJ5IiwiZGF0YSIsImVudHJpZXMiLCJPYmplY3QiLCJpIiwibGVuIiwibGVuZ3RoIiwidmFsaWRhdGVEYXRhIiwic2V0UHJvcGVydHlWYWx1ZSIsIm9iaiIsInV0aWxzIiwicHJvcGVydHlDaGFpbiIsInRhaWxPYmplY3QiLCJmb2xkTGVmdCIsInByb3AiLCJwYXJlbnQiLCJjaGlsZCIsInVuZmxhdHRlbkRhdGEiLCJncm91cGVkRGF0YSIsImdyb3VwQXJyYXlJdGVtcyIsIl9zZXRQcm9wZXJ0eVZhbHVlIiwiZm9yRWFjaCIsInNwbGl0IiwiY3JlYXRlTmV3TW9kZWxPYmplY3QiLCJyZWRpc0NsaWVudCIsInNhdmUiLCJobXNldCIsIl9jcmVhdGVOZXdNb2RlbE9iamVjdCIsImNyZWF0ZSIsImdldCIsImhnZXRhbGxSZXNwb25zZSIsImhnZXRhbGwiLCJzbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O21EQUdXQSxPO29EQWtDQUMsVzs7QUFuQ1g7QUFDQSxTQUFXRCxPQUFYLENBQW9CRSxLQUFwQixFQUEyQkMsU0FBM0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNRQyxhQURSLEdBQ2NGLE1BQU0sQ0FBTixDQURkO0FBRVFHLGVBRlIsR0FFZ0JILE1BQU0sQ0FBTixDQUZoQjs7QUFBQSxlQUlNSSxNQUFNQyxPQUFOLENBQWNGLEtBQWQsQ0FKTjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxnQkFLVSxJQUFJRyxLQUFKLENBQVUsaUNBQVYsQ0FMVjs7QUFBQTtBQUFBLGdCQU1hLE9BQU9ILEtBQVAsS0FBaUIsUUFOOUI7QUFBQTtBQUFB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QixHQUFaO0FBQUE7QUFIRCxLQUFQO0FBS0QsR0FQNEI7QUFBQSxDQUE3Qjs7a0JBU2UsaUJBQTRCO0FBQUEsTUFBekJ1QixXQUF5QixTQUF6QkEsV0FBeUI7QUFBQSxNQUFaZCxLQUFZLFNBQVpBLEtBQVk7O0FBQ3pDLE1BQU1pQix3QkFBd0JKLHFCQUFxQkMsV0FBckIsQ0FBOUI7O0FBRUEsU0FBTztBQUNMO0FBQ0FJLFlBQVE7QUFBQSxVQUFHcEMsR0FBSCxTQUFHQSxHQUFIO0FBQUEsVUFBUVMsSUFBUixTQUFRQSxJQUFSO0FBQUEsYUFBbUIwQixzQkFBc0JuQyxHQUF0QixFQUEyQlMsSUFBM0IsQ0FBbkI7QUFBQSxLQUZIO0FBR0w7QUFDQTRCLFNBQUssbUJBQU1yQyxHQUFOLEVBQWE7QUFDaEIsVUFBTXNDLGtCQUFrQixNQUFNTixZQUFZTyxPQUFaLENBQW9CdkMsR0FBcEIsQ0FBOUI7QUFDQSxVQUFNSCxjQUFjeUMsZ0JBQWdCRSxLQUFoQixDQUFzQixDQUF0QixDQUFwQjtBQUNBLFVBQU0vQixPQUFPZ0IsY0FBYzVCLFdBQWQsRUFBMkJxQixLQUEzQixDQUFiOztBQUVBLGFBQU9pQixzQkFBc0JuQyxHQUF0QixFQUEyQlMsSUFBM0IsQ0FBUDtBQUNEO0FBVkksR0FBUDtBQVlELEMiLCJmaWxlIjoicmVkaXNPRE0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG4vLyBSZWN1cnNpdmVseSBmbGF0dGVucyB0aGUgZGF0YVxuZnVuY3Rpb24gKiByZWN1cnNlIChlbnRyeSwgcHJlU3RyaW5nKSB7XG4gIGNvbnN0IGtleSA9IGVudHJ5WzBdXG4gIGNvbnN0IHZhbHVlID0gZW50cnlbMV1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5IGFzIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQnKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodmFsdWUuaW5kZXhPZignOicpID09PSAtMSkge1xuICAgICAgeWllbGQgYCR7cHJlU3RyaW5nfSR7a2V5fWBcbiAgICAgIHlpZWxkIHZhbHVlXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE86IHVzZSBzb21lIGVzY2FwaW5nIG1lY2hhbmlzbSB0byBzdXBwb3J0IHRoaXNcbiAgICAgIHRocm93IG5ldyBFcnJvcignT2NjdXJlbmNlIG9mIFwiOlwiIGluIHN0cmluZyB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkJylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nIHx8IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHlpZWxkIGAke3ByZVN0cmluZ30ke2tleX1gXG4gICAgeWllbGQgdmFsdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3QgbmV3UHJlU3RyaW5nID0gYCR7cHJlU3RyaW5nfSR7a2V5fTpgXG5cbiAgICBmb3IgKGxldCB5IG9mIGZsYXR0ZW5EYXRhKHZhbHVlLCBuZXdQcmVTdHJpbmcpKSB7XG4gICAgICB5aWVsZCB5XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biB0eXBlJywgdHlwZW9mIHZhbHVlKVxuICB9XG59XG5cbi8vIEdlbmVyYXRlcyBhIGZsYXQgYXJyYXkgb2YgYW4gb2JqZWN0J3Mga2V5IGFuZCB2YWx1ZXNcbi8vIEV4YW1wbGU6XG4vLyAgIHsgJ25hbWUnOiAnYWJjJywgJ2NvZGUnOiA1NiwgJ21ldGEnOiB7ICdsb2NhdGlvbic6ICdhJyB9IH1cbi8vICAgaXMgZmxhdHRlbmVkIHRvXG4vLyAgIFsgJ25hbWUnLCAnYWJjJywgJ2NvZGUnLCA1NiwgJ21ldGE6bG9jYXRpb24nOiAnYScgXVxuZnVuY3Rpb24gKiBmbGF0dGVuRGF0YSAoZGF0YSwgcHJlU3RyaW5nID0gJycpIHtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGRhdGEpXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBlbnRyaWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgZW50cnkgPSBlbnRyaWVzW2ldXG4gICAgZm9yIChsZXQgeSBvZiByZWN1cnNlKGVudHJ5LCBwcmVTdHJpbmcpKSB7XG4gICAgICB5aWVsZCB5XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHZhbGlkYXRlRGF0YSA9IGRhdGEgPT4gWy4uLmZsYXR0ZW5EYXRhKGRhdGEpXVxuXG5jb25zdCBzZXRQcm9wZXJ0eVZhbHVlID0gKG9iaiwgdXRpbHMpID0+IChwcm9wZXJ0eUNoYWluLCB2YWx1ZSkgPT4ge1xuICAvLyBTZXQgdGhlIG9iamVjdCBjaGFpblxuICBjb25zdCB0YWlsT2JqZWN0ID1cbiAgICB1dGlscy5mb2xkTGVmdChwcm9wZXJ0eUNoYWluLCBbbnVsbCwgb2JqXSwgKFtwYXJlbnQsIGNoaWxkXSwgcHJvcCkgPT4ge1xuICAgICAgY2hpbGRbcHJvcF0gPSBjaGlsZFtwcm9wXSB8fCB7fVxuXG4gICAgICByZXR1cm4gW2NoaWxkLCBjaGlsZFtwcm9wXV1cbiAgICB9KVswXVxuXG4gIC8vIFNldCB0aGUgdmFsdWVcbiAgdGFpbE9iamVjdFtwcm9wZXJ0eUNoYWluW3Byb3BlcnR5Q2hhaW4ubGVuZ3RoIC0gMV1dID0gdmFsdWVcbn1cblxuLy8gR2VuZXJhdGVzIGFuIG9iamVjdCBmcm9tIGEgZmxhdHRlbmVkIGFycmF5IG9mIGFuIHRoZSBvYmplY3QncyBrZXkgYW5kIHZhbHVlc1xuLy8gRXhhbXBsZTpcbi8vICAgWyAnbmFtZScsICdhYmMnLCAnY29kZScsIDU2LCAnbWV0YTpsb2NhdGlvbic6ICdhJyBdXG4vLyAgIGlzIG1hcHBlZCB0b1xuLy8gICB7ICduYW1lJzogJ2FiYycsICdjb2RlJzogNTYsICdtZXRhJzogeyAnbG9jYXRpb24nOiAnYScgfSB9XG5mdW5jdGlvbiB1bmZsYXR0ZW5EYXRhIChmbGF0dGVuRGF0YSwgdXRpbHMpIHtcbiAgY29uc3QgZGF0YSA9IHt9XG4gIGNvbnN0IGdyb3VwZWREYXRhID0gdXRpbHMuZ3JvdXBBcnJheUl0ZW1zKGZsYXR0ZW5EYXRhLCAyKVxuICBjb25zdCBfc2V0UHJvcGVydHlWYWx1ZSA9IHNldFByb3BlcnR5VmFsdWUoZGF0YSwgdXRpbHMpXG5cbiAgZ3JvdXBlZERhdGEuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgY29uc3QgcHJvcGVydHlDaGFpbiA9IGtleS5zcGxpdCgnOicpXG5cbiAgICByZXR1cm4gX3NldFByb3BlcnR5VmFsdWUocHJvcGVydHlDaGFpbiwgdmFsdWUpXG4gIH0pXG5cbiAgcmV0dXJuIGRhdGFcbn1cblxuY29uc3QgY3JlYXRlTmV3TW9kZWxPYmplY3QgPSAocmVkaXNDbGllbnQpID0+IChrZXksIGRhdGEpID0+IHtcbiAgdmFsaWRhdGVEYXRhKGRhdGEpXG4gIHJldHVybiB7XG4gICAga2V5LFxuICAgIGRhdGEsXG4gICAgc2F2ZTogYXN5bmMgKCkgPT4gcmVkaXNDbGllbnQuaG1zZXQoa2V5LCAuLi5mbGF0dGVuRGF0YShkYXRhKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoeyByZWRpc0NsaWVudCwgdXRpbHMgfSkgPT4ge1xuICBjb25zdCBfY3JlYXRlTmV3TW9kZWxPYmplY3QgPSBjcmVhdGVOZXdNb2RlbE9iamVjdChyZWRpc0NsaWVudClcblxuICByZXR1cm4ge1xuICAgIC8vIENyZWF0ZXMgYSBuZXcgbW9kZWwgb2JqZWN0XG4gICAgY3JlYXRlOiAoeyBrZXksIGRhdGEgfSkgPT4gX2NyZWF0ZU5ld01vZGVsT2JqZWN0KGtleSwgZGF0YSksXG4gICAgLy8gRmV0Y2hlcyBkYXRhIGZyb20gZGIgYW5kIGNyZWF0ZXMgYSBuZXcgbW9kZWwgb2JqZWN0XG4gICAgZ2V0OiBhc3luYyBrZXkgPT4ge1xuICAgICAgY29uc3QgaGdldGFsbFJlc3BvbnNlID0gYXdhaXQgcmVkaXNDbGllbnQuaGdldGFsbChrZXkpXG4gICAgICBjb25zdCBmbGF0dGVuRGF0YSA9IGhnZXRhbGxSZXNwb25zZS5zbGljZSgxKVxuICAgICAgY29uc3QgZGF0YSA9IHVuZmxhdHRlbkRhdGEoZmxhdHRlbkRhdGEsIHV0aWxzKVxuXG4gICAgICByZXR1cm4gX2NyZWF0ZU5ld01vZGVsT2JqZWN0KGtleSwgZGF0YSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==