import { MutationResolvers } from '../../../generated/types'
import { Project } from '../../../entity/Project'
import { createProjectSchema } from './validationSchemas'
import { formatYupError } from '../../../utils/formatYupErrors'
import { User } from '../../../entity/User'

const Mutation: MutationResolvers.Resolvers = {
  async createProject(_, { input }, { session }) {
    let project
    const { userId } = session

    // TODO: add logged in middleware

    if (!userId) {
      return {
        errors: [
          {
            path: 'email',
            message: 'Please log in'
          }
        ]
      }
    }

    try {
      await createProjectSchema.validate(input, { abortEarly: false })
    } catch (err) {
      return {
        user: {},
        errors: formatYupError(err)
      }
    }

    const loggedInUser = await User.findOne({
      where: {
        id: userId
      }
    })

    try {
      project = await Project.create({
        ...input,
        creator: loggedInUser
      }).save()
    } catch (err) {
      throw err
    }

    return {
      project,
      errors: []
    }
  }
}

export const resolvers = {
  Mutation
}
