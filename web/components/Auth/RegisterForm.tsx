import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { StyledForm } from '../styles/Form'

const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION($email: String!) {
    register(input: { email: $email }) {
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
}

class RegisterForm extends Component<any, IState> {
  state = {
    email: ''
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
    this.setState({ email: '' })
  }

  render() {
    return (
      <Mutation mutation={REGISTER_MUTATION} variables={this.state}>
        {register => (
          <StyledForm
            method="post"
            onSubmit={e => this.handleSubmit(e, register)}
          >
            <h2 className="form-name">Create an account</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
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
