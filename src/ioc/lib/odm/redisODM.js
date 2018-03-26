import { utils } from 'js-utils'

import redisODM from './../../../main/lib/odm/redisODM'

exports = module.exports = utils.iocHelper.createNewInstance({
  instanceConstructor: redisODM,
  dependencyConfig: {
    redisClient: 'lib/wrappers/redisClientWrapper'
  },
  dependencyInstances: {
    utils
  }
})
