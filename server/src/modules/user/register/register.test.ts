import { testRequester } from '../../../utils/testUtils/testRequester'

const registerMutation = (email: string) => `
  mutation {
    register(input: {
      email: "${email}"
    }) {
      email
    }
  }
`

describe('Register user', () => {
  test('registers user', async () => {
    const email = 'testCase@mail.com'

    const response = await testRequester(registerMutation(email))
    expect(response).toEqual({ register: { email } })
  })
})
