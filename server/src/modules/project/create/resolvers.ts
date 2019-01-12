import { MutationResolvers } from '../../../generated/types'
import { Project } from '../../../entity/Project'
import { createProjectSchema } from './validationSchemas'
import { formatYupError } from '../../../utils/formatYupErrors'

const Mutation: MutationResolvers.Resolvers = {
  async createProject(_, { input }) {
    let project

    try {
      await createProjectSchema.validate(input, { abortEarly: false })
    } catch (err) {
      return {
        user: {},
        errors: formatYupError(err)
      }
    }

    try {
      project = await Project.create(input).save()
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
