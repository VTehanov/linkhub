import { SFC, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Project, ProjectJoinRequest } from '../../types'
import { JoinProjectButton } from '../../components/Project/JoinProjectButton'
import { ProjectPendingRequests } from '../../components/Project/ProjectPendingRequests'

const GET_PROJECT_QUERY = gql`
  query GET_PROJECT_QUERY($id: String!) {
    getProject(input: { id: $id }) {
      project {
        id
        name
        description
        tags {
          id
          name
        }
      }
    }
    getProjectPendingRequests(input: { projectId: $id }) {
      requests {
        id
      }
    }
  }
`

interface IProps {
  query: {
    id?: string
  }
  router: any
}

const ProjectPage: SFC<IProps> = ({ query }) => {
  const { id } = query

  return (
    <Query query={GET_PROJECT_QUERY} variables={{ id }}>
      {({ data }) => {
        const project: Project = data.getProject.project
        const requests: ProjectJoinRequest[] =
          data.getProjectPendingRequests.requests

        return (
          <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            {project.tags && project.tags.map(tag => <p>{tag.name}</p>)}
            <JoinProjectButton project={project} />
            <ProjectPendingRequests requests={requests} />
          </div>
        )
      }}
    </Query>
  )
}

export default ProjectPage
