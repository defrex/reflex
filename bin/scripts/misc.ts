import { prisma } from 'api/prisma'

export default async function main() {
  console.log(await prisma)
}
