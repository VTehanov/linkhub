import withApollo, { InitApolloOptions } from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { ENDPOINTS } from '../constants/endpoints'

const createClient = ({ headers }: InitApolloOptions<{}>) => {
  return new ApolloClient({
    uri: ENDPOINTS[process.env.NODE_ENV!],
    request: async operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      })
    }
  })
}

export default withApollo(createClient)
