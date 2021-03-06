'use strict';

var _jsUtils = require('js-utils');

var _routes = require('./../main/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = _jsUtils.utils.iocHelper.createNewInstance({
  instanceConstructor: _routes2.default,
  dependencyConfig: {
    dataController: 'controllers/dataController'
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pb2Mvcm91dGVzLmpzIl0sIm5hbWVzIjpbImV4cG9ydHMiLCJtb2R1bGUiLCJpb2NIZWxwZXIiLCJjcmVhdGVOZXdJbnN0YW5jZSIsImluc3RhbmNlQ29uc3RydWN0b3IiLCJkZXBlbmRlbmN5Q29uZmlnIiwiZGF0YUNvbnRyb2xsZXIiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7Ozs7OztBQUVBQSxVQUFVQyxPQUFPRCxPQUFQLEdBQWlCLGVBQU1FLFNBQU4sQ0FBZ0JDLGlCQUFoQixDQUFrQztBQUMzREMsdUNBRDJEO0FBRTNEQyxvQkFBa0I7QUFDaEJDLG9CQUFnQjtBQURBO0FBRnlDLENBQWxDLENBQTNCIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWxzIH0gZnJvbSAnanMtdXRpbHMnXG5cbmltcG9ydCByb3V0ZXMgZnJvbSAnLi8uLi9tYWluL3JvdXRlcydcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdXRpbHMuaW9jSGVscGVyLmNyZWF0ZU5ld0luc3RhbmNlKHtcbiAgaW5zdGFuY2VDb25zdHJ1Y3Rvcjogcm91dGVzLFxuICBkZXBlbmRlbmN5Q29uZmlnOiB7XG4gICAgZGF0YUNvbnRyb2xsZXI6ICdjb250cm9sbGVycy9kYXRhQ29udHJvbGxlcidcbiAgfVxufSlcbiJdfQ==