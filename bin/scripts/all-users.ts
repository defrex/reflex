import User from 'api/models/User'

export default async function main() {
  const users = await User.find()
  for (const user of users) {
    console.log(user)
  }
}
