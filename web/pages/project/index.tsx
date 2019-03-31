import { SFC, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Project } from '../../types'

const GET_PROJECT_QUERY = gql`
  query GET_PROJECT_QUERY($id: String!) {
    getProject(input: { id: $id }) {
      project {
        name
        description
        tags {
          id
          name
        }
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
            {project.tags && project.tags.length > 0 && (
              <Fragment>
                <h2>Tags:</h2>
                {project.tags.map(t => (
                  <p>{t.name}</p>
                ))}
              </Fragment>
            )}

            <p>{project.description}</p>
          </div>
        )
      }}
    </Query>
  )
}

export default ProjectPage
