import express from 'express'
import { utils } from 'js-utils'

import expressWrapper from './../../../main/lib/wrappers/expressWrapper'
import config from '../../../config'

exports = module.exports = utils.iocHelper.createNewInstance({
  instanceConstructor: expressWrapper,
  configuration: {
    port: config.scraperDataAPI.port
  },
  dependencyInstances: {
    express
  },
  dependencyConfig: {
    middlewares: 'middlewares',
    routes: 'routes'
  }
})
