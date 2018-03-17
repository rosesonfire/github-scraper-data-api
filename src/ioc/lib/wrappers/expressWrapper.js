import express from 'express'

import { createNewInstance } from './../../iocHelper'
import expressWrapper from './../../../main/lib/wrappers/expressWrapper'
import config from '../../../config'

exports = module.exports = createNewInstance({
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
