import { FunctionComponent } from 'react'
import { ProjectJoinRequest } from '../../types'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

interface IProps {
  requests: ProjectJoinRequest[]
}

const RESPOND_TO_PROJECT_REQUEST = gql`
  mutation RESPOND_TO_PROJECT_REQUEST($requestId: String!) {
    respondToJoinRequest(input: { requestId: $requestId }) {
      errors {
        message
      }
    }
  }
`

export const ProjectJoinRequests: FunctionComponent<IProps> = ({
  requests
}) => (
  <Styled>
    {requests.map(request => (
      <Mutation
        mutation={RESPOND_TO_PROJECT_REQUEST}
        variables={{ requestId: request.id }}
        refetchQueries={['GET_PROJECT_PENDING_REQUESTS']}
      >
        {respondToProjectRequest => (
          <div key={request.id}>
            {request.user.email}
            <button onClick={() => respondToProjectRequest()}>Approve</button>
          </div>
        )}
      </Mutation>
    ))}
  </Styled>
)

const Styled = styled.div``
