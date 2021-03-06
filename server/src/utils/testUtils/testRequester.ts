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
                id
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

  async forgotPasswordChange(newPassword: string, key: string) {
    return rp.post({
      ...this.options,
      body: {
        query: `
          mutation {
            forgotPasswordChange(
              newPassword: "${newPassword}"
              key: "${key}"
            ) {
              path
              message
            }
          }
        `
      }
    })
  }

  async createProject({ name, description, tags }: CreateProjectInput) {
    const tagsTransformed = tags ? `tags: ["${tags.join('","')}"]` : ''
    const tagsResponse = tags
      ? `
      tags {
        id
        name
      }
    `
      : ''

    return rp.post({
      ...this.options,
      body: {
        query: `
          mutation {
            createProject(input: {
              name: "${name}"
              description: "${description}"
              ${tagsTransformed}
            }) {
              project {
                id
                name
                slug
                description
                progressStatus
                ${tagsResponse}
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

  async getProjects() {
    return rp.post({
      ...this.options,
      body: {
        query: `
          query {
            getProjects {
              projects {
                name
                description
                tags {
                  id
                  name
                }
              }
            }
          }
        `
      }
    })
  }

  async getProject(slug: string) {
    return rp.post({
      ...this.options,
      body: {
        query: `
          query {
            getProject(input: { slug: "${slug}" }) {
              project {
                name
                slug
                description
                tags {
                  id
                  name
                }
              }
            }
          }
        `
      }
    })
  }

  async myProjects() {
    return rp.post({
      ...this.options,
      body: {
        query: `
          query {
            myProjects {
              projects {
                name
                description
              }
            }
          }
        `
      }
    })
  }

  async getTags() {
    return rp.post({
      ...this.options,
      body: {
        query: `
          query {
            getTags {
              tags {
                id
                name
              }
            }
          }
        `
      }
    })
  }

  async getProjectsByTag(slug: string) {
    return rp.post({
      ...this.options,
      body: {
        query: `
          query {
            getProjectsByTag(input: {
              slug: "${slug}"
            }) {
              projects {
                name
                description
                tags {
                  id
                  name
                  slug
                }
              }
            }
          }
        `
      }
    })
  }

  async requestToJoinProject(projectId: string, message?: string) {
    const messageField = message ? `message: "${message}"` : ''

    return rp.post({
      ...this.options,
      body: {
        query: `
          mutation {
            requestToJoinProject(input: {
              projectId: "${projectId}"
              ${messageField}
            }) {
              errors {
                message
              }
            }
          }
        `
      }
    })
  }

  async respondToJoinRequest(requestId: string) {
    return rp.post({
      ...this.options,
      body: {
        query: `
          mutation {
            respondToJoinRequest(input: {
              requestId: "${requestId}"
            }) {
              errors {
                message
              }
            }
          }
        `
      }
    })
  }

  async getProjectPendingRequests(projectId: string) {
    return rp.post({
      ...this.options,
      body: {
        query: `
        query {
            getProjectPendingRequests(input: {
              projectId: "${projectId}"
            }) {
              requests {
                id
                userId
                projectId
                status
              }
            }
          }
        `
      }
    })
  }
}

export default TestRequester
