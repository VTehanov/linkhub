import * as faker from 'faker'

import { CreateProjectInput } from '../../../generated/types'
import { testRequester } from '../../../utils/testUtils/testRequester'
import {
  PROJECT_DESCRIPTION_MAX_LENGTH,
  PROJECT_NAME_MAX_LENGTH
} from '../../../constants/dataConstraints'
import * as errorMessages from './errorMessages'

const createProjectMutation = ({ name, description }: CreateProjectInput) => `
  mutation {
    createProject(input: {
      name: "${name}"
      description: "${description}"
    }) {
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

describe('Create project', () => {
  test('creates project', async () => {
    const name = 'test name'
    const description = 'Some cool project that I have created'
    const response = await testRequester(
      createProjectMutation({ name, description })
    )
    expect(response).toEqual({
      createProject: {
        project: {
          name,
          description
        },
        errors: []
      }
    })
  })

  test("it doesn't create project with invalid data", async () => {
    const name = faker.random.alphaNumeric(PROJECT_NAME_MAX_LENGTH + 2)
    const description = faker.random.alphaNumeric(
      PROJECT_DESCRIPTION_MAX_LENGTH + 2
    )
    const response = await testRequester(
      createProjectMutation({ name, description })
    )

    expect(response).toEqual({
      createProject: {
        errors: [
          {
            path: 'name',
            message: errorMessages.NAME_TOO_LONG
          },
          {
            path: 'description',
            message: errorMessages.DESCRIPTION_TOO_LONG
          }
        ],
        project: null
      }
    })
  })
})
