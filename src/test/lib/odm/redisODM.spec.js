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
    flattenedData,
    positiveReply

  before(() => {
    expectedODMProperties = ['create']
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
    flattenedData = [126, 'id', '126', 'name', 'someName', 'entry:id', '78',
      'entry:value', '45', 'entry:description:date',
      'Fri Mar 02 2018 05:58:35 GMT+0600 (+06)',
      'entry:description:location', 'someLocation', 'meta:meta1', 'hello',
      'meta:meta2', 'true']
    positiveReply = 'OK'
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
      redisODM({ redisClient }).should.have.all.keys(expectedODMProperties))

    describe('When creating a model object', () => {
      it('should have expected properties', () =>
        redisODM({ redisClient })
          .create({ key: data.id, data: data }).should.have.all
          .keys(expectedModelObjProperties))

      it('should map the data properly', () => {
        const modelObj = redisODM({ redisClient })
          .create({ key: data.id, data: data })

        modelObj.key.should.equal(data.id)
        JSON.stringify(modelObj.data).should.equal(JSON.stringify(data))
      })
    })
  })

  describe('When saving a model object', () => {
    beforeEach(() => {
      redisClient.hmset.once().withExactArgs(...flattenedData)
        .resolves(positiveReply)
      mocks = [ redisClient.hmset ]
    })

    it('should return a promise', () =>
      redisODM({ redisClient })
        .create({ key: data.id, data: data }).save().should.be.a('promise'))

    it('should be successful', () =>
      redisODM({ redisClient })
        .create({ key: data.id, data: data }).save().should.eventually
        .equal(positiveReply))
  })
})
