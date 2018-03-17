'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dependencies = undefined;

var _electrolyte = require('electrolyte');

var _electrolyte2 = _interopRequireDefault(_electrolyte);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electrolyte2.default.use(_electrolyte2.default.dir('dist/ioc'));

var dependencies = exports.dependencies = {
  app: _electrolyte2.default.create('lib/wrappers/expressWrapper')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pb2MvaW5kZXguanMiXSwibmFtZXMiOlsidXNlIiwiZGlyIiwiZGVwZW5kZW5jaWVzIiwiYXBwIiwiY3JlYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUVBLHNCQUFJQSxHQUFKLENBQVEsc0JBQUlDLEdBQUosQ0FBUSxVQUFSLENBQVI7O0FBRU8sSUFBTUMsc0NBQWU7QUFDMUJDLE9BQUssc0JBQUlDLE1BQUosQ0FBVyw2QkFBWDtBQURxQixDQUFyQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJb0MgZnJvbSAnZWxlY3Ryb2x5dGUnXG5cbklvQy51c2UoSW9DLmRpcignZGlzdC9pb2MnKSlcblxuZXhwb3J0IGNvbnN0IGRlcGVuZGVuY2llcyA9IHtcbiAgYXBwOiBJb0MuY3JlYXRlKCdsaWIvd3JhcHBlcnMvZXhwcmVzc1dyYXBwZXInKVxufVxuIl19