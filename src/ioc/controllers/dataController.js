import { utils } from 'js-utils'

import dataController from './../../main/controllers/dataController'

exports = module.exports = utils.iocHelper.createNewInstance({
  instanceConstructor: dataController,
  dependencyConfig: {
    dataService: 'services/dataService'
  }
})
