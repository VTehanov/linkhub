import styled from 'styled-components';

import { Input, TextArea } from '../../styles/Controls';
import Button from '../../styles/Button';


const ProjectForm = () => {
  return (
    <StyledForm>
      <h2 className="ProjectForm__title">Create a project</h2>
      <Input type="text" placeholder="Title" />
      <TextArea placeholder="Description" />
      <Button type="submit">Create Project</Button>
    </StyledForm>
  )
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  * ~ * {
    margin-top: 1em;
  }

  .ProjectForm__title {
    font-family: ${props => props.theme.titleFont}
  }
`

export default ProjectForm;