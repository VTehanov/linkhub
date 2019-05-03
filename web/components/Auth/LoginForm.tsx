import React, { SFC, useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { StyledForm } from '../styles/Form'
import { GithubLogin } from './OAuth/GithubLogin'
import { StyledInput } from '../../styles/Controls'
import { FormEvent, InputEvent } from '../../types'
import { ME_QUERY } from './Me'
import { InputError } from '../Errors/InputError'
import Link from 'next/link'
import Router from 'next/router'

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

  const handleCompleted = (loginData: any) => {
    if (
      (loginData.login.errors === null || !loginData.login.errors.length) &&
      window.location.pathname === '/login'
    ) {
      Router.push('/')
    }
  }

  return (
    <Mutation
      mutation={LOGIN_MUTATION}
      variables={{ email, password }}
      refetchQueries={[{ query: ME_QUERY }]}
      onCompleted={handleCompleted}
    >
      {(login, { data }) => {
        const errors = data && data.login.errors

        return (
          <StyledForm
            method="post"
            onSubmit={(e: FormEvent) => handleSubmit(e, login)}
          >
            <GithubLogin />
            <div className="delimeter">or</div>
            <div className="field">
              <StyledInput
                type="email"
                name="email"
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
            <button type="submit">Login</button>
            <div className="redirect-link">
              <Link
                href={{
                  pathname: '/register'
                }}
              >
                <a>Don't have an account yet?</a>
              </Link>
            </div>
          </StyledForm>
        )
      }}
    </Mutation>
  )
}
