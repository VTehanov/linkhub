import styled, { css } from 'styled-components'

const sharedStyles = css`
  padding: 1em;
  border: 1px solid #dddddd;
  border-radius: 5px;

  font-size: 14px;
  font-family: 'Nunito Sans';

  outline: none;

  &::placeholder {
    color: #a6a6a6;
  }
`

export const StyledInput = styled.input`
  ${sharedStyles}
`
export const StyledTextArea = styled.textarea`
  ${sharedStyles}
  resize: none;
`
