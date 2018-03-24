import { utils } from 'js-utils'

import { describe, before, beforeEach, afterEach, it } from './../../setup'
// unit
import redisClientWrapper from './../../../main/lib/wrappers/redisClientWrapper'
// mocks
import redisMock from './../../mocks/others/redis'
import { redisClientMock, redisClientStub }
  from './../../mocks/others/redisClient'

describe('RedisClientWrapper', () => {
  let
    mocks,
    redis,
    redisClient,
    host,
    port,
    expectedProperties,
    hmsetArgs,
    hgetAllArg,
    positiveReply

  before(() => {
    host = 'localhost'
    port = 1234
    expectedProperties = ['hmset', 'hgetall', 'quit']
    hmsetArgs = [1, 'id', 1, 'value', '1']
    hgetAllArg = 1
    positiveReply = 'OK'
  })

  beforeEach(() => {
    redis = redisMock()
  })

  afterEach(() => mocks.forEach(mock => mock.verify()))

  describe('When creating redisClientWrapper', () => {
    beforeEach(() => {
      redisClient = redisClientStub()
      mocks = [ redis.createClient ]
      redis.createClient.once().withExactArgs({ host, port })
        .returns(redisClient)
    })

    it('should have expected properties', () =>
      redisClientWrapper({ redis, host, port, utils }).should.have.all
        .keys(...expectedProperties))

    describe('When calling hmset in redisClientWrapper', () => {
      describe('When successful', () => {
        beforeEach(() => redisClient.hmset.onFirstCall()
          .callsFake((...args) => args[args.length - 1](null, positiveReply)))

        it('should return a promise', () =>
          redisClientWrapper({ redis, host, port, utils }).hmset(...hmsetArgs)
            .should.be.a('promise'))

        it('should return positive response', () =>
          redisClientWrapper({ redis, host, port, utils }).hmset(...hmsetArgs)
            .should.eventually.equal(positiveReply))
      })

      describe('When core redis client returns error', () => {
        beforeEach(() => redisClient.hmset
          .callsFake((...args) => args[args.length - 1](new Error('er'), null)))

        it('should fail', () =>
          redisClientWrapper({ redis, host, port, utils }).hmset(...hmsetArgs)
            .should.eventually.be.rejected)
      })

      describe('When core redis client fails', () => {
        beforeEach(() => redisClient.hmset
          .callsFake((...args) => { throw new Error('er') }))

        it('should fail', () =>
          redisClientWrapper({ redis, host, port, utils }).hmset(...hmsetArgs)
            .should.eventually.be.rejected)
      })
    })

    describe('When calling hgetall in redisClientWrapper', () => {
      describe('When successful', () => {
        beforeEach(() => redisClient.hgetall.onFirstCall()
          .callsFake((...args) => args[args.length - 1](null, positiveReply)))

        it('should return a promise', () =>
          redisClientWrapper({ redis, host, port, utils }).hgetall(hgetAllArg)
            .should.be.a('promise'))

        it('should return positive response', () =>
          redisClientWrapper({ redis, host, port, utils }).hgetall(hgetAllArg)
            .should.eventually.equal(positiveReply))
      })

      describe('When core redis client returns error', () => {
        beforeEach(() => redisClient.hgetall
          .callsFake((...args) => args[args.length - 1](new Error('er'), null)))

        it('should fail', () =>
          redisClientWrapper({ redis, host, port, utils }).hgetall(hgetAllArg)
            .should.eventually.be.rejected)
      })

      describe('When core redis client fails', () => {
        beforeEach(() => redisClient.hgetall
          .callsFake((...args) => { throw new Error('er') }))

        it('should fail', () =>
          redisClientWrapper({ redis, host, port, utils }).hgetall(hgetAllArg)
            .should.eventually.be.rejected)
      })
    })
  })

  describe('When calling operations in redisClientWrapper', () => {
    beforeEach(() => {
      redisClient = redisClientMock()
      redis.createClient.once().withExactArgs({ host, port })
        .returns(redisClient)
    })

    describe('When calling hmset', () => {
      beforeEach(() => {
        mocks = [ redis.createClient, redisClient.hmset ]
        redisClient.hmset.once().withArgs(...hmsetArgs)
      })

      it('should be called with proper arguments',
        () => {
          redisClientWrapper({ redis, host, port, utils }).hmset(...hmsetArgs)
          '1'.should.equal('1')
        })
    })

    describe('When calling hgetall', () => {
      beforeEach(() => {
        mocks = [ redis.createClient, redisClient.hgetall ]
        redisClient.hgetall.once().withArgs(hgetAllArg)
      })

      it('should be called with proper arguments',
        () => {
          redisClientWrapper({ redis, host, port, utils }).hgetall(hgetAllArg)
          '1'.should.equal('1')
        })
    })
  })

  describe('When calling quit in redisClientWrapper', () => {
    beforeEach(() => {
      redisClient = redisClientMock()
      mocks = [ redis.createClient, redisClient.quit ]
      redis.createClient.once().withExactArgs({ host, port })
        .returns(redisClient)
      redisClient.quit.once().withArgs()
    })

    it('should quit',
      () => {
        redisClientWrapper({ redis, host, port, utils }).quit()
        '1'.should.equal('1')
      })
  })
})
