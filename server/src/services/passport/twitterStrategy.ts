import { Strategy as TwitterStrategy } from 'passport-twitter'
import { User } from '../../entity/User'
import { Database } from '../database'

export const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_API_KEY as string,
    consumerSecret: process.env.TWITTER_API_SECRET_KEY as string,
    callbackURL: 'http://localhost:4000/auth/twitter/callback',
    includeEmail: true
  },
  async (_, __, profile, cb) => {
    const { id, emails } = profile

    const query = Database.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.twitterId = :id', { id })

    let email: string | null = null

    if (emails) {
      email = emails[0].value
      query.orWhere('user.email = :email', { email })
    }

    let user = await query.getOne()

    if (!user) {
      user = await User.create({
        twitterId: id,
        email
      }).save()
    } else if (!user.twitterId) {
      user.twitterId = id
      await user.save()
    } else {
      // should login
    }

    return cb(null, { id: user.id })
  }
)
