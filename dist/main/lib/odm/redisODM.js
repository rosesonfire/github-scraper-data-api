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

// Generates an object from a flattened array of an the object's key and values
// Example:
//   [ 'name', 'abc', 'code', 56, 'meta:location': 'a' ]
//   is mapped to
//   { 'name': 'abc', 'code': 56, 'meta': { 'location': 'a' } }
function mapToData(flattenData) {
  var data = {};
  // for (let i = 0, len = flattenData.length; i < len; i += 2) {
  //   if (flattenData[i + 1])
  //   data[flattenData[i]] = flattenData[i + 1]
  // }
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

exports.default = function (_ref) {
  var redisClient = _ref.redisClient;

  var _createNewModelObject = createNewModelObject(redisClient);

  return {
    // Creates a new model object
    create: function create(_ref2) {
      var key = _ref2.key,
          data = _ref2.data;
      return _createNewModelObject(key, data);
    },
    // Fetches data from db and creates a new model object
    get: async function get(key) {
      var flattenData = await redisClient.hgetall(key);
      var data = mapToData(flattenData);

      return _createNewModelObject(key, data);
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL2xpYi9vZG0vcmVkaXNPRE0uanMiXSwibmFtZXMiOlsicmVjdXJzZSIsImZsYXR0ZW5EYXRhIiwiZW50cnkiLCJwcmVTdHJpbmciLCJrZXkiLCJ2YWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsIkVycm9yIiwiaW5kZXhPZiIsIkRhdGUiLCJuZXdQcmVTdHJpbmciLCJ5IiwiZGF0YSIsImVudHJpZXMiLCJPYmplY3QiLCJpIiwibGVuIiwibGVuZ3RoIiwidmFsaWRhdGVEYXRhIiwibWFwVG9EYXRhIiwiY3JlYXRlTmV3TW9kZWxPYmplY3QiLCJyZWRpc0NsaWVudCIsInNhdmUiLCJobXNldCIsIl9jcmVhdGVOZXdNb2RlbE9iamVjdCIsImNyZWF0ZSIsImdldCIsImhnZXRhbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7bURBR1dBLE87b0RBa0NBQyxXOztBQW5DWDtBQUNBLFNBQVdELE9BQVgsQ0FBb0JFLEtBQXBCLEVBQTJCQyxTQUEzQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1FDLGFBRFIsR0FDY0YsTUFBTSxDQUFOLENBRGQ7QUFFUUcsZUFGUixHQUVnQkgsTUFBTSxDQUFOLENBRmhCOztBQUFBLGVBSU1JLE1BQU1DLE9BQU4sQ0FBY0YsS0FBZCxDQUpOO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdCQUtVLElBQUlHLEtBQUosQ0FBVSxpQ0FBVixDQUxWOztBQUFBO0FBQUEsZ0JBTWEsT0FBT0gsS0FBUCxLQUFpQixRQU45QjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxnQkFPUUEsTUFBTUksT0FBTixDQUFjLEdBQWQsTUFBdUIsQ0FBQyxDQVBoQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHNCQVFlTixTQVJmLEdBUTJCQyxHQVIzQjs7QUFBQTtBQUFBO0FBQUEsaUJBU1lDLEtBVFo7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsZ0JBWVksSUFBSUcsS0FBSixDQUFVLG1EQUFWLENBWlo7O0FB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QUE3Qjs7a0JBU2UsZ0JBQXFCO0FBQUEsTUFBbEJTLFdBQWtCLFFBQWxCQSxXQUFrQjs7QUFDbEMsTUFBTUcsd0JBQXdCSixxQkFBcUJDLFdBQXJCLENBQTlCOztBQUVBLFNBQU87QUFDTDtBQUNBSSxZQUFRO0FBQUEsVUFBR3RCLEdBQUgsU0FBR0EsR0FBSDtBQUFBLFVBQVFTLElBQVIsU0FBUUEsSUFBUjtBQUFBLGFBQW1CWSxzQkFBc0JyQixHQUF0QixFQUEyQlMsSUFBM0IsQ0FBbkI7QUFBQSxLQUZIO0FBR0w7QUFDQWMsU0FBSyxtQkFBTXZCLEdBQU4sRUFBYTtBQUNoQixVQUFNSCxjQUFjLE1BQU1xQixZQUFZTSxPQUFaLENBQW9CeEIsR0FBcEIsQ0FBMUI7QUFDQSxVQUFNUyxPQUFPTyxVQUFVbkIsV0FBVixDQUFiOztBQUVBLGFBQU93QixzQkFBc0JyQixHQUF0QixFQUEyQlMsSUFBM0IsQ0FBUDtBQUNEO0FBVEksR0FBUDtBQVdELEMiLCJmaWxlIjoicmVkaXNPRE0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG4vLyBSZWN1cnNpdmVseSBmbGF0dGVucyB0aGUgZGF0YVxuZnVuY3Rpb24gKiByZWN1cnNlIChlbnRyeSwgcHJlU3RyaW5nKSB7XG4gIGNvbnN0IGtleSA9IGVudHJ5WzBdXG4gIGNvbnN0IHZhbHVlID0gZW50cnlbMV1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5IGFzIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQnKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodmFsdWUuaW5kZXhPZignOicpID09PSAtMSkge1xuICAgICAgeWllbGQgYCR7cHJlU3RyaW5nfSR7a2V5fWBcbiAgICAgIHlpZWxkIHZhbHVlXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE86IHVzZSBzb21lIGVzY2FwaW5nIG1lY2hhbmlzbSB0byBzdXBwb3J0IHRoaXNcbiAgICAgIHRocm93IG5ldyBFcnJvcignT2NjdXJlbmNlIG9mIFwiOlwiIGluIHN0cmluZyB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkJylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nIHx8IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHlpZWxkIGAke3ByZVN0cmluZ30ke2tleX1gXG4gICAgeWllbGQgdmFsdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3QgbmV3UHJlU3RyaW5nID0gYCR7cHJlU3RyaW5nfSR7a2V5fTpgXG5cbiAgICBmb3IgKGxldCB5IG9mIGZsYXR0ZW5EYXRhKHZhbHVlLCBuZXdQcmVTdHJpbmcpKSB7XG4gICAgICB5aWVsZCB5XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biB0eXBlJywgdHlwZW9mIHZhbHVlKVxuICB9XG59XG5cbi8vIEdlbmVyYXRlcyBhIGZsYXQgYXJyYXkgb2YgYW4gb2JqZWN0J3Mga2V5IGFuZCB2YWx1ZXNcbi8vIEV4YW1wbGU6XG4vLyAgIHsgJ25hbWUnOiAnYWJjJywgJ2NvZGUnOiA1NiwgJ21ldGEnOiB7ICdsb2NhdGlvbic6ICdhJyB9IH1cbi8vICAgaXMgZmxhdHRlbmVkIHRvXG4vLyAgIFsgJ25hbWUnLCAnYWJjJywgJ2NvZGUnLCA1NiwgJ21ldGE6bG9jYXRpb24nOiAnYScgXVxuZnVuY3Rpb24gKiBmbGF0dGVuRGF0YSAoZGF0YSwgcHJlU3RyaW5nID0gJycpIHtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGRhdGEpXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBlbnRyaWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgZW50cnkgPSBlbnRyaWVzW2ldXG4gICAgZm9yIChsZXQgeSBvZiByZWN1cnNlKGVudHJ5LCBwcmVTdHJpbmcpKSB7XG4gICAgICB5aWVsZCB5XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHZhbGlkYXRlRGF0YSA9IGRhdGEgPT4gWy4uLmZsYXR0ZW5EYXRhKGRhdGEpXVxuXG4vLyBHZW5lcmF0ZXMgYW4gb2JqZWN0IGZyb20gYSBmbGF0dGVuZWQgYXJyYXkgb2YgYW4gdGhlIG9iamVjdCdzIGtleSBhbmQgdmFsdWVzXG4vLyBFeGFtcGxlOlxuLy8gICBbICduYW1lJywgJ2FiYycsICdjb2RlJywgNTYsICdtZXRhOmxvY2F0aW9uJzogJ2EnIF1cbi8vICAgaXMgbWFwcGVkIHRvXG4vLyAgIHsgJ25hbWUnOiAnYWJjJywgJ2NvZGUnOiA1NiwgJ21ldGEnOiB7ICdsb2NhdGlvbic6ICdhJyB9IH1cbmZ1bmN0aW9uIG1hcFRvRGF0YSAoZmxhdHRlbkRhdGEpIHtcbiAgY29uc3QgZGF0YSA9IHt9XG4gIC8vIGZvciAobGV0IGkgPSAwLCBsZW4gPSBmbGF0dGVuRGF0YS5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMikge1xuICAvLyAgIGlmIChmbGF0dGVuRGF0YVtpICsgMV0pXG4gIC8vICAgZGF0YVtmbGF0dGVuRGF0YVtpXV0gPSBmbGF0dGVuRGF0YVtpICsgMV1cbiAgLy8gfVxuICByZXR1cm4gZGF0YVxufVxuXG5jb25zdCBjcmVhdGVOZXdNb2RlbE9iamVjdCA9IChyZWRpc0NsaWVudCkgPT4gKGtleSwgZGF0YSkgPT4ge1xuICB2YWxpZGF0ZURhdGEoZGF0YSlcbiAgcmV0dXJuIHtcbiAgICBrZXksXG4gICAgZGF0YSxcbiAgICBzYXZlOiBhc3luYyAoKSA9PiByZWRpc0NsaWVudC5obXNldChrZXksIC4uLmZsYXR0ZW5EYXRhKGRhdGEpKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0ICh7IHJlZGlzQ2xpZW50IH0pID0+IHtcbiAgY29uc3QgX2NyZWF0ZU5ld01vZGVsT2JqZWN0ID0gY3JlYXRlTmV3TW9kZWxPYmplY3QocmVkaXNDbGllbnQpXG5cbiAgcmV0dXJuIHtcbiAgICAvLyBDcmVhdGVzIGEgbmV3IG1vZGVsIG9iamVjdFxuICAgIGNyZWF0ZTogKHsga2V5LCBkYXRhIH0pID0+IF9jcmVhdGVOZXdNb2RlbE9iamVjdChrZXksIGRhdGEpLFxuICAgIC8vIEZldGNoZXMgZGF0YSBmcm9tIGRiIGFuZCBjcmVhdGVzIGEgbmV3IG1vZGVsIG9iamVjdFxuICAgIGdldDogYXN5bmMga2V5ID0+IHtcbiAgICAgIGNvbnN0IGZsYXR0ZW5EYXRhID0gYXdhaXQgcmVkaXNDbGllbnQuaGdldGFsbChrZXkpXG4gICAgICBjb25zdCBkYXRhID0gbWFwVG9EYXRhKGZsYXR0ZW5EYXRhKVxuXG4gICAgICByZXR1cm4gX2NyZWF0ZU5ld01vZGVsT2JqZWN0KGtleSwgZGF0YSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==