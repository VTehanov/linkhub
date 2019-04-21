import { SFC, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Project, Tag } from '../../types'
import { JoinProjectButton } from '../../components/Project/JoinProjectButton'
import styled from 'styled-components'

const GET_PROJECT_QUERY = gql`
  query GET_PROJECT_QUERY($slug: String!) {
    getProject(input: { slug: $slug }) {
      project {
        id
        name
        description
        tags {
          id
          name
        }
        creator {
          id
        }
      }
    }
  }
`

interface IProps {
  query: {
    slug?: string
  }
  router: any
}

interface ITags {
  tags?: Tag[]
}

const Tags: SFC<ITags> = ({ tags }) => (
  <StyledTags>
    {tags && tags.map(tag => <span className="tag">{tag.name}</span>)}
  </StyledTags>
)

const ProjectPage: SFC<IProps> = ({ query }) => {
  const { slug } = query

  return (
    <Query query={GET_PROJECT_QUERY} variables={{ slug }}>
      {({ data }) => {
        const project: Project = data.getProject.project

        return (
          <div>
            <h1>{project.name}</h1>
            <Tags tags={project.tags} />
            <p>{project.description}</p>
            <JoinProjectButton project={project} />
          </div>
        )
      }}
    </Query>
  )
}

const StyledTags = styled.div`
  .tag ~ .tag {
    margin-left: 10px;
  }
`

export default ProjectPage
