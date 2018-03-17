import { createNewInstance } from './../iocHelper'
import dataController from './../../main/controllers/dataController'

exports = module.exports = createNewInstance({
  instanceConstructor: dataController,
  dependencyConfig: {
    dataService: 'services/dataService'
  }
})
