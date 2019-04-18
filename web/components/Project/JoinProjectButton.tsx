import { SFC } from 'react'
import { Project } from '../../types'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { ME_QUERY } from '../Auth/Me'

const JOIN_PROJECT_MUTATION = gql`
  mutation JOIN_PROJECT_MUTATION($projectId: String!, $message: String) {
    requestToJoinProject(input: { projectId: $projectId, message: $message }) {
      errors {
        path
        message
      }
    }
  }
`

interface IProps {
  project: Project
}

export const JoinProjectButton: SFC<IProps> = ({ project }) => (
  <Query query={ME_QUERY}>
    {({ data }) => (
      <Mutation
        mutation={JOIN_PROJECT_MUTATION}
        variables={{
          projectId: project.id
        }}
      >
        {requestToJoinProject => {
          return data.me ? (
            <button onClick={() => requestToJoinProject()}>
              Request to join project
            </button>
          ) : (
            <p>Login to join project</p>
          )
        }}
      </Mutation>
    )}
  </Query>
)
