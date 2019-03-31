import { QueryResolvers } from '../../../generated/types'
import { Tag } from '../../../entity/Tag'

const Query: QueryResolvers.Resolvers = {
  async getTags() {
    const tags = await Tag.find()

    return {
      tags
    }
  }
}

export const resolvers = { Query }
