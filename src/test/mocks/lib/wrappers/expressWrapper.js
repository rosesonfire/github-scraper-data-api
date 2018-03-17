import sinon from 'sinon'

export const resMock = () => ({
  setBufferedResponse: sinon.mock()
})
export default () => ({
  listen: sinon.mock()
})
