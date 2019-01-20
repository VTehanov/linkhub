import styled, { css } from 'styled-components'

const sharedStyles = css`
  padding: 1em;
  border: 1px solid #d6d6d6;
  font-size: 14px;
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  .form-name {
    text-align: center;
    font-weight: 700;
    font-family: ${props => props.theme.fonts.title};
  }

  input {
    ${sharedStyles}
  }

  * ~ * {
    margin-top: 10px;
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

  textarea {
    ${sharedStyles}
    min-height: 80px;
    resize: vertical;
  }
`
