import { utils } from 'js-utils'

import requestBuffer from './../../main/middlewares/requestBuffer'
import config from './../../config'

exports = module.exports = utils.iocHelper.createNewInstance({
  instanceConstructor: requestBuffer,
  configuration: {
    requestBufferLimit: config.scraperDataAPI.requestBuffer.bufferLimit,
    ttl: config.scraperDataAPI.requestBuffer.ttl,
    debug: config.debug
  }
})
