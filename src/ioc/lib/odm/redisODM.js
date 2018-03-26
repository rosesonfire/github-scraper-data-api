import { utils } from 'js-utils'

import { createNewInstance } from './../../iocHelper'
import redisODM from './../../../main/lib/odm/redisODM'

exports = module.exports = createNewInstance({
  instanceConstructor: redisODM,
  dependencyConfig: {
    redisClient: 'lib/wrappers/redisClientWrapper'
  },
  dependencyInstances: {
    utils
  }
})
