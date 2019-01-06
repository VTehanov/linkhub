import { request } from 'graphql-request'

export const testRequester = async (query: string) => {
  const testHost = process.env.TEST_HOST as string
  const response = await request(testHost, query)

  return response
}
