import { request } from 'graphql-request'

const registerMutation = (email: String) => `
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

    const response = await request(
      'http://localhost:4000',
      registerMutation(email)
    )

    expect(response).toEqual({ register: { email } })
  })
})
