import { FunctionComponent } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_TAGS_QUERY = gql`
  query {
    getTags {
      tags {
        id
        name
      }
    }
  }
`

interface IProps {
  children(props: any): JSX.Element
}

export const Tags: FunctionComponent<IProps> = ({ children }) => (
  <Query query={GET_TAGS_QUERY}>{data => children(data)}</Query>
)
