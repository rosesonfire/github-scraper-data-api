import { describe, before, beforeEach, afterEach, it } from './../setup'
// unit
import dataService from './../../main/services/dataService'
// mocks
import redisODMMock, { redisModelObjectMock } from './../mocks/lib/odm/redisODM'

describe('DataService', () => {
  let
    mocks,
    redisODM,
    redisModelObject,
    singleDataList,
    multiDataList,
    expectedProperties,
    positiveReply

  before(() => {
    singleDataList = [
      {
        author: {
          uri: 'someURI',
          name: 'someName',
          location: {
            country: 'someCountry',
            city: 'someCity',
            postCode: 1234,
            resident: true
          }
        },
        article: 'someArticle'
      }
    ]
    multiDataList = [
      {
        author: {
          uri: 'someURI',
          name: 'someName',
          location: {
            country: 'someCountry',
            city: 'someCity',
            postCode: 1234,
            resident: true
          }
        },
        article: 'someArticle'
      },
      {
        author: {
          uri: 'someURI2',
          name: 'someName2',
          location: {
            country: 'someCountry2',
            city: 'someCity2',
            postCode: 12345,
            resident: false
          }
        },
        article: 'someArticle2'
      }
    ]
    expectedProperties = ['writeData', 'readData']
    positiveReply = 'OK'
  })

  beforeEach(() => {
    redisODM = redisODMMock()
    redisModelObject = redisModelObjectMock()
  })

  afterEach(() => mocks.forEach(mock => mock.verify()))

  describe('When creating dataService', () => {
    beforeEach(() => {
      mocks = []
    })
    it('should have the expected properties', () =>
      dataService({ odm: redisODM }).should.have.all.keys(expectedProperties))
  })

  describe('When writing single data', () => {
    beforeEach(() => {
      redisODM.create.once().withExactArgs(
        { key: singleDataList[0].author.uri, data: singleDataList[0] })
        .returns(redisModelObject)
      mocks = [redisODM.create, redisModelObject.save]
    })

    describe('When successful', () => {
      beforeEach(() => redisModelObject.save.once().withExactArgs()
        .returns(Promise.resolve(positiveReply)))

      it('should return a promise', () =>
        dataService({ odm: redisODM }).writeData(singleDataList).should.be
          .a('promise'))

      it('should write data successfully', () =>
        dataService({ odm: redisODM }).writeData(singleDataList).should
          .eventually.equalTo([positiveReply]))
    })

    describe('When fails', () => {
      beforeEach(() => redisModelObject.save.once().withExactArgs()
        .returns(Promise.reject(new Error('err'))))

      it('should fail to write data', () =>
        dataService({ odm: redisODM }).writeData(singleDataList).should.be
          .rejected)
    })
  })

  describe('When writing multiple data', () => {
    beforeEach(() => {
      redisODM.create.exactly(multiDataList.length).returns(redisModelObject)
      mocks = [redisODM.create, redisModelObject.save]
    })

    describe('When successful', () => {
      beforeEach(() => redisModelObject.save.exactly(multiDataList.length)
        .withExactArgs().returns(Promise.resolve(positiveReply)))

      it('should write data successfully', () =>
        dataService({ odm: redisODM }).writeData(multiDataList).should
          .eventually.equalTo(multiDataList.map(_ => positiveReply)))
    })

    describe('When fails', () => {
      beforeEach(() => redisModelObject.save.exactly(multiDataList.length)
        .withExactArgs().returns(Promise.reject(new Error('err'))))

      it('should fail to write data', () =>
        dataService({ odm: redisODM }).writeData(multiDataList).should.be
          .rejected)
    })
  })

  describe('When reading data', () => {
    beforeEach(() => {
      mocks = [redisODM.get]
    })

    describe('When successful', () => {
      beforeEach(() => redisODM.get.once()
        .withExactArgs(singleDataList[0].author.uri)
        .returns(Promise.resolve(redisModelObject)))

      it('should read data successfully', () =>
        dataService({ odm: redisODM }).readData(singleDataList[0].author.uri)
          .should.eventually.equal(redisModelObject.data))
    })

    describe('When fails', () => {
      beforeEach(() => redisODM.get.once()
        .withExactArgs(singleDataList[0].author.uri)
        .returns(Promise.reject(new Error('err'))))

      it('should fail to read data', () =>
        dataService({ odm: redisODM }).readData(singleDataList[0].author.uri)
          .should.be.rejected)
    })
  })
})
