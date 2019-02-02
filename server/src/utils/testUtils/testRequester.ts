import { request } from 'graphql-request'
import axios, { AxiosRequestConfig } from 'axios'

class TestRequester {
  requestUrl: string

  constructor(url?: string) {
    this.requestUrl = url || (process.env.TEST_HOST as string)
  }

  async simpleQuery(query: string) {
    const response = await request(this.requestUrl, query)

    return response
  }

  async withCredentials(axiosOptions: AxiosRequestConfig) {
    const response = await axios({
      url: this.requestUrl,
      withCredentials: true,
      ...axiosOptions
    })

    return response
  }
}

export default TestRequester
