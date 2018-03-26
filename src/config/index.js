import { utils } from 'js-utils'

const configFileOptions = {
  production: './prod.config',
  development: './dev.config'
}
const configFile = utils.iocHelper.getConfigFile(
  configFileOptions, configFileOptions.development)

export default require(configFile).default
