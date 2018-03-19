import sinon from 'sinon'

export default () => ({
  hmset: sinon.mock(),
  hgetall: sinon.mock()
})
