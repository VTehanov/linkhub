import * as faker from 'faker'
import { Project } from '../../entity/Project'
import { Database } from '../../services/database'

const seedProjectData = () => {
  const data = {
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph()
  }

  return data
}

const seedProjects = async () => {
  await Database.createConnection()

  const projectPromises: Array<Promise<Project>> = []
  for (let i = 0; i < 10; i++) {
    projectPromises.push(Project.create(seedProjectData()).save())
  }

  Promise.all(projectPromises).then(() =>
    console.log(
      `Seeded 10 projects inside ${(process.env
        .NODE_ENV as string).toUpperCase()}`
    )
  )
}

seedProjects()
