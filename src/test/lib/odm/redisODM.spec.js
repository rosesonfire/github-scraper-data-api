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
    dataWithColon,
    dataWithArray,
    flattenedData,
    positiveReply

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
    dataWithColon = {
      id: 3,
      value: 'somevalue:withcolon'
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
          .create({ key: data.id, data }).should.have.all
          .keys(expectedModelObjProperties))

      it('should map the data properly', () => {
        const modelObj = redisODM({ redisClient })
          .create({ key: data.id, data })

        modelObj.key.should.equal(data.id)
        modelObj.data.should.equal(data)
      })
    })

    describe('When creating a model object with colon in a value', () => {
      it('should fail', () => {
        try {
          redisODM({ redisClient })
            .create({ key: data.id, data: dataWithColon })
          '1'.should.equal('2')
        } catch (e) {
          e.message.should
            .equal('Occurence of ":" in string value is not supported')
        }
      })
    })

    describe('When creating a model object with array as a value', () => {
      it('should fail', () => {
        try {
          redisODM({ redisClient })
            .create({ key: data.id, data: dataWithArray })
          '1'.should.equal('2')
        } catch (e) {
          e.message.should
            .equal('Array as value is not supported')
        }
      })
    })
  })

  describe('When getting a model object', () => {
    beforeEach(() => {
      redisClient.hgetall.once().withExactArgs(data.id).resolves(flattenedData)
      mocks = [ redisClient.hgetall ]
    })

    it('should return a promise', () =>
      redisODM({ redisClient }).get(data.id).should.be.a('promise'))

    it('should have expected properties', () =>
      redisODM({ redisClient }).get(data.id)
        .should.eventually.have.all.keys(expectedModelObjProperties))

    it('should map the data properly', async () => {
      const modelObj = await redisODM({ redisClient }).get(data.id)

      modelObj.key.should.equal(data.id)
      JSON.stringify(modelObj.data).should.equal(JSON.stringify(data))
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
        .create({ key: data.id, data }).save().should.be.a('promise'))

    it('should be successful', () =>
      redisODM({ redisClient })
        .create({ key: data.id, data }).save().should.eventually
        .equal(positiveReply))
  })
})
