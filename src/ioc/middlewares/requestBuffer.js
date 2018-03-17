import { createNewInstance } from './../iocHelper'
import requestBuffer from './../../main/middlewares/requestBuffer'
import config from './../../config'

exports = module.exports = createNewInstance({
  instanceConstructor: requestBuffer,
  configuration: {
    requestBufferLimit: config.scraperDataAPI.requestBuffer.bufferLimit,
    ttl: config.scraperDataAPI.requestBuffer.ttl
  }
})
