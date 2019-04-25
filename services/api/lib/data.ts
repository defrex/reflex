import { FragmentableArray } from 'api/prisma'

export async function findOne<T>(
  query: FragmentableArray<T>,
): Promise<T | void> {
  const instances = await query

  if (instances.length === 0) {
    return
  } else if (instances.length > 1) {
    throw new Error(`Multiple instances returned. Expected 1.`)
  }

  return instances[0]
}
