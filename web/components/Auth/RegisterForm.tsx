import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .form-name {
    text-align: center;
    font-weight: 700;
    font-family: ${props => props.theme.fonts.title};
  }

  input {
    padding: 8px 5px;
    font-size: 14px;
  }

  button[type='submit'] {
    margin-top: 15px;
    padding: 10px 0;
    border: 0;
    background-color: ${props => props.theme.colors.cta};
    font-size: 16px;
    font-weight: bold;
    color: white;
  }
`

const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION($email: String!) {
    register(input: { email: $email }) {
      user {
        id
        email
      }
    }
  }
`

interface IState {
  email?: string
}

class RegisterForm extends Component<null, IState> {
  state = {
    email: ''
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: any = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Mutation mutation={REGISTER_MUTATION} variables={this.state}>
        {(register, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault()
              await register()
              this.setState({ email: '' })
            }}
          >
            {error && error}
            <h2 className="form-name">Create an account</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <button type="submit">Register</button>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default RegisterForm
