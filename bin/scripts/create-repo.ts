import { prisma } from 'api/prisma'

const reflexTeamId = 'cjuond6ae000r038684hvj879'

export default async function main() {
  await prisma.createRepo({
    owner: 'reflexui',
    name: 'reflex',
    team: {
      connect: {
        id: reflexTeamId,
      },
    },
  })
}
