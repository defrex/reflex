import { prisma, User, Team } from 'api/prisma'

export async function userInTeam(user: User, team: Team): Promise<boolean> {
  return await prisma.$exists.membership({ user, team })
}
