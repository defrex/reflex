import { CreateUserInput } from 'gen/schema'
import User from 'api/models/User'

export default {
  createUser: async (_parent, args: { input: CreateUserInput }, _ctx): Promise<User> => {
    const user = new User()
    
    user.name = args.input.name
    user.email = args.input.email
    user.passwordHash = 'nonsense'

    await user.save()

    return user
  },
}
