import styled from 'styled-components'
import { ProjectForm } from '../../components/Project/ProjectForm'
import { AuthWrapper } from '../../components/Auth/AuthWrapper'

const CreateProjectPage = () => (
  <StyledCreateProjectPage>
    <div className="inner">
      <AuthWrapper>
        <ProjectForm />
      </AuthWrapper>
    </div>
  </StyledCreateProjectPage>
)

const StyledCreateProjectPage = styled.section`
  display: flex;
  justify-content: space-around;

  .inner {
    width: 400px;
  }
`

export default CreateProjectPage
