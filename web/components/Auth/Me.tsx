import React, { SFC } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

export const ME_QUERY = gql`
  query {
    me {
      id
      email
    }
  }
`

interface IProps {
  children(props: any): JSX.Element
}

export const Me: SFC<IProps> = ({ children }) => (
  <Query query={ME_QUERY}>{payload => children(payload)}</Query>
)
