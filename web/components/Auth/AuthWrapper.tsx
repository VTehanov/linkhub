import { Query } from 'react-apollo'
import { ME_QUERY } from './Me'
import { FunctionComponent } from 'react'
import { LoginForm } from './LoginForm'

export const AuthWrapper: FunctionComponent = ({ children }) => (
  <Query query={ME_QUERY}>
    {({ data }) => {
      // if it starts misbehaving add loading indicator

      if (!data.me) {
        return (
          <div>
            <h2>Please login to continue</h2>
            <LoginForm />
          </div>
        )
      }

      return children
    }}
  </Query>
)
