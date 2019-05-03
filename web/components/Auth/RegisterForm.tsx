import React, { SFC, useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { StyledForm } from '../styles/Form'
import { StyledInput } from '../../styles/Controls'
import { GithubLogin } from './OAuth/GithubLogin'
import { InputEvent, FormEvent } from '../../types'
import { InputError } from '../Errors/InputError'
import Link from 'next/link'

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
      {(register, { data }) => {
        const errors = data && data.register.errors

        return (
          <StyledForm
            method="post"
            onSubmit={(e: FormEvent) => handleSubmit(e, register)}
          >
            <GithubLogin />
            <div className="delimeter">or</div>
            <div className="field">
              <StyledInput
                type="email"
                name="email"
                errors={errors}
                required
                placeholder="Email"
                value={email}
                onChange={(e: InputEvent) => setEmail(e.target.value)}
              />
              <InputError name="email" errors={errors} />
            </div>
            <div className="field">
              <StyledInput
                type="password"
                name="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e: InputEvent) => setPassword(e.target.value)}
              />
              <InputError name="password" errors={errors} />
            </div>
            <button type="submit">Register</button>
            <div className="redirect-link">
              <Link
                href={{
                  pathname: '/login'
                }}
              >
                <a>Already have an account?</a>
              </Link>
            </div>
          </StyledForm>
        )
      }}
    </Mutation>
  )
}
