import * as rp from 'request-promise'
import { CookieJar } from 'request'
import {
  CreateProjectInput,
  RegisterInput,
  LoginInput
} from '../../generated/types'

class TestRequester {
  requestUrl: string
  jar: CookieJar
  options: rp.Options

  constructor(url?: string) {
    this.requestUrl = url || (process.env.TEST_HOST as string)
    this.jar = rp.jar()

    this.options = {
      url: this.requestUrl,
      withCredentials: true,
      jar: this.jar,
      json: true
    }
  }

  async register({ email, password }: RegisterInput) {
    return rp.post({
      ...this.options,
      body: {
        query: `
          mutation {
            register(input: {
              email: "${email}"
              password: "${password}"
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
      }
    })
  }

  async login({ email, password }: LoginInput) {
    return rp.post({
      ...this.options,
      body: {
        query: `
          mutation {
            login(input: {
              email: "${email}"
              password: "${password}"
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
      }
    })
  }

  async logout() {
    return rp.post({
      ...this.options,
      body: {
        query: `
          mutation {
            logout
          }
        `
      }
    })
  }

  async me() {
    return rp.post({
      ...this.options,
      body: {
        query: `
          query {
            me {
              email
            }
          }
        `
      }
    })
  }

  async createProject({ name, description }: CreateProjectInput) {
    return rp.post({
      ...this.options,
      body: {
        query: `
          mutation {
            createProject(input: {
              name: "${name}"
              description: "${description}"
            }) {
              project {
                name
                description
              }
              errors {
                path
                message
              }
            }
          }
        `
      }
    })
  }
}

export default TestRequester
