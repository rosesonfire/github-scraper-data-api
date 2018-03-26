import IoC from 'electrolyte'

IoC.use(IoC.dir('dist/ioc'))

const dependencies = {
  app: 'lib/wrappers/expressWrapper'
}

export const createInstance = name => IoC.create(dependencies[name])
