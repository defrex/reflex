import { Prisma, Team, User } from 'api/prisma'

class DB extends Prisma {
  async teamAdmin(team: Team): Promise<User> {
    const memberships = await this.memberships({
      where: {
        team: { id: team.id },
        role: 'ADMIN',
      },
    })
    if (memberships.length === 0) {
      throw new Error(`Team with no admin: ${team.id}`)
    }
    return this.membership({ id: memberships[0].id }).user()
  }
}

export const db = new DB()
