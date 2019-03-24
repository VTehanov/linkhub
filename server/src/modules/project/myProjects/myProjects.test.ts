import * as faker from 'faker'
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import TestRequester from '../../../utils/testUtils/TestRequester'
import { Project } from '../../../entity/Project'

faker.seed(process.hrtime()[1])
const seedEmail = faker.internet.email()
const seedPassword = faker.internet.password()
const seedProjects = [
  {
    name: faker.commerce.productName(),
    description: faker.random.alphaNumeric(100)
  },
  {
    name: faker.commerce.productName(),
    description: faker.random.alphaNumeric(100)
  }
]

let user: User
let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()
  user = await User.create({
    email: seedEmail,
    password: seedPassword
  }).save()

  const promises = []
  promises.push(
    Project.create({
      ...seedProjects[0],
      creator: user
    }).save()
  )
  promises.push(
    Project.create({
      ...seedProjects[1],
      creator: user
    }).save()
  )

  await Promise.all(promises)
})

afterAll(async () => {
  conn.close()
})

describe('My projects', () => {
  it('retrieves projects by the current user', async () => {
    const rq = new TestRequester()

    await rq.login({ email: seedEmail, password: seedPassword })

    const projects = await rq.myProjects()

    expect(projects.data.myProjects.projects).toEqual(seedProjects)
  })
})
