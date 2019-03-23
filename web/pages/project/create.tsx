import styled from 'styled-components'
import { ProjectForm } from '../../components/Project/ProjectForm'

const CreateProjectPage = () => (
  <StyledCreateProjectPage>
    <div className="inner">
      <ProjectForm />
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
