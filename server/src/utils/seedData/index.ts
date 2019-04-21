import * as faker from 'faker'
import { Project } from '../../entity/Project'
import { Database } from '../../services/database'
import { User } from '../../entity/User'
import { Tag } from '../../entity/Tag'

const seedProjectData = () => ({
  name: faker.commerce.productName(),
  description: faker.lorem.paragraph()
})

const tagsData = ['Rest API', 'Statistics', 'Machine Learning']

const seed = async () => {
  await Database.createConnection()

  const userPromises: Array<Promise<User>> = [
    User.create({
      email: 'creator@mail.com',
      password: '12345678'
    }).save(),
    User.create({
      email: 'test@mail.com',
      password: '12345678'
    }).save()
  ]

  const tagsPromises = tagsData.map(name => Tag.create({ name }).save())

  const [projectCreator] = await Promise.all(userPromises)
  const tags = await Promise.all(tagsPromises)

  const projectPromises: Array<Promise<Project>> = []
  for (let i = 0; i < 10; i++) {
    projectPromises.push(
      Project.create({
        ...seedProjectData(),
        creator: projectCreator,
        tags
      }).save()
    )
  }

  Promise.all(projectPromises).then(() =>
    console.log(
      `Seeded 10 projects inside ${(process.env
        .NODE_ENV as string).toUpperCase()}`
    )
  )
}

seed()
