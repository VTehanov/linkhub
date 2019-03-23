import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { ProjectGrid } from '../components/Project/ProjectGrid'

const GET_PROJECTS_QUERY = gql`
  query GET_PROJECTS_QUERY {
    getProjects {
      projects {
        id
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
              <ProjectGrid projects={data.getProjects.projects} />
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
