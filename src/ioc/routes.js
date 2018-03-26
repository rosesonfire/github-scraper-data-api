import { utils } from 'js-utils'

import routes from './../main/routes'

exports = module.exports = utils.iocHelper.createNewInstance({
  instanceConstructor: routes,
  dependencyConfig: {
    dataController: 'controllers/dataController'
  }
})
