import { utils } from 'js-utils'

import dataService from './../../main/services/dataService'

exports = module.exports = utils.iocHelper.createNewInstance({
  instanceConstructor: dataService,
  dependencyConfig: {
    odm: 'lib/odm/redisODM'
  }
})
