import { createNewInstance } from './iocHelper'
import routes from './../main/routes'

exports = module.exports = createNewInstance({
  instanceConstructor: routes,
  dependencyConfig: {
    dataController: 'controllers/dataController'
  }
})
