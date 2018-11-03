import styled from 'styled-components';

import { Input, TextArea } from '../../styles/Controls';
import Button from '../../styles/Button';

const PostForm = () => {
  return (
    <StyledForm>
      <h2>Create a project</h2>
      <Input type="text" placeholder="Title" />
      <TextArea placeholder="Description" />
      <Button type="submit">Create Post</Button>
    </StyledForm>
  )
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  * ~ * {
    margin-top: 1em;
  }
`

export default PostForm;