import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Project } from '../types'
import styled from 'styled-components'

const GET_PROJECTS_QUERY = gql`
  query GET_PROJECTS_QUERY {
    getProjects {
      projects {
        name
        description
      }
    }
  }
`

const HomePage = () => {
  return (
    <Query query={GET_PROJECTS_QUERY}>
      {({ data }) => {
        return (
          <StyledHomePage>
            <div className="inner">
              {data.getProjects.projects.map(({ name }: Project) => (
                <p>{name}</p>
              ))}
            </div>
          </StyledHomePage>
        )
      }}
    </Query>
  )
}

const StyledHomePage = styled.section`
  display: flex;
  justify-content: space-around;

  .inner {
    width: 400px;
  }
`

export default HomePage
