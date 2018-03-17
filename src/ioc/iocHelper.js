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
export const createNewInstance = ({ instanceConstructor, configuration = {},
  dependencyInstances = {}, dependencyConfig = {}, isSingleton = true }) => {
  const dependencyNames = Object.keys(dependencyConfig)
  const dependencyPaths = Object.values(dependencyConfig)
  const constructorArguments =
    Object.assign(Object.assign({}, configuration), dependencyInstances)
  let newInstance = null
  // This is the module.exports of the caller
  // iocDependencyInstances is injected by electrolyte
  const callerModuleExports = (...iocDependencyInstances) => {
    dependencyNames.forEach((dependencyName, index) => {
      constructorArguments[dependencyName] = iocDependencyInstances[index]
    })
    newInstance = instanceConstructor(constructorArguments)

    return newInstance
  }

  // Export the dependency paths
  callerModuleExports['@require'] = dependencyPaths
  // Export if the ioc is a singleton
  callerModuleExports['@singleton'] = isSingleton

  return callerModuleExports
}
