import { FunctionComponent, Fragment } from 'react'
import { ProjectJoinRequest } from '../../types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

interface IProps {
  requests: ProjectJoinRequest[]
}

const RESPOND_TO_JOIN_REQUEST = gql`
  mutation respondToJoinRequest($id: String!) {
    respondToJoinRequest(input: { requestId: $id }) {
      errors {
        message
      }
    }
  }
`

export const ProjectPendingRequests: FunctionComponent<IProps> = ({
  requests
}) => (
  <Fragment>
    {requests.map((request, i) => (
      <Mutation
        mutation={RESPOND_TO_JOIN_REQUEST}
        variables={{ id: request.id }}
      >
        {respondToJoinRequest => (
          <div key={i}>
            <span>
              {request.id}{' '}
              <button onClick={() => respondToJoinRequest()}>Approve</button>
              <button>X</button>
            </span>
          </div>
        )}
      </Mutation>
    ))}
  </Fragment>
)
