import { prisma } from 'api/prisma'

export default async function main() {
  await prisma.createMembership({
    role: 'ADMIN',
    user: {
      connect: {
        id: 'cjuonclhk000g0386w3uty9v1',
      },
    },
    team: {
      connect: {
        id: 'cjuond6ae000r038684hvj879',
      },
    },
  })
}
