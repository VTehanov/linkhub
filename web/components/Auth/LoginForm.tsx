import React, { Component } from 'react'
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

interface IState {
  email?: string
  password?: string
}

class LoginForm extends Component<any, IState> {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: any = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>, fn: Function) => {
    e.preventDefault()
    await fn()
    this.setState({
      email: '',
      password: ''
    })
  }

  render() {
    return (
      <Mutation mutation={LOGIN_MUTATION} variables={this.state}>
        {login => (
          <StyledForm method="post" onSubmit={e => this.handleSubmit(e, login)}>
            <GithubLogin />
            <div className="delimeter">or</div>
            <StyledInput
              type="email"
              name="email"
              required
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <StyledInput
              type="password"
              name="password"
              required
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button type="submit">Login</button>
          </StyledForm>
        )}
      </Mutation>
    )
  }
}

export default LoginForm
