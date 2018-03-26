import bodyParser from 'body-parser'
import { utils } from 'js-utils'

import middlewares from './../../main/middlewares'

exports = module.exports = utils.iocHelper.createNewInstance({
  instanceConstructor: middlewares,
  dependencyInstances: {
    json: bodyParser.json(),
    urlencoded: bodyParser.urlencoded({ extended: true })
  },
  dependencyConfig: {
    requestBuffer: 'middlewares/requestBuffer'
  }
})
