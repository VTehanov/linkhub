import React, { Component } from 'react'
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

interface IState {
  email?: string
  password?: string
}

class RegisterForm extends Component<any, IState> {
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
      <Mutation mutation={REGISTER_MUTATION} variables={this.state}>
        {register => (
          <StyledForm
            method="post"
            onSubmit={e => this.handleSubmit(e, register)}
          >
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
            <button type="submit">Register</button>
          </StyledForm>
        )}
      </Mutation>
    )
  }
}

export default RegisterForm
