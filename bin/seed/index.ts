import { prisma, Team } from 'api/prisma'

export default async function main() {
  const user = await prisma.upsertUser({
    where: {
      email: 'aron.jones@gmail.com',
    },
    update: {},
    create: {
      email: 'aron.jones@gmail.com',
      name: 'Aron Jones',
    },
  })

  let team: Team
  const teams = await prisma.teams({
    where: {
      name: 'Reflex',
    },
  })
  if (teams.length > 0) {
    team = teams[0]
  } else {
    team = await prisma.createTeam({ name: 'Reflex' })
  }

  const memberships = await prisma.memberships({
    where: {
      team: { id: team.id },
      user: { id: user.id },
    },
  })
  if (memberships.length === 0) {
    await prisma.createMembership({
      role: 'ADMIN',
      team: {
        connect: {
          id: team.id,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
    })
  }

  const repos = await prisma.repoes({
    where: {
      name: 'reflex',
      owner: 'reflexui',
      team: {
        id: team.id,
      },
    },
  })
  if (repos.length === 0) {
    await prisma.createRepo({
      name: 'reflex',
      owner: 'reflexui',
      team: {
        connect: {
          id: team.id,
        },
      },
    })
  }
}
