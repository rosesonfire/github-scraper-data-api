import sinon from 'sinon'

export default (context, method) => sinon.spy(context, method)
