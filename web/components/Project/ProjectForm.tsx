import { useState, SFC } from 'react'
import { StyledForm } from '../styles/Form'
import gql from 'graphql-tag'
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

export const ProjectForm: SFC = () => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    fn: Function
  ) => {
    e.preventDefault()
    await fn()

    setName('')
    setDescription('')
  }

  return (
    <Mutation
      mutation={CREATE_PROJECT_MUTATION}
      variables={{ name, description }}
    >
      {createProject => (
        <StyledForm onSubmit={e => handleSubmit(e, createProject)}>
          <h2 className="form-name">Create a project</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button type="submit">Create project</button>
        </StyledForm>
      )}
    </Mutation>
  )
}
