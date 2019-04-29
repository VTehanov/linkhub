import { FunctionComponent } from 'react'
import { Project, ProjectJoinRequest } from '../../types'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { ME_QUERY } from '../Auth/Me'
import { ProjectJoinRequests } from './ProjectJoinRequests'

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

const GET_PROJECT_PENDING_REQUESTS = gql`
  query GET_PROJECT_PENDING_REQUESTS($projectId: String!) {
    getProjectPendingRequests(input: { projectId: $projectId }) {
      requests {
        id
        user {
          email
        }
      }
    }
  }
`

interface IProps {
  project: Project
}

export const JoinProjectButton: FunctionComponent<IProps> = ({ project }) => (
  <Query query={ME_QUERY}>
    {({ data: meData }) => (
      <Query
        query={GET_PROJECT_PENDING_REQUESTS}
        variables={{
          projectId: project.id
        }}
      >
        {({ data: projectRequestsData }) => (
          <Mutation
            mutation={JOIN_PROJECT_MUTATION}
            variables={{ projectId: project.id }}
          >
            {requestToJoinProject => {
              const requests: ProjectJoinRequest[] =
                projectRequestsData.getProjectPendingRequests.requests || []
              const { me } = meData

              // If logged in
              if (me) {
                // If user is creator
                if (me.id === project.creator.id) {
                  return <ProjectJoinRequests requests={requests} />
                }

                // If user has already requested to join
                if (requests.length && requests[0].user.id === me.id) {
                  return (
                    <p>
                      Your request is pending approval from the project's
                      creator
                    </p>
                  )
                }

                return (
                  <button onClick={() => requestToJoinProject()}>
                    request to join project
                  </button>
                )
              } else {
                return <p>Login to join projects</p>
              }
            }}
          </Mutation>
        )}
      </Query>
    )}
  </Query>
)
