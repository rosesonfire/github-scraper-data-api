'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Helper function for creating ioc's
 * @param {function} instanceConstructor the constructor for creating the
 *   dependency instance
 * @param {Object} configurations the constructor arguments of primitive types.
 *   Structure:
 *     {
 *       <config1_name>: <config1_value>,
 *       <config2_name>: <config2_value>,
 *       ....
 *     }
 * @param {Object} dependencyInstances the constructor arguments which are
 *   passed directly. Structure:
 *     {
 *       <dependency1_name>: <dependency1_instance>,
 *       <dependency2_name>: <dependency2_instance>,
 *       ....
 *     }
 * @param {Object} dependencyConfig the dependency paths which are used to
 *   resolve the the dependencies through electrolyte. Structure:
 *     {
 *       <dependency1_name>: <dependency1_path>,
 *       <dependency2_name>: <dependency2_path>,
 *       ....
 *     }
 * @param {boolean} isSingleton if the dependency is a singleton
 */
var createNewInstance = exports.createNewInstance = function createNewInstance(_ref) {
  var instanceConstructor = _ref.instanceConstructor,
      _ref$configuration = _ref.configuration,
      configuration = _ref$configuration === undefined ? {} : _ref$configuration,
      _ref$dependencyInstan = _ref.dependencyInstances,
      dependencyInstances = _ref$dependencyInstan === undefined ? {} : _ref$dependencyInstan,
      _ref$dependencyConfig = _ref.dependencyConfig,
      dependencyConfig = _ref$dependencyConfig === undefined ? {} : _ref$dependencyConfig,
      _ref$isSingleton = _ref.isSingleton,
      isSingleton = _ref$isSingleton === undefined ? true : _ref$isSingleton;

  var dependencyNames = Object.keys(dependencyConfig);
  var dependencyPaths = Object.values(dependencyConfig);
  var constructorArguments = Object.assign(Object.assign({}, configuration), dependencyInstances);
  var newInstance = null;
  // This is the module.exports of the caller
  // iocDependencyInstances is injected by electrolyte
  var callerModuleExports = function callerModuleExports() {
    for (var _len = arguments.length, iocDependencyInstances = Array(_len), _key = 0; _key < _len; _key++) {
      iocDependencyInstances[_key] = arguments[_key];
    }

    dependencyNames.forEach(function (dependencyName, index) {
      constructorArguments[dependencyName] = iocDependencyInstances[index];
    });
    newInstance = instanceConstructor(constructorArguments);

    return newInstance;
  };

  // Export the dependency paths
  callerModuleExports['@require'] = dependencyPaths;
  // Export if the ioc is a singleton
  callerModuleExports['@singleton'] = isSingleton;

  return callerModuleExports;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pb2MvaW9jSGVscGVyLmpzIl0sIm5hbWVzIjpbImNyZWF0ZU5ld0luc3RhbmNlIiwiaW5zdGFuY2VDb25zdHJ1Y3RvciIsImNvbmZpZ3VyYXRpb24iLCJkZXBlbmRlbmN5SW5zdGFuY2VzIiwiZGVwZW5kZW5jeUNvbmZpZyIsImlzU2luZ2xldG9uIiwiZGVwZW5kZW5jeU5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImRlcGVuZGVuY3lQYXRocyIsInZhbHVlcyIsImNvbnN0cnVjdG9yQXJndW1lbnRzIiwiYXNzaWduIiwibmV3SW5zdGFuY2UiLCJjYWxsZXJNb2R1bGVFeHBvcnRzIiwiaW9jRGVwZW5kZW5jeUluc3RhbmNlcyIsImZvckVhY2giLCJkZXBlbmRlbmN5TmFtZSIsImluZGV4Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQk8sSUFBTUEsZ0RBQW9CLFNBQXBCQSxpQkFBb0IsT0FDMkM7QUFBQSxNQUR4Q0MsbUJBQ3dDLFFBRHhDQSxtQkFDd0M7QUFBQSxnQ0FEbkJDLGFBQ21CO0FBQUEsTUFEbkJBLGFBQ21CLHNDQURILEVBQ0c7QUFBQSxtQ0FBMUVDLG1CQUEwRTtBQUFBLE1BQTFFQSxtQkFBMEUseUNBQXBELEVBQW9EO0FBQUEsbUNBQWhEQyxnQkFBZ0Q7QUFBQSxNQUFoREEsZ0JBQWdELHlDQUE3QixFQUE2QjtBQUFBLDhCQUF6QkMsV0FBeUI7QUFBQSxNQUF6QkEsV0FBeUIsb0NBQVgsSUFBVzs7QUFDMUUsTUFBTUMsa0JBQWtCQyxPQUFPQyxJQUFQLENBQVlKLGdCQUFaLENBQXhCO0FBQ0EsTUFBTUssa0JBQWtCRixPQUFPRyxNQUFQLENBQWNOLGdCQUFkLENBQXhCO0FBQ0EsTUFBTU8sdUJBQ0pKLE9BQU9LLE1BQVAsQ0FBY0wsT0FBT0ssTUFBUCxDQUFjLEVBQWQsRUFBa0JWLGFBQWxCLENBQWQsRUFBZ0RDLG1CQUFoRCxDQURGO0FBRUEsTUFBSVUsY0FBYyxJQUFsQjtBQUNBO0FBQ0E7QUFDQSxNQUFNQyxzQkFBc0IsU0FBdEJBLG1CQUFzQixHQUErQjtBQUFBLHNDQUEzQkMsc0JBQTJCO0FBQTNCQSw0QkFBMkI7QUFBQTs7QUFDekRULG9CQUFnQlUsT0FBaEIsQ0FBd0IsVUFBQ0MsY0FBRCxFQUFpQkMsS0FBakIsRUFBMkI7QUFDakRQLDJCQUFxQk0sY0FBckIsSUFBdUNGLHVCQUF1QkcsS0FBdkIsQ0FBdkM7QUFDRCxLQUZEO0FBR0FMLGtCQUFjWixvQkFBb0JVLG9CQUFwQixDQUFkOztBQUVBLFdBQU9FLFdBQVA7QUFDRCxHQVBEOztBQVNBO0FBQ0FDLHNCQUFvQixVQUFwQixJQUFrQ0wsZUFBbEM7QUFDQTtBQUNBSyxzQkFBb0IsWUFBcEIsSUFBb0NULFdBQXBDOztBQUVBLFNBQU9TLG1CQUFQO0FBQ0QsQ0F4Qk0iLCJmaWxlIjoiaW9jSGVscGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGlvYydzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBpbnN0YW5jZUNvbnN0cnVjdG9yIHRoZSBjb25zdHJ1Y3RvciBmb3IgY3JlYXRpbmcgdGhlXG4gKiAgIGRlcGVuZGVuY3kgaW5zdGFuY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWd1cmF0aW9ucyB0aGUgY29uc3RydWN0b3IgYXJndW1lbnRzIG9mIHByaW1pdGl2ZSB0eXBlcy5cbiAqICAgU3RydWN0dXJlOlxuICogICAgIHtcbiAqICAgICAgIDxjb25maWcxX25hbWU+OiA8Y29uZmlnMV92YWx1ZT4sXG4gKiAgICAgICA8Y29uZmlnMl9uYW1lPjogPGNvbmZpZzJfdmFsdWU+LFxuICogICAgICAgLi4uLlxuICogICAgIH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXBlbmRlbmN5SW5zdGFuY2VzIHRoZSBjb25zdHJ1Y3RvciBhcmd1bWVudHMgd2hpY2ggYXJlXG4gKiAgIHBhc3NlZCBkaXJlY3RseS4gU3RydWN0dXJlOlxuICogICAgIHtcbiAqICAgICAgIDxkZXBlbmRlbmN5MV9uYW1lPjogPGRlcGVuZGVuY3kxX2luc3RhbmNlPixcbiAqICAgICAgIDxkZXBlbmRlbmN5Ml9uYW1lPjogPGRlcGVuZGVuY3kyX2luc3RhbmNlPixcbiAqICAgICAgIC4uLi5cbiAqICAgICB9XG4gKiBAcGFyYW0ge09iamVjdH0gZGVwZW5kZW5jeUNvbmZpZyB0aGUgZGVwZW5kZW5jeSBwYXRocyB3aGljaCBhcmUgdXNlZCB0b1xuICogICByZXNvbHZlIHRoZSB0aGUgZGVwZW5kZW5jaWVzIHRocm91Z2ggZWxlY3Ryb2x5dGUuIFN0cnVjdHVyZTpcbiAqICAgICB7XG4gKiAgICAgICA8ZGVwZW5kZW5jeTFfbmFtZT46IDxkZXBlbmRlbmN5MV9wYXRoPixcbiAqICAgICAgIDxkZXBlbmRlbmN5Ml9uYW1lPjogPGRlcGVuZGVuY3kyX3BhdGg+LFxuICogICAgICAgLi4uLlxuICogICAgIH1cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTaW5nbGV0b24gaWYgdGhlIGRlcGVuZGVuY3kgaXMgYSBzaW5nbGV0b25cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZU5ld0luc3RhbmNlID0gKHsgaW5zdGFuY2VDb25zdHJ1Y3RvciwgY29uZmlndXJhdGlvbiA9IHt9LFxuICBkZXBlbmRlbmN5SW5zdGFuY2VzID0ge30sIGRlcGVuZGVuY3lDb25maWcgPSB7fSwgaXNTaW5nbGV0b24gPSB0cnVlIH0pID0+IHtcbiAgY29uc3QgZGVwZW5kZW5jeU5hbWVzID0gT2JqZWN0LmtleXMoZGVwZW5kZW5jeUNvbmZpZylcbiAgY29uc3QgZGVwZW5kZW5jeVBhdGhzID0gT2JqZWN0LnZhbHVlcyhkZXBlbmRlbmN5Q29uZmlnKVxuICBjb25zdCBjb25zdHJ1Y3RvckFyZ3VtZW50cyA9XG4gICAgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb25maWd1cmF0aW9uKSwgZGVwZW5kZW5jeUluc3RhbmNlcylcbiAgbGV0IG5ld0luc3RhbmNlID0gbnVsbFxuICAvLyBUaGlzIGlzIHRoZSBtb2R1bGUuZXhwb3J0cyBvZiB0aGUgY2FsbGVyXG4gIC8vIGlvY0RlcGVuZGVuY3lJbnN0YW5jZXMgaXMgaW5qZWN0ZWQgYnkgZWxlY3Ryb2x5dGVcbiAgY29uc3QgY2FsbGVyTW9kdWxlRXhwb3J0cyA9ICguLi5pb2NEZXBlbmRlbmN5SW5zdGFuY2VzKSA9PiB7XG4gICAgZGVwZW5kZW5jeU5hbWVzLmZvckVhY2goKGRlcGVuZGVuY3lOYW1lLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3RydWN0b3JBcmd1bWVudHNbZGVwZW5kZW5jeU5hbWVdID0gaW9jRGVwZW5kZW5jeUluc3RhbmNlc1tpbmRleF1cbiAgICB9KVxuICAgIG5ld0luc3RhbmNlID0gaW5zdGFuY2VDb25zdHJ1Y3Rvcihjb25zdHJ1Y3RvckFyZ3VtZW50cylcblxuICAgIHJldHVybiBuZXdJbnN0YW5jZVxuICB9XG5cbiAgLy8gRXhwb3J0IHRoZSBkZXBlbmRlbmN5IHBhdGhzXG4gIGNhbGxlck1vZHVsZUV4cG9ydHNbJ0ByZXF1aXJlJ10gPSBkZXBlbmRlbmN5UGF0aHNcbiAgLy8gRXhwb3J0IGlmIHRoZSBpb2MgaXMgYSBzaW5nbGV0b25cbiAgY2FsbGVyTW9kdWxlRXhwb3J0c1snQHNpbmdsZXRvbiddID0gaXNTaW5nbGV0b25cblxuICByZXR1cm4gY2FsbGVyTW9kdWxlRXhwb3J0c1xufVxuIl19