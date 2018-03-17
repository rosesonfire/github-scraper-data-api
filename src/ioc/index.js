import IoC from 'electrolyte'

IoC.use(IoC.dir('dist/ioc'))

export const dependencies = {
  app: IoC.create('lib/wrappers/expressWrapper')
}
