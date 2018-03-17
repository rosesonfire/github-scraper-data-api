// A wrapper for express customized for our application
export default ({ express, middlewares, routes, port }) => {
  const app = express()

  middlewares.forEach(middleware => app.use(middleware))
  Object.entries(routes.get).forEach(([route, controller]) =>
    app.get(route, controller))
  Object.entries(routes.post).forEach(([route, controller]) =>
    app.post(route, controller))

  return {
    listen: () =>
      // eslint-disable-next-line no-console
      app.listen(port, () => console.log(`Listening at port ${port}`))
  }
}
