import styled, { css } from 'styled-components'

const sharedStyle = css`
  padding: 1em;
  border: 1px solid #d6d6d6;
`

const Input = styled.input`
  ${sharedStyle}
`

const TextArea = styled.textarea`
  ${sharedStyle}
  resize: none;
`

export { Input, TextArea }
