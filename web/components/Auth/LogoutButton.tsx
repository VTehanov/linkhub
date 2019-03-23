import { SFC } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { ME_QUERY } from './Me'

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout
  }
`

export const LogoutButton: SFC = () => (
  <Mutation refetchQueries={[{ query: ME_QUERY }]} mutation={LOGOUT_MUTATION}>
    {logout => <button onClick={() => logout()}>Logout</button>}
  </Mutation>
)
