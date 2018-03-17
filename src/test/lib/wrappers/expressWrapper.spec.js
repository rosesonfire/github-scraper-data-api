import { describe, before, beforeEach, afterEach, it } from './../../setup'
// unit
import expressWrapper from './../../../main/lib/wrappers/expressWrapper'
// mocks
import expressMock, { expressAppMock, expressAppMockWithListenStub } from
  './../../mocks/others/express'
import anonymousSpy from './../../mocks/others/anonymousSpy'

describe('ExpressWrapper', () => {
  let
    mocks,
    spies,
    express,
    app,
    singleMiddleware,
    multiMiddlewares,
    singleGetRoute,
    singlePostRoute,
    singleRoutes,
    multiRoutes,
    port,
    expectedProperties,
    logMessage

  before(() => {
    singleMiddleware = ['middleware1']
    multiMiddlewares = ['middleware1', 'middleware2', 'middleware3']
    singleGetRoute = ['route1', 'controller1']
    singlePostRoute = ['route2', 'controller2']
    singleRoutes = { get: {}, post: {} }
    singleRoutes.get[singleGetRoute[0]] = singleGetRoute[1]
    singleRoutes.post[singlePostRoute[0]] = singlePostRoute[1]
    multiRoutes = {
      get: {
        'route3': 'controller3',
        'route4': 'controller4'
      },
      post: {
        'route5': 'controller5',
        'route6': 'controller6'
      }
    }
    port = 1234
    expectedProperties = ['listen']
    logMessage = `Listening at port ${port}`
  })

  beforeEach(() => {
    anonymousSpy(console, 'log')
    // eslint-disable-next-line no-console
    spies = [console.log]
  })

  afterEach(() => {
    mocks.forEach(mock => mock.verify())
    spies.forEach(spy => spy.restore())
  })

  describe('When creating and using expressWrapper', () => {
    beforeEach(() => {
      app = expressAppMock()
      express = expressMock()
      express.once().withExactArgs().returns(app)
    })

    describe('When creating expressWrapper', () => {
      beforeEach(() => {
        mocks = [express, app.use, app.get, app.post]
      })

      describe('When passing single middleware, single get route and' +
               'single post route',
      () => {
        beforeEach(() => {
          app.use.once().withExactArgs(singleMiddleware[0])
          app.get.once().withExactArgs(singleGetRoute[0], singleGetRoute[1])
          app.post.once().withExactArgs(singlePostRoute[0], singlePostRoute[1])
        })

        it('should have expected properties', () =>
          expressWrapper({
            express, middlewares: singleMiddleware, routes: singleRoutes, port
          }).should.have.all.keys(...expectedProperties))
      })

      describe('When passing mutliple middlewares, multiple get routes and ' +
               'multiple post routes', () => {
        beforeEach(() => {
          app.use.exactly(multiMiddlewares.length)
          app.get.exactly(Object.entries(multiRoutes.get).length)
          app.post.exactly(Object.entries(multiRoutes.post).length)
        })

        it('should call the methods of app correct number of times', () =>
          expressWrapper({
            express, middlewares: multiMiddlewares, routes: multiRoutes, port
          }))
      })
    })

    describe('When calling listen', () => {
      beforeEach(() => {
        app.use.once().withExactArgs(singleMiddleware[0])
        app.get.once().withExactArgs(singleGetRoute[0], singleGetRoute[1])
        app.post.once().withExactArgs(singlePostRoute[0], singlePostRoute[1])
        app.listen.once().withArgs(port)
        mocks = [express, app.use, app.get, app.post, app.listen]
      })

      it('should pass the correct port', () => expressWrapper({
        express, middlewares: singleMiddleware, routes: singleRoutes, port })
        .listen())
    })
  })

  describe('When message is logged', () => {
    beforeEach(() => {
      app = expressAppMockWithListenStub()
      express = expressMock()
      express.once().withExactArgs().returns(app)
      app.use.once().withExactArgs(singleMiddleware[0])
      app.get.once().withExactArgs(singleGetRoute[0], singleGetRoute[1])
      app.post.once().withExactArgs(singlePostRoute[0], singlePostRoute[1])
      app.listen.withArgs(port).callsFake((port, callback) => callback())
      mocks = [express, app.use, app.get, app.post]
    })

    it('should log the correct message', () => {
      expressWrapper({
        express, middlewares: singleMiddleware, routes: singleRoutes, port
      }).listen()
      // eslint-disable-next-line no-unused-expressions, no-console
      console.log.withArgs(logMessage).calledOnce.should.be.true
    })
  })
})
