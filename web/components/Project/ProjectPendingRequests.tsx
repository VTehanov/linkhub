import { FunctionComponent } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { ProjectJoinRequest } from '../../types'

interface IProps {
  projectId: String
}

const PROJECT_PENDING_REQUESTS_QUERY = gql`
  mutation PROJECT_PENDING_REQUESTS($projectId: String!) {
    getProjectPendingRequests(input: { projectId: $projectId }) {
      requests {
        id
      }
    }
  }
`

export const ProjectPendingRequests: FunctionComponent<IProps> = ({
  projectId
}) => {
  return (
    <Query query={PROJECT_PENDING_REQUESTS_QUERY} variables={{ projectId }}>
      {({ data }) => {
        const requests: ProjectJoinRequest[] =
          data.projectPendingRequests.requests

        return requests.map(r => <p>{r.id}</p>)
      }}
    </Query>
  )
}
