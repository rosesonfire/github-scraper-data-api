import { utils } from 'js-utils'

import { describe, before, beforeEach, afterEach, it } from './../../setup'
// unit
import redisODM from './../../../main/lib/odm/redisODM'
// mocks
import redisClientWrapperMock
  from './../../mocks/lib/wrappers/redisClientWrapper'

describe('RedisODM', () => {
  let
    mocks,
    redisClient,
    expectedODMProperties,
    expectedModelObjProperties,
    data,
    dataWithColonInAKey,
    dataWithArray,
    flattenedData,
    positiveReply,
    noColonInKeyErrorMsg,
    noArrayAsValueErrorMsg,
    keyNotFoundErrorMsg,
    redisClientFailErrorMsg

  before(() => {
    expectedODMProperties = ['create', 'get']
    expectedModelObjProperties = ['key', 'data', 'save']
    data = {
      id: 126,
      name: 'someName',
      entry: {
        id: 78,
        value: 45,
        description: {
          'date': new Date(Date.parse('2018-03-01T23:58:35Z')),
          'location': 'someLocation'
        }
      },
      meta: {
        meta1: 'hello',
        meta2: true
      }
    }
    dataWithColonInAKey = {
      id: 3,
      'value:withcolon': 'somevalue'
    }
    dataWithArray = {
      id: 3,
      value: ['somevalue']
    }
    flattenedData = [126, 'id', 126, 'name', 'someName', 'entry:id', 78,
      'entry:value', 45, 'entry:description:date',
      new Date(Date.parse('2018-03-01T23:58:35Z')),
      'entry:description:location', 'someLocation', 'meta:meta1', 'hello',
      'meta:meta2', true]
    positiveReply = 'OK'
    noColonInKeyErrorMsg = 'Occurence of ":" in key is not supported'
    noArrayAsValueErrorMsg = 'Array as value is not supported'
    keyNotFoundErrorMsg =
      `Could not find data matching the provided key (${data.id})`
    redisClientFailErrorMsg = 'err'
  })

  beforeEach(() => {
    redisClient = redisClientWrapperMock()
  })

  afterEach(() => mocks.forEach(mock => mock.verify()))

  describe('When creating redisODM', () => {
    beforeEach(() => {
      mocks = []
    })

    it('should have expected properties', () =>
      redisODM({ redisClient, utils }).should.have.all
        .keys(expectedODMProperties))

    describe('When creating a model object', () => {
      it('should have expected properties', () =>
        redisODM({ redisClient, utils })
          .create({ key: data.id, data }).should.have.all
          .keys(expectedModelObjProperties))

      it('should map the data properly', () => {
        const modelObj = redisODM({ redisClient, utils })
          .create({ key: data.id, data })

        modelObj.key.should.equal(data.id)
        modelObj.data.should.equal(data)
      })
    })

    describe('When creating a model object with colon in a key', () => {
      it('should fail', () => {
        try {
          redisODM({ redisClient, utils })
            .create({ key: dataWithColonInAKey.id, data: dataWithColonInAKey })
          '1'.should.equal('2')
        } catch (e) {
          e.message.should
            .equal(noColonInKeyErrorMsg)
        }
      })
    })

    describe('When creating a model object with array as a value', () => {
      it('should fail', () => {
        try {
          redisODM({ redisClient, utils })
            .create({ key: data.id, data: dataWithArray })
          '1'.should.equal('2')
        } catch (e) {
          e.message.should
            .equal(noArrayAsValueErrorMsg)
        }
      })
    })
  })

  describe('When getting a model object', () => {
    beforeEach(() => {
      mocks = [ redisClient.hgetall ]
    })

    describe('When key exists', () => {
      beforeEach(() => {
        redisClient.hgetall.once().withExactArgs(data.id)
          .resolves(flattenedData)
      })

      it('should return a promise', () =>
        redisODM({ redisClient, utils }).get(data.id).should.be.a('promise'))

      it('should have expected properties', () =>
        redisODM({ redisClient, utils }).get(data.id)
          .should.eventually.have.all.keys(expectedModelObjProperties))

      it('should map the data properly', async () => {
        const modelObj = await redisODM({ redisClient, utils }).get(data.id)

        modelObj.key.should.equal(data.id)
        JSON.stringify(modelObj.data).should.equal(JSON.stringify(data))
      })
    })

    describe('When key does not exist', () => {
      beforeEach(() => {
        redisClient.hgetall.once().withExactArgs(data.id)
          .resolves(null)
      })

      it('should fail', () => redisODM({ redisClient, utils }).get(data.id)
        .then(response => '1'.should.equal('2'))
        .catch(err => err.message.should.equal(keyNotFoundErrorMsg)))
    })

    describe('When underlying redisClient fails', () => {
      beforeEach(() => {
        redisClient.hgetall.once().withExactArgs(data.id)
          .rejects(new Error(redisClientFailErrorMsg))
      })

      it('should fail', () => redisODM({ redisClient, utils }).get(data.id)
        .then(response => '1'.should.equal('2'))
        .catch(err => err.message.should.equal(redisClientFailErrorMsg)))
    })
  })

  describe('When saving a model object', () => {
    beforeEach(() => {
      redisClient.hmset.once().withExactArgs(...flattenedData)
        .resolves(positiveReply)
      mocks = [ redisClient.hmset ]
    })

    it('should return a promise', () =>
      redisODM({ redisClient, utils })
        .create({ key: data.id, data }).save().should.be.a('promise'))

    it('should be successful', () =>
      redisODM({ redisClient, utils })
        .create({ key: data.id, data }).save().should.eventually
        .equal(positiveReply))
  })
})
