import { useState, FunctionComponent } from 'react'
import { StyledForm } from '../styles/Form'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { StyledInput, StyledTextArea } from '../../styles/Controls'
import { FormEvent, InputEvent, Tag } from '../../types'
import { Tags } from '../Tags/Tags'

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATION(
    $name: String!
    $description: String!
    $tags: [String!]
  ) {
    createProject(
      input: { name: $name, description: $description, tags: $tags }
    ) {
      project {
        name
        description
        tags {
          id
          name
        }
      }
      errors {
        path
        message
      }
    }
  }
`

export const ProjectForm: FunctionComponent = () => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    fn: Function
  ) => {
    e.preventDefault()
    await fn()

    setName('')
    setDescription('')
    setTags([])
  }

  const toggleTag = (tag: Tag) => {
    const tagIndex = tags.indexOf(tag.id)

    if (tagIndex >= 0) {
      setTags([...tags.slice(0, tagIndex), ...tags.slice(tagIndex + 1)])
    } else {
      setTags([...tags, tag.id])
    }
  }

  return (
    <Mutation
      mutation={CREATE_PROJECT_MUTATION}
      variables={{ name, description, tags }}
    >
      {createProject => (
        <StyledForm onSubmit={(e: FormEvent) => handleSubmit(e, createProject)}>
          <h2 className="form-name">Create a project</h2>
          <StyledInput
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e: InputEvent) => setName(e.target.value)}
          />
          <Tags>
            {({ data }) => {
              const tagsResponse = data.getTags.tags
              return tagsResponse.map((tag: Tag) => {
                const checkboxId: string = `tag-${tag.id}`

                return (
                  <label
                    key={tag.id}
                    htmlFor={checkboxId}
                    onClick={() => toggleTag(tag)}
                  >
                    <input
                      type="checkbox"
                      checked={tags.includes(tag.id)}
                      id={checkboxId}
                      name="tags"
                      onChange={() => {}}
                    />
                    <span>{tag.name}</span>
                  </label>
                )
              })
            }}
          </Tags>
          <StyledTextArea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e: InputEvent) => setDescription(e.target.value)}
          />
          <button type="submit">Create project</button>
        </StyledForm>
      )}
    </Mutation>
  )
}
