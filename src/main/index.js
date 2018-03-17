import { dependencies } from './../ioc'

dependencies.app
  .then(app => app.listen())
  // eslint-disable-next-line no-console
  .catch(err => console.error(err))
