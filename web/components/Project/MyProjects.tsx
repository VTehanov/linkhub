import { SFC } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const MY_PROJECTS_QUERY = gql`
  query MY_PROJECTS_QUERY {
    myProjects {
      projects {
        id
        name
        description
      }
    }
  }
`

interface IProps {
  children(props: any): JSX.Element
}

export const MyProjects: SFC<IProps> = ({ children }) => (
  <Query query={MY_PROJECTS_QUERY}>{data => children(data)}</Query>
)
