import { QueryStringMapObject, NextSFC } from 'next'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { ProjectGrid } from '../../components/Project/ProjectGrid'
import { Project } from '../../types'

interface InitialProps {
  query: QueryStringMapObject
}

const SEARCH_BY_TAG_QUERY = gql`
  query SEARCH_BY_TAG_QUERY($slug: String!) {
    getProjectsByTag(input: { slug: $slug }) {
      projects {
        id
        name
        slug
        description
        tags {
          id
          name
          slug
        }
      }
    }
  }
`

const Search: NextSFC = (props: any) => {
  console.log(props.query)

  const slug = props.query.tags

  return (
    <Query
      query={SEARCH_BY_TAG_QUERY}
      variables={{
        slug
      }}
    >
      {({ data }) => {
        const projects: Project[] = data.getProjectsByTag.projects

        return (
          <div>
            <h1>Showing results:</h1>
            <ProjectGrid projects={projects} />
          </div>
        )
      }}
    </Query>
  )
}

Search.getInitialProps = ({ query }: InitialProps) => ({ query })

export default Search
