import { generate } from '@graphql-codegen/cli'
import fs from 'fs'

import config from 'api/config'
import { absolutePath } from 'api/lib/path'
import { promisify } from 'util'

export default async function gen(): Promise<any> {
  const typesFilename = absolutePath('api/graphql/types.ts')
  await generate({
    schema: config.graphqlSchemaPath,
    documents: config.graphqlDocumentPaths,
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
          },
        },
      },
      [absolutePath('ui/lib/graphql.tsx')]: {
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
