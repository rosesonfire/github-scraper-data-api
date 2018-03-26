import { createInstance } from './../ioc'

createInstance('app')
  .then(app => app.listen())
  // eslint-disable-next-line no-console
  .catch(err => console.error(err))
