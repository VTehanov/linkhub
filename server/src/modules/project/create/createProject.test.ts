import { Connection } from 'typeorm'

import { CreateProjectInput } from '../../../generated/types'
import { testRequester } from '../../../utils/testUtils/testRequester'
import * as errorMessages from './errorMessages'
import { Project } from '../../../entity/Project'
// import { createTypeormConn } from '../../../utils/createTypeOrmConnection'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'

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

let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()
})

afterAll(async () => {
  conn.close()
})

describe('Create project', () => {
  test('creates project', async () => {
    const name = 'test name'
    const description = 'Some cool project that I have created'
    const response = await testRequester(
      createProjectMutation({ name, description })
    )
    const projects = await Project.find({ where: { name } })
    expect(response).toEqual({
      createProject: {
        project: {
          name,
          description
        },
        errors: []
      }
    })

    expect(projects).toHaveLength(1)
    expect(projects[0].name).toEqual(name)
    expect(projects[0].description).toEqual(description)
  })

  test('it does not create project with invalid data', async () => {
    const name = 'Te'
    const description = 'st'
    const response = await testRequester(
      createProjectMutation({ name, description })
    )
    const projects = await Project.find({ where: { name, description } })

    expect(response).toEqual({
      createProject: {
        errors: [
          {
            path: 'name',
            message: errorMessages.NAME_TOO_SHORT
          },
          {
            path: 'description',
            message: errorMessages.DESCRIPTION_TOO_SHORT
          }
        ],
        project: null
      }
    })

    expect(projects).toHaveLength(0)
  })
})
