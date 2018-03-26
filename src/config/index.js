import { utils } from 'js-utils'

const defaultConfigFile = './dev.config'
const configFileOptions = {
  'production': './prod.config',
  'development': defaultConfigFile
}
const configFile =
  utils.iocHelper.getConfigFile(configFileOptions, defaultConfigFile)

export default require(configFile).default
