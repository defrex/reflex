import { generate } from '@graphql-codegen/cli'

import config from 'api/config'
import { absolutePath } from 'api/lib/path'

export default function gen(): Promise<any> {
  return generate({
    schema: config.graphqlSchemaPath,
    documents: config.graphqlDocumentPaths,
    generates: {
      [absolutePath('api/graphql/types.ts')]: {
        plugins: ['typescript', 'typescript-resolvers'],
        config: {
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
}
