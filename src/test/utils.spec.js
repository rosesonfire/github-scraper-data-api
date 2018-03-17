import { describe, before, beforeEach, it } from './setup'
// unit
import { createDefensivePromise } from './../main/utils'
// mocks
import plainOldStubObject from './mocks/others/plainOldStubObject'

describe('CreateDefensivePromise', () => {
  let
    executorFunc,
    asyncExecutorFunc,
    resolvedResponse,
    rejectionError

  before(() => {
    resolvedResponse = 'positive'
    rejectionError = new Error('error')
  })

  beforeEach(() => {
    executorFunc = plainOldStubObject()
    asyncExecutorFunc = plainOldStubObject()
  })

  describe('When passing sync executor', () => {
    describe('When successful', () => {
      beforeEach(() =>
        executorFunc.callsFake((resolve, reject) => resolve(resolvedResponse)))

      it('should return a promise', () =>
        createDefensivePromise(executorFunc).should.be.a('promise'))

      it('should return proper response', () =>
        createDefensivePromise(executorFunc).should.eventually
          .equal(resolvedResponse))
    })

    describe('When unsuccessful', () => {
      beforeEach(() =>
        executorFunc.callsFake((resolve, reject) => reject(rejectionError)))

      it('should return proper error', () =>
        createDefensivePromise(executorFunc).should.eventually.be.rejected.and
          .should.eventually.equal(rejectionError))
    })

    describe('When executor fails', () => {
      beforeEach(() =>
        executorFunc.callsFake((resolve, reject) => {
          throw rejectionError
        }))

      it('should return proper error', () =>
        createDefensivePromise(executorFunc).should.eventually.be.rejected.and
          .should.eventually.equal(rejectionError))
    })
  })

  describe('When passing async executor', () => {
    describe('When successful', () => {
      beforeEach(() =>
        asyncExecutorFunc.callsFake(async (resolve, reject) =>
          resolve(resolvedResponse)))

      it('should return a promise', () =>
        createDefensivePromise(asyncExecutorFunc).should.be.a('promise'))

      it('should return proper response', () =>
        createDefensivePromise(asyncExecutorFunc).should.eventually
          .equal(resolvedResponse))
    })

    describe('When unsuccessful', () => {
      beforeEach(() =>
        asyncExecutorFunc.callsFake(async (resolve, reject) =>
          reject(rejectionError)))

      it('should return proper error', () =>
        createDefensivePromise(asyncExecutorFunc).should.eventually.be.rejected
          .and.should.eventually.equal(rejectionError))
    })

    describe('When executor fails', () => {
      beforeEach(() =>
        asyncExecutorFunc.callsFake(async (resolve, reject) => {
          throw rejectionError
        }))

      it('should return proper error', () =>
        createDefensivePromise(asyncExecutorFunc).should.eventually.be.rejected
          .and.should.eventually.equal(rejectionError))
    })
  })
})
