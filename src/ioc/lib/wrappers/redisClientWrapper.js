import redis from 'redis'
import { utils } from 'js-utils'

import { createNewInstance } from './../../iocHelper'
import redisClientWrapper from './../../../main/lib/wrappers/redisClientWrapper'
import config from '../../../config'

exports = module.exports = createNewInstance({
  instanceConstructor: redisClientWrapper,
  configuration: {
    host: config.db.host,
    port: config.db.port
  },
  dependencyInstances: {
    redis: redis,
    utils
  }
})
