import { createNewInstance } from './../iocHelper'
import dataService from './../../main/services/dataService'

exports = module.exports = createNewInstance({
  instanceConstructor: dataService,
  dependencyConfig: {
    odm: 'lib/odm/redisODM'
  }
})
