import sinon from 'sinon'

export const redisModelObjectMock = () => ({
  save: sinon.mock()
})

export default () => ({
  create: sinon.mock()
})
