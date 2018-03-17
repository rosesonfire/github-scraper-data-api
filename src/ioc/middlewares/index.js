import bodyParser from 'body-parser'

import { createNewInstance } from './../iocHelper'
import middlewares from './../../main/middlewares'

exports = module.exports = createNewInstance({
  instanceConstructor: middlewares,
  dependencyInstances: {
    json: bodyParser.json(),
    urlencoded: bodyParser.urlencoded({ extended: true })
  },
  dependencyConfig: {
    requestBuffer: 'middlewares/requestBuffer'
  }
})
