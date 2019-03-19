import styled, { css } from 'styled-components'

const sharedStyles = css`
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
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
