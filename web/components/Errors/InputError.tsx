import { SFC } from 'react'
import styled from 'styled-components'
import { GraphQLGenericError } from '../../types'

interface IProps {
  name: string
  errors: GraphQLGenericError[]
}

export const InputError: SFC<IProps> = ({ name, errors }) => {
  if (errors && errors.length) {
    if (errors[0].path === name) {
      return <StyledInputError>{errors[0].message}</StyledInputError>
    }
  }

  return null
}

const StyledInputError = styled.span`
  font-family: 'Nunito Sans';
  position: absolute;
  bottom: -22px;
  font-size: 14px;
  color: red;
  padding-left: 12px;
`
