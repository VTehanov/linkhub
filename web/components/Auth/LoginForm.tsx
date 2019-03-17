import React, { SFC, useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { StyledForm } from '../styles/Form'
import { GithubLogin } from './OAuth/GithubLogin'
import { StyledInput } from '../../styles/Input'

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      errors {
        path
        message
      }
    }
  }
`

export const LoginForm: SFC = () => {
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
    <Mutation mutation={LOGIN_MUTATION} variables={{ email, password }}>
      {login => (
        <StyledForm method="post" onSubmit={e => handleSubmit(e, login)}>
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
          <button type="submit">Login</button>
        </StyledForm>
      )}
    </Mutation>
  )
}
