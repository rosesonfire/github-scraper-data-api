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
    data,
    writeReq,
    readReq,
    res,
    expectedProperties,
    positiveResponse

  before(() => {
    data = [
      {
        'author': {
          'uri': 'someUri',
          'name': 'someName',
          'location': {
            'city': 'someCIty',
            'zip': 1234
          }
        },
        'article': 'some article'
      }
    ]
    writeReq = { body: { data } }
    readReq = { params: { key: 'someUri2' } }
    expectedProperties = ['writeData', 'readData']
    positiveResponse = Promise.resolve('OK')
  })

  beforeEach(() => {
    res = resMock()
    dataService = dataServiceMock()
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
      dataService.writeData.once().withExactArgs(writeReq.body.data)
        .returns(positiveResponse)
      res.setBufferedResponse.once().withExactArgs(positiveResponse)
      mocks = [dataService.writeData, res.setBufferedResponse]
    })

    it('should write data successfully', () =>
      dataController({ dataService }).writeData(writeReq, res))
  })

  describe('When reading data', () => {
    beforeEach(() => {
      dataService.readData.once().withExactArgs(readReq.params.key)
        .returns(data[0])
      res.setBufferedResponse.once().withExactArgs(data[0])
      mocks = [dataService.readData, res.setBufferedResponse]
    })

    it('should read data successfully', () =>
      dataController({ dataService }).readData(readReq, res))
  })
})
