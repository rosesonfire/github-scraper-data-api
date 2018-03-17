import sinon from 'sinon'

export const expressAppMock = () => ({
  use: sinon.mock(),
  get: sinon.mock(),
  post: sinon.mock(),
  listen: sinon.mock()
})
export const expressAppMockWithListenStub = () => ({
  use: sinon.mock(),
  get: sinon.mock(),
  post: sinon.mock(),
  listen: sinon.stub()
})
export default () => sinon.mock()
