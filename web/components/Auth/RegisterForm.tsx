import React, { SFC, useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { StyledForm } from '../styles/Form'
import { StyledInput } from '../../styles/Input'
import { GithubLogin } from './OAuth/GithubLogin'

const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
      errors {
        path
        message
      }
    }
  }
`

export const RegisterForm: SFC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    fn: Function
  ) => {
    e.preventDefault()
    await fn()

    setEmail('')
    setPassword('')
  }

  return (
    <Mutation mutation={REGISTER_MUTATION} variables={{ email, password }}>
      {register => (
        <StyledForm method="post" onSubmit={e => handleSubmit(e, register)}>
          <GithubLogin />
          <div className="delimeter">or</div>
          <StyledInput
            type="email"
            name="email"
            required
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <StyledInput
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </StyledForm>
      )}
    </Mutation>
  )
}
