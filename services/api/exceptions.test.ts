import { TypedError } from 'api/exceptions'

describe('TypedError', () => {
  class TestError extends TypedError {
    static type = 'TEST_ERROR'
  }

  it('sets message to type', async () => {
    const testError = new TestError()
    expect(testError.message).toEqual('TEST_ERROR')
  })

  it('allows a custom message', async () => {
    const testError = new TestError('custom')
    expect(testError.message).toEqual('TEST_ERROR:custom')
  })
})
