import { SFC } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Project, Tag } from '../../types'
import { JoinProjectButton } from '../../components/Project/JoinProjectButton'
import styled from 'styled-components'
import Link from 'next/link'

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
          slug
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

const Tags: SFC<ITags> = ({ tags = [] }) => (
  <StyledTags>
    {tags.map(tag => (
      <Link
        href={{
          pathname: '/project/search',
          query: {
            tags: tag.slug
          }
        }}
      >
        <a>
          <span className="tag" key={tag.id}>
            {tag.name}
          </span>
        </a>
      </Link>
    ))}
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
