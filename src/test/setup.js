import chai from 'chai'
import assertArrays from 'chai-arrays'
import chaiAsPromised from 'chai-as-promised'

chai.should()
chai.use(assertArrays)
chai.use(chaiAsPromised)

/* eslint-disable no-undef */
exports = module.exports = ({
  expect: chai.expect,
  describe,
  before,
  beforeEach,
  afterEach,
  it
})
/* eslint-enable no-undef */
