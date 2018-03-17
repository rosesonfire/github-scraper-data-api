import { describe, before, beforeEach, afterEach, it } from './../setup'
// unit
import dataController from './../../main/controllers/dataController'
// mocks
import dataServiceMock from './../mocks/services/dataService'
import { resMock } from './../mocks/lib/wrappers/expressWrapper'

describe('DataController', () => {
  let
    mocks,
    dataService,
    req,
    res,
    expectedProperties,
    positiveResponse

  before(() => {
    req = {
      body: {
        data: '{ "jsonData": "some data"}'
      }
    }
    expectedProperties = ['writeData']
    positiveResponse = Promise.resolve('OK')
  })

  beforeEach(() => {
    res = resMock()
    dataService = dataServiceMock()
    dataService.writeData.once().withExactArgs(req.body.data)
      .returns(positiveResponse)
    res.setBufferedResponse.once().withExactArgs(positiveResponse)
  })

  afterEach(() => mocks.forEach(mock => mock.verify()))

  describe('When creating dataController', () => {
    beforeEach(() => {
      mocks = []
    })
    it('should have the expected properties', () =>
      dataController({ dataService }).should.have.all.keys(expectedProperties))
  })

  describe('When writing data', () => {
    beforeEach(() => {
      mocks = [dataService.writeData, res.setBufferedResponse]
    })
    it('should write data successfully', () =>
      dataController({ dataService }).writeData(req, res))
  })
})
