import { StyledForm } from '../styles/Form'
import gql from 'graphql-tag'
import { Component } from 'react'
import { Mutation } from 'react-apollo'

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATION($name: String!, $description: String!) {
    createProject(input: { name: $name, description: $description }) {
      project {
        name
        description
      }
      errors {
        path
        message
      }
    }
  }
`

interface IState {
  name?: string
  description?: string
}

class ProjectForm extends Component<any, IState> {
  state = {
    name: '',
    description: ''
  }

  handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value }: any = e.target
    console.log(name, value)
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>, fn: Function) => {
    e.preventDefault()
    await fn()
    this.setState({ name: '', description: '' })
  }

  render() {
    return (
      <Mutation mutation={CREATE_PROJECT_MUTATION} variables={this.state}>
        {createProject => (
          <StyledForm onSubmit={e => this.handleSubmit(e, createProject)}>
            <h2 className="form-name">Create a project</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              onChange={this.handleChange}
            />
            <button type="submit">Create project</button>
          </StyledForm>
        )}
      </Mutation>
    )
  }
}

export default ProjectForm
