import { SFC } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Project } from '../../types'

const GET_PROJECT_QUERY = gql`
  query GET_PROJECT_QUERY($id: String!) {
    getProject(input: { id: $id }) {
      project {
        name
        description
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

        return (
          <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
          </div>
        )
      }}
    </Query>
  )
}

export default ProjectPage
