import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  .form-name {
    text-align: center;
    font-weight: 700;
    font-family: ${props => props.theme.fonts.title};
  }

  input {
    padding: 8px 5px;
    font-size: 14px;
  }

  button[type='submit'] {
    margin-top: 15px;
    padding: 10px 0;
    border: 0;
    background-color: ${props => props.theme.colors.cta};
    font-size: 16px;
    font-weight: bold;
    color: white;
  }
`
