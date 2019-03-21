import User from 'api/models/User'

export default async function main() {
  console.log(await User.count())
}
