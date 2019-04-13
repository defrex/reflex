import { generate } from '@graphql-codegen/cli'
import config from 'api/config'
import { absolutePath } from 'api/lib/path'
import fs from 'fs'
import { promisify } from 'util'

export default async function gen(): Promise<any> {
  const typesFilename = absolutePath('api/graphql/types.ts')
  await generate({
    schema: config.graphqlSchemaPath,
    generates: {
      [typesFilename]: {
        plugins: [
          // { add: '// tslint:disable' },
          'typescript',
          'typescript-resolvers',
        ],
        config: {
          contextType: 'api/graphql/Context#ReflexContex',
          mappers: {
            User: 'api/prisma#User',
            Team: 'api/prisma#Team',
            Component: 'api/prisma#Component',
            Example: 'api/prisma#Example',
            Render: 'api/prisma#Render',
            CliAuthSession: 'api/prisma#CliAuthSession',
          },
        },
      },
      [absolutePath('ui/lib/graphql.tsx')]: {
        documents: config.graphqlDocumentPaths,
        plugins: [
          'typescript',
          'typescript-operations',
          'typescript-react-apollo',
        ],
      },
    },
  })

  // This is a dirty hack to remove a useless line which causes
  // the TS compiler to fail. Fix later please.
  let typesFile = await promisify(fs.readFile)(typesFilename, 'utf-8')
  typesFile = typesFile
    .split('\n')
    .slice(0, -2)
    .join('\n')

  await promisify(fs.writeFile)(typesFilename, typesFile)
}
