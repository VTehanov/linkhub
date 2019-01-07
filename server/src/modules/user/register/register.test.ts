import { testRequester } from '../../../utils/testUtils/testRequester'
import { users } from '../../../utils/testUtils/seed/data'
import * as errorMessages from './errorMessages'

const registerMutation = (email: string) => `
  mutation {
    register(input: {
      email: "${email}"
    }) {
      user {
        email
      }
      errors {
        path
        message
      }
    }
  }
`

describe('Register user', () => {
  test('registers user', async () => {
    const email = 'someRandomEmailThatIsNotInDb@mail.com'
    const response = await testRequester(registerMutation(email))

    expect(response).toEqual({
      register: {
        user: { email },
        errors: null
      }
    })
  })

  test('does not register user if email is already in use', async () => {
    const email = users[0].email
    console.log(email)
    const response = await testRequester(registerMutation(email))

    expect(response).toEqual({
      register: {
        errors: [
          {
            path: 'email',
            message: errorMessages.DUPLICATE_EMAIL
          }
        ],
        user: null
      }
    })
  })
})
